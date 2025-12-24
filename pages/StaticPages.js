
import React from 'react';

const BaseStaticPage = ({ title, children }) => (
  <div className="py-20 max-w-3xl mx-auto">
    <h1 className="text-5xl font-black text-gray-900 mb-12">{title}</h1>
    <div className="prose prose-lg text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

export const AboutUs = () => (
  <BaseStaticPage title="About Us">
    <p>KrishSite is a forward-thinking publication dedicated to exploring the intersection of design, technology, and artificial intelligence.</p>
    <p>Founded with the mission to provide deep insights into the rapidly changing digital landscape, we offer well-researched articles, tutorials, and trend analysis for modern developers and creators.</p>
  </BaseStaticPage>
);

export const ContactUs = () => (
  <BaseStaticPage title="Get in Touch">
    <p>Have questions, suggestions, or want to collaborate? We'd love to hear from you.</p>
    <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
          <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3" placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
          <input type="email" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3" placeholder="Your Email" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
        <textarea className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 h-32" placeholder="How can we help?"></textarea>
      </div>
      <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg">
        Send Message
      </button>
    </form>
  </BaseStaticPage>
);

export const DMCA = () => (
  <BaseStaticPage title="DMCA Policy">
    <p>We respect intellectual property rights. If you believe your copyrighted work is being used on our site in a way that constitutes copyright infringement, please contact our agent.</p>
    <p>Please provide: 1. Description of the copyrighted work. 2. Identification of the material. 3. Your contact information. 4. A statement of good faith belief.</p>
  </BaseStaticPage>
);

export const PrivacyPolicy = () => (
  <BaseStaticPage title="Privacy Policy">
    <p>Your privacy is important to us. This policy explains how we collect, use, and safeguard your personal information.</p>
    <h3>Data Collection</h3>
    <p>We collect information you provide directly, such as when you subscribe to our newsletter or contact us through our form.</p>
    <h3>Use of Information</h3>
    <p>We use your data to provide our services, improve user experience, and communicate updates about our content.</p>
  </BaseStaticPage>
);
