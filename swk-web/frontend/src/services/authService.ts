// front/src/services/authService.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  // ログイン認証を行う ? トークンを取得 : エラーを投げる
  async login(username: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("ログインに失敗しました。");
    }

    return response.json();
  },

  async checkAuth(
    token: string
  ): Promise<{ authenticated: boolean; username?: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  // ここローカルストレージじゃなくて、キャッシュに保存するように変更したほうがいいかもねん
  saveToken(token: string): void {
    localStorage.setItem("auth_token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },

  removeToken(): void {
    localStorage.removeItem("auth_token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
