import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  year: number;
  teamMembers: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "アブラゼミ",
    description: "音響解析を用いたセミの鳴き声分類システム。機械学習を活用してアブラゼミの鳴き声を自動で識別します。",
    technologies: ["Python", "TensorFlow", "Flask", "NumPy"],
    category: "機械学習",
    status: "completed",
    year: 2024,
    teamMembers: ["こんどうそうた", "サンプル 花子"],
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "WEBサイト",
    description: "ソフトウェア工房の公式Webサイト。モダンなフロントエンド技術を使用して構築されたレスポンシブサイトです。",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    category: "ウェブ開発",
    status: "in-progress",
    year: 2024,
    teamMembers: ["こんどうそうた", "サンプル 太郎"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 3,
    title: "じゃんけん",
    description: "AIとじゃんけんができるインタラクティブなゲームアプリ。プレイヤーの傾向を学習して戦略的に対戦します。",
    technologies: ["JavaScript", "React", "Python", "scikit-learn"],
    category: "ゲーム",
    status: "completed",
    year: 2024,
    teamMembers: ["サンプル 次郎", "サンプル 太郎"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "秘密道具",
    description: "日常生活を便利にする様々なユーティリティツール集。タスク管理、ファイル変換、データ解析など。",
    technologies: ["Python", "Electron", "React", "SQLite"],
    category: "ツール",
    status: "completed",
    year: 2024,
    teamMembers: ["サンプル 花子", "こんどうそうた"],
    githubUrl: "https://github.com"
  },
  {
    id: 5,
    title: "レジュメ",
    description: "学生向けの履歴書・レジュメ作成支援ツール。テンプレートを選んで簡単に美しい履歴書を作成できます。",
    technologies: ["Vue.js", "Node.js", "Express", "PDF.js"],
    category: "ウェブアプリ",
    status: "planned",
    year: 2024,
    teamMembers: ["サンプル 太郎"],
    githubUrl: "https://github.com"
  }
];

const categories = ["すべて", ...new Set(projects.map(p => p.category))];
const technologies = [...new Set(projects.flatMap(p => p.technologies))];

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "すべて" || project.category === selectedCategory;
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    
    return matchesCategory && matchesTech && matchesStatus;
  });

  const getStatusBadge = (status: Project['status']) => {
    const statusConfig = {
      completed: { text: "完成", color: "bg-green-100 text-green-800" },
      'in-progress': { text: "開発中", color: "bg-blue-100 text-blue-800" },
      planned: { text: "計画中", color: "bg-yellow-100 text-yellow-800" }
    };
    
    return statusConfig[status];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">作品集</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房で開発したプロジェクトをご紹介します
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technology and Status Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          <select
            value={selectedTech || ''}
            onChange={(e) => setSelectedTech(e.target.value || null)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">技術で絞り込み</option>
            {technologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>

          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">ステータスで絞り込み</option>
            <option value="completed">完成</option>
            <option value="in-progress">開発中</option>
            <option value="planned">計画中</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => {
          const statusBadge = getStatusBadge(project.status);
          
          return (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Project Thumbnail Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary-100 text-sm">{project.category}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                        {statusBadge.text}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}年</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">開発メンバー</p>
                  <p className="text-sm text-gray-700">{project.teamMembers.join(', ')}</p>
                </div>

                {/* Links */}
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm text-primary-600 hover:text-primary-500 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      サイト
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">条件に一致するプロジェクトが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}

export default Portfolio;