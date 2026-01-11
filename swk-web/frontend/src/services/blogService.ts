import { blogPosts, type BlogPost } from "../data/blogs";

// 環境変数でAPIの使用可否を切り替え
const USE_API = import.meta.env.VITE_USE_API === "true";
const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * ブログ記事一覧を取得
 * 環境変数でAPIと静的データを切り替え
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!USE_API) {
    // 静的データから取得（バックエンド不要）
    return blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/blogs`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts from API:", error);
    // フォールバック: エラー時は静的データを返す
    return blogPosts;
  }
};

/**
 * ブログ記事の詳細を取得
 */
export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  if (!USE_API) {
    // 静的データから検索
    return blogPosts.find((post) => post.id === id) || null;
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/blogs/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post from API:", error);
    return blogPosts.find((post) => post.id === id) || null;
  }
};

/**
 * タグでフィルタリング
 */
export const getBlogPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const allPosts = await getBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
};

/**
 * 著者でフィルタリング
 */
export const getBlogPostsByAuthor = async (
  author: string
): Promise<BlogPost[]> => {
  const allPosts = await getBlogPosts();
  return allPosts.filter((post) => post.author === author);
};

/**
 * すべてのタグを取得
 */
export const getAllTags = async (): Promise<string[]> => {
  const allPosts = await getBlogPosts();
  return [...new Set(allPosts.flatMap((post) => post.tags))];
};

/**
 * 検索（タイトル・本文・著者）
 */
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  const allPosts = await getBlogPosts();
  const lowerQuery = query.toLowerCase();
  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery)
  );
};
