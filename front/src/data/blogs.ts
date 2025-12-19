export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "ソフトウェア工房公式サイトリニューアル完了のお知らせ",
    excerpt:
      "ソフトウェア工房の公式Webサイトが全面リニューアルしました。React + TypeScript + Tailwind CSSを使用したモダンなデザインと、優れたユーザーエクスペリエンスを実現。開発の経緯や新機能についてご紹介します。",
    content: `この度、ソフトウェア工房の公式Webサイトが全面リニューアルいたしました。

今回のリニューアルでは、React 19、TypeScript、Tailwind CSS v4といった最新の技術スタックを採用し、モダンで保守性の高いWebサイトを実現しました。

リニューアルの主なポイントは以下の通りです。

まず、デザイン面では、シンプルで直感的なユーザーインターフェースを心がけました。白を基調としたクリーンなデザインに、アクセントカラーとして緑を採用し、適度な緩急をつけています。

技術面では、TypeScriptによる型安全性の確保、Tailwind CSSによる効率的なスタイリング、React Router v7による高速なページ遷移を実現しています。

また、レスポンシブデザインにも対応しており、スマートフォンからデスクトップまで、あらゆるデバイスで快適にご覧いただけます。

今後も、ユーザーの皆様により良い情報をお届けできるよう、継続的な改善を行ってまいります。ご期待ください。`,
    author: "匿名希望",
    date: "2025-12-15",
    tags: ["お知らせ", "Webサイト", "リニューアル"],
    readTime: "3分",
  },
  // 新しいブログ記事はここに追加してください
  // 例:
  // {
  //   id: 2,
  //   title: "記事タイトル",
  //   excerpt: "記事の要約（2-3文程度）",
  //   content: `記事の本文をここに記載します。
  //
  //   複数段落で詳しく書けます。
  //   技術的な内容や学んだことなどを共有しましょう。`,
  //   author: "著者名",
  //   date: "2025-01-15",
  //   tags: ["タグ1", "タグ2", "タグ3"],
  //   readTime: "5分",
  // },
];

// ブログ記事を日付順（新しい順）に取得
export const getBlogPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// タグでフィルタリング
export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return getBlogPosts().filter((post) => post.tags.includes(tag));
};

// 著者でフィルタリング
export const getBlogPostsByAuthor = (author: string): BlogPost[] => {
  return getBlogPosts().filter((post) => post.author === author);
};

// すべてのタグを取得
export const getAllTags = (): string[] => {
  return [...new Set(blogPosts.flatMap((post) => post.tags))];
};

// 検索（タイトル・本文・著者）
export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return getBlogPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery)
  );
};
