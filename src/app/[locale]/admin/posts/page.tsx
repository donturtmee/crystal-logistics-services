import { listPosts } from "./actions";

export default async function AdminPosts() {
  const posts = await listPosts();
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <a className="underline" href="/admin/posts/new">
          New
        </a>
      </div>
      <ul className="mt-6 space-y-2">
        {posts.map((p: any) => (
          <li key={p.id} className="rounded-xl border p-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm opacity-70">/{p.slug}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
