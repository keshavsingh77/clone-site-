
import { GoogleGenAI, Type } from "@google/genai";
import { Post, SearchResult } from "../types";

export const geminiService = {
  async searchPosts(query: string, posts: Post[]): Promise<SearchResult[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const context = posts.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags,
      excerpt: p.excerpt
    }));

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the following blog posts context: ${JSON.stringify(context)}, find the most relevant posts for the query: "${query}". Return a JSON array of objects with "id" and "reason" (why it's relevant). Only return the JSON.`,
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
      const parsedResults: { id: string, reason: string }[] = JSON.parse(text);
      
      return parsedResults
        .map(res => {
          const post = posts.find(p => p.id === res.id);
          return post ? { post, relevanceReason: res.reason } : null;
        })
        .filter((res): res is SearchResult => res !== null);
    } catch (error) {
      console.error("Gemini Search Error:", error);
      return [];
    }
  },

  async summarizePost(content: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Summarize the following blog post content into 3 concise key bullet points that capture the essence: ${content}`,
      });
      return response.text || "Failed to generate AI summary.";
    } catch (error) {
      console.error("Gemini Summary Error:", error);
      return "Failed to generate AI summary.";
    }
  }
};
