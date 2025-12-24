// src/components/ShareButtons.js (FINAL VERSION with ICONS)

import { useState } from 'react';

// --- SVG Icon Components ---
const WhatsAppIcon = () => (
  <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.814 4.905-1.295z" />
  </svg>
);
const FacebookIcon = () => (
  <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
  </svg>
);
const TwitterIcon = () => (
  <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
const CopyLinkIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);
const CheckIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={3} className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export default function ShareButtons({ title, url }) {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const currentUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.hash) : url;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div className="mt-8 pt-6 border-t w-full">
      <h3 className="text-lg font-semibold text-center mb-4">Share this post</h3>
      <div className="flex justify-center items-center gap-4">
        {/* WhatsApp Share */}
        <a 
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"
          className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-sm"
        >
          <WhatsAppIcon />
        </a>

        {/* Facebook Share */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
          className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          <FacebookIcon />
        </a>

        {/* Twitter Share */}
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"
          className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm"
        >
          <TwitterIcon />
        </a>
        
        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard} aria-label="Copy post link"
          className="w-12 h-12 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors shadow-sm"
        >
          {copySuccess ? <CheckIcon /> : <CopyLinkIcon />}
        </button>
      </div>
    </div>
  );
}