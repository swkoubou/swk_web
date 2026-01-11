# コミットメッセージテンプレート

このファイルはコミットメッセージのテンプレートと記載ルール例です。
プロジェクトでは基本的に Conventional Commits 準拠を推奨します。

---

## 推奨フォーマット（Conventional Commits）

基本形式:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`: feat, fix, docs, style, refactor, perf, test, chore など
- `scope`: 変更したモジュールやパッケージ（任意）
- `subject`: 短く要点をまとめる（50文字程度以内、先頭は小文字、末尾にピリオドを付けない）
- `body`: 必要に応じて詳細を記載（何を、なぜ変更したか等）
- `footer`: 関連する Issue 番号や BREAKING CHANGE の記載

例:

```
feat(auth): add JWT refresh token

Add refresh token support to the authentication flow to
allow long-lived sessions without storing long-lived access tokens.

BREAKING CHANGE: token format changed, old clients must reauthenticate

Refs: #123
```

---

## `.git/commit-template` 用（そのままコピーして使えます）

エディタでコミット時にこのテンプレートを読み込ませる場合、先頭に `#` を付けた行はコメントとして無視されます。下のテンプレートを `.git/commit-template` に置くと便利です。

```
# タイトル行: <type>(<scope>): <subject> 例: feat(api): add user endpoint
# 空行
# 本文: 変更の詳細（任意）
# 空行
# フッター: Issue 参照や BREAKING CHANGE

<type>(<scope>): <subject>

<body>

BREAKING CHANGE: <説明があれば記載>

Refs: #<issue-number>
```

---

## コミット時チェックリスト（PR 作成前の確認）

- [ ] ビルドが通る（必要であれば）
- [ ] テストを追加／修正した（該当する場合）
- [ ] リンターやフォーマッタが適用されている
- [ ] ドキュメントを更新した（必要があれば）

---

このテンプレートの変更や型の追加が必要なら、チームで合意の上で更新してください。
