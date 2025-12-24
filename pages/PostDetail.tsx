
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { BLOGGER_URL } from '../constants';
import { Post } from '../types';
import TableOfContents from '../components/TableOfContents';
import ShareButtons from '../components/ShareButtons';
import LoadingSpinner from '../components/LoadingSpinner';
import CodeCopyButton from '../components/CodeCopyButton';
import { geminiService } from '../services/geminiService';

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`);
        const foundItem: any = feed.items.find((item: any) => item.link.includes(id as string));
        
        if (foundItem) {
          const content = foundItem.content || foundItem['content:encoded'] || '';
          const imgMatch = content.match(/<img.*?src="(.*?)"/);
          
          const postData: Post = {
            id: id!,
            title: foundItem.title || 'Untitled',
            excerpt: foundItem.contentSnippet || '',
            content: content,
            author: foundItem.creator || 'Admin',
            date: new Date(foundItem.pubDate).toLocaleDateString(),
            category: (foundItem.categories && foundItem.categories[0]) || 'General',
            thumbnail: imgMatch ? imgMatch[1] : 'https://picsum.photos/800/400',
            tags: foundItem.categories || []
          };
          setPost(postData);
          generateSummary(postData.content);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const generateSummary = async (content: string) => {
    setLoadingSummary(true);
    const summary = await geminiService.summarizePost(content);
    setAiSummary(summary);
    setLoadingSummary(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="py-20 text-center">Post not found.</div>;

  const $ = cheerio.load(post.content);
  
  const renderContent = () => {
    // Process code blocks for syntax highlighting or custom components
    $('pre').each((_, el) => {
        const code = $(el).text();
        const wrapper = $(`<div class="relative group"></div>`);
        $(el).addClass("bg-gray-900 text-gray-100 p-6 rounded-xl my-8 overflow-x-auto text-sm font-mono leading-relaxed border border-gray-800");
        $(el).wrap(wrapper);
    });

    return <div dangerouslySetInnerHTML={{ __html: $.html() }} className="prose max-w-none prose-indigo prose-lg" />;
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 text-xs font-bold uppercase tracking-widest flex items-center text-gray-400">
          <a href="#/" className="hover:text-indigo-600 transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={`#/category/${post.category.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{post.category}</a>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4 border-y border-gray-100 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 uppercase">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            <ShareButtons title={post.title} url={window.location.href} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <article>
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full aspect-video object-cover rounded-2xl mb-12 shadow-sm"
            />
            
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-8 mb-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
               </div>
               <h4 className="text-indigo-900 font-black mb-4 flex items-center text-lg">
                 <span className="mr-2">✦</span> AI Article Insights
               </h4>
               {loadingSummary ? (
                 <div className="flex items-center space-x-2 text-indigo-400">
                   <div className="animate-pulse h-2 w-2 bg-indigo-400 rounded-full"></div>
                   <div className="animate-pulse h-2 w-2 bg-indigo-400 rounded-full delay-75"></div>
                   <div className="animate-pulse h-2 w-2 bg-indigo-400 rounded-full delay-150"></div>
                 </div>
               ) : (
                 <div className="text-indigo-800 text-base whitespace-pre-line leading-relaxed">
                   {aiSummary}
                 </div>
               )}
            </div>

            <div className="content-body">
              {renderContent()}
            </div>
          </article>

          <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
            <TableOfContents content={post.content} />
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-3">Newsletter</h4>
              <p className="text-xs text-gray-500 mb-4">Subscribe for the best insights.</p>
              <input type="email" placeholder="Email..." className="w-full text-sm border-gray-200 rounded-lg p-2 mb-2 focus:ring-1 focus:ring-indigo-500 outline-none" />
              <button className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 transition-colors">Subscribe</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
