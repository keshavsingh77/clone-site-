
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './App.tsx',
    './index.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'h2, h3': {
              scrollMarginTop: '5rem',
            },
            pre: {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              // --- YAHAN HAI ASLI FIX (Sizing) ---
              maxHeight: '60vh', // Box ki max height screen ki height ka 60% hogi
              minHeight: '8rem',  // Box ki min height lagbhag 4 line ke barabar hogi
              overflowY: 'auto',  // Vertical scrollbar apne aap aayega
              position: 'relative', // Button ko position karne ke liye zaroori
            },
            // Optional: Scrollbar ko thoda sundar banane ke liye
            'pre::-webkit-scrollbar': {
              width: '8px',
            },
            'pre::-webkit-scrollbar-track': {
              background: '#1f2937', // Dark background
            },
            'pre::-webkit-scrollbar-thumb': {
              background: '#4b5563', // Gray scrollbar
              borderRadius: '4px',
            },
            // --- END FIX ---
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
