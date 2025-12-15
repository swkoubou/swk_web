# ソフトウェア工房 公式サイト

React + TypeScript + Tailwind CSSで構築された、ソフトウェア工房の公式Webサイトです。

## 活動履歴の編集方法

活動履歴ページに新しい記事を追加する手順を説明します。

### 1. ファイルの場所

活動履歴のデータは以下のファイルに記載されています。
```
/front/src/pages/Activity.tsx
```

### 2. 活動を追加する方法

#### 手順

1. **Activity.tsxを開く**

2. **`activities`配列を見つける**（14行目あたり）

3. **新しい活動オブジェクトを配列の最後に追加**

```typescript
const activities: ActivityItem[] = [
  {
    id: 1,
    date: "2024-12-15",
    title: "ソフトウェア工房公式サイトリニューアル完了",
    description: "...",
    category: "project",
    participants: ["こんどうそうた"],
    relatedProject: "WEBサイト",
  },
  // ここに新しい活動を追加
  {
    id: 2,  // idは連番で増やす
    date: "2025-01-10",
    title: "新年会開催",
    description: "2025年の活動開始にあたり、新年会を開催しました。今年の目標を共有し、チームの団結を深めました。",
    category: "event",
    participants: ["全メンバー"],
    location: "カフェテリア",
  },
];
```

### 3. 各フィールドの説明

| フィールド | 必須 | 説明 | 例 |
|-----------|------|------|-----|
| `id` | ✓ | 一意のID（連番） | `2` |
| `date` | ✓ | 日付（YYYY-MM-DD形式） | `"2025-01-10"` |
| `title` | ✓ | 活動タイトル | `"新年会開催"` |
| `description` | ✓ | 活動の詳細説明 | `"2025年の活動開始にあたり..."` |
| `category` | ✓ | カテゴリ（下記参照） | `"event"` |
| `participants` | | 参加者リスト | `["メンバー1", "メンバー2"]` |
| `location` | | 開催場所 | `"研究室A"` |
| `relatedProject` | | 関連プロジェクト名 | `"WEBサイト"` |

### 4. カテゴリの種類

活動には以下の5つのカテゴリがあります:

| カテゴリ | 値 | アイコン | 説明 |
|---------|-----|---------|------|
| イベント | `"event"` | 🎉 | 歓迎会、交流会などのイベント |
| プロジェクト | `"project"` | 💻 | プロジェクトの完成や重要なマイルストーン |
| 成果 | `"achievement"` | 🏆 | コンテスト入賞、発表会などの成果 |
| ミーティング | `"meeting"` | 💬 | 定例会議、進捗報告会など |
| 勉強会 | `"study"` | 📚 | 技術勉強会、ハンズオンセッションなど |

### 5. 記事の例

#### 例1: イベント
```typescript
{
  id: 3,
  date: "2025-02-01",
  title: "新メンバー歓迎会",
  description: "1年生の新メンバーを迎えて歓迎会を開催。自己紹介と今後の活動について説明しました。",
  category: "event",
  participants: ["全メンバー"],
  location: "カフェテリア",
}
```

#### 例2: プロジェクト
```typescript
{
  id: 4,
  date: "2025-03-15",
  title: "AIチャットボット開発完了",
  description: "自然言語処理を活用したチャットボットシステムが完成。学内の問い合わせ対応に活用予定です。",
  category: "project",
  participants: ["田中太郎", "佐藤花子"],
  relatedProject: "AIチャットボット",
}
```

#### 例3: 勉強会
```typescript
{
  id: 5,
  date: "2025-04-20",
  title: "Docker勉強会",
  description: "コンテナ技術の基礎から実践的な使い方まで学習。環境構築の効率化について議論しました。",
  category: "study",
  participants: ["全メンバー"],
  location: "研究室A",
}
```

### 6. 注意事項

- **idは必ず連番にする**: 既存の最大IDに+1した値を使用
- **日付形式を守る**: `"YYYY-MM-DD"`形式（例: `"2025-01-10"`）
- **categoryは正確に**: `"event"`, `"project"`, `"achievement"`, `"meeting"`, `"study"`のいずれか
- **オプションフィールドは省略可能**: `participants`, `location`, `relatedProject`は必要に応じて追加
- **descriptionは詳しく**: 100-200文字程度で具体的に記載

### 7. 保存とプレビュー

1. **ファイルを保存**
2. **開発サーバーを起動**（初回のみ`npm install`が必要）
   ```bash
   cd front
   npm run dev
   ```
3. **ブラウザで確認**: `http://localhost:5173/activity`

変更は自動的にブラウザに反映されます。

---

## その他のページの編集

### お知らせページ
- ファイル: `/front/src/pages/Notice.tsx`
- ホームページの「最新のお知らせ」も同じデータを使用: `/front/src/pages/Home.tsx`

### プロジェクト/作品集
- ファイル: `/front/src/pages/Portfolio.tsx`
- 現在はプレースホルダー表示（後で実装予定）

### ブログ
- ファイル: `/front/src/pages/Blog.tsx`

---

## 開発について

詳細なセットアップ手順は`WINDOWS_SETUP.md`を参照してください。
