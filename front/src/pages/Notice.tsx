import { getAllNotices } from "../data/notices";

function Notice() {
  const allNotices = getAllNotices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">お知らせ</h1>
        <p className="text-xl text-gray-600">
          最新の活動情報やイベント情報をお届けします
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {allNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-emerald-200 transition-colors"
          >
            <p className="text-sm text-gray-500 mb-2">{notice.date}</p>
            <h3 className="text-xl font-bold mb-3">
              {notice.link ? (
                <a
                  href={notice.link}
                  className="text-emerald-600 hover:text-emerald-500"
                >
                  {notice.title}
                </a>
              ) : (
                <span className="text-gray-900">{notice.title}</span>
              )}
            </h3>
            <p className="text-gray-600">{notice.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">アーカイブ</h3>
        <ul className="space-y-2">
          <li>
            <a
              href="/notice"
              className="text-emerald-600 hover:text-emerald-500 font-medium"
            >
              2025年
            </a>
          </li>
          <li>
            <a
              href="/notice"
              className="text-emerald-600 hover:text-emerald-500"
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

export default Notice;
