export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  featuredImage: string;
  excerpt: string;
  tags: string[];
  cities?: string[]; // city slugs from data/cities.ts (a post can cover more than one)
  society?: string; // society slug from data/cities.ts
  services?: string[]; // service slugs from data/services.ts
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}
