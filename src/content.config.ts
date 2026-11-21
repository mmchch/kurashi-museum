import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 博物館の1枚（写真の中を押して読む）
const scenes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/scenes' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),                 // 2026-11-05 または 1995年ごろ など
    tags: z.array(z.string()).default([]),
    photo: z.string(),
    alt: z.string(),
    extraPhotos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    spots: z.array(z.object({
      card: z.string(),               // cards のファイル名
      x: z.number(),                  // 写真の左から何%
      y: z.number(),                  // 写真の上から何%
      popX: z.number().default(3),    // ひとことの吹き出しの位置（%）
      popY: z.number().default(10),
    })).default([]),
  }),
});

// 1つの話 ＝ 1枚のカード（品物・ストーリー・ことば・日記・本…）
const cards = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cards' }),
  schema: z.object({
    title: z.string(),
    kind: z.string().default('品物'), // 品物 / ストーリー / ことば / 日記 / 本 / 自伝 / 音楽・ダンス
    date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    photo: z.string().optional(),
    alt: z.string().optional(),
    photos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    hitokoto: z.array(z.string()).default([]),   // 押したときに出る文（本文からそのまま）
    hitokotoPhoto: z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }).optional(),
    page: z.boolean().default(false),            // 「もっと読む」のページを作るか
    more: z.string().optional(),                 // 「もっと読む」で別のカードのページへ飛ばすとき（カードのファイル名）
    related: z.array(z.string()).default([]),    // つながりのあるカード
  }),
});

export const collections = { scenes, cards };
