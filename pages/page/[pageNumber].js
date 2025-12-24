// src/pages/page/[pageNumber].js (FINAL, FULL, AND CORRECTED CODE)

import Parser from 'rss-parser'; 
import HomePage from '../index'; // Homepage component ko hi dobara use karenge

// Ye function bilkul homepage jaisa hi hai, bas component ko dobara use kar rahe hain
export default HomePage;

// Ye function Next.js ko batayega ki kitne page banane hain (page/2, page/3, etc.)
export async function getStaticPaths() {
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
    const POSTS_PER_PAGE = 8;
    const FEED_URL_JSON = `${BLOGGER_URL}/feeds/posts/default?alt=json&max-results=1`;
    
    let totalPosts = 0;
    try {
        const res = await fetch(FEED_URL_JSON);
        const data = await res.json();
        totalPosts = parseInt(data.feed?.['openSearch$totalResults']?.$t || 0);
    } catch (error) {
        console.error("Error in getStaticPaths for pagination:", error);
    }

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const paths = [];

    // Page 2 se shuru karke saare pages ke liye path banayenge
    for (let i = 2; i <= totalPages; i++) {
        paths.push({ params: { pageNumber: i.toString() } });
    }

    return {
        paths,
        fallback: 'blocking'
    };
}

// Ye function har page ke liye uske specific posts laayega
export async function getStaticProps(context) {
    const pageNumber = parseInt(context.params.pageNumber);
    const POSTS_PER_PAGE = 8;
    const startIndex = (pageNumber - 1) * POSTS_PER_PAGE + 1;
    
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
    
    // Is page ke posts laane ke liye URL
    const FEED_URL_PAGE = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=${POSTS_PER_PAGE}&start-index=${startIndex}`;
    // Saare posts laane ke liye URL (random posts, categories, etc. ke liye)
    const FEED_URL_ALL_POSTS = `${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`;
    const FEED_URL_JSON = `${BLOGGER_URL}/feeds/posts/default?alt=json&max-results=1`;

    let pagePosts = [];
    let allPosts = [];
    let jsonData = {};
    try {
        const parser = new Parser(); 
        const [pageFeed, allFeed, jsonRes] = await Promise.all([
            parser.parseURL(FEED_URL_PAGE),
            parser.parseURL(FEED_URL_ALL_POSTS),
            fetch(FEED_URL_JSON)
        ]);
        pagePosts = pageFeed.items || [];
        allPosts = allFeed.items || [];
        jsonData = await jsonRes.json();
    } catch (error) { 
        console.error(`Error fetching data for page ${pageNumber}:`, error);
    }
    
    // 3 random posts nikalne ka logic
    const shuffledPosts = [...allPosts].sort(() => 0.5 - Math.random());
    const randomPosts = shuffledPosts.slice(0, 3);

    // Total pages aur categories nikalne ka logic
    const totalPosts = parseInt(jsonData.feed?.['openSearch$totalResults']?.$t || 0);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const allCategories = allPosts.flatMap(post => post.categories || []).map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(Boolean);
    const uniqueCategories = [...new Set(allCategories)];
    
    return {
        props: {
            posts: pagePosts, 
            randomPosts: randomPosts,
            categories: uniqueCategories,
            pagination: {
                currentPage: pageNumber,
                totalPages: totalPages
            }
        },
        revalidate: 300
    };
}