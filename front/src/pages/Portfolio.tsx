import { useState, useEffect } from "react";
import { getPortfolios } from "../services/portfolioService";
import type { PortfolioItem } from "../data/portfolios";
import Modal from "../components/Modal";

function Portfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // データ取得
  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getPortfolios();
      setPortfolios(data);
    };
    fetchPortfolios();
  }, []);

  // カテゴリ一覧を取得
  const categories = [...new Set(portfolios.map((p) => p.category))];

  // フィルタリング
  const filteredPortfolios = selectedCategory
    ? portfolios.filter((p) => p.category === selectedCategory)
    : portfolios;

  const openModal = (portfolio: PortfolioItem) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">作品集</h1>
        <p className="text-xl text-gray-600">
          ソフトウェア工房で開発したプロジェクトをご紹介します
        </p>
      </div>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              selectedCategory === null
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* 作品グリッド */}
      {filteredPortfolios.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolios.map((portfolio) => (
            <article
              key={portfolio.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openModal(portfolio)}
            >
              {/* サムネイル画像 */}
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={portfolio.thumbnail}
                  alt={portfolio.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* カード内容 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-xs bg-primary-100 text-primary-800 rounded-full font-medium">
                    {portfolio.category}
                  </span>
                  <time className="text-sm text-gray-500">{portfolio.date}</time>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {portfolio.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {portfolio.description}
                </p>

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {portfolio.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {portfolio.technologies.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{portfolio.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="text-primary-600 hover:text-primary-500 font-medium text-sm transition-colors">
                  詳細を見る →
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-12 text-center border border-indigo-100">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              現在編集中
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              チーム又は個々人で作成した作品を掲載予定
            </p>
            <div className="inline-flex items-center text-indigo-600">
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              準備中
            </div>
          </div>
        </div>
      )}

      {/* 詳細モーダル */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPortfolio && (
          <div>
            {/* ヘッダー */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="inline-block px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full font-medium">
                  {selectedPortfolio.category}
                </span>
                <time className="text-sm text-gray-500">
                  {selectedPortfolio.date}
                </time>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {selectedPortfolio.title}
              </h2>

              {/* リンク */}
              {selectedPortfolio.link && (
                <a
                  href={selectedPortfolio.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  プロジェクトを見る
                </a>
              )}
            </div>

            {/* メタ情報 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              {/* 技術スタック */}
              <div>
                <span className="font-medium text-gray-700 block mb-2">
                  使用技術:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPortfolio.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-3 py-1 text-sm bg-white text-gray-700 rounded border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 開発メンバー */}
              {selectedPortfolio.members && (
                <div>
                  <span className="font-medium text-gray-700">
                    開発メンバー:{" "}
                  </span>
                  <span className="text-gray-600">
                    {selectedPortfolio.members.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* 本文 */}
            <div className="prose max-w-none mb-6">
              {selectedPortfolio.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 画像ギャラリー */}
            {selectedPortfolio.images && selectedPortfolio.images.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  スクリーンショット
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedPortfolio.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedPortfolio.title} - 画像 ${index + 1}`}
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

export default Portfolio;
