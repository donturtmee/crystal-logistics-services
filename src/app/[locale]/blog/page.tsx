import "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import type { BlogPost } from "@/types/blog";

export const runtime = "nodejs";
export const revalidate = 60;

export default async function BlogIndex() {
  const db = getFirestore();
  const snap = await db
    .collection("posts")
    .orderBy("publishedAt", "desc")
    .limit(100)
    .get();

  const posts: BlogPost[] = snap.docs.map((d) => {
    const p = d.data() as any;
    return {
      slug: p.slug ?? d.id,
      title: p.title,
      subtitle: p.subtitle ?? "",
      author: p.author ?? "",
      coverUrl: p.coverUrl ?? null,
      tags: Array.isArray(p.tags) ? p.tags : [],
      excerpt: p.excerpt ?? "",
      publishedAt: p.publishedAt?.toDate?.() ?? null,
    };
  });

  const latest = posts.slice(0, 3);
  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    (post.tags ?? []).forEach((t: string) => {
      acc[t] = (acc[t] ?? 0) + 1;
    });
    return acc;
  }, {});
  const categories = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  return (
    <BlogIndexClient posts={posts} categories={categories} latest={latest} />
  );
}
