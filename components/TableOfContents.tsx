
import React, { useEffect, useState } from 'react';

interface Props {
  content: string;
}

const TableOfContents: React.FC<Props> = ({ content }) => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const lines = content.split('\n');
    const items = lines
      .filter(line => line.startsWith('##'))
      .map(line => {
        const level = (line.match(/^#+/) || [''])[0].length;
        const text = line.replace(/^#+\s*/, '');
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return { id, text, level };
      });
    setHeadings(items);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Table of Contents</h3>
      <ul className="space-y-3">
        {headings.map(h => (
          <li key={h.id} style={{ marginLeft: `${(h.level - 2) * 1.5}rem` }}>
            <a 
              href={`#${h.id}`} 
              className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-start"
            >
              <span className="mr-2 text-indigo-400">•</span>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
