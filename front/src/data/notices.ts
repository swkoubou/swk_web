export interface Notice {
  id: string;
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const notices: Notice[] = [
  {
    id: "1",
    date: "2025.12.15",
    title: "ソフトウェア工房の公式サイトをリニューアルしました！",
    description: "ソフトウェア工房の公式サイトをリニューアルしました！",
  },
  //{
  //  id: "2",
  //  date: "2025.05.07",
  //  title: "お知らせのタイトル",
  //  description: "〇〇をやります",
  //  link: "/naiyou",
  //},
  //{
  // id: "3",
  //date: "2025.05.05",
  //  title: "お知らせのタイトル",
  //  description: "くぁｗせｄｒｆｔｇｙふじこｌｐ",
  //  link: "/naiyou",
  //},
];

// 最新のお知らせを取得する関数（最大3件）
export const getLatestNotices = (count: number = 3): Notice[] => {
  return notices
    .sort((a, b) => {
      // 日付文字列を比較用に変換 (YYYY.MM.DD -> YYYYMMDD)
      const dateA = a.date.replace(/\./g, "");
      const dateB = b.date.replace(/\./g, "");
      return dateB.localeCompare(dateA); // 降順（新しい順）
    })
    .slice(0, count);
};

// すべてのお知らせを取得する関数
export const getAllNotices = (): Notice[] => {
  return notices.sort((a, b) => {
    const dateA = a.date.replace(/\./g, "");
    const dateB = b.date.replace(/\./g, "");
    return dateB.localeCompare(dateA); // 降順（新しい順）
  });
};
