import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
              ソフトウェア工房
            </h1>
          </Link>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ホーム
            </Link>
            <Link
              to="/portfolio"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              作品集
            </Link>
            <Link
              to="/activity"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              活動記録
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              記事
            </Link>
            <Link
              to="/notice"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              お知らせ
            </Link>
          </nav>

          {/* ハンバーガーメニューボタン */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600 cursor-pointer"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                ホーム
              </Link>
              <Link
                to="/portfolio"
                onClick={closeMenu}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                作品集
              </Link>
              <Link
                to="/activity"
                onClick={closeMenu}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                活動記録
              </Link>
              <Link
                to="/blog"
                onClick={closeMenu}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                記事
              </Link>
              <Link
                to="/notice"
                onClick={closeMenu}
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                お知らせ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
