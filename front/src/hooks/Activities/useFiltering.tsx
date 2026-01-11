// src/hooks/Activities/useFiltering.ts

import { useMemo, useState } from "react";
import type { Activities, selectedStatusInterface } from "@appTypes/activities.d.ts";
import * as activitiesService from "@services/activities";

interface UseFilteringProps {
  activities: Activities[];
}

/**
 * * **活動履歴をフィルタリングする**カスタムフックです。
 * * `tag`, `category`, `year`, `month`, `order`が選択されることで活動履歴をフィルタリングします。
 */
export const useFiltering = ({ activities = [] }: UseFilteringProps) => {
  const [selectedStatus, setSelectedStatus] = useState<selectedStatusInterface>({
    order: "asc",
    category: null,
    year: null,
    month: null,
    tags: [],
  });

  const setSelectedOrder = (o: selectedStatusInterface["order"]) => {
    if (o === selectedStatus.order) return;
    setSelectedStatus({ ...selectedStatus, order: o });
  };

  // TODO 複数指定可能を検討
  const setSelectedCategory = (c: selectedStatusInterface["category"]) => {
    if (c === selectedStatus.category || c === null) return;
    setSelectedStatus({ ...selectedStatus, category: c });
  };

  const setSelectedYear = (y: selectedStatusInterface["year"]) => {
    if (y === selectedStatus.year || y === null) return;
    setSelectedStatus({ ...selectedStatus, year: y });
  };
  const setSelectedMonth = (m: selectedStatusInterface["month"]) => {
    if (m === selectedStatus.month || m === null) return;
    setSelectedStatus({ ...selectedStatus, month: m });
  };
  const setSelectedTags = (t: selectedStatusInterface["tags"]) => {
    if (t === selectedStatus.tags || t.length === 0) return;
    setSelectedStatus({ ...selectedStatus, tags: t });
  };

  /**
   * * **指定された条件に基づいて**活動履歴をフィルタリングします。
   */
  const filteredActivities: Activities[] = useMemo<Activities[]>(() => {
    let filtered = [...activities];

    filtered = activitiesService.sortActivitiesByOrder(filtered, selectedStatus.order);
    filtered = activitiesService.filterActivitiesByCategory(filtered, selectedStatus.category);
    filtered = activitiesService.filterActivitiesByYear(filtered, selectedStatus.year);
    filtered = activitiesService.filterActivitiesByMonth(filtered, selectedStatus.month);
    filtered = activitiesService.filterActivitiesByTags(filtered, selectedStatus.tags);

    return filtered;
  }, [selectedStatus, activities]);

  return {
    filteredActivities,
    selectedStatus,
    setSelectedOrder,
    setSelectedCategory,
    setSelectedYear,
    setSelectedMonth,
    setSelectedTags,
  };
};
