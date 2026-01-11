import React from "react";
import { categories } from "@data/activities";
import Modal from "@components/Modal";
import { useActivities } from "@/hooks/Activities/useActivities";

export default function Activities(): React.ReactElement {
  const { activities, selectedActivity, isModalOpen, closeModal, toJapaneseDate } = useActivities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">活動履歴</h1>
        <p className="text-xl text-gray-600">ソフトウェア工房の活動記録とマイルストーン</p>
      </div>

      {Object.keys(activities).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">条件に一致する活動が見つかりませんでした。</p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(categories).map(([key, config]) => {
          const count = activities.filter((a) => a.category === key).length;
          return (
            <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
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
                  {categories[selectedActivity.category].icon} {categories[selectedActivity.category].name}
                </span>
                <time className="text-sm text-gray-500">{toJapaneseDate(selectedActivity.date)}</time>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedActivity.title}</h2>
            </div>

            {/* メタ情報 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              {selectedActivity.participants && (
                <div>
                  <span className="font-medium text-gray-700">参加者: </span>
                  <span className="text-gray-600">{selectedActivity.participants.join(", ")}</span>
                </div>
              )}
              {selectedActivity.location && (
                <div>
                  <span className="font-medium text-gray-700">場所: </span>
                  <span className="text-gray-600">{selectedActivity.location}</span>
                </div>
              )}
              {selectedActivity.relatedActivities && (
                <div>
                  <span className="font-medium text-gray-700">関連プロジェクト: </span>
                  <span className="text-primary-600 font-medium">{selectedActivity.relatedActivities}</span>
                </div>
              )}
            </div>

            {/* 本文 */}
            {selectedActivity.content && (
              <div className="prose max-w-none mb-6">
                {selectedActivity.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* 画像ギャラリー */}
            {selectedActivity.imagesPath && selectedActivity.imagesPath.length > 0 && (
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
