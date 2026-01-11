import { MoreHoriz } from "@mui/icons-material";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { getLatestNotices } from "../data/news";

function Home() {
  const latestNotices = getLatestNotices(3);

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
          ～遊びも学びも全力で～
        </p>
      </div>

      {/* News Section */}
      <div className="bg-emerald-100 rounded-lg p-8 mb-16 border border-emerald-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">最新のお知らせ</h2>
          <Link
            to="/notice"
            className="text-emerald-800 hover:text-emerald-600 text-sm font-medium cursor-pointer"
          >
            すべて見る →
          </Link>
        </div>
        <div className="space-y-4">
          {latestNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-md p-4 border-l-4 border-teal-600 hover:shadow-md transition-shadow"
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
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ソフトウェア工房とは
          </h3>
          <div className="mb-4 h-px bg-gray-200"></div>
          <div className="text-gray-800 leading-relaxed space-y-4">
            <p>
              ソフトウェア工房は、神奈川工科大学内にある学生によるソフトウェア開発組織です。
              <br className="lg:display-none" />
              基本的には、定期的に発足されるプロジェクトでチームメンバーとともに課題解決に必要な技術を学びます。
              <br />
              さらに、実際に自分たちで必要な環境の構築から実践までを通して行うことで、作る喜びや楽しさを見つけて成長していくことを目的としています。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                  主な活動内容
                </h4>
                <ul className="list-disc list-inside space-y-1 ">
                  <li>Webアプリケーション開発</li>
                  <li>学生向けハッカソン</li>
                  <li>定期勉強会の開催</li>
                  <li>チーム・個人プロジェクト</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                  使用技術
                  <span className="align-middle ml-2 tracking-tighter text-[8px]">
                    ※ 現在はこの Web サイトに使ったものを載せています
                  </span>
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

      {/* Portfolio Preview Section */}
      <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg p-12 text-center border border-emerald-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">作品集</h2>
        <p className="text-gray-600 text-lg mb-6">
          現在編集中、チーム又は個々人で作成した作品を掲載予定
        </p>
        <div className="inline-flex items-center text-teal-700">
          <span className="material-symbols-outlined mr-2 mb-1">
            <MoreHoriz />
          </span>
          準備中
        </div>
      </div>
    </div>
  );
}

export default Home;
