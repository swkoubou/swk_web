# Windows 11でのローカルホスト実行手順

このガイドでは、このReactプロジェクトをWindows 11のローカル環境で実行する方法を説明します。

## 前提条件

### 1. Node.jsのインストール
1. [Node.js公式サイト](https://nodejs.org/)にアクセス
2. **LTS版（推奨版）** をダウンロード（現在はv20.x以上を推奨）
3. ダウンロードしたインストーラーを実行
4. インストール完了後、コマンドプロンプトまたはPowerShellで以下のコマンドを実行して確認:
   ```cmd
   node --version
   npm --version
   ```

### 2. Gitのインストール（任意）
1. [Git for Windows](https://git-scm.com/download/win)からダウンロード
2. インストーラーを実行（デフォルト設定でOK）

## セットアップ手順

### Step 1: プロジェクトファイルの準備
プロジェクトファイルをWindows 11のPCに配置します。

**方法A: Gitを使う場合**
```cmd
git clone <リポジトリURL>
cd swk_web-2024
```

**方法B: ファイルを直接コピーする場合**
- プロジェクトフォルダ全体を任意の場所にコピー
- 例: `C:\Users\YourName\Documents\swk_web-2024`

### Step 2: frontディレクトリに移動
```cmd
cd front
```

### Step 3: 依存パッケージのインストール
```cmd
npm install
```

このコマンドは初回のみ実行が必要です。`node_modules`フォルダと必要なパッケージがインストールされます。

**注意**: インストール中にエラーが出た場合は、以下を試してください:
```cmd
npm install --legacy-peer-deps
```

### Step 4: 開発サーバーの起動
```cmd
npm run dev
```

### Step 5: ブラウザでアクセス
コマンドプロンプトに表示されたURLにアクセスします。
通常は以下のいずれか:
- http://localhost:5173
- http://127.0.0.1:5173

ブラウザで上記URLを開くとWebサイトが表示されます。

## よく使うコマンド

### 開発サーバーの起動
```cmd
npm run dev
```
- ファイルを編集すると自動的にブラウザがリロードされます
- サーバーを停止するには `Ctrl + C` を押します

### ビルド（本番用）
```cmd
npm run build
```
- 最適化されたファイルが `dist` フォルダに生成されます

### ビルド結果のプレビュー
```cmd
npm run preview
```
- ビルド後のファイルをローカルで確認できます

### コードチェック
```cmd
npm run lint
```
- コードの品質チェックを実行します

## トラブルシューティング

### ポート5173が既に使用されている場合
他のアプリケーションがポート5173を使用している場合、Viteは自動的に別のポート（5174など）を使用します。

### インストールエラーが出る場合
1. Node.jsのバージョンを確認（v18以上推奨）
   ```cmd
   node --version
   ```

2. npmキャッシュをクリア
   ```cmd
   npm cache clean --force
   npm install
   ```

3. `node_modules`フォルダと`package-lock.json`を削除して再インストール
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

### ファイアウォールの警告が出た場合
初回起動時にWindowsファイアウォールの警告が出ることがあります。
「アクセスを許可する」を選択してください。

## プロジェクト構成

```
swk_web-2024/
└── front/              # フロントエンドプロジェクト
    ├── src/
    │   ├── components/ # 共通コンポーネント
    │   ├── pages/      # ページコンポーネント
    │   ├── App.tsx     # メインアプリケーション
    │   └── main.tsx    # エントリーポイント
    ├── public/         # 静的ファイル
    ├── package.json    # 依存関係の定義
    └── vite.config.ts  # Vite設定ファイル
```

## 使用技術

- **React 19.2.0** - UIライブラリ
- **TypeScript** - 型安全なJavaScript
- **Vite** - 高速ビルドツール
- **React Router** - ルーティング
- **Tailwind CSS** - CSSフレームワーク

## サポート

問題が解決しない場合は、以下の情報を確認してください:
- Node.jsのバージョン: `node --version`
- npmのバージョン: `npm --version`
- エラーメッセージの全文

---

以上でWindows 11でのローカル実行環境のセットアップは完了です。
