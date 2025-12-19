import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { getLatestNotices } from "../data/notices";

function Home() {
  const latestNotices = getLatestNotices(3);

  // ナビゲーションカード
  const navigationCards = [
    { title: "作品集", link: "/portfolio" },
    { title: "活動記録", link: "/activity" },
    { title: "記事", link: "/blog" },
    { title: "お知らせ", link: "/notice" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-8">
          <Logo size={180} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          ソフトウェア工房
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          サブタイトル未定
        </p>
      </div>

      {/* News Section */}
      <div className="bg-emerald-50 rounded-lg p-8 mb-16 border border-emerald-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">最新のお知らせ</h2>
          <Link
            to="/notice"
            className="text-emerald-600 hover:text-emerald-500 text-sm font-medium"
          >
            すべて見る →
          </Link>
        </div>
        <div className="space-y-4">
          {latestNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-md p-4 border-l-4 border-emerald-500 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 text-sm">{notice.date}</p>
              <p className="font-medium text-gray-900">{notice.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          概要
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ソフトウェア工房とは
          </h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              ソフトウェア工房は、神奈川工科大学内にある学生によるソフトウェア開発組織です。
              基本的には、定期的に発足されるプロジェクトでチームメンバーとともに課題解決に必要な技術を学び、
              実際に自分たちで必要な環境の構築から実践までを通して行うことで、作る喜びや楽しさを見つけて成長していくことを目的とした組織です。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">主な活動内容</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Webアプリケーション開発</li>
                  <li>学生向けハッカソン</li>
                  <li>定期勉強会の開催</li>
                  <li>チーム・個人プロジェクト</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  使用技術<br></br>（今はこのＷｅｂサイトに使ったものを載せています）
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Details Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">参加してみませんか？</h2>
          <p className="text-emerald-50">
            プログラミングに興味がある方、一緒に開発を楽しみましょう
          </p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 活動場所 */}
            <div>
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-3">📍</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    活動場所
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    神奈川工科大学 情報学部棟<br />
                    ソフトウェア工房室
                  </p>
                </div>
              </div>
            </div>

            {/* 活動時間 */}
            <div>
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-3">⏰</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    活動時間
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    平日: 放課後〜<br />
                    プロジェクトや勉強会は随時開催
                  </p>
                </div>
              </div>
            </div>

            {/* 対象者 */}
            <div>
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-3">👥</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    対象者
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    神奈川工科大学の学生<br />
                    プログラミング経験は問いません
                  </p>
                </div>
              </div>
            </div>

            {/* 参加方法 */}
            <div>
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-3">✉️</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    参加方法
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    工房室に直接お越しください<br />
                    見学も歓迎しています
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          サイト内ページ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {navigationCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center hover:border-emerald-600 hover:bg-emerald-50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <p className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {card.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
