
import React from 'react';
import { MOCK_POSTS } from '../constants';

const RelatedPostLinks = ({ currentPost }) => {
  if (!currentPost) return null;
  const related = MOCK_POSTS
    .filter(p => p.id !== currentPost.id && (p.category === currentPost.category || p.tags.some(t => currentPost.tags.includes(t))))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-black text-gray-900 mb-8">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map(post => (
          <a key={post.id} href={`#/post/${post.id}`} className="group">
            <div className="aspect-video rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100">
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-gray-900 leading-snug group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedPostLinks;
