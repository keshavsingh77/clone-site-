
import React, { useState } from 'react';

const PostSlider = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + posts.length) % posts.length);

  if (!posts || posts.length === 0) return null;
  const post = posts[current];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl mb-12 shadow-2xl group">
      <img 
        src={post.thumbnail} 
        alt={post.title} 
        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
        <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start uppercase tracking-wider">
          Featured: {post.category}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-200 text-lg max-w-2xl mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        <a 
          href={`#/post/${post.id}`}
          className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all w-max inline-block shadow-lg"
        >
          Read Article
        </a>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default PostSlider;
