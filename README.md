# メンバー紹介アプリケーション

チームメンバーの情報を管理・表示するためのWebアプリケーションです。

## 主な機能

- メンバー一覧の表示
- メンバー詳細情報の閲覧
- 新規メンバーの追加
- タグによるメンバー管理
- ドラッグ&ドロップによるメンバーの並び替え

## 技術スタック

- React 18.3
- TypeScript
- Material-UI (MUI)
- react-beautiful-dnd
- Vite

## プロジェクト構造

```
src/
├── components/
│   ├── AddMemberModal/    # メンバー追加用モーダル
│   ├── MemberCard/        # メンバーカード表示
│   ├── MemberDetail/      # メンバー詳細表示
│   ├── MemberList/        # メンバー一覧
│   └── TagManagement/     # タグ管理機能
├── context/
│   └── MemberContext.tsx  # メンバー情報の状態管理
└── types/
    └── index.ts          # 型定義
```

## 開発環境のセットアップ

1. 依存パッケージのインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

3. ビルド
```bash
npm run build
```

4. リントの実行
```bash
npm run lint
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
