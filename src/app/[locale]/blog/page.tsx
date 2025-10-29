import BlogCard from "@/components/blog/BlogCard";
import Sidebar from "@/components/blog/Sidebar";
import Pagination from "@/components/blog/Pagination";
import { BLOG_POSTS } from "../../../../data/blog";

export const revalidate = 0; // doar pentru mock; vom trece pe ISR după integrarea Firebase

export default function BlogPage() {
  const posts = BLOG_POSTS; // în curând: fetch din Firestore

  return (
    <main className="min-h-screen bg-white">
      {/* Header „/ BLOG / CRYSTAL LOGISTICS” – opțional: fă separat ca hero */}
      <section className="bg-amber-400">
        <div className="mx-auto max-w-6xl px-4 py-10 text-zinc-900">
          <div className="text-sm font-semibold">/ BLOG /</div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            CRYSTAL LOGISTICS
          </h1>
        </div>
      </section>

      {/* Conținut */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* listă articole */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-10">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>

            <div className="mt-6 border-t border-zinc-200 pt-4">
              <Pagination />
            </div>
          </div>

          {/* sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
