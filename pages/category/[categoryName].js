// src/pages/category/[categoryName].js (FINAL, FULL, with NEW "You Might Also Like" DESIGN)

import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';

// PostCard component (for the main grid)
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
        return url.split('/').pop().replace('.html', ''); 
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
            <div className="flex-grow">
                <p className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600">{post.title}</p>
                <p className="text-sm text-gray-700 line-clamp-1">{createExcerpt(post.contentSnippet)}</p>
            </div>
        </Link>
    );
};

export default function CategoryPage({ posts, categoryName, randomPosts, categories }) {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>Posts in {categoryName} - iPopcorn</title>
                <meta name="description" content={`Browse all articles in the ${categoryName} category on iPopcorn.`} />
            </Head>
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                <nav className="mb-6 text-sm">
                    <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-600">{categoryName}</span>
                </nav>

                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="bg-blue-600 w-2 h-8 mr-3 rounded-full"></span>
                    Category: {categoryName}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <PostCard key={post.guid || post.link} post={post} />)
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">No posts found in this category yet.</p>
                        </div>
                    )}
                </div>
                
                {randomPosts && randomPosts.length > 0 && (
                    <div className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                             <span className="bg-indigo-500 w-2 h-8 mr-3 rounded-full"></span>
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
                        <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-blue-600 transition-all hover:scale-110 shadow-md"><svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
                        <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-black transition-all hover:scale-110 shadow-md"><svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
                        <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-pink-600 transition-all hover:scale-110 shadow-md"><svg fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg></a>
                        <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-red-600 transition-all hover:scale-110 shadow-md"><svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg></a>
                    </div>
                </div>
            </main>
            <Footer categories={categories} />
        </div>
    );
}

export async function getStaticPaths() {
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
    const FEED_URL_ALL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    let allPosts = [];
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(FEED_URL_ALL);
        allPosts = feed.items;
    } catch (error) {
        console.error("Error in getStaticPaths:", error);
    }
    const allCategories = allPosts.flatMap(post => post.categories || []);
    const uniqueCategories = [...new Set(allCategories)];
    const paths = uniqueCategories.filter(cat => cat).map(cat => {
        const categoryString = (typeof cat === 'object' && cat._) ? cat._ : cat;
        return {
            params: { categoryName: encodeURIComponent(categoryString) },
        }
    });
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const categoryName = decodeURIComponent(params.categoryName);
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
    
    const FEED_URL_CATEGORY = `${BLOGGER_URL}/feeds/posts/default/-/${encodeURIComponent(categoryName)}?alt=rss&max-results=20`;
    const FEED_URL_ALL = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    
    let posts = [];
    let allPosts = [];
    try {
        const parser = new Parser();
        const [categoryFeed, allFeed] = await Promise.all([
            parser.parseURL(FEED_URL_CATEGORY),
            parser.parseURL(FEED_URL_ALL)
        ]);
        posts = categoryFeed.items || [];
        allPosts = allFeed.items || [];
    } catch (error) {
        console.error("Error in getStaticProps:", error);
    }

    const shuffledPosts = [...allPosts].sort(() => 0.5 - Math.random());
    const randomPosts = shuffledPosts.slice(0, 3);
    
    const allCategories = allPosts.flatMap(post => post.categories || []);
    const categoryStrings = allCategories.map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(cat => cat);
    const uniqueCategories = [...new Set(categoryStrings)];

    return {
        props: {
            posts,
            categoryName,
            randomPosts,
            categories: uniqueCategories,
        },
        revalidate: 300,
    };
}