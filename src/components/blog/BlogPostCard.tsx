"use client";

import type { BlogPost } from "@/types/blog";
import { formatRoDate } from "@/lib/date";

export default function BlogPostCard({
  post,
  featured,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const date = post.publishedAt ? new Date(post.publishedAt) : null;
  const tag = post.tags?.[0];

  return (
    <article className="pb-10 border-b last:border-b-0">
      {/* meta */}
      <div className="mb-3 flex items-center gap-2 text-[15px] text-black/70">
        {date && <span className="font-medium">{formatRoDate(date)}</span>}
        <span className="inline-block h-[8px] w-[8px] rounded-full bg-[#EAC31F]" />
        <span className="font-medium">{post.author}</span>
      </div>

      {/* cover + badge inset, colțuri doar jos */}
      <div className="relative overflow-hidden rounded-[14px] md:rounded-[16px] shadow-sm">
        {post.coverUrl && (
          <a href={`/blog/${post.slug}`}>
            <img
              src={post.coverUrl}
              alt=""
              className={`w-full object-cover ${
                featured ? "h-[260px] md:h-[360px]" : "h-[220px] md:h-[300px]"
              }`}
            />
          </a>
        )}
        {tag && (
          <div className="absolute left-4 top-4">
            <span className="inline-block px-5 py-2 text-[14px] font-semibold text-black select-none rounded-tl-lg rounded-br-lg bg-[#EAC31F] shadow-sm">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* titles */}
      <a href={`/blog/${post.slug}`} className="no-underline hover:underline">
        <h2 className="mt-5 text-2xl md:text-3xl font-extrabold tracking-tight">
          {post.title}
        </h2>
      </a>
      {post.subtitle && (
        <h3 className="mt-1 text-lg md:text-2xl font-semibold uppercase tracking-[0.08em] text-black/75">
          {post.subtitle}
        </h3>
      )}

      {/* excerpt */}
      {post.excerpt && (
        <p className="mt-4 max-w-3xl text-[15px] md:text-base leading-relaxed text-black/85">
          {post.excerpt}
        </p>
      )}

      {/* CTA – colțuri mai puțin rotunjite, icon box inset, hover fill L→R */}
      <div className="mt-5">
        <a
          href={`/blog/${post.slug}`}
          className="
            group relative inline-flex h-11 items-center overflow-hidden
            rounded-xl border border-[#EAC31F] pl-4 pr-16 text-black shadow-sm
          "
        >
          {/* layer de umplere (hover) */}
          <span
            className="
              pointer-events-none absolute left-0 top-0 h-full w-0 bg-[#EAC31F]
              transition-[width] duration-300 ease-out group-hover:w-full
            "
            aria-hidden
          />

          {/* text */}
          <span className="relative z-10 font-semibold">Vezi articolul</span>

          {/* cartuș cu icon – ușor înăuntru, aliniat pe dreapta; aceeași rază cu butonul */}
          <span
            className="
              absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center
              rounded-xl border border-[#EAC31F] bg-[#EAC31F] z-10
              transition-colors duration-300 group-hover:bg-transparent
            "
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
}
