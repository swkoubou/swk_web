# データ管理ガイド

このディレクトリには、Webサイトのコンテンツデータが格納されています。
工房員の皆さんは、これらのファイルを編集してコンテンツを更新できます。

## ファイル一覧

- `notices.ts` - お知らせデータ
- `blogs.ts` - ブログ記事データ
- `activities.ts` - 活動履歴データ
- `portfolios.ts` - 作品集データ

## 編集方法

### 1. お知らせの追加 (`notices.ts`)

```typescript
export const notices: Notice[] = [
  // 新しいお知らせを先頭に追加
  {
    id: "新しいID（ユニークな番号）",
    date: "2025.12.19",
    title: "お知らせのタイトル",
    description: "お知らせの内容",
    link: "/詳細ページへのリンク", // オプション
  },
  // 既存のお知らせ...
];
```

### 2. ブログ記事の追加 (`blogs.ts`)

```typescript
export const blogPosts: BlogPost[] = [
  // 新しい記事を先頭に追加
  {
    id: 次の番号,
    title: "記事タイトル",
    excerpt: "記事の要約（2-3文程度）",
    content: `記事の本文。

    複数段落で書けます。
    改行も自由に入れられます。`,
    author: "著者名",
    date: "2025-12-19",
    tags: ["タグ1", "タグ2"],
    readTime: "5分",
  },
  // 既存の記事...
];
```

### 3. 活動履歴の追加 (`activities.ts`)

```typescript
export const activities: ActivityItem[] = [
  // 新しい活動を追加
  {
    id: 次の番号,
    date: "2025-12-19",
    title: "活動タイトル",
    description: "カード表示用の短い説明",
    category: "project", // event, project, achievement, meeting, study から選択

    // オプション項目
    participants: ["参加者1", "参加者2"],
    location: "開催場所",
    relatedProject: "関連プロジェクト名",
    thumbnail: "/images/activities/活動ID-thumb.jpg",
    content: `詳細な本文。

    複数段落で詳しく書けます。`,
    images: [
      "/images/activities/活動ID-img1.jpg",
      "/images/activities/活動ID-img2.jpg",
    ],
  },
  // 既存の活動...
];
```

### 4. 作品集の追加 (`portfolios.ts`)

```typescript
export const portfolios: PortfolioItem[] = [
  // 新しい作品を追加
  {
    id: 次の番号,
    title: "プロジェクト名",
    description: "プロジェクトの簡単な説明",
    thumbnail: "/images/portfolios/プロジェクトID-thumb.jpg", // 必須
    date: "2025-12",
    category: "Webアプリ", // または "ゲーム", "ツール" など
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    content: `プロジェクトの詳細説明。

    開発の経緯や工夫した点などを記載。`,

    // オプション項目
    images: [
      "/images/portfolios/プロジェクトID-1.jpg",
      "/images/portfolios/プロジェクトID-2.jpg",
    ],
    link: "https://github.com/username/repo",
    members: ["メンバー1", "メンバー2"],
  },
  // 既存の作品...
];
```

## 画像の追加方法

1. 画像ファイルを準備（JPG, PNG推奨）
2. 以下のディレクトリに配置:
   - 活動履歴: `/public/images/activities/`
   - 作品集: `/public/images/portfolios/`
3. データファイルでパスを指定（例: `"/images/activities/activity-1.jpg"`）

### 画像サイズの推奨

- サムネイル: 800x600px程度
- 詳細画像: 1200x800px程度
- ファイルサイズ: 500KB以下推奨

## カテゴリ一覧

### 活動履歴 (`category`)
- `event` - イベント 🎉
- `project` - プロジェクト 💻
- `achievement` - 成果 🏆
- `meeting` - ミーティング 💬
- `study` - 勉強会 📚

## 注意事項

- ❗ IDは必ずユニークな値にしてください（重複厳禁）
- ❗ 日付フォーマットを守ってください
  - お知らせ: `YYYY.MM.DD`
  - その他: `YYYY-MM-DD`
- ❗ 画像パスは `/images/` から始めてください
- ❗ カンマやカッコの位置に注意してください（構文エラーの原因になります）

## トラブルシューティング

### サイトが表示されない / エラーが出る
1. 構文エラーがないか確認（カンマ、カッコ、クォートの閉じ忘れなど）
2. `npm run dev` を実行してエラーメッセージを確認
3. ブラウザのコンソールでエラーを確認

### 画像が表示されない
1. 画像パスが正しいか確認
2. 画像ファイルが `/public/images/` 内に存在するか確認
3. ファイル名の大文字小文字が一致しているか確認

## さらに詳しく

より詳しい情報や質問は、Web班のメンバーに聞いてください。
