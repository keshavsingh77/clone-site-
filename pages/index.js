
// src/pages/index.js (FINAL, FULL, with NEW "You Might Also Like" DESIGN)

import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';
import PostSwiper from '@/components/PostSwiper';

const BLOGGER_URL_DEFAULT = 'https://creativemindcode.blogspot.com';

// PostCard component (for smaller post cards)
const PostCard = ({ post }) => {
    const createExcerpt = (content) => {
        if (!content) return '';
        const text = content.replace(/<[^>]*>/g, '');
        return text.substring(0, 80) + '...';
    };
    const getFirstImage = (post) => {
        if (post.enclosure && post.enclosure.url) return post.enclosure.url;
        if (post.content) { 
            const match = post.content.match(/<img.*?src="(.*?)"/); 
            if (match) return match[1]; 
        }
        return 'https://via.placeholder.com/160x90.png?text=No+Image';
    };
    const getPostId = (url) => {
        if (!url) return '';
        const parts = url.split('/');
        const htmlFile = parts[parts.length - 1];
        return htmlFile.split('.html')[0];
    }
    return (
        <Link href={`/post/${getPostId(post.link)}`} className="block group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                <div className="relative w-full aspect-video bg-gray-100">
                    <img className="absolute top-0 left-0 w-full h-full object-cover" src={getFirstImage(post)} alt={post.title} />
                </div>
                <div className="p-3 flex-grow">
                    <h2 className="text-base font-bold text-gray-800 line-clamp-2" title={post.title}>{post.title}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{createExcerpt(post.contentSnippet)}</p>
                </div>
            </div>
        </Link>
    );
};

// FeaturedPostCard component (for "You Might Also Like")
const FeaturedPostCard = ({ post }) => {
    const createExcerpt = (content) => { 
        if (!content) return ''; 
        const text = content.replace(/<[^>]*>/g, ''); 
        return text.substring(0, 80) + '...'; 
    };
    const getFirstImage = (post) => {
        if (post.enclosure && post.enclosure.url) return post.enclosure.url;
        if (post.content) { 
            const match = post.content.match(/<img.*?src="(.*?)"/); 
            if (match) return match[1]; 
        }
        return 'https://via.placeholder.com/160x90.png?text=No+Image';
    };
    const getPostId = (url) => { 
        if (!url) return ''; 
        return url.split('/').pop().replace('.html', ''); 
    }
    return (
        <Link href={`/post/${getPostId(post.link)}`} className="block group p-4 rounded-lg hover:bg-gray-200 transition-colors flex items-start gap-4">
            <div className="flex-shrink-0 w-24 h-14 rounded-md overflow-hidden bg-gray-200">
                <img src={getFirstImage(post)} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div>
                <p className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600">{post.title}</p>
                <p className="text-sm text-gray-700 line-clamp-1">{createExcerpt(post.contentSnippet)}</p>
            </div>
        </Link>
    );
};


const Pagination = ({ currentPage, totalPages }) => {
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    return (
        <div className="flex justify-between items-center mt-8">
            {hasPrevPage ? ( 
                <Link href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">← Previous</Link> 
            ) : ( 
                <span className="bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed">← Previous</span> 
            )}
            <span className="text-gray-700 font-semibold">Page {currentPage} of {totalPages}</span>
            {hasNextPage ? ( 
                <Link href={`/page/${currentPage + 1}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Next →</Link> 
            ) : ( 
                <span className="bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed">Next →</span> 
            )}
        </div>
    )
};

export default function HomePage({ posts, randomPosts, categories, pagination }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      <Head>
        <title>Creative Mind Code - Tech, Coding & AI Insights</title>
        <meta name="description" content="Explore the latest in technology, programming, and AI at Creative Mind Code." />
      </Head>
      
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        
        {randomPosts && randomPosts.length > 0 && (
          <PostSwiper randomPosts={randomPosts} />
        )}
        
        <h2 className="text-2xl font-bold mb-6 mt-8 border-b-2 border-blue-500 pb-2 inline-block">Latest Posts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {(posts || []).map((post) => <PostCard key={post.guid || post.link} post={post} />)}
        </div>
        
        {pagination && <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />}

        {randomPosts && randomPosts.length > 0 && (
            <div className="mt-12 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-2 h-8 bg-indigo-500 mr-3 rounded-full"></span>
                    You Might Also Like
                </h2>
                <div className="divide-y divide-gray-200">
                    {randomPosts.map((post) => <FeaturedPostCard key={post.guid || post.link} post={post} />)}
                </div>
            </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}

export async function getStaticProps() {
    const BLOGGER_URL = process.env.BLOGGER_URL || BLOGGER_URL_DEFAULT;
    const POSTS_PER_PAGE = 8;
    
    const FEED_URL_ALL_POSTS = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    const FEED_URL_JSON = `${BLOGGER_URL}/feeds/posts/default?alt=json&max-results=1`;
    
    let allPosts = [];
    let jsonData = {};
    try {
        const parser = new Parser();
        const [feed, jsonRes] = await Promise.all([
            parser.parseURL(FEED_URL_ALL_POSTS),
            fetch(FEED_URL_JSON)
        ]);
        allPosts = feed.items || [];
        jsonData = await jsonRes.json();
    } catch (error) { 
        console.error("Error fetching homepage data:", error);
    }

    const homePosts = allPosts.slice(0, POSTS_PER_PAGE);
    const shuffledPosts = [...allPosts].sort(() => 0.5 - Math.random());
    const randomPosts = shuffledPosts.slice(0, 3);
    const totalPosts = parseInt(jsonData.feed?.['openSearch$totalResults']?.$t || 0);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const allCategories = allPosts.flatMap(post => post.categories || []).map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(Boolean);
    const uniqueCategories = [...new Set(allCategories)];

    return {
        props: { 
            posts: homePosts,
            randomPosts,
            categories: uniqueCategories,
            pagination: { currentPage: 1, totalPages: totalPages }
        },
        revalidate: 300,
    };
}
