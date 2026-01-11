// src/data/activities.ts

import type {
  Activities,
  Activity,
  Categories,
} from "@appTypes/activities.d.ts";

export const activity: Activity[] = [
  {
    id: 0,
    title: "ソフトウェア工房公式サイトリニューアル",
    content:
      "React + TypeScript + Tailwind CSSを使用した新しいサイトが完成しました。モダンなデザインと優れたユーザーエクスペリエンスを実現。",
    date: new Date("2024-12-15"),
    category: "project",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
];

export const activities: Activities[] = [
  {
    id: 0,
    title: "ソフトウェア工房公式サイトリニューアル",
    description:
      "React + TypeScript + Tailwind CSSを使用した新しいサイトが完成しました。モダンなデザインと優れたユーザーエクスペリエンスを実現。",
    date: new Date("2024-12-15"),
    category: "project",
    projectName: "WEBサイト",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    status: "published",
    isContented: true,
  },
];

export const categories: Categories = {
  event: {
    name: "イベント",
    color: "bg-purple-100 text-purple-800",
    icon: "🎉", /// TODO: Change the Material Icon Name.
  },
  project: {
    name: "プロジェクト",
    color: "bg-blue-100 text-blue-800",
    icon: "💻", /// TODO: Change the Material Icon Name.
  },
  achievement: {
    name: "成果",
    color: "bg-green-100 text-green-800",
    icon: "🏆", /// TODO: Change the Material Icon Name.
  },
  meeting: {
    name: "ミーティング",
    color: "bg-yellow-100 text-yellow-800",
    icon: "💬", /// TODO: Change the Material Icon Name.
  },
  study: {
    name: "勉強会",
    color: "bg-pink-100 text-pink-800",
    icon: "📚",
  },
};
