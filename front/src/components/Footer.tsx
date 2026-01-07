import React from "react";

// components/Footer.tsx

/// * This is the footer component.
function Footer(): React.ReactElement {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Notice */}
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 ソフトウェア工房. All rights reserved.
          </p>
          {/* Back to Top Button */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm text-primary-600 hover:text-primary-500 transition-colors flex items-center"
          >
            {/* // TODO: Set Material Icon. "Arrow Upward" */}
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            トップへ戻る
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
