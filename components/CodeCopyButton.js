
"use client";

import React, { useState } from 'react';

// Fix: Refactored CodeCopyButton to accept a 'code' prop and manage its own state.
// This resolves the TypeScript error in PostDetail.tsx (line 61) where 'code' was not expected.
/**
 * @param {{ code: string }} props
 */
export default function CodeCopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (code) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        // Reset the button text back to "Copy" after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`absolute top-3 right-3 z-10 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md transition-all duration-200 ${
        copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
      }`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
