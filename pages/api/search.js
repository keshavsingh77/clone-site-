import { GoogleGenAI, Type } from "@google/genai";
import Parser from 'rss-parser';
import { MOCK_POSTS } from "../../constants";

/**
 * geminiService handles AI-powered features like semantic search and post summarization.
 * It is exported as a named export for use in client-side components.
 */
export const geminiService = {
  async searchPosts(query) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const context = MOCK_POSTS.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags,
      excerpt: p.excerpt
    }));

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the following blog posts context: ${JSON.stringify(context)}, find the most relevant posts for the query: "${query}". Return a JSON array of objects with "id" and "reason" (why it's relevant).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["id", "reason"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) return [];
      const parsedResults = JSON.parse(text);
      
      return parsedResults
        .map(res => {
          const post = MOCK_POSTS.find(p => p.id === res.id);
          return post ? { post, relevanceReason: res.reason } : null;
        })
        .filter(res => res !== null);
    } catch (error) {
      console.error("Gemini Search Error:", error);
      return [];
    }
  },

  async summarizePost(content) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize the following blog post content into 3 key bullet points: ${content}`,
      });
      return response.text || "Failed to generate AI summary.";
    } catch (error) {
      console.error("Gemini Summary Error:", error);
      return "Failed to generate AI summary.";
    }
  }
};

// --- RSS Feed Fetching & Caching Logic ---

// Cache to prevent frequent requests to Blogger
let cachedPosts = null;
let lastFetchTime = 0;

/**
 * Default API handler for /api/search
 * Fetches RSS feed from Blogger, parses it, and returns a JSON list of posts.
 */
export default async function handler(req, res) {
  const currentTime = new Date().getTime();
  
  // Cache expires every 10 minutes
  if (!cachedPosts || (currentTime - lastFetchTime > 10 * 60 * 1000)) {
    try {
      const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
      const FEED_URL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
      
      const parser = new Parser();
      const feed = await parser.parseURL(FEED_URL);
      
      // Extract comprehensive metadata for search results
      cachedPosts = feed.items.map(item => {
        let thumbnail = 'https://via.placeholder.com/160x90.png?text=iPopcorn';
        if (item.enclosure && item.enclosure.url) {
            thumbnail = item.enclosure.url;
        } else if (item.content) {
            const match = item.content.match(/<img.*?src="(.*?)"/);
            if (match) thumbnail = match[1];
        }

        return {
            title: item.title,
            link: item.link,
            snippet: item.contentSnippet?.substring(0, 80) + '...',
            categories: (item.categories || []).map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat),
            thumbnail: thumbnail
        }
      });

      lastFetchTime = currentTime;
      console.log('Blogger feed fetched and cached with tags and thumbnails.');

    } catch (error) {
      console.error("Error fetching Blogger feed for search:", error);
      // Return 500 but try to serve stale cache if available
      if (cachedPosts) {
        return res.status(200).json(cachedPosts);
      }
      return res.status(500).json({ error: 'Could not fetch posts' });
    }
  }

  // Set Cache-Control headers for browser/CDN optimization
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  res.status(200).json(cachedPosts);
}