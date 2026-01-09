// src/services/activityService.ts

// types
import type { Activities } from "@appTypes/activities.d.ts";

/**
 * * 活動履歴を並び替えます。（デフォルトは昇順です。）
 * @param {Activities[]} items - 並び替える活動履歴の概要
 * @param {"asc" | "desc"} order - 並び替えの順序（デフォルトは昇順）
 * @returns {Activities[]} 並び替えられた活動履歴
 */
export const sortActivitiesByOrder = (
  items: Activities[],
  order: "asc" | "desc" = "asc"
): Activities[] => {
  if (order === "asc") {
    return [...items].sort((a, b) => Number(a.date) - Number(b.date));
  } else {
    return [...items].sort((a, b) => Number(b.date) - Number(a.date));
  }
};

/**
 * * 活動履歴を指定されたカテゴリでフィルタリングします。
 * @param {Activities[]} items - 活動履歴の概要
 * @param {Activities["category"]} category - フィルタリングするカテゴリ
 * @return {Activities[]} フィルタリングされた活動履歴
 */
export const filterActivitiesByCategory = (
  items: Activities[],
  category: Activities["category"] | null
): Activities[] => {
  if (!category) return items;
  return [...items].filter((activity) => activity.category === category);
};

/**
 * * 活動履歴を指定された年でフィルタリングします。
 * @param {Activities[]} items - 活動履歴の概要
 * @param {number | null} year - フィルタリングする年
 * @returns {Activities[]} フィルタリングされた活動履歴
 */
export const filterActivitiesByYear = (
  items: Activities[],
  year: number | null
): Activities[] => {
  if (!year) return items;
  return [...items].filter(
    (activity) => new Date(activity.date).getFullYear() === year
  );
};

/**
 * * 活動履歴を指定された月でフィルタリングします。
 * @param {Activities[]} items - 活動履歴の概要
 * @param {number | null} month - フィルタリングする月
 * @returns {Activities[]} フィルタリングされた活動履歴
 */
export const filterActivitiesByMonth = (
  items: Activities[],
  month: number | null
): Activities[] => {
  if (!month) return items;
  return [...items].filter(
    (activity) => new Date(activity.date).getMonth() + 1 === month
  );
};

/**
 * * 活動履歴を指定されたタグでフィルタリングします。
 * @param {Activities[]} items - 活動履歴の概要
 * @param {string[]} tags - フィルタリングする
 * @returns {Activities[]} フィルタリングされた活動履歴
 */
export const filterActivitiesByTags = (
  items: Activities[],
  tags: string[]
): Activities[] => {
  if (tags.length === 0) return items;
  return [...items].filter((activity) =>
    tags.every((tag) => activity.tags.includes(tag))
  );
};
