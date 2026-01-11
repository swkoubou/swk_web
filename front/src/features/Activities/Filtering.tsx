import { useFiltering } from "@/hooks/Activities/useFiltering";
import { categories } from "@data/activities";
import type { Activities, selectedStatusInterface } from "@appTypes/activities.d.ts";
import * as activitiesService from "@services/activities";

interface FilteringProps {
  activities: Activities[];
}

export default function Filtering({ activities }: FilteringProps) {
  // とりまカスタムふっくすにロジック詰め込む
  const {
    filteredActivities,
    selectedStatus,
    setSelectedCategory,
    setSelectedMonth,
    setSelectedYear,
    setSelectedTags,
    setSelectedOrder,
  } = useFiltering({
    activities,
  });

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            selectedStatus.category === null
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
          }`}
        >
          すべて
        </button>
        {Object.entries(categories).map(([category, parameter]) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedStatus.category === category
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
          >
            {parameter.icon} {parameter.name}
          </button>
        ))}
      </div>

      {/* 年で絞り込み */}
      <select
        value={selectedStatus.year || ""}
        onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="">年で絞り込み</option>
        {activitiesService.availableYears(filteredActivities).map((year) => (
          <option key={year} value={year}>
            {year}年
          </option>
        ))}
      </select>

      {/* 月で絞り込み */}
      <select
        value={selectedStatus.month || ""}
        onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="">月で絞り込み</option>
        {activitiesService.availableMonths(filteredActivities).map((month) => (
          <option key={month} value={month}>
            {month}月
          </option>
        ))}
      </select>

      {/* タグで絞り込み */}
      <select
        value={selectedStatus.tags.join(",") || ""}
        onChange={(e) => setSelectedTags(e.target.value.split(","))}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="">タグで絞り込み</option>
        {activitiesService.availableTags(filteredActivities).map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {/* 並び替え */}
      <select
        value={selectedStatus.order || ""}
        onChange={(e) => setSelectedOrder(e.target.value as selectedStatusInterface["order"])}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        <option value="">並び替え</option>
        <option value="asc">新しい記事</option>
        <option value="desc">古い記事</option>
      </select>
    </div>
  );
}
