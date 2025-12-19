export interface ActivityItem {
  id: number;
  date: string;
  title: string;
  description: string;
  category: "event" | "project" | "achievement" | "meeting" | "study";
  participants?: string[];
  location?: string;
  relatedProject?: string;

  // 画像・詳細対応
  thumbnail?: string;  // サムネイル画像パス（例: "/images/activities/activity-1-thumb.jpg"）
  content?: string;    // 詳細な本文（複数段落対応）
  images?: string[];   // 本文内で表示する画像のパス配列
}

export const activities: ActivityItem[] = [
  {
    id: 1,
    date: "2025-12-15",
    title: "ソフトウェア工房公式サイトリニューアル",
    description:
      "React + TypeScript + Tailwind CSSを使用した新しいサイトが完成しました。モダンなデザインと優れたユーザーエクスペリエンスを実現。",
    category: "project",
    participants: ["ソフトウェア工房Web班"],
    relatedProject: "WEBサイト",
    // 画像を追加する場合は以下のコメントを外して、実際の画像パスを指定してください
    // thumbnail: "/images/activities/renewal-thumb.jpg",
    content: `ソフトウェア工房の公式Webサイトが全面リニューアルしました。

今回のリニューアルでは、React 19、TypeScript、Tailwind CSS v4といった最新の技術スタックを採用し、モダンで保守性の高いWebサイトを実現しました。

リニューアルの主なポイントは以下の通りです。

まず、デザイン面では、シンプルで直感的なユーザーインターフェースを心がけました。白を基調としたクリーンなデザインに、アクセントカラーとして緑を採用し、適度な緩急をつけています。

技術面では、TypeScriptによる型安全性の確保、Tailwind CSSによる効率的なスタイリング、React Router v7による高速なページ遷移を実現しています。

また、レスポンシブデザインにも対応しており、スマートフォンからデスクトップまで、あらゆるデバイスで快適にご覧いただけます。`,
  

  // images: [
    //   "/images/activities/renewal-1.jpg",
    //   "/images/activities/renewal-2.jpg",
    // ],
  },

   {
     id: 2,
     date: "2025-07-01",
     title: "Docker勉強会",
     description: "Dockerについて",
     category: "study", // event, project, achievement, meeting, study から選択
     participants: ["工房メンバー"],
     location: "工房室内", // オプション
     thumbnail: "/images/activities/Docker勉強会の見出し画像.jpg", // オプション
     content: `詳細な本文をここに記載します。`,
  //
  //   複数段落も対応しています。
  //   改行も自由に入れられます。`, // オプション
  //   images: [
  //     "/images/activities/activity-2-img1.jpg",
  //     "/images/activities/activity-2-img2.jpg",
  //   ], // オプション
   },



  // 新しい活動はここに追加してください
  // 例:
  // {
  //   id: 2,
  //   date: "2025-01-20",
  //   title: "活動タイトル",
  //   description: "カード表示用の短い説明文（1-2文程度）",
  //   category: "event", // event, project, achievement, meeting, study から選択
  //   participants: ["参加者1", "参加者2"],
  //   location: "開催場所", // オプション
  //   relatedProject: "関連プロジェクト名", // オプション
  //   thumbnail: "/images/activities/activity-2-thumb.jpg", // オプション
  //   content: `詳細な本文をここに記載します。
  //
  //   複数段落も対応しています。
  //   改行も自由に入れられます。`, // オプション
  //   images: [
  //     "/images/activities/activity-2-img1.jpg",
  //     "/images/activities/activity-2-img2.jpg",
  //   ], // オプション
  // },
];

export const categoryConfig = {
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

// 活動履歴を日付順（新しい順）に取得
export const getActivities = (): ActivityItem[] => {
  return activities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// カテゴリでフィルタリング
export const getActivitiesByCategory = (
  category: ActivityItem["category"]
): ActivityItem[] => {
  return getActivities().filter((activity) => activity.category === category);
};

// 年でフィルタリング
export const getActivitiesByYear = (year: number): ActivityItem[] => {
  return getActivities().filter(
    (activity) => new Date(activity.date).getFullYear() === year
  );
};
