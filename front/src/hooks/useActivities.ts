import { useState, useEffect, useRef, useMemo } from "react";
import type { Activities, Activity } from "@appTypes/activities.d.ts";
import { getActivities, getActivity } from "@/api/activities";
import * as activitiesService from "@/services/activities";

export const useActivities = () => {
  const [activities, setActivities] = useState<Activities[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 重複を除去した年のリストを管理
  const availableYears = useMemo(() => {
    const years = activities.map((a) => new Date(a.date).getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [activities]);

  // 初回データ取得
  useEffect(() => {
    const fetchGetActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchGetActivities();
  }, []);

  // フィルタリングロジック
  const filteredActivities = useMemo(() => {
    let result = activitiesService.sortActivitiesByOrder(
      activities,
      selectedOrder
    );
    result = activitiesService.filterActivitiesByCategory(
      result,
      selectedCategory
    );
    result = activitiesService.filterActivitiesByMonth(result, selectedMonth);
    result = activitiesService.filterActivitiesByYear(result, selectedYear);
    result = activitiesService.filterActivitiesByTags(result, selectedTags!);
    return result;
  }, [
    activities,
    selectedOrder,
    selectedCategory,
    selectedMonth,
    selectedYear,
    selectedTags,
  ]);

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value as "asc" | "desc");
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

  return {
    // States
    activities,
    filteredActivities,
    availableYears,
    selectedCategory,
    selectedYear,
    selectedActivity,
    isModalOpen,
    // Setters
    setSelectedCategory,
    setSelectedYear,
    // Handlers
    handleOrderChange,
    openModal,
    closeModal,
    // Utils
    toJapaneseDate: (date: Date) =>
      date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  };
};
