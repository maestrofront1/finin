import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'news');

const Frontmatter = z.object({
  title: z.string(),
  date: z.string(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  type: z.enum(['standard', 'announcement', 'update', 'feature']).optional().default('standard'),
  featured: z.boolean().optional().default(false),
  image: z.string().optional(),
  author: z.string().optional(),
});

export type NewsMeta = z.infer<typeof Frontmatter> & { slug: string };

export type NewsPost = {
  meta: NewsMeta;
  content: string;
  html: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPostsMeta(): NewsMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
      const file = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(file);
      const parsed = Frontmatter.parse(data);
      return { ...parsed, slug } satisfies NewsMeta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<NewsPost | null> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);
  const parsed = Frontmatter.parse(data);
  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();
  return {
    meta: { ...parsed, slug },
    content,
    html: htmlContent,
  };
}

export function getLatestPosts(limit = 3): NewsMeta[] {
  return getAllPostsMeta().slice(0, limit);
}

