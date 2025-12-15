import { useState } from "react";

interface ActivityItem {
  id: number;
  date: string;
  title: string;
  description: string;
  category: "event" | "project" | "achievement" | "meeting" | "study";
  participants?: string[];
  location?: string;
  relatedProject?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    date: "2024-12-15",
    title: "ソフトウェア工房公式サイトリニューアル完了",
    description:
      "React + TypeScript + Tailwind CSSを使用した新しいサイトが完成しました。モダンなデザインと優れたユーザーエクスペリエンスを実現。",
    category: "project",
    participants: ["こんどうそうた", "サンプル 太郎"],
    relatedProject: "WEBサイト",
  },
  {
    id: 2,
    date: "2024-12-10",
    title: "第3回技術勉強会開催",
    description:
      "「TypeScriptで始める型安全なReact開発」をテーマに勉強会を実施。実践的なハンズオンセッションも含めて開催。",
    category: "study",
    participants: ["全メンバー"],
    location: "研究室A",
  },
  {
    id: 3,
    date: "2024-12-05",
    title: "アブラゼミプロジェクト発表",
    description:
      "音響解析を用いたセミの鳴き声分類システムの開発成果を学内発表会で披露。高い評価を獲得。",
    category: "achievement",
    participants: ["こんどうそうた", "サンプル 花子"],
    location: "大学講堂",
    relatedProject: "アブラゼミ",
  },
  {
    id: 4,
    date: "2024-11-28",
    title: "月例ミーティング",
    description:
      "各プロジェクトの進捗報告と来月の計画について話し合いました。新メンバーの役割分担も決定。",
    category: "meeting",
    participants: ["全メンバー"],
    location: "研究室B",
  },
  {
    id: 5,
    date: "2024-11-20",
    title: "ハッカソンイベント参加",
    description:
      "地域のハッカソンイベント「Tech Challenge 2024」に参加。「じゃんけん」プロジェクトのプロトタイプを24時間で開発。",
    category: "event",
    participants: ["サンプル 次郎", "サンプル 太郎"],
    location: "市民センター",
  },
  {
    id: 6,
    date: "2024-11-15",
    title: "Git/GitHub勉強会",
    description:
      "チーム開発に必要なGitの基本的な使い方から、効果的なブランチ戦略まで学習しました。",
    category: "study",
    participants: ["全メンバー"],
    location: "研究室A",
  },
  {
    id: 7,
    date: "2024-11-01",
    title: "新メンバー歓迎会",
    description:
      "1年生の新メンバーを迎えて歓迎会を開催。自己紹介と今後の活動について説明しました。",
    category: "event",
    participants: ["全メンバー"],
    location: "カフェテリア",
  },
  {
    id: 8,
    date: "2024-10-20",
    title: "秘密道具プロジェクト完成",
    description:
      "日常生活を便利にするユーティリティツール集が完成。複数の便利機能を一つのアプリケーションに統合。",
    category: "project",
    participants: ["サンプル 花子", "こんどうそうた"],
    relatedProject: "秘密道具",
  },
];

const categoryConfig = {
  event: {
    name: "イベント",
    color: "bg-purple-100 text-purple-800",
    icon: "🎉",
  },
  project: {
    name: "プロジェクト",
    color: "bg-blue-100 text-blue-800",
    icon: "💻",
  },
  achievement: {
    name: "成果",
    color: "bg-green-100 text-green-800",
    icon: "🏆",
  },
  meeting: {
    name: "ミーティング",
    color: "bg-yellow-100 text-yellow-800",
    icon: "💬",
  },
  study: { name: "勉強会", color: "bg-pink-100 text-pink-800", icon: "📚" },
};

function Activity() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [
    ...new Set(activities.map((a) => new Date(a.date).getFullYear())),
  ].sort((a, b) => b - a);

  const filteredActivities = activities
    .filter((activity) => {
      const matchesCategory =
        !selectedCategory || activity.category === selectedCategory;
      const matchesYear =
        !selectedYear || new Date(activity.date).getFullYear() === selectedYear;
      return matchesCategory && matchesYear;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">活動履歴</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房の活動記録とマイルストーン
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedCategory === null
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
          >
            すべて
          </button>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedCategory === key
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {config.icon} {config.name}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <select
          value={selectedYear || ""}
          onChange={(e) =>
            setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
          }
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">年で絞り込み</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-8">
          {filteredActivities.map((activity, index) => {
            const config = categoryConfig[activity.category];

            return (
              <div key={activity.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-600 border-4 border-white rounded-full shadow"></div>

                {/* Content */}
                <div className="ml-16 bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
                        >
                          {config.icon} {config.name}
                        </span>
                        <time className="text-sm text-gray-500">
                          {formatDate(activity.date)}
                        </time>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {activity.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{activity.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {activity.participants && (
                      <div>
                        <span className="font-medium text-gray-700">
                          参加者:{" "}
                        </span>
                        <span className="text-gray-600">
                          {activity.participants.join(", ")}
                        </span>
                      </div>
                    )}

                    {activity.location && (
                      <div>
                        <span className="font-medium text-gray-700">
                          場所:{" "}
                        </span>
                        <span className="text-gray-600">
                          {activity.location}
                        </span>
                      </div>
                    )}

                    {activity.relatedProject && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">
                          関連プロジェクト:{" "}
                        </span>
                        <span className="text-primary-600 font-medium">
                          {activity.relatedProject}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            条件に一致する活動が見つかりませんでした。
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const count = activities.filter((a) => a.category === key).length;
          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center"
            >
              <div className="text-2xl mb-1">{config.icon}</div>
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600">{config.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Activity;
