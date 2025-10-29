// src/app/[locale]/blog/[slug]/page.tsx
import "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const runtime = "nodejs";
export const revalidate = 60;

type Section = {
  heading?: string;
  bodyMd?: string;
  imageUrl?: string | null;
  imagePosition?: "left" | "right" | "full";
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const db = getFirestore();
  const snap = await db.collection("posts").doc(params.slug).get();
  if (!snap.exists) return notFound();

  const p = snap.data() as any;

  const date: Date =
    p.publishedAt?.toDate?.() ?? p.createdAt?.toDate?.() ?? new Date();

  const sections: Section[] = Array.isArray(p.sections) ? p.sections : [];
  const tags: string[] = Array.isArray(p.tags) ? p.tags : [];

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  const canonicalUrl = origin ? `${origin}/blog/${p.slug}` : `/blog/${p.slug}`;

  return (
    <main className="mx-auto max-w-4xl p-4 md:p-6">
      {/* Meta */}
      <div className="mb-3 text-sm opacity-70 flex items-center gap-2">
        <span>{date.toLocaleDateString()}</span>
        <span>•</span>
        <span>{p.author}</span>
      </div>

      {/* Title + subtitle */}
      <h1 className="text-3xl font-semibold leading-tight">{p.title}</h1>
      {p.subtitle && <h2 className="text-xl opacity-80 -mt-1">{p.subtitle}</h2>}

      {/* Cover */}
      {p.coverUrl && (
        <img
          src={p.coverUrl}
          alt=""
          className="w-full rounded-2xl my-5 object-cover"
        />
      )}

      {/* Content sections */}
      <article className="prose max-w-none">
        {sections.map((s, i) => {
          const layoutTwoCol = s.imageUrl && s.imagePosition !== "full";
          return (
            <section key={i} className="my-8">
              {s.heading && <h2>{s.heading}</h2>}

              <div
                className={
                  layoutTwoCol ? "grid md:grid-cols-2 gap-6 items-start" : ""
                }
              >
                {/* left/full image */}
                {s.imageUrl &&
                  (s.imagePosition === "left" ||
                    s.imagePosition === "full") && (
                    <img
                      src={s.imageUrl}
                      alt=""
                      className={
                        s.imagePosition === "full"
                          ? "rounded-xl w-full mb-3"
                          : "rounded-xl w-full"
                      }
                    />
                  )}

                {/* body */}
                <div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {s.bodyMd || ""}
                  </ReactMarkdown>
                </div>

                {/* right image */}
                {s.imageUrl && s.imagePosition === "right" && (
                  <img src={s.imageUrl} alt="" className="rounded-xl w-full" />
                )}
              </div>
            </section>
          );
        })}
      </article>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-10 flex items-center gap-2 flex-wrap">
          <span className="text-sm opacity-70">Tags:</span>
          {tags.map((t) => (
            <span
              key={t}
              className="text-sm italic rounded-full border px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Share links */}
      <div className="mt-6 flex items-center gap-2">
        <span className="text-sm opacity-70">Share:</span>
        <a
          className="text-sm rounded-xl border px-3 py-1"
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            canonicalUrl
          )}`}
        >
          Facebook
        </a>
        <a
          className="text-sm rounded-xl border px-3 py-1"
          target="_blank"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            canonicalUrl
          )}&title=${encodeURIComponent(p.title)}`}
        >
          LinkedIn
        </a>
        <a
          className="text-sm rounded-xl border px-3 py-1"
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            canonicalUrl
          )}&text=${encodeURIComponent(p.title)}`}
        >
          X
        </a>
      </div>

      {/* (opțional) comentarii */}
      {/* <Comments slug={p.slug} /> */}
    </main>
  );
}
