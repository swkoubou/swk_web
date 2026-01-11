export interface PortfolioItem {
  id: number;
  title: string;
  description: string;  // カード表示用の短い説明
  thumbnail: string;    // サムネイル画像（必須）
  date: string;
  category: string;     // 例: "Webアプリ", "ゲーム", "ツール", "ライブラリ"
  technologies: string[]; // 使用技術タグ

  // 詳細情報
  content: string;      // 詳細な説明文
  images?: string[];    // プロジェクト画像（スクリーンショット等）
  link?: string;        // デモサイト・リポジトリリンク
  members?: string[];   // 開発メンバー
}

export const portfolios: PortfolioItem[] = [
  // 作品を追加する場合は以下のコメントを外して編集してください
  // {
  //   id: 1,
  //   title: "ソフトウェア工房 公式Webサイト",
  //   description: "React + TypeScript + Tailwind CSSで構築した公式サイト",
  //   thumbnail: "/images/portfolios/website-thumb.jpg", // 実際の画像パスを指定
  //   date: "2024-12",
  //   category: "Webアプリ",
  //   technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  //   content: `ソフトウェア工房の公式Webサイトです。
  //
  //   モダンな技術スタックを採用し、高速で保守性の高いWebサイトを実現しました。
  //
  //   主な機能:
  //   - お知らせ管理システム
  //   - ブログ機能
  //   - 活動履歴タイムライン
  //   - 作品集ポートフォリオ
  //   - レスポンシブデザイン
  //
  //   技術的な特徴:
  //   - React 19による高速なUI構築
  //   - TypeScriptによる型安全な開発
  //   - Tailwind CSS v4による効率的なスタイリング
  //   - Viteによる高速なビルド`,
  //   images: [
  //     "/images/portfolios/website-1.jpg",
  //     "/images/portfolios/website-2.jpg",
  //   ],
  //   link: "https://github.com/software-kobo",
  //   members: ["Web班"],
  // },
  // 新しい作品はここに追加してください
  // 例:
  // {
  //   id: 2,
  //   title: "プロジェクト名",
  //   description: "プロジェクトの簡単な説明（1-2文程度）",
  //   thumbnail: "/images/portfolios/project-2-thumb.jpg",
  //   date: "2025-01",
  //   category: "Webアプリ", // または "ゲーム", "ツール", "ライブラリ" など
  //   technologies: ["React", "Node.js", "PostgreSQL"],
  //   content: `プロジェクトの詳細な説明をここに記載します。
  //
  //   開発の経緯や工夫した点、苦労した点などを書きます。
  //   複数段落で詳しく説明できます。`,
  //   images: [
  //     "/images/portfolios/project-2-img1.jpg",
  //     "/images/portfolios/project-2-img2.jpg",
  //   ],
  //   link: "https://github.com/username/repo",
  //   members: ["メンバー1", "メンバー2", "メンバー3"],
  // },
];

// 作品を日付順（新しい順）に取得
export const getPortfolios = (): PortfolioItem[] => {
  return portfolios.sort((a, b) => {
    // YYYY-MM形式の日付を比較
    return b.date.localeCompare(a.date);
  });
};

// カテゴリでフィルタリング
export const getPortfoliosByCategory = (category: string): PortfolioItem[] => {
  return getPortfolios().filter((portfolio) => portfolio.category === category);
};

// 技術タグでフィルタリング
export const getPortfoliosByTechnology = (
  technology: string
): PortfolioItem[] => {
  return getPortfolios().filter((portfolio) =>
    portfolio.technologies.includes(technology)
  );
};

// すべてのカテゴリを取得
export const getAllCategories = (): string[] => {
  return [...new Set(portfolios.map((p) => p.category))];
};

// すべての技術タグを取得
export const getAllTechnologies = (): string[] => {
  return [...new Set(portfolios.flatMap((p) => p.technologies))];
};
