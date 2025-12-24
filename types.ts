
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
}

export interface SearchResult {
  post: Post;
  relevanceReason: string;
}
