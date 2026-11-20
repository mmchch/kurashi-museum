# こういう人間が生息しています。

Megの個人サイト（暮らしの博物館）。Astro で作り、Cloudflare Pages で公開する。

## しくみ：「1つの話 ＝ 1枚のカード」
- `src/content/cards/` … 品物・ストーリー・ことば などの話。1つの話が1つのファイル
- `src/content/scenes/` … 博物館の1枚（写真の中の丸を押すと、カードのひとことが出る）
- `public/images/` … 写真
- `src/components/Sanki.astro` … 決まり文句「サンキ」（ここを直せば全ページに反映）
- `src/components/Tip.astro` … English TIP の囲み

カードやシーンを1つ足すと、博物館・アルバムに自動で並ぶ。

## カードに書けること
| 項目 | 意味 |
|---|---|
| title | 名前 |
| kind | 品物 / ストーリー / ことば / 日記 / 本 / 自伝 / 音楽・ダンス |
| date | "2026-11-05" の形。わからなければ "1995年ごろ" などでもOK |
| tags | コーデ・手作り・料理・庭・旅・音とからだ・やってみた・暮らし |
| photo / alt | 写真と、その説明（読み上げ用） |
| hitokoto | 写真の中を押したときに出る文（本文からそのまま） |
| page | true なら「もっと読む」のページを作る |
| related | つながりのあるカード |

## 書かないこと
- 元パートナーに関することは一切書かない
- 宿泊のことは書かない

## 公開（Cloudflare Workers）
- Compute → Workers & Pages → 作成 → リポジトリをインポート → kurashi-museum
- ビルドコマンド：`npm run build`
- デプロイコマンド：`npx wrangler deploy`（設定は `wrangler.jsonc`）
