
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Parser from 'rss-parser';
import { BLOGGER_URL } from '../constants';
import { Post } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      setLoading(true);
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=100`);
        
        const decodedCatName = decodeURIComponent(categoryName || '');
        const filtered: Post[] = feed.items
            .filter((item: any) => item.categories && item.categories.includes(decodedCatName))
            .map((item: any) => {
                const imgMatch = (item.content || '').match(/<img.*?src="(.*?)"/);
                return {
                    id: item.link.split('/').pop().replace('.html', ''),
                    title: item.title,
                    excerpt: item.contentSnippet,
                    content: item.content,
                    author: item.creator,
                    date: new Date(item.pubDate).toLocaleDateString(),
                    category: decodedCatName,
                    thumbnail: imgMatch ? imgMatch[1] : 'https://picsum.photos/800/400',
                    tags: item.categories || []
                };
            });
        setPosts(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [categoryName]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-12 min-h-screen">
      <div className="bg-indigo-600 rounded-3xl p-12 mb-16 text-white text-center">
        <h1 className="text-5xl font-black mb-4">{decodeURIComponent(categoryName || '')}</h1>
        <p className="text-indigo-100 text-xl max-w-2xl mx-auto">Explore all articles tagged under this category.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <Link to={`/post/${post.id}`} className="text-indigo-600 font-bold text-sm">Read Article</Link>
            </div>
          </article>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-500 italic">
          No articles in this category yet.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
