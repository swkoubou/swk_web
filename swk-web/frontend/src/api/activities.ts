// src/apis/activities.ts

import type { Activity, Activities } from "@appTypes/activities.d.ts";

import { API_URL } from "@config/config.ts";

/**
 * * APIから全ての活動履歴を取得します。
 * @returns {Activities} 全ての活動履歴
 */
export const getActivities = async (): Promise<Activities[]> => {
  try {
    const response = await fetch(`${API_URL}/api/activities`);

    if (!response.ok) {
      throw new Error("[VITE]: Failed to fetch activities");
    }

    return (await response.json()) as Activities[];
  } catch (error) {
    console.error("[VITE]: Error fetching activities from API:", error);
    throw error;
  }
};

/**
 * * APIから指定されたIDの活動履歴を取得します。
 * @param {number} id - 取得する活動履歴のID
 * @returns {Activity} 指定されたIDの活動履歴
 */
export const getActivity = async (id: number): Promise<Activity> => {
  try {
    const response = await fetch(`${API_URL}/api/activities/:${id}`);

    if (!response.ok) {
      throw new Error("[VITE]: Failed to fetch activities");
    }

    return (await response.json()) as Activity;
  } catch (error) {
    console.error("[VITE]: Error fetching activities from API:", error);
    throw error;
  }
};

/**
 * * API経由で新しい活動履歴を作成します。（識別子は自動付与）
 * @returns {Promise<Activity>} 作成された活動履歴
 */
export const createActivity = async (): Promise<Activity> => {
  try {
    const response = await fetch(`${API_URL}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("[VITE]: Failed to fetch activities");
    }

    return (await response.json()) as Activity;
  } catch (error) {
    console.error("[VITE]: Error fetching activities from API:", error);
    throw error;
  }
};

/**
 * * API経由で既存の活動履歴を更新します。（識別子は自動付与）
 * @returns {Promise<Activity>} 更新された活動履歴
 */
export const updateActivity = async (activity: Activity): Promise<Activity> => {
  try {
    const response = await fetch(`${API_URL}/api/activities`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error("[VITE]: Failed to fetch activities");
    }

    return (await response.json()) as Activity;
  } catch (error) {
    console.error("[VITE]: Error fetching activities from API:", error);
    throw error;
  }
};

/**
 * * API経由で既存の活動履歴を削除します。
 * @param {number} id - 削除する活動履歴のID
 * @returns {Promise<boolean>} 削除結果（成功:true、失敗:false）
 * @throws {Error} APIからエラーが返ってきた場合
 */
export const deleteActivity = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/activities/:${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("[VITE]: Failed to fetch activities");
    }

    return response.ok;
  } catch (error) {
    console.error("[VITE]: Error deleting activity from API:", error);
    throw error;
  }
};
