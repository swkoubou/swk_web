function Project() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          2024年度プロジェクト一覧
        </h1>
        <p className="text-xl text-gray-600">
          今年度に取り組んだプロジェクトをご紹介します
        </p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <a
            href="/p2024_1"
            className="block text-xl font-bold text-primary-600 hover:text-primary-500"
          >
            アブラゼミ
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <a
            href="/p2024_2"
            className="block text-xl font-bold text-primary-600 hover:text-primary-500"
          >
            WEBサイト
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <a
            href="/p2024_3"
            className="block text-xl font-bold text-primary-600 hover:text-primary-500"
          >
            じゃんけん
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <a
            href="/p2024_4"
            className="block text-xl font-bold text-primary-600 hover:text-primary-500"
          >
            秘密道具
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <a
            href="/p2024_5"
            className="block text-xl font-bold text-primary-600 hover:text-primary-500"
          >
            レジュメ
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          年度別アーカイブ
        </h3>
        <ul className="space-y-2">
          <li>
            <a
              href="/project"
              className="text-primary-600 hover:text-primary-500"
            >
              2024年
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-500">
              2023年
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-500">
              2022年
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Project;
