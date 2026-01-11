import { useFiltering } from "@hooks/Activities/useFiltering";
import type { Activities } from "@appTypes/activities.d.ts";
import { categories } from "@data/activities";
import { useActivities } from "@/hooks/Activities/useActivities";
import { Link } from "react-router-dom";

interface FilteredListProps {
  activities: Activities[];
}

export default function FilteredList({ activities }: FilteredListProps) {
  const { filteredActivities } = useFiltering({ activities });
  const { toJapaneseDate } = useActivities();
  <div className="relative">
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

    <div className="space-y-8">
      {filteredActivities.map((activity) => {
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
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                      {category.icon} {category.name}
                    </span>
                    <time className="text-sm text-gray-500">{toJapaneseDate(activity.date)}</time>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
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
                    <span className="font-medium text-gray-700">参加者: </span>
                    <span className="text-gray-600">{activity.participants.join(", ")}</span>
                  </div>
                )}

                {/* 場所 */}
                {activity.location && (
                  <div>
                    <span className="font-medium text-gray-700">場所: </span>
                    <span className="text-gray-600">{activity.location}</span>
                  </div>
                )}

                {/* 関連活動 */}
                {activity.relatedActivities && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">関連活動: </span>
                    <span className="text-primary-600 font-medium">{activity.relatedActivities.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* タグ */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {activity.tags && (
                  <div>
                    <span className="font-medium text-gray-700">タグ: </span>
                    <span className="text-gray-600">{activity.tags.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* 詳細を見るボタン */}
              {activity.isContented && (
                <Link
                  to={`/${activity.uuid}`}
                  className="text-primary-600 hover:text-primary-500 font-medium text-sm transition-colors"
                >
                  詳細を見る →
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>;
}
