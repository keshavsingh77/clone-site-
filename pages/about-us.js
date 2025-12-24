// pages/about-us.js (FINAL, FULL, English Version for iPopcorn)

import Head from 'next/head';
import Link from 'next/link';
import Parser from 'rss-parser';
import Footer from '../components/Footer';

export default function AboutUs({ categories }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>About Us - iPopcorn</title>
        <meta name="description" content="Learn about the mission and the team behind iPopcorn. We bring you the latest news, reviews, and insights from the worlds of entertainment, tech, and gaming in a simple, accessible way." />
      </Head>
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="prose lg:prose-xl max-w-4xl mx-auto break-words">
              
              <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome to iPopcorn!</h1>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Daily Dose of Entertainment</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to <strong>iPopcorn</strong>! The world of entertainment, movies, and technology is vast and ever-expanding. With new shows, games, and gadgets launching every day, it can be tough to decide what to watch, play, or buy.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                That's where <strong>iPopcorn</strong> comes in. Our mission is to bring you the latest updates, honest reviews, and fascinating insights from the world of entertainment in a simple, fun, and easy-to-understand language.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Who Are We?</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We aren't just bloggers; we are enthusiasts, just like you. We're the ones who binge-watch entire series overnight, strive for that new high score in the latest games, and are always on the lookout for the next gadget that makes life a little bit cooler.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This blog was started by a group of pop culture enthusiasts who wanted to share their passion with like-minded people. Our goal is to build a community where we can all geek out about our favorite things.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">What You'll Find on iPopcorn</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                <li><strong>Movies & TV Series:</strong> Honest reviews, "hidden gem" recommendations, updates on upcoming films and series, and insightful "explained" articles.</li>
                <li><strong>Gaming:</strong> Reviews of PC, console, and mobile games, helpful tips & tricks, and the latest news from the gaming industry.</li>
                <li><strong>Tech & Gadgets:</strong> Simple, no-nonsense reviews of smartphones, laptops, and other cool gadgets that answer one question: "Should you buy it?"</li>
                <li><strong>Pop Culture & News:</strong> From what's trending on the internet to deep dives into anime and superhero lore, we keep an eye on everything.</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Promise</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Honest Opinions:</strong> We write what we truly think. No fake hype. Ever.</li>
                    <li><strong>Simple Language:</strong> We break down complex topics into easy-to-read content that everyone can understand.</li>
                    <li><strong>Always Fresh:</strong> We strive to bring you new and interesting content every single day.</li>
                </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Connect With Us</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We invite you to read our articles, leave comments, and share your thoughts. If you have any questions or suggestions, please don't hesitate to reach out to us on our <Link href="/contact-us" className="text-blue-600 hover:underline font-semibold">Contact Us</Link> page.
              </p>

            </div>
        </div>
      </main>
      <Footer categories={categories} />
    </div>
  );
}

export async function getStaticProps() {
    const BLOGGER_URL = process.env.BLOGGER_URL || 'https://filmy4u.blogspot.com';
    let categories = [];
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(`${BLOGGER_URL}/feeds/posts/default?alt=rss&max-results=500`);
        const allCategories = feed.items.flatMap(post => post.categories || []).map(cat => (typeof cat === 'object' && cat._) ? cat._ : cat).filter(Boolean);
        categories = [...new Set(allCategories)];
    } catch (error) {
        console.error("Error fetching categories for About Us page", error);
    }
    return {
        props: { categories },
        revalidate: 3600
    };
}