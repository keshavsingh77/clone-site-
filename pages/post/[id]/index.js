
// src/pages/post/[id].js (FINAL, GUARANTEED CANONICAL FIX)

import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import readingTime from 'reading-time';
import Prism from 'prismjs';
import { useEffect } from 'react';

import ShareButtons from '@/components/ShareButtons';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import CodeCopyButton from '@/components/CodeCopyButton';
import ResponsiveEmbeds from '@/components/ResponsiveEmbeds';

const BLOGGER_URL_DEFAULT = 'https://creativemindcode.blogspot.com';

const RecentPostCard = ({ post }) => {
    const getPostId = (url) => { if (!url) return ''; return url.split('/').pop().replace('.html', ''); }
    const getFirstImage = (content) => { if (!content) return 'https://via.placeholder.com/160x90.png?text=No+Image'; const match = content.match(/<img.*?src="(.*?)"/); return match ? match[1] : 'https://via.placeholder.com/160x90.png?text=No+Image'; };
    return (
        <Link href={`/post/${getPostId(post.link)}`} className="block group p-4 rounded-lg hover:bg-gray-100 flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-shrink-0 w-full md:w-32"><div className="relative w-full overflow-hidden rounded-md" style={{ paddingTop: '56.25%' }}><img src={getFirstImage(post.content)} alt={post.title} className="absolute top-0 left-0 w-full h-full object-cover"/></div></div>
            <div className="flex-grow"><h3 className="text-lg font-semibold text-blue-600 group-hover:underline line-clamp-2">{post.title}</h3><p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.contentSnippet}</p></div>
        </Link>
    )
};

export default function PostPage({ post, recentPosts, categories, vercelCanonicalUrl }) {
  useEffect(() => { if (typeof window !== 'undefined') { Prism.highlightAll(); } }, [post]);
  if (!post) { return <div className="text-center p-10">Post not found...</div>; }
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <ReadingProgressBar />
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.contentSnippet?.substring(0, 155)} />
        <link rel="canonical" href={vercelCanonicalUrl} />
      </Head>
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <article className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Post</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <div className="flex items-center text-gray-500 mb-6 text-sm">
             {post.readingTime && (<span>{post.readingTime}</span>)}
             <span className="mx-2">•</span>
             <span>{post.pubDate ? new Date(post.pubDate).toLocaleDateString() : 'Recent'}</span>
          </div>
          
          {post.image && ( 
            <div className="relative w-full overflow-hidden rounded-lg mb-8 bg-white" style={{ paddingTop: '56.25%' }}>
              <img src={post.image} alt={post.title} className="absolute top-0 left-0 w-full h-full object-contain"/>
            </div> 
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <div>
              <TableOfContents headings={post.headings} />
              <div className="prose lg:prose-xl max-w-none break-words" dangerouslySetInnerHTML={{ __html: post.content }} />
              <CodeCopyButton />
              <ResponsiveEmbeds />
              <ShareButtons title={post.title} url={vercelCanonicalUrl} />
            </div>

            <aside className="hidden lg:block space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                <h4 className="font-bold text-gray-900 mb-4">Newsletter</h4>
                <p className="text-xs text-gray-500 mb-4">Subscribe for updates.</p>
                <input type="email" placeholder="Email address" className="w-full text-sm border-gray-200 rounded-lg p-2.5 mb-3" />
                <button className="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
              </div>
            </aside>
          </div>
        </article>

        {recentPosts && recentPosts.length > 0 && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mt-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-blue-600 w-2 h-8 mr-3 rounded-full"></span>
              Recent Posts
            </h2>
            <div className="space-y-4">
              {recentPosts.map(p => <RecentPostCard key={p.guid || p.link} post={p} />)}
            </div>
          </div>
        )}
      </main>
      <Footer categories={categories} />
    </div>
  );
}

export async function getStaticPaths() {
    const BLOGGER_URL = process.env.BLOGGER_URL || BLOGGER_URL_DEFAULT;
    const FEED_URL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    const parser = new Parser();
    let feed;
    try { 
        feed = await parser.parseURL(FEED_URL); 
    } catch (error) { 
        console.error("Could not fetch feed for paths:", error); 
        return { paths: [], fallback: 'blocking' }; 
    }
    const paths = feed.items.map(item => ({ params: { id: item.link.split('/').pop().replace('.html', '') }, }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const BLOGGER_URL = process.env.BLOGGER_URL || BLOGGER_URL_DEFAULT;
    const FEED_URL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    const parser = new Parser();
    let allPosts;
    try { 
        const feed = await parser.parseURL(FEED_URL); 
        allPosts = feed.items; 
    } catch (error) { 
        return { notFound: true }; 
    }
    
    const currentPost = allPosts.find(item => item.link.split('/').pop().replace('.html', '') === params.id);
    if (!currentPost) { return { notFound: true }; }

    const postId = currentPost.link.split('/').pop().replace('.html', '');
    const vercelCanonicalUrl = `https://creativemindcode.vercel.app/post/${postId}`;

    const $ = cheerio.load(currentPost.content || "");
    $('.separator').each(function() { 
        const image = $(this).find('img'); 
        if (image.length) { $(this).replaceWith(image); } 
    });
    
    $('iframe').each(function() { 
        const iframe = $(this); 
        iframe.removeAttr('width').removeAttr('height'); 
        const wrapper = $('<div class="aspect-video w-full my-6 relative overflow-hidden"></div>'); 
        iframe.wrap(wrapper); 
        iframe.addClass('absolute top-0 left-0 w-full h-full border-0'); 
    });
    
    const stats = readingTime($.text());
    currentPost.readingTime = stats.text;
    
    const headings = [];
    $('h2, h3').each((index, element) => { 
        const text = $(element).text(); 
        if (text) { 
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); 
            $(element).attr('id', id); 
            headings.push({ id, text }); 
        } 
    });
    
    currentPost.content = $.html();
    currentPost.headings = headings;
    
    const postImageMatch = currentPost.content.match(/<img.*?src="(.*?)"/);
    currentPost.image = postImageMatch ? postImageMatch[1] : null;
    
    const recentPosts = allPosts.filter(p => p.guid !== currentPost.guid).slice(0, 4);
    
    const allCategories = allPosts.flatMap(post => post.categories || []);
    const categoryStrings = allCategories.map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(cat => cat);
    const uniqueCategories = [...new Set(categoryStrings)];

    return {
        props: {
            post: currentPost,
            recentPosts: recentPosts,
            categories: uniqueCategories,
            vercelCanonicalUrl: vercelCanonicalUrl,
        },
        revalidate: 600,
    };
}
