
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'rss-parser';
import { BLOGGER_URL } from '../constants';

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`);
        const allCats = feed.items.flatMap((item: any) => item.categories || []);
        const uniqueCats = Array.from(new Set(allCats)) as string[];
        setCategories(uniqueCats.slice(0, 4));
      } catch (e) {
        console.error(e);
      }
    };
    fetchCats();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="text-2xl font-black text-indigo-400 tracking-tighter mb-6 block">
              KRISH<span className="text-white">SITE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exploring the convergence of human creativity and artificial intelligence. Your premier source for technical insights and design trends.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/about-us" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact-us" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
              <li><Link to="/dmca" className="hover:text-indigo-400 transition-colors">DMCA Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Popular Categories</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <Link to={`/category/${encodeURIComponent(cat)}`} className="hover:text-indigo-400 transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our weekly digest.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-all font-bold">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs uppercase tracking-widest">
          <p>© 2024 KRISHSITE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
