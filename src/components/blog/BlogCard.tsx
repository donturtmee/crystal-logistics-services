"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { BlogPost } from "../../../data/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      {/* meta */}
      <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
        <span>{post.date}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-300" />
        <span>{post.author}</span>
      </div>

      {/* imagine + categorie */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full bg-amber-400/90 px-3 py-1 text-xs font-medium text-black shadow">
            {post.category}
          </span>
        </div>

        <Image
          src={post.image}
          alt={post.title}
          width={1280}
          height={720}
          className="h-auto w-full rounded-2xl object-cover"
          priority
        />
      </div>

      {/* titluri */}
      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-extrabold tracking-tight text-zinc-900">
          {post.title}
        </h3>
        {post.subtitle ? (
          <p className="text-lg font-semibold uppercase tracking-wide text-zinc-700">
            {post.subtitle}
          </p>
        ) : null}
      </div>

      {/* excerpt + acțiuni */}
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 font-semibold">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          Vezi articolul
        </Link>

        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition group-hover:border-amber-500 group-hover:text-amber-600">
          <ExternalLink size={16} />
        </span>
      </div>

      {/* separator */}
      <div className="mt-6 border-b border-zinc-200" />
    </article>
  );
}
