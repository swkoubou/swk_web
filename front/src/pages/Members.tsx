import { useState } from "react";

interface Member {
  id: number;
  name: string;
  year: number;
  role?: string;
  skills: string[];
  github?: string;
  bio?: string;
}

const membersData: Member[] = [
  // 4年生
  {
    id: 1,
    name: "こんどうそうた",
    year: 4,
    role: "総合プロジェクトリーダー",
    skills: ["TypeScript", "React", "Node.js", "Python"],
    github: "",
    bio: "ソフトウェア工房を立ち上げ、チームをリードしています。",
  },
  // 3年生のサンプルデータ
  {
    id: 2,
    name: "サンプル 太郎",
    year: 3,
    role: "フロントエンド開発者",
    skills: ["React", "Vue.js", "CSS"],
    github: "",
    bio: "UIUXデザインとフロントエンド開発に特化しています。",
  },
  // 2年生のサンプルデータ
  {
    id: 3,
    name: "サンプル 花子",
    year: 2,
    role: "バックエンド開発者",
    skills: ["Python", "Django", "PostgreSQL"],
    github: "",
    bio: "サーバーサイド開発とデータベース設計を担当しています。",
  },
  // 1年生のサンプルデータ
  {
    id: 4,
    name: "サンプル 次郎",
    year: 1,
    skills: ["JavaScript", "HTML", "CSS"],
    github: "",
    bio: "プログラミングを学び始めました。成長を目指しています！",
  },
];

function Members() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredMembers = selectedYear
    ? membersData.filter((member) => member.year === selectedYear)
    : membersData;

  const yearCounts = {
    4: membersData.filter((m) => m.year === 4).length,
    3: membersData.filter((m) => m.year === 3).length,
    2: membersData.filter((m) => m.year === 2).length,
    1: membersData.filter((m) => m.year === 1).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">メンバー紹介</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房で活動するメンバーを紹介します
        </p>
      </div>

      {/* Year Filter */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              selectedYear === null
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            全員 ({membersData.length})
          </button>
          {[4, 3, 2, 1].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                year === 1 ? "rounded-r-lg border-r" : "border-r"
              } ${
                selectedYear === year
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {year}年生 ({yearCounts[year as keyof typeof yearCounts]})
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      member.year === 4
                        ? "bg-purple-100 text-purple-800"
                        : member.year === 3
                        ? "bg-blue-100 text-blue-800"
                        : member.year === 2
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {member.year}年生
                  </span>
                  {member.role && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      {member.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {member.bio && (
              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">スキル</h4>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            )}
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            該当するメンバーが見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}

export default Members;
