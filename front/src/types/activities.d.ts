// types/acitivities.ts
/// * 活動履歴の型の設定（必要であれば随時追加してください。）

/// * 活動履歴の概要の型
export type Activities = {
  id: number;

  // Main Contents
  title: string;
  summaryImagePath?: string;
  description: string;
  date: Date; // 当日限りまたは、開始日
  endDate?: Date; // 終了日

  // Metadata
  /// TODO: 静的定義からデータベース参照によるカスタムカテゴリ形式を検討
  category:
    | "event"
    | "project"
    | "achievement"
    | "meeting"
    | "other"
    | (string & {});
  tags: string[]; // React, Vueなどのタグ

  // UI Control
  isFeatured?: boolean; // おすすめ・上位固定
  status: "draft" | "published" | "archived"; // 下書き、公開、非公開
  isContented: boolean;

  // Details / Optional
  participants?: string[];
  location?: string; // swk以外が活動場所の場合
  projectName?: string; // プロジェクトの場合
  relatedActivities?: string[]; // 他の活動履歴が含まれている場合
};

/// * 活動履歴の詳細の型
export type Activity = {
  id: number;

  // Main Contents
  title: string;
  content: string; // Markdownを読み込んで、表示させる方式
  date: Date; // 当日限りまたは、開始日
  endDate?: Date; // 終了日
  imagesPath?: string[];

  // Metadata
  /// TODO: 静的定義からデータベース参照によるカスタムカテゴリ形式を検討
  category:
    | "event"
    | "project"
    | "achievement"
    | "meeting"
    | "other"
    | (string & {});
  tags: string[]; // React, Vueなどのタグ

  // Details / Optional
  participants?: string[];
  location?: string; // swk以外が活動場所の場合
  projectName?: string; // プロジェクトの場合
  relatedActivities?: string[]; // 他の活動履歴が含まれている場合
};

export type Categories = {
  [key: string]: {
    name: string;
    color: string;
    icon: string;
  };
};

export type Tags = string[];
export type Status = "draft" | "published" | "archived";
