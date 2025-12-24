
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Parser from 'rss-parser';
import { geminiService } from '../services/geminiService';
import { SearchResult, Post } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { BLOGGER_URL } from '../constants';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const parser = new Parser();
      const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=100`);
      
      const posts: Post[] = feed.items.map((item: any) => ({
        id: item.link.split('/').pop().replace('.html', ''),
        title: item.title,
        excerpt: item.contentSnippet,
        content: item.content,
        author: item.creator,
        date: new Date(item.pubDate).toLocaleDateString(),
        category: item.categories[0] || 'Uncategorized',
        thumbnail: 'https://picsum.photos/800/400',
        tags: item.categories || []
      }));

      const searchResults = await geminiService.searchPosts(query, posts);
      setResults(searchResults);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Search Results</h1>
      <p className="text-gray-500 mb-12">Showing AI-ranked results for: <span className="text-indigo-600 font-bold">"{query}"</span></p>

      {loading ? (
        <LoadingSpinner />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(({ post, relevanceReason }) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 mb-4 text-xs font-bold text-indigo-600">
                <span className="p-1 bg-indigo-50 rounded">AI Insight</span>
                <span className="text-gray-300">|</span>
                <span>{post.category}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 hover:text-indigo-600 transition-colors">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-indigo-400 italic text-xs text-gray-600 mb-6">
                "{relevanceReason}"
              </div>
              <Link to={`/post/${post.id}`} className="text-sm font-bold text-indigo-600 hover:underline">Read Post →</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-xl font-medium">No results found for your query. Try something different!</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
