// src/pages/index.js (FINAL, FULL, with NEW "You Might Also Like" DESIGN)

import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';
import PostSwiper from '@/components/PostSwiper';

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
        <title>iPopcorn - Daily Dose of Tech, Gaming, News, Entertainment & Movies</title>
        <meta name="description" content="Welcome to iPopcorn, your ultimate destination for everything trending! Get daily updates, reviews, and insights on Movies, TV Series, Gaming, Tech Gadgets, and Pop Culture. Your one-stop hub for your daily dose of entertainment." />
        <meta name="keywords" content="entertainment news, movie reviews, tv show reviews, latest movies, upcoming series, gaming news, tech reviews, gadget guides, pop culture, anime recommendations, top 10 movies, celebrity news, explained articles, video game reviews, new tech, smartphone reviews, entertainment blog, movie blog, tech blog, gaming blog, what's trending, viral news, iPopcorn, movie recommendations, series recommendations, latest games, new gadgets, tech explained, binge-watch guide, streaming news, Netflix reviews, Prime Video reviews, PC gaming, console gaming, mobile gaming, tech tips, movie news, film reviews, entertainment updates, daily news, pop culture trends, geek culture, superhero movies, sci-fi series, gaming community" />
        <meta name="author" content="iwantgovjob" />
        <link rel="canonical" href="https://iwantgovjob.vercel.app/" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:title" content="iPopcorn - Your Daily Dose of Tech & Entertainment" />
        <meta property="og:description" content="Discover the latest reviews and news on Movies, TV Series, Gaming, Tech, and everything trending in pop culture." />
        <meta property="og:image" content="https://i.postimg.cc/W1M5cyq6/Generated-Image-November-02-2025-10-14AM.jpg" />
        <meta property="og:url" content="https://iwantgovjob.vercel.app/" />
        <meta property="og:site_name" content="iPopcorn" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="iPopcorn - Your Hub for Tech, Entertainment & More" />
        <meta name="twitter:description" content="Discover the latest reviews and news on Movies, TV Series, Gaming, Tech, and everything trending in pop culture." />
        <meta name="google-site-verification" content="AVGansC4c-phgjuA1Zis3aItdPVPF9nJBN6I0nvx4vg" />
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
                <div className="divide-y divide-gray-100">
                    {randomPosts.map((post) => <FeaturedPostCard key={post.guid || post.link} post={post} />)}
                </div>
            </div>
        )}
        
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Follow Us On Social Media</h2>
            <div className="flex justify-center items-center gap-6">
                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-blue-600 transition-transform hover:scale-110 shadow-md">
                    <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-black transition-transform hover:scale-110 shadow-md">
                    <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-pink-600 transition-transform hover:scale-110 shadow-md">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                </a>
                <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-red-600 transition-transform hover:scale-110 shadow-md">
                    <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg>
                </a>
            </div>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
}

export async function getStaticProps() {
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
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