// src/components/Header.js (FINAL, FULL, and UPDATED CODE)

import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Parser from 'rss-parser';
import LoadingSpinner from './LoadingSpinner';

// --- SVG Icon Components ---
const FacebookIcon = () => ( <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> );
const InstagramIcon = () => ( <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg> );

export default function Header({ categories: initialCategories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories || []);
  
  useEffect(() => {
    async function fetchCategories() {
      if (categories.length > 0) return;
      try {
        const BLOGGER_URL = process.env.NEXT_PUBLIC_BLOGGER_URL || 'https://filmy4u.blogspot.com'; // Fallback
        const FEED_URL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
        const parser = new Parser();
        const feed = await parser.parseURL(FEED_URL);
        const allCategories = feed.items.flatMap(post => post.categories || []).map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(Boolean);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (error) { console.error("Failed to fetch categories for menu", error); }
    }
    if (isMenuOpen && categories.length === 0) {
        fetchCategories();
    }
  }, [isMenuOpen, categories]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPostId = (url) => url.split('/').pop().replace('.html', '');
  
  const loadPostsForSearch = useCallback(async () => { 
    if (allPosts.length === 0) { 
      setIsLoading(true); 
      try { 
        // Note: Using the provided API structure
        const res = await fetch('/api/search'); 
        if (res.ok) {
          const posts = await res.json(); 
          setAllPosts(posts); 
        }
      } catch (error) { 
        console.error("Failed to load posts for search", error); 
      } 
      setIsLoading(false); 
    } 
  }, [allPosts]);

  useEffect(() => { if (isSearchOpen) { loadPostsForSearch(); } }, [isSearchOpen, loadPostsForSearch]);
  
  useEffect(() => {
    if (searchQuery.length > 2 && allPosts.length > 0) {
      const query = searchQuery.toLowerCase();
      const results = allPosts.filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(query);
        const tagMatch = (post.categories || []).some(tag => tag.toLowerCase().includes(query));
        return titleMatch || tagMatch;
      });
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allPosts]);
  
  useEffect(() => { 
    if (isMenuOpen || isSearchOpen) { 
      document.body.style.overflow = 'hidden'; 
    } else { 
      document.body.style.overflow = 'auto'; 
    } 
  }, [isMenuOpen, isSearchOpen]);

  const closeSearch = () => { setIsSearchOpen(false); setSearchQuery(''); }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="text-xl font-bold text-blue-600">iPopcorn</Link>
          </div>
          <button onClick={() => setIsSearchOpen(true)} aria-label="Open search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </nav>
      </header>
      
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto p-4">
          <div className="flex items-center border-b-2 pb-2">
            <input type="text" placeholder="Search your queries..." className="w-full text-lg p-2 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
            <button className="ml-4 text-gray-600" onClick={closeSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4 overflow-y-auto max-h-[80vh]">
            {isLoading && <LoadingSpinner />}
            {searchResults.length > 0 && (
              <div className="divide-y divide-gray-200">
                {searchResults.map(post => (
                  <Link to={`/post/${getPostId(post.link)}`} key={post.link} className="block p-3 hover:bg-gray-100" onClick={closeSearch}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-24 h-14 rounded-md overflow-hidden bg-gray-200">
                        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-semibold text-lg line-clamp-2">{post.title}</p>
                        <p className="text-sm text-gray-700 line-clamp-1">{post.snippet}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.length > 2 && !isLoading && searchResults.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No results found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold text-blue-600">iPopcorn</span>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
            <Link to="/" className="block py-2 px-3 text-lg text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <div className="mt-4 pt-4 border-t">
              <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
              <div className="mt-2 space-y-1">
                {categories && categories.map(category => (
                  <Link to={`/category/${encodeURIComponent(category)}`} key={category} className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>{category}</Link>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">More Info</h3>
              <div className="mt-2 space-y-1">
                <Link to="/about-us" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/contact-us" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                <Link to="/privacy-policy" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
              </div>
            </div>
        </div>
        <div className="p-4 border-t">
            <div className="flex justify-center gap-5">
                <a href="#" className="text-gray-500 hover:text-blue-600" aria-label="Facebook"><FacebookIcon /></a>
                <a href="#" className="text-gray-500 hover:text-black" aria-label="Twitter"><TwitterIcon /></a>
                <a href="#" className="text-gray-500 hover:text-pink-600" aria-label="Instagram"><InstagramIcon /></a>
            </div>
        </div>
      </div>
    </>
  );
}