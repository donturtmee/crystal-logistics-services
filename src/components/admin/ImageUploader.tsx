"use client";

import { useState } from "react";
import { fbClient } from "@/lib/firebase-client";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Props = {
  pathPrefix: string; // ex: posts/<slug>/cover or posts/<slug>/s-<idx>
  onUploaded: (url: string) => void;
  className?: string;
  label?: string;
};

export default function ImageUploader({
  pathPrefix,
  onUploaded,
  className = "",
  label = "Încarcă imagine",
}: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErr(null);
    setBusy(true);
    try {
      const storage = getStorage(fbClient);
      const key = `${pathPrefix}/${crypto.randomUUID()}-${f.name}`;
      const r = ref(storage, key);
      await uploadBytes(r, f);
      const url = await getDownloadURL(r);
      onUploaded(url);
    } catch (e: any) {
      setErr(e?.message ?? "Upload error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFile}
        />
        <span className="rounded-xl border px-3 py-2">
          {busy ? "Se încarcă..." : label}
        </span>
      </label>
      {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
    </div>
  );
}
