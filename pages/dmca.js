// src/pages/dmca.js (FINAL, FULL, READY-MADE CODE)

import Head from 'next/head';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';

export default function DmcaPage({ categories }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>DMCA Policy - iPopcorn</title>
        <meta name="description" content="Read the DMCA Copyright Policy for iPopcorn. Learn how to submit a copyright infringement notification." />
      </Head>
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="prose lg:prose-xl max-w-4xl mx-auto break-words">
              
              {/* --- DMCA POLICY CONTENT START --- */}

              <h1 className="text-3xl font-extrabold text-gray-900 mb-6">DMCA Copyright Infringement Notification</h1>

              <p className="text-gray-600 mb-6 leading-relaxed">iPopcorn respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement that are properly reported to us.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Notification of Copyright Infringement</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">If you are a copyright owner, or are authorized to act on behalf of one, please report alleged copyright infringements taking place on or through the iPopcorn website by completing the following DMCA Notice of Alleged Infringement and delivering it to our designated email address.</p>
              
              <p className="text-gray-600 mb-4 leading-relaxed">Upon receipt of the notice as described below, we will take whatever action, in our sole discretion, we deem appropriate, including removal of the challenged material from the site.</p>

              <p className="text-gray-600 mb-4 leading-relaxed font-semibold">Your DMCA notice must include the following information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
                <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (providing URLs is the best way to help us locate content quickly).</li>
                <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.</li>
                <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Where to Send the Notification</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Please send your DMCA notice to us via email:</p>
              
              <div className="mt-4 p-6 bg-red-50 rounded-xl border border-red-100 inline-block">
                <p className="text-gray-800 font-bold text-lg">
                  Email: <a href="mailto:royalkrrishna@gmail.com" className="text-red-600 hover:underline">royalkrrishna@gmail.com</a>
                </p>
              </div>

              <p className="mt-8 text-gray-500 text-sm italic leading-relaxed">Please note that we may share the identity and information in any copyright infringement claim we receive with the alleged infringer. In submitting a claim, you understand accept and agree that your identity and claim may be communicated to the alleged infringer.</p>
              
              {/* --- DMCA POLICY CONTENT END --- */}
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
        console.error("Error fetching categories for DMCA page", error);
    }
    return {
        props: { categories },
        revalidate: 3600 // Re-check for categories every hour
    };
}