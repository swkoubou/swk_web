import { portfolios, type PortfolioItem } from "../data/portfolios";

// 環境変数でAPIの使用可否を切り替え
const USE_API = import.meta.env.VITE_USE_API === "true";
const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * 作品集一覧を取得
 * 環境変数でAPIと静的データを切り替え
 */
export const getPortfolios = async (): Promise<PortfolioItem[]> => {
  if (!USE_API) {
    // 静的データから取得（バックエンド不要）
    return portfolios.sort((a, b) => b.date.localeCompare(a.date));
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/portfolios`);
    if (!response.ok) {
      throw new Error("Failed to fetch portfolios");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolios from API:", error);
    // フォールバック: エラー時は静的データを返す
    return portfolios;
  }
};

/**
 * 作品の詳細を取得
 */
export const getPortfolioById = async (
  id: number
): Promise<PortfolioItem | null> => {
  if (!USE_API) {
    // 静的データから検索
    return portfolios.find((portfolio) => portfolio.id === id) || null;
  }

  // バックエンドAPIから取得
  try {
    const response = await fetch(`${API_URL}/api/portfolios/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio from API:", error);
    return portfolios.find((portfolio) => portfolio.id === id) || null;
  }
};

/**
 * カテゴリでフィルタリング
 */
export const getPortfoliosByCategory = async (
  category: string
): Promise<PortfolioItem[]> => {
  const allPortfolios = await getPortfolios();
  return allPortfolios.filter((portfolio) => portfolio.category === category);
};

/**
 * 技術タグでフィルタリング
 */
export const getPortfoliosByTechnology = async (
  technology: string
): Promise<PortfolioItem[]> => {
  const allPortfolios = await getPortfolios();
  return allPortfolios.filter((portfolio) =>
    portfolio.technologies.includes(technology)
  );
};

/**
 * すべてのカテゴリを取得
 */
export const getAllCategories = async (): Promise<string[]> => {
  const allPortfolios = await getPortfolios();
  return [...new Set(allPortfolios.map((p) => p.category))];
};

/**
 * すべての技術タグを取得
 */
export const getAllTechnologies = async (): Promise<string[]> => {
  const allPortfolios = await getPortfolios();
  return [...new Set(allPortfolios.flatMap((p) => p.technologies))];
};
