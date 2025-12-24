// src/pages/contact-us.js (FINAL, FULL, with YOUR EMAIL)

import Head from 'next/head';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';

export default function ContactUs({ categories }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Contact Us - iPopcorn</title>
        <meta name="description" content="Have a question, suggestion, or a business inquiry? Contact the team at iPopcorn. We'd love to hear from you." />
      </Head>
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <div className="prose lg:prose-xl max-w-4xl mx-auto">
                
                {/* --- CONTACT US CONTENT START --- */}

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    We're thrilled you want to get in touch! Whether you have a question about a movie, a suggestion for a game review, or a business-related inquiry, we're here to listen.
                </p>
                
                <p className="mt-8 text-gray-600">
                    Please feel free to reach out to us at the email address below. We do our best to respond to every message as soon as possible.
                </p>

                <div className="mt-10 p-8 bg-blue-50 rounded-2xl border border-blue-100 inline-block shadow-inner">
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Direct Inquiries</p>
                    <p className="text-gray-800 font-bold text-xl md:text-2xl break-all">
                        {/* --- AAPKA EMAIL ADDRESS YAHAN HAI --- */}
                        <a href="mailto:royalkrrishna@gmail.com" className="hover:text-blue-700 transition-colors">royalkrrishna@gmail.com</a>
                    </p>
                </div>

                <p className="mt-10 text-gray-600">
                    You can also connect with us on our social media platforms for the latest updates, movie discussion, and community polls.
                </p>

                <div className="flex justify-center gap-6 mt-8">
                  <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md" aria-label="Facebook">
                    <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md" aria-label="X (formerly Twitter)">
                    <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md" aria-label="Instagram">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                  </a>
                </div>

                {/* --- CONTACT US CONTENT END --- */}
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
        console.error("Error fetching categories for Contact Us page", error);
    }
    return {
        props: { categories },
        revalidate: 3600 // Re-check for categories every hour
    };
}