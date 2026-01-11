// src/services/activityService.ts
import type { Activities } from "@appTypes/activities.d.ts";

export const sortActivitiesByOrder = (activities: Activities[], order: "asc" | "desc" = "asc"): Activities[] => {
  if (order === "asc") {
    return [...activities].sort((a, b) => Number(a.date) - Number(b.date));
  } else {
    return [...activities].sort((a, b) => Number(b.date) - Number(a.date));
  }
};

export const filterActivitiesByCategory = (
  activities: Activities[],
  category: Activities["category"] | null
): Activities[] => {
  if (!category) return activities;
  return [...activities].filter((activity) => activity.category === category);
};

export const filterActivitiesByYear = (items: Activities[], year: number | null): Activities[] => {
  if (!year) return items;
  return [...items].filter((activity) => new Date(activity.date).getFullYear() === year);
};

export const filterActivitiesByMonth = (items: Activities[], month: number | null): Activities[] => {
  if (!month) return items;
  return [...items].filter((activity) => new Date(activity.date).getMonth() + 1 === month);
};

export const filterActivitiesByTags = (items: Activities[], tags: string[]): Activities[] => {
  if (tags.length === 0) return items;
  return [...items].filter((activity) => tags.every((tag) => activity.tags.includes(tag)));
};

/**
 * * 活動履歴から年を抽出して、降順ソートします。
 */
export const availableYears = (activities: Activities[]): number[] => {
  const years = activities.map((activity) => new Date(activity.date).getFullYear());
  return Array.from(new Set(years)).sort((a, b) => b - a);
};

/**
 * * 活動履歴から月を抽出して、降順ソートします。
 */
export const availableMonths = (activities: Activities[]): number[] => {
  const months = activities.map((activity) => new Date(activity.date).getMonth() + 1);
  return Array.from(new Set(months)).sort((a, b) => b - a);
};

/**
 * * 活動履歴からタグを抽出して、降順ソートします。
 */
export const availableTags = (activities: Activities[]): string[] => {
  const tags = activities.flatMap((activity) => activity.tags);
  return Array.from(new Set(tags));
};
