import { useState, useEffect } from "react";
import type { Activities, Activity } from "@appTypes/activities.d.ts";
import { getActivities, getActivity } from "@/api/activities";

export const useActivities = () => {
  const [activities, setActivities] = useState<Activities[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 初回データ取得
  useEffect(() => {
    const fetchGetActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchGetActivities();
  }, []);

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
    activities,
    selectedActivity,
    isModalOpen,
    openModal,
    closeModal,
    toJapaneseDate: (date: Date) =>
      date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  };
};
