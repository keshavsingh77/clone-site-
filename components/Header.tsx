
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Parser from 'rss-parser';
import { BLOGGER_URL } from '../constants';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`);
        const allCats = feed.items.flatMap((item: any) => item.categories || []);
        const uniqueCats = Array.from(new Set(allCats)) as string[];
        setCategories(uniqueCats.slice(0, 6));
      } catch (e) {
        console.error("Cat fetch failed", e);
      }
    };
    fetchCats();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-80 transition-opacity">
            KRISH<span className="text-gray-900">SITE</span>
          </Link>
          <nav className="hidden lg:flex space-x-6">
            {categories.map(cat => (
              <Link 
                key={cat} 
                to={`/category/${encodeURIComponent(cat)}`} 
                className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link 
            to="/contact-us"
            className="hidden sm:block bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-all shadow-md"
          >
            Contact
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-24 px-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="text-indigo-600 mr-2">✦</span> Semantic AI Search
              </h3>
              <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Ask anything (e.g., 'articles about building with react and ai')..."
                  className="w-full bg-gray-50 border-2 border-indigo-100 rounded-xl px-4 py-4 pr-12 text-lg focus:outline-none focus:border-indigo-500 transition-all"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500 italic">Powered by Gemini for smart intent-based results.</p>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
