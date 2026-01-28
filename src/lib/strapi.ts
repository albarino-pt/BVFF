// src/lib/strapi.ts

const STRAPI_URL = import.meta.env.STRAPI_URL || 'https://cms.albarinolab.pt';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  url: string;
}

interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string;
}

interface StrapiBlock {
  __component: string;
  id: number;
  body?: string;
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover?: StrapiImage;
  author?: StrapiAuthor;
  category?: any;
  blocks: StrapiBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getArticles() {
  return fetchAPI<StrapiArticle[]>('/articles?populate=*&sort=publishedAt:desc');
}

// export async function getArticle(slug: string) {
//   const response = await fetchAPI<StrapiArticle[]>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
//   return response.data[0] || null;
// }

// src/lib/strapi.ts

export async function getArticle(slug: string) {
//   console.log('Looking for article with slug:', slug);
  
  const response = await fetchAPI<StrapiArticle[]>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
  
//   console.log('Strapi response:', JSON.stringify(response, null, 2));
//   console.log('First article:', response.data[0]);
  
  return response.data[0] || null;
}