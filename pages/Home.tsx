
import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import PostSlider from '../components/PostSlider';
import LoadingSpinner from '../components/LoadingSpinner';
import { BLOGGER_URL } from '../constants';
import { Post } from '../types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=50`);
        
        const mappedPosts: Post[] = feed.items.map((item: any) => {
          const content = item.content || item['content:encoded'] || '';
          const imgMatch = content.match(/<img.*?src="(.*?)"/);
          const thumbnail = imgMatch ? imgMatch[1] : `https://picsum.photos/800/400?random=${item.guid}`;
          const id = item.link.split('/').pop().replace('.html', '');

          return {
            id,
            title: item.title || 'Untitled',
            excerpt: item.contentSnippet || '',
            content: content,
            author: item.creator || 'Admin',
            date: new Date(item.pubDate).toLocaleDateString(),
            category: (item.categories && item.categories[0]) || 'General',
            thumbnail,
            tags: item.categories || [],
            featured: true
          };
        });

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching Blogger feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  const featured = posts.slice(0, 3);
  const remaining = posts.slice(3);

  return (
    <div className="py-12">
      {featured.length > 0 && <PostSlider posts={featured} />}

      <div className="mb-12">
        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
          Latest Articles <span className="ml-4 h-px bg-gray-200 flex-grow"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remaining.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-gray-400 font-medium mb-3 flex items-center">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  <a href={`#/post/${post.id}`}>{post.title}</a>
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <a 
                    href={`#/post/${post.id}`}
                    className="inline-flex items-center text-indigo-600 font-bold text-sm hover:translate-x-2 transition-transform"
                  >
                    Read More 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
