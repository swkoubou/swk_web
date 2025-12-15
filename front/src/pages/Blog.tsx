import { useState } from "react";
import { Link } from "react-router-dom";

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
    date: "2024-12-15",
    tags: ["お知らせ", "Webサイト", "リニューアル"],
    readTime: "3分",
  },
];

const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];

function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">技術ブログ</h1>
        <p className="text-xl text-gray-600">
          メンバーが書いた技術記事や学習記録を紹介します
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedTag === null
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            すべて
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedTag === tag
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <time>{new Date(post.date).toLocaleDateString("ja-JP")}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 cursor-pointer transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="text-emerald-600 hover:text-emerald-500 font-medium text-sm transition-colors"
              >
                続きを読む →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            条件に一致する記事が見つかりませんでした。
          </p>
        </div>
      )}

      {/* Pagination (Future Implementation) */}
      <div className="flex justify-center mt-12">
        <div className="text-gray-500 text-sm">
          現在 {filteredPosts.length} 件の記事を表示中
        </div>
      </div>
    </div>
  );
}

export default Blog;
