import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Admin() {
  const navigate = useNavigate();

  const [username] = useState(() => {
    const token = authService.getToken();
    // 簡易的にトークンからユーザー名を抽出（形式: "admin:1"）
    if (token) {
      return token.split(":")[0];
    }
    return "User";
  });

  const handleLogout = () => {
    authService.removeToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              管理画面へようこそ
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              ログアウト
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              ログインユーザー: <strong>{username}</strong>
            </p>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                管理者機能
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 記事の作成・編集・削除</li>
                <li>✓ ユーザー管理</li>
                <li>✓ サイト設定</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                このページは認証が必要です。
                トークンが無効になると自動的にログイン画面にリダイレクトされます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
