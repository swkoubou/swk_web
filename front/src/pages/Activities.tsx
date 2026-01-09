import { useState, useEffect, useRef } from "react";

import type { Activities, Activity } from "@appTypes/activities.d.ts";
import Modal from "../components/Modal";
import { getActivities, getActivity } from "@/api/activities";
import * as activitiesService from "@/services/activities";
import { categories } from "@/data/activities";

/**
 * * 活動履歴を表示するコンポーネント
 * @returns {React.ReactElement}
 */
function Activities(): React.ReactElement {
  const [activities, setActivities] = useState<Activities[]>([]);
  // Metadata
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activitiesYearRef = useRef<number[]>([]);

  /**
   * * フィルタリング条件に基づいて活動履歴をフィルタリングします。
   * * 選順は、順序 -> カテゴリ -> 月 -> 年 -> タグです。
   * @param {Activities[]} activities - フィルタリングする活動履歴
   * @returns {Activities[]} フィルタリングされた活動履歴
   */
  const filterActivities = (activities: Activities[] = []): Activities[] => {
    return activitiesService.filterActivitiesByTags(
      activitiesService.filterActivitiesByYear(
        activitiesService.filterActivitiesByMonth(
          activitiesService.filterActivitiesByCategory(
            activitiesService.sortActivitiesByOrder(activities, selectedOrder),
            selectedCategory
          ),
          selectedMonth
        ),
        selectedYear
      ),
      selectedTags!
    );
  };

  const activitiesYear = () => {
    activitiesYearRef.current = [];
    activities.map((activity) => {
      return activitiesYearRef.current.push(
        new Date(activity.date).getFullYear()
      );
    });
  };

  /**
   * * 選順を変更したときのハンドラ
   * @param {React.ChangeEvent<HTMLSelectElement>} e - 変換イベント
   */
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value as "asc" | "desc");
  };

  /**
   * * Date型を日本語の文字列に変換えます。
   * @param {Date} date - 変換する日付
   * @returns {string} 変換後の日本語の文字列
   */
  const toJapaneseDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = async (id: number) => {
    const activity: Activity = await getActivity(id);
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  /// * 活動履歴の概要を取得
  useEffect(() => {
    const fetchGetActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };

    fetchGetActivities();
    activitiesYear();
  }, []);

  /// * フィルタリング条件が指定されたら活動履歴をフィルタリング
  useEffect(() => {
    setActivities((activitiesPrev) => filterActivities(activitiesPrev));
  }, [selectedYear, selectedCategory, selectedMonth, selectedTags]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">活動履歴</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房の活動記録とマイルストーン
        </p>
      </div>

      {/* フィルタリング */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedCategory === null
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
          >
            すべて
          </button>
          {Object.entries(categories).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedCategory === key
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {config.icon} {config.name}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <select
          value={selectedYear || ""}
          onChange={(e) =>
            setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
          }
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">年で絞り込み</option>
          {activitiesYearRef.current.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>

      {/* 概要一覧 */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-8">
          {filterActivities(activities).map((activity) => {
            const category = categories[activity.category];

            return (
              <div key={activity.id} className="relative flex items-start">
                {/* 線 */}
                <div className="absolute left-6 w-4 h-4 bg-primary-600 border-4 border-white rounded-full shadow"></div>

                {/* 内容 */}
                <div className="ml-16 bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${category.color}`}
                        >
                          {category.icon} {category.name}
                        </span>
                        <time className="text-sm text-gray-500">
                          {toJapaneseDate(activity.date)}
                        </time>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {activity.title}
                      </h3>
                    </div>

                    {/* 概要イメージ画像 */}
                    {activity.summaryImagePath && (
                      <div className="md:w-32 md:h-32 w-full h-48 shrink-0">
                        <img
                          src={activity.summaryImagePath}
                          alt={activity.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{activity.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                    {activity.participants && (
                      <div>
                        <span className="font-medium text-gray-700">
                          参加者:{" "}
                        </span>
                        <span className="text-gray-600">
                          {activity.participants.join(", ")}
                        </span>
                      </div>
                    )}

                    {/* 場所 */}
                    {activity.location && (
                      <div>
                        <span className="font-medium text-gray-700">
                          場所:{" "}
                        </span>
                        <span className="text-gray-600">
                          {activity.location}
                        </span>
                      </div>
                    )}

                    {/* 関連活動 */}
                    {activity.relatedActivities && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">
                          関連活動:{" "}
                        </span>
                        <span className="text-primary-600 font-medium">
                          {activity.relatedActivities.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* タグ */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {activity.tags && (
                      <div>
                        <span className="font-medium text-gray-700">
                          タグ:{" "}
                        </span>
                        <span className="text-gray-600">
                          {activity.tags.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 詳細を見るボタン */}
                  {activity.isContented && (
                    <button
                      onClick={() => openModal(activity.id)}
                      className="text-primary-600 hover:text-primary-500 font-medium text-sm transition-colors"
                    >
                      詳細を見る →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filterActivities(activities).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            条件に一致する活動が見つかりませんでした。
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(categories).map(([key, config]) => {
          const count = activities.filter((a) => a.category === key).length;
          return (
            <div
              key={key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center"
            >
              <div className="text-2xl mb-1">{config.icon}</div>
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600">{config.name}</div>
            </div>
          );
        })}
      </div>

      {/* 詳細モーダル */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedActivity && (
          <div>
            {/* ヘッダー */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    categories[selectedActivity.category].color
                  }`}
                >
                  {categories[selectedActivity.category].icon}{" "}
                  {categories[selectedActivity.category].name}
                </span>
                <time className="text-sm text-gray-500">
                  {toJapaneseDate(selectedActivity.date)}
                </time>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedActivity.title}
              </h2>
            </div>

            {/* メタ情報 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              {selectedActivity.participants && (
                <div>
                  <span className="font-medium text-gray-700">参加者: </span>
                  <span className="text-gray-600">
                    {selectedActivity.participants.join(", ")}
                  </span>
                </div>
              )}
              {selectedActivity.location && (
                <div>
                  <span className="font-medium text-gray-700">場所: </span>
                  <span className="text-gray-600">
                    {selectedActivity.location}
                  </span>
                </div>
              )}
              {selectedActivity.relatedActivities && (
                <div>
                  <span className="font-medium text-gray-700">
                    関連プロジェクト:{" "}
                  </span>
                  <span className="text-primary-600 font-medium">
                    {selectedActivity.relatedActivities}
                  </span>
                </div>
              )}
            </div>

            {/* 本文 */}
            {selectedActivity.content && (
              <div className="prose max-w-none mb-6">
                {selectedActivity.content
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}

            {/* 画像ギャラリー */}
            {selectedActivity.imagesPath &&
              selectedActivity.imagesPath.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">画像</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedActivity.imagesPath.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedActivity.title} - 画像 ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Activities;
