
// Fix: Added Post import and MOCK_POSTS export to resolve missing member error in RelatedPostLinks.tsx
import { Post, Category } from './types';

export const BLOGGER_URL = 'https://creativemindcode.blogspot.com';

export const CATEGORIES: Category[] = [
  { name: 'Technology', slug: 'technology', description: 'Latest in tech and gadgets.' },
  { name: 'Programming', slug: 'programming', description: 'Software engineering and coding tips.' },
  { name: 'AI & ML', slug: 'ai-ml', description: 'Exploring the world of Artificial Intelligence.' },
  { name: 'Design', slug: 'design', description: 'UI/UX and visual design trends.' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development with AI',
    excerpt: 'How Gemini and other LLMs are changing the way we build web applications today.',
    content: `
## Introduction
Artificial Intelligence is no longer just a buzzword. It is actively reshaping how developers write code, debug applications, and architect systems.

## The Rise of AI SDKs
With tools like the Google GenAI SDK, developers can now integrate advanced reasoning capabilities directly into the frontend. This allows for real-time personalization and semantic search without heavy backend requirements.

## Practical Example
Consider a blog like this one. Traditionally, search was limited to simple keyword matching. Now, we can use LLMs to understand the intent behind a user's query.

\`\`\`javascript
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'Summarize this article for a 5-year-old',
});
\`\`\`

## Conclusion
We are just scratching the surface of what's possible when AI meets modern web technologies.
    `,
    author: 'Krish',
    date: '2024-05-15',
    category: 'Technology',
    thumbnail: 'https://picsum.photos/800/400?random=1',
    tags: ['AI', 'WebDev', 'Future'],
    featured: true
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS for Scalable UI',
    excerpt: 'Learn the best practices for building responsive and maintainable design systems using Tailwind.',
    content: `
## Why Tailwind?
Tailwind CSS provides a utility-first approach that speeds up development cycles significantly.

## Organizing Styles
Instead of massive CSS files, you use small, composable classes directly in your HTML or JSX.

## Responsive Design
Tailwind's mobile-first approach ensures that your site looks great on every screen size from the start.

\`\`\`html
<div class="p-4 md:p-8 lg:p-12 bg-blue-500">
  Responsive Padding
</div>
\`\`\`
    `,
    author: 'Elena',
    date: '2024-05-10',
    category: 'Design',
    thumbnail: 'https://picsum.photos/800/400?random=2',
    tags: ['Tailwind', 'CSS', 'UI'],
    featured: true
  },
  {
    id: '3',
    title: 'React 18: Concurrency and Beyond',
    excerpt: 'A deep dive into the newest features of React 18, including transitions and suspense.',
    content: `
## Concurrent React
React 18 introduces concurrent rendering, a massive architectural shift that allows React to interrupt a render to handle a high-priority event.

## Key Hooks
- \`useTransition\`
- \`useDeferredValue\`
- \`useId\`

## Suspense on the Server
New server-side rendering capabilities make loading states smoother than ever.
    `,
    author: 'Mark',
    date: '2024-05-01',
    category: 'Programming',
    thumbnail: 'https://picsum.photos/800/400?random=3',
    tags: ['React', 'JavaScript', 'Framework'],
  }
];
