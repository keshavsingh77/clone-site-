"use client"; // <--- YAHI HAI ASLI FIX! ISKO SABSE UPAR LIKHNA HAI.

import { useState } from 'react';

export default function TableOfContents({ headings }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  // Shuru mein dikhne wali headings (sirf 4)
  const visibleHeadings = isExpanded ? headings : headings.slice(0, 4);

  return (
    <div className="bg-gray-100 p-4 rounded-lg border my-6">
      <h2 className="text-xl font-bold mb-3">Table of Contents</h2>
      <ul className="space-y-2">
        {visibleHeadings.map((heading) => (
          <li key={heading.id}>
            <a 
              href={`#${heading.id}`}
              className="text-blue-600 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
      
      {/* "Show More" button tabhi dikhega jab 4 se zyada headings hongi */}
      {headings.length > 4 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 font-semibold mt-3 text-sm hover:underline"
        >
          {isExpanded ? 'Show Less' : `Show ${headings.length - 4} More...`}
        </button>
      )}
    </div>
  );
}