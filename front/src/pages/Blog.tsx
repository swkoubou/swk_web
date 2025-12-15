import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "ReactとTypeScriptで始めるモダンフロントエンド開発",
    excerpt: "TypeScriptを使ったReact開発の基本的な手法と、型安全性がもたらすメリットについて解説します。実際のプロジェクトでの経験を元に、ベストプラクティスを紹介。",
    author: "こんどうそうた",
    date: "2024-12-15",
    tags: ["React", "TypeScript", "Frontend"],
    readTime: "5分"
  },
  {
    id: 2,
    title: "Tailwind CSSによるユーティリティファーストなデザイン",
    excerpt: "Tailwind CSSを使った効率的なスタイリング手法を実践的に学びます。カスタムコンポーネントの作成方法やレスポンシブデザインの実装まで。",
    author: "サンプル 太郎",
    date: "2024-12-10",
    tags: ["CSS", "Tailwind", "Design"],
    readTime: "7分"
  },
  {
    id: 3,
    title: "Pythonで機械学習入門：データ分析の第一歩",
    excerpt: "Pythonとライブラリを使った基本的なデータ分析手法を学習者向けに解説。実際のデータセットを使った実習も含まれています。",
    author: "サンプル 花子",
    date: "2024-12-05",
    tags: ["Python", "Machine Learning", "Data Science"],
    readTime: "10分"
  },
  {
    id: 4,
    title: "Gitを使ったチーム開発入門",
    excerpt: "バージョン管理システムGitの基本的な使い方から、チーム開発で重要なブランチ戦略まで、初心者にも分かりやすく説明します。",
    author: "サンプル 次郎",
    date: "2024-11-28",
    tags: ["Git", "Team Development", "Version Control"],
    readTime: "8分"
  },
  {
    id: 5,
    title: "Node.jsでRESTful API開発",
    excerpt: "Express.jsを使ったサーバーサイド開発の基礎から、認証やデータベース連携まで、実践的なAPI開発手法を紹介します。",
    author: "こんどうそうた",
    date: "2024-11-20",
    tags: ["Node.js", "API", "Backend"],
    readTime: "12分"
  }
];

const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchTerm || 
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
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedTag === null
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            すべて
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <time>{new Date(post.date).toLocaleDateString('ja-JP')}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="text-primary-600 hover:text-primary-500 font-medium text-sm transition-colors">
                続きを読む →
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">条件に一致する記事が見つかりませんでした。</p>
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