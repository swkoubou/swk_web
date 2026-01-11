# バックエンド統合ガイド

このドキュメントは、Go + Gin + PostgreSQLで構築されているバックエンドAPIとフロントエンドを統合するための資料です。

---

## 📋 目次

1. [概要](#概要)
2. [現在の状態](#現在の状態)
3. [必要なAPIエンドポイント](#必要なapiエンドポイント)
4. [データ型定義](#データ型定義)
5. [統合手順](#統合手順)
6. [テスト方法](#テスト方法)
7. [CORS設定](#cors設定)

---

## 概要

### フロントエンド技術スタック
- React 19
- TypeScript
- React Router v7
- Tailwind CSS v4
- Vite

### バックエンド技術スタック（想定）
- Go
- Gin (Webフレームワーク)
- PostgreSQL
- REST API

### データ取得の仕組み
フロントエンドは**サービス層**を使用してデータを取得します。環境変数で静的データとAPIを切り替え可能です。

```typescript
// /src/services/activityService.ts の例
const USE_API = import.meta.env.VITE_USE_API === "true";
const API_URL = import.meta.env.VITE_API_URL || "";

export const getActivities = async () => {
  if (!USE_API) {
    return activities; // 静的データ
  }
  // APIから取得
  const response = await fetch(`${API_URL}/api/activities`);
  return await response.json();
};
```

---

## 現在の状態

### ✅ 実装済み
- フロントエンド全ページ
- データ型定義（TypeScript）
- サービス層（API統合準備完了）
- 静的データでの動作確認

### 🔄 統合待ち
- バックエンドAPI
- データベース設計
- 認証・認可（管理画面用）

---

## 必要なAPIエンドポイント

### 1. お知らせ（Notices）

#### `GET /api/notices`
お知らせ一覧を取得

**レスポンス例:**
```json
[
  {
    "id": "1",
    "date": "2025.12.19",
    "title": "お知らせタイトル",
    "description": "お知らせの内容",
    "link": "/naiyou"
  }
]
```

**フロントエンド側の型定義:**
```typescript
// /src/data/notices.ts
export interface Notice {
  id: string;
  date: string;        // YYYY.MM.DD形式
  title: string;
  description: string;
  link?: string;       // オプション
}
```

---

### 2. ブログ（Blog Posts）

#### `GET /api/blogs`
ブログ記事一覧を取得

**レスポンス例:**
```json
[
  {
    "id": 1,
    "title": "記事タイトル",
    "excerpt": "記事の要約",
    "content": "記事の本文",
    "author": "著者名",
    "date": "2025-12-19",
    "tags": ["タグ1", "タグ2"],
    "readTime": "5分"
  }
]
```

#### `GET /api/blogs/:id`
特定のブログ記事を取得

**レスポンス例:**
```json
{
  "id": 1,
  "title": "記事タイトル",
  "excerpt": "記事の要約",
  "content": "記事の本文...",
  "author": "著者名",
  "date": "2025-12-19",
  "tags": ["タグ1", "タグ2"],
  "readTime": "5分"
}
```

**フロントエンド側の型定義:**
```typescript
// /src/data/blogs.ts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;        // YYYY-MM-DD形式
  tags: string[];
  readTime: string;
}
```

---

### 3. 活動履歴（Activities）

#### `GET /api/activities`
活動履歴一覧を取得

**レスポンス例:**
```json
[
  {
    "id": 1,
    "date": "2024-12-15",
    "title": "活動タイトル",
    "description": "短い説明",
    "category": "project",
    "participants": ["参加者1", "参加者2"],
    "location": "開催場所",
    "relatedProject": "プロジェクト名",
    "thumbnail": "/images/activities/activity-1-thumb.jpg",
    "content": "詳細な本文...",
    "images": [
      "/images/activities/activity-1-img1.jpg",
      "/images/activities/activity-1-img2.jpg"
    ]
  }
]
```

#### `GET /api/activities/:id`
特定の活動履歴を取得

**フロントエンド側の型定義:**
```typescript
// /src/data/activities.ts
export interface ActivityItem {
  id: number;
  date: string;        // YYYY-MM-DD形式
  title: string;
  description: string;
  category: "event" | "project" | "achievement" | "meeting" | "study";
  participants?: string[];
  location?: string;
  relatedProject?: string;
  thumbnail?: string;  // 画像パス
  content?: string;    // 詳細本文
  images?: string[];   // 詳細画像パス配列
}
```

---

### 4. 作品集（Portfolio）

#### `GET /api/portfolios`
作品一覧を取得

**レスポンス例:**
```json
[
  {
    "id": 1,
    "title": "プロジェクト名",
    "description": "プロジェクトの説明",
    "thumbnail": "/images/portfolios/project-1-thumb.jpg",
    "date": "2024-12",
    "category": "Webアプリ",
    "technologies": ["React", "TypeScript"],
    "content": "詳細な説明...",
    "images": ["/images/portfolios/project-1-img1.jpg"],
    "link": "https://github.com/...",
    "members": ["メンバー1", "メンバー2"]
  }
]
```

#### `GET /api/portfolios/:id`
特定の作品を取得

**フロントエンド側の型定義:**
```typescript
// /src/data/portfolios.ts
export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;    // 必須
  date: string;         // YYYY-MM形式
  category: string;
  technologies: string[];
  content: string;
  images?: string[];
  link?: string;
  members?: string[];
}
```

---

## 統合手順

### ステップ1: データベース設計

各テーブルの設計例（PostgreSQL）:

```sql
-- お知らせテーブル
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ブログ記事テーブル
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    read_time VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ブログタグテーブル
CREATE TABLE blog_tags (
    id SERIAL PRIMARY KEY,
    blog_post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL
);

-- 活動履歴テーブル
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    related_project VARCHAR(255),
    thumbnail VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 活動参加者テーブル
CREATE TABLE activity_participants (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);

-- 活動画像テーブル
CREATE TABLE activity_images (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    image_path VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 作品集テーブル
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    date VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 作品技術テーブル
CREATE TABLE portfolio_technologies (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    technology VARCHAR(50) NOT NULL
);

-- 作品メンバーテーブル
CREATE TABLE portfolio_members (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    member_name VARCHAR(100) NOT NULL
);

-- 作品画像テーブル
CREATE TABLE portfolio_images (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    image_path VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0
);
```

### ステップ2: Go構造体定義

```go
// models/notice.go
package models

type Notice struct {
    ID          string `json:"id" db:"id"`
    Date        string `json:"date" db:"date"`
    Title       string `json:"title" db:"title"`
    Description string `json:"description" db:"description"`
    Link        string `json:"link,omitempty" db:"link"`
}

// models/blog.go
package models

type BlogPost struct {
    ID       int      `json:"id" db:"id"`
    Title    string   `json:"title" db:"title"`
    Excerpt  string   `json:"excerpt" db:"excerpt"`
    Content  string   `json:"content" db:"content"`
    Author   string   `json:"author" db:"author"`
    Date     string   `json:"date" db:"date"`
    Tags     []string `json:"tags"`
    ReadTime string   `json:"readTime" db:"read_time"`
}

// models/activity.go
package models

type Activity struct {
    ID             int      `json:"id" db:"id"`
    Date           string   `json:"date" db:"date"`
    Title          string   `json:"title" db:"title"`
    Description    string   `json:"description" db:"description"`
    Category       string   `json:"category" db:"category"`
    Participants   []string `json:"participants,omitempty"`
    Location       string   `json:"location,omitempty" db:"location"`
    RelatedProject string   `json:"relatedProject,omitempty" db:"related_project"`
    Thumbnail      string   `json:"thumbnail,omitempty" db:"thumbnail"`
    Content        string   `json:"content,omitempty" db:"content"`
    Images         []string `json:"images,omitempty"`
}

// models/portfolio.go
package models

type Portfolio struct {
    ID           int      `json:"id" db:"id"`
    Title        string   `json:"title" db:"title"`
    Description  string   `json:"description" db:"description"`
    Thumbnail    string   `json:"thumbnail" db:"thumbnail"`
    Date         string   `json:"date" db:"date"`
    Category     string   `json:"category" db:"category"`
    Technologies []string `json:"technologies"`
    Content      string   `json:"content" db:"content"`
    Images       []string `json:"images,omitempty"`
    Link         string   `json:"link,omitempty" db:"link"`
    Members      []string `json:"members,omitempty"`
}
```

### ステップ3: Ginルーター設定例

```go
// main.go または routes/routes.go
package main

import (
    "github.com/gin-gonic/gin"
    "your-project/handlers"
)

func setupRouter() *gin.Engine {
    router := gin.Default()

    // CORS設定（重要！）
    router.Use(corsMiddleware())

    api := router.Group("/api")
    {
        // お知らせ
        api.GET("/notices", handlers.GetNotices)

        // ブログ
        api.GET("/blogs", handlers.GetBlogs)
        api.GET("/blogs/:id", handlers.GetBlogByID)

        // 活動履歴
        api.GET("/activities", handlers.GetActivities)
        api.GET("/activities/:id", handlers.GetActivityByID)

        // 作品集
        api.GET("/portfolios", handlers.GetPortfolios)
        api.GET("/portfolios/:id", handlers.GetPortfolioByID)
    }

    return router
}

func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}
```

### ステップ4: フロントエンド側の設定

#### .envファイルを作成

```bash
cd /root/front
cp .env.example .env
```

#### .envファイルを編集

```bash
# バックエンドAPIを使用する
VITE_USE_API=true

# バックエンドのURL
VITE_API_URL=http://localhost:8080
```

---

## テスト方法

### 1. バックエンド単体テスト

```bash
# curlでAPIをテスト
curl http://localhost:8080/api/notices
curl http://localhost:8080/api/blogs
curl http://localhost:8080/api/activities
curl http://localhost:8080/api/portfolios
```

### 2. フロントエンド統合テスト

```bash
# フロントエンド起動
cd /root/front
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスして、各ページが正常に表示されることを確認。

### 3. 動作確認項目

- [ ] お知らせが表示される
- [ ] ブログ一覧が表示される
- [ ] ブログ詳細が表示される
- [ ] 活動履歴が表示される
- [ ] 活動詳細モーダルが開く
- [ ] 作品集が表示される
- [ ] 作品詳細モーダルが開く
- [ ] 画像が正しく表示される
- [ ] フィルタリング機能が動作する

---

## CORS設定

### 開発環境

フロントエンド（Vite）とバックエンド（Gin）は異なるポートで動作するため、CORSの設定が必須です。

**Gin側のCORS設定例:**

```go
import "github.com/gin-contrib/cors"

func main() {
    router := gin.Default()

    // CORS設定
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:5173"}
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

    router.Use(cors.New(config))

    // ルート設定...
}
```

### 本番環境

```go
config.AllowOrigins = []string{
    "https://your-production-domain.com",
}
```

---

## エラーハンドリング

### バックエンド側

```go
// handlers/activity.go
func GetActivities(c *gin.Context) {
    activities, err := database.GetAllActivities()
    if err != nil {
        c.JSON(500, gin.H{
            "error": "Failed to fetch activities",
            "message": err.Error(),
        })
        return
    }

    c.JSON(200, activities)
}
```

### フロントエンド側

既にエラーハンドリングが実装されています：

```typescript
// /src/services/activityService.ts
try {
    const response = await fetch(`${API_URL}/api/activities`);
    if (!response.ok) {
        throw new Error("Failed to fetch activities");
    }
    return await response.json();
} catch (error) {
    console.error("Error fetching activities from API:", error);
    // フォールバック: 静的データを返す
    return activities;
}
```

---

## 画像ファイルの取り扱い

### アップロード機能（今後実装）

将来的に管理画面から画像をアップロードする場合:

```go
// handlers/upload.go
func UploadImage(c *gin.Context) {
    file, _ := c.FormFile("file")

    // ファイル名を生成（UUID推奨）
    filename := generateUniqueFilename(file.Filename)

    // 保存先
    dst := filepath.Join("./public/images/activities", filename)
    c.SaveUploadedFile(file, dst)

    c.JSON(200, gin.H{
        "url": "/images/activities/" + filename,
    })
}
```

### 現状の画像管理

画像は `/root/front/public/images/` に静的ファイルとして配置され、フロントエンドから直接参照されます。

---

## 連絡先・質問

実装中に不明点があれば、Web班に確認してください。

### よくある質問

**Q: 日付フォーマットはどうすればいい？**
A: お知らせは `YYYY.MM.DD`、その他は `YYYY-MM-DD` 形式で統一してください。

**Q: NULL値の扱いは？**
A: オプション項目（`?`付き）はnullまたは空文字列で返してOKです。フロントエンド側で適切に処理します。

**Q: ソート順は？**
A: 全て日付の降順（新しい順）で返してください。

**Q: ページネーションは必要？**
A: 現時点では不要ですが、将来的に実装予定です。

---

## 参考資料

- フロントエンドデータ型定義: `/root/front/src/data/`
- サービス層実装: `/root/front/src/services/`
- 環境変数設定例: `/root/front/.env.example`
- データ管理ガイド: `/root/front/src/data/README.md`

---

**更新日**: 2025-12-19
**作成者**: Web班
**バージョン**: 1.0
