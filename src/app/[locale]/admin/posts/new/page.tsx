"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Section as SectionType } from "@/lib/postSchema";
import ImageUploader from "@/components/admin/ImageUploader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveDraft, publishDraft } from "../actions";

function Toolbar({ onBold, onItalic, onLink }: any) {
  return (
    <div className="flex gap-2 text-sm">
      <button
        type="button"
        onClick={onBold}
        className="border rounded px-2 py-1"
      >
        B
      </button>
      <button
        type="button"
        onClick={onItalic}
        className="border rounded px-2 py-1 italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={onLink}
        className="border rounded px-2 py-1 underline"
      >
        Link
      </button>
    </div>
  );
}

function SectionEditor({
  idx,
  value,
  onChange,
  slug,
}: {
  idx: number;
  value: SectionType;
  onChange: (v: SectionType) => void;
  slug: string;
}) {
  function applyMd(wrapLeft: string, wrapRight = wrapLeft) {
    const sel = window.getSelection();
    // simplu: adaugă la final
    onChange({
      ...value,
      bodyMd: `${value.bodyMd}${wrapLeft}text${wrapRight}`,
    });
  }
  return (
    <div className="border rounded-2xl p-4 space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="border rounded-xl p-2"
          placeholder="Titlu secțiune"
          value={value.heading ?? ""}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
        <select
          className="border rounded-xl p-2"
          value={value.imagePosition}
          onChange={(e) =>
            onChange({ ...value, imagePosition: e.target.value as any })
          }
        >
          <option value="full">Imagine full</option>
          <option value="left">Imagine stânga</option>
          <option value="right">Imagine dreapta</option>
        </select>
      </div>

      <Toolbar
        onBold={() => onChange({ ...value, bodyMd: `${value.bodyMd}**text**` })}
        onItalic={() => onChange({ ...value, bodyMd: `${value.bodyMd}*text*` })}
        onLink={() =>
          onChange({ ...value, bodyMd: `${value.bodyMd}[text](https://)` })
        }
      />

      <textarea
        className="w-full min-h-[160px] border rounded-xl p-2 font-mono"
        placeholder="Text (Markdown suportă **bold**, *italic*, [link](url), liste, etc.)"
        value={value.bodyMd}
        onChange={(e) => onChange({ ...value, bodyMd: e.target.value })}
      />

      <div className="flex items-center gap-3">
        <ImageUploader
          pathPrefix={`posts/${slug}/s-${idx}`}
          onUploaded={(url) => onChange({ ...value, imageUrl: url })}
          label={value.imageUrl ? "Încarcă altă imagine" : "Încarcă imagine"}
        />
        {value.imageUrl && (
          <span className="text-xs break-all opacity-70">setată</span>
        )}
      </div>
    </div>
  );
}

export default function NewPostPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string>(""); // comma-separated
  const [sections, setSections] = useState<SectionType[]>([
    { heading: "", bodyMd: "", imagePosition: "full" } as any,
  ]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function updateSection(i: number, v: SectionType) {
    const next = sections.slice();
    next[i] = v;
    setSections(next);
  }

  const tagsArr = useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags]
  );

  async function onPublish() {
    try {
      setBusy(true);
      setErr(null);
      const { id } = await saveDraft({
        slug,
        title,
        subtitle,
        author,
        coverUrl: coverUrl || undefined,
        tags: tagsArr,
        sections,
        published: false,
      });
      await publishDraft(id);
      router.replace(`/admin/posts`);
    } catch (e: any) {
      setErr(e?.message ?? "Eroare la publicare");
    } finally {
      setBusy(false);
    }
  }

  async function onSaveDraft() {
    try {
      setBusy(true);
      setErr(null);
      await saveDraft({
        slug,
        title,
        subtitle,
        author,
        coverUrl: coverUrl || undefined,
        tags: tagsArr,
        sections,
        published: false,
      });
    } catch (e: any) {
      setErr(e?.message ?? "Eroare la salvare");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-6 grid lg:grid-cols-2 gap-8">
      {/* Editor */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Posts</h1>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="border rounded-xl p-2"
            placeholder="Slug (ex: viitorul-transportului)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <input
            className="border rounded-xl p-2"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="md:col-span-2 border rounded-xl p-2"
            placeholder="Titlu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="md:col-span-2 border rounded-xl p-2"
            placeholder="Subtitlu"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <ImageUploader
            pathPrefix={`posts/${slug}/cover`}
            onUploaded={setCoverUrl}
            label={coverUrl ? "Schimbă cover" : "Încarcă cover"}
          />
          {coverUrl && (
            <span className="text-xs break-all opacity-70">cover setat</span>
          )}
        </div>

        <div>
          <label className="text-sm">Tag-uri (separate prin virgulă)</label>
          <input
            className="w-full border rounded-xl p-2"
            placeholder="logistică, transport, supply-chain"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Secțiuni</h2>
            <button
              type="button"
              className="border rounded-xl px-3 py-1"
              onClick={() =>
                setSections([
                  ...sections,
                  { heading: "", bodyMd: "", imagePosition: "full" } as any,
                ])
              }
            >
              + Adaugă secțiune
            </button>
          </div>

          {sections.map((s, i) => (
            <div key={i} className="space-y-2">
              <SectionEditor
                idx={i}
                value={s}
                onChange={(v) => updateSection(i, v)}
                slug={slug || "draft"}
              />
              <button
                type="button"
                className="text-xs opacity-70 underline"
                onClick={() => setSections(sections.filter((_, j) => j !== i))}
              >
                șterge secțiunea
              </button>
            </div>
          ))}
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <div className="flex gap-3">
          <button
            onClick={onSaveDraft}
            disabled={busy}
            className="border rounded-xl px-4 py-2"
          >
            Salvează draft
          </button>
          <button
            onClick={onPublish}
            disabled={busy}
            className="border rounded-xl px-4 py-2"
          >
            Publică
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="bg-neutral-50 rounded-2xl p-5 border">
        <article className="prose max-w-none">
          <p className="text-sm opacity-60">
            {new Date().toLocaleDateString()} • {author || "Autor"}
          </p>
          <h1>{title || "Titlu articol"}</h1>
          {subtitle && <h3 className="opacity-80 -mt-3">{subtitle}</h3>}
          {coverUrl && (
            <img src={coverUrl} alt="" className="rounded-xl my-4" />
          )}

          {sections.map((s, i) => (
            <section key={i} className="my-6">
              {s.heading && <h2>{s.heading}</h2>}
              <div
                className={
                  s.imageUrl && s.imagePosition !== "full"
                    ? "grid md:grid-cols-2 gap-4 items-start"
                    : ""
                }
              >
                {s.imageUrl &&
                  (s.imagePosition === "left" ||
                    s.imagePosition === "full") && (
                    <img
                      src={s.imageUrl}
                      className={
                        s.imagePosition === "full"
                          ? "rounded-xl w-full mb-3"
                          : "rounded-xl w-full"
                      }
                    />
                  )}
                <div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {s.bodyMd || "*Paragraf...*"}
                  </ReactMarkdown>
                </div>
                {s.imageUrl && s.imagePosition === "right" && (
                  <img src={s.imageUrl} className="rounded-xl w-full" />
                )}
              </div>
            </section>
          ))}

          {/* SHARE preview */}
          <div className="flex items-center gap-3 not-prose mt-10">
            <span className="text-sm opacity-70">Share:</span>
            <div className="flex gap-2">
              <span className="border rounded px-2 py-1 text-sm">Facebook</span>
              <span className="border rounded px-2 py-1 text-sm">LinkedIn</span>
              <span className="border rounded px-2 py-1 text-sm">X</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
