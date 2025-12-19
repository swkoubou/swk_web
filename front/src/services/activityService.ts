import { activities, type ActivityItem } from "../data/activities";

// 環境変数でAPIの使用可否を切り替え
const USE_API = import.meta.env.VITE_USE_API === "true";
const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * 活動履歴一覧を取得
 * 環境変数でAPIと静的データを切り替え
 */
export const getActivities = async (): Promise<ActivityItem[]> => {
  if (!USE_API) {
    // 静的データから取得（バックエンド不要）
    return activities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/activities`);
    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activities from API:", error);
    // フォールバック: エラー時は静的データを返す
    return activities;
  }
};

/**
 * 活動履歴の詳細を取得
 */
export const getActivityById = async (
  id: number
): Promise<ActivityItem | null> => {
  if (!USE_API) {
    // 静的データから検索
    return activities.find((activity) => activity.id === id) || null;
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/activities/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch activity");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activity from API:", error);
    return activities.find((activity) => activity.id === id) || null;
  }
};

/**
 * カテゴリでフィルタリング
 */
export const getActivitiesByCategory = async (
  category: ActivityItem["category"]
): Promise<ActivityItem[]> => {
  const allActivities = await getActivities();
  return allActivities.filter((activity) => activity.category === category);
};

/**
 * 年でフィルタリング
 */
export const getActivitiesByYear = async (
  year: number
): Promise<ActivityItem[]> => {
  const allActivities = await getActivities();
  return allActivities.filter(
    (activity) => new Date(activity.date).getFullYear() === year
  );
};
