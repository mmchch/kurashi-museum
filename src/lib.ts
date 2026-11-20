// 日付の表示：2026-11-05 → 2026年11月5日（それ以外の書き方はそのまま）
export function dateLabel(d?: string): string {
  if (!d) return '';
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return d;
  return `${m[1]}年${Number(m[2])}月${Number(m[3])}日`;
}
// 年表などで並べるための数字（わからない部分は0）
export function dateKey(d?: string): number {
  if (!d) return 0;
  const m = d.match(/(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  if (!m) return 0;
  return Number(m[1]) * 10000 + Number(m[2] ?? 0) * 100 + Number(m[3] ?? 0);
}
export const ALBUM_TAGS = ['コーデ', '手作り', '料理', '庭', '旅', '音とからだ', 'やってみた', '暮らし'];

import { getCollection } from 'astro:content';

// アルバム用：全部の写真を、タグとリンク付きで集める
export async function albumPhotos() {
  const scenes = await getCollection('scenes');
  const cards = await getCollection('cards');
  const list: { src: string; alt: string; tags: string[]; href: string; key: number }[] = [];
  for (const s of scenes) {
    const href = `/museum/${s.id}/`;
    list.push({ src: s.data.photo, alt: s.data.alt, tags: s.data.tags, href, key: dateKey(s.data.date) });
    for (const p of s.data.extraPhotos) list.push({ ...p, tags: s.data.tags, href, key: dateKey(s.data.date) });
  }
  for (const c of cards) {
    const home = scenes.find((s) => s.data.spots.some((sp) => sp.card === c.id));
    const href = c.data.page ? `/stories/${c.id}/` : home ? `/museum/${home.id}/` : '/';
    if (c.data.photo) list.push({ src: c.data.photo, alt: c.data.alt ?? c.data.title, tags: c.data.tags, href, key: dateKey(c.data.date) });
    for (const p of c.data.photos) list.push({ ...p, tags: c.data.tags, href, key: dateKey(c.data.date) });
  }
  // 同じ写真は1回だけ
  const seen = new Set<string>();
  return list.filter((p) => (seen.has(p.src) ? false : (seen.add(p.src), true))).sort((a, b) => b.key - a.key);
}

// 博物館の入り口に並べるもの：博物館の写真＋ストーリー
export async function museumItems() {
  const scenes = await getCollection('scenes');
  const stories = await getCollection('cards', (c) => c.data.kind === 'ストーリー' && c.data.page);
  return [
    ...scenes.map((s) => ({ href: `/museum/${s.id}/`, title: s.data.title, photo: s.data.photo, alt: s.data.alt, tags: s.data.tags, date: s.data.date })),
    ...stories.map((c) => ({ href: `/stories/${c.id}/`, title: c.data.title, photo: c.data.photo!, alt: c.data.alt ?? '', tags: c.data.tags, date: c.data.date })),
  ].sort((a, b) => dateKey(b.date) - dateKey(a.date));
}
