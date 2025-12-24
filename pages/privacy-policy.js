// src/pages/privacy-policy.js (FINAL, FULL, READY-MADE for AdSense)

import Head from 'next/head';
import Parser from 'rss-parser';
import Footer from '@/components/Footer';

export default function PrivacyPolicy({ categories }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Privacy Policy - iPopcorn</title>
        <meta name="description" content="Read the privacy policy for iPopcorn to understand how we collect, use, and protect your personal information in compliance with advertising standards." />
      </Head>
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="prose lg:prose-xl max-w-4xl mx-auto break-words">
              
              {/* --- PRIVACY POLICY CONTENT START --- */}

              <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy for iPopcorn</h1>

              <p className="text-gray-600 mb-6 leading-relaxed">At iPopcorn, accessible from https://ipopcorn.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by iPopcorn and how we use it.</p>
              
              <p className="text-gray-600 mb-6">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <a href="mailto:royalkrrishna@gmail.com" className="text-blue-600 hover:underline">royalkrrishna@gmail.com</a></p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Log Files</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">iPopcorn follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookies and Web Beacons</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Like any other website, iPopcorn uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Google DoubleClick DART Cookie</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a></p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Advertising Partners</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 mb-6">
                  <li>
                      <p className="font-bold text-gray-800">Google</p>
                      <p><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a></p>
                  </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Third Party Privacy Policies</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">iPopcorn's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Children's Information</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
              <p className="text-gray-600 mb-4 leading-relaxed">iPopcorn does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Online Privacy Policy Only</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in iPopcorn. This policy is not applicable to any information collected offline or via channels other than this website.</p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Consent</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>

              {/* --- PRIVACY POLICY CONTENT END --- */}
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
        console.error("Error fetching categories for Privacy Policy page", error);
    }
    return {
        props: { categories },
        revalidate: 3600 // Re-check for categories every hour
    };
}