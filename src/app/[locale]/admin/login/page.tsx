"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { fbAuth } from "@/lib/firebase-client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();

  const [isPending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  // email/password form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function establishSession(idToken: string) {
    const res = await fetch("/api/session/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  function toAdmin() {
    start(() => router.replace(`/${locale}/admin/posts`));
  }

  async function loginWithGoogle() {
    setErr(null);
    try {
      const cred = await signInWithPopup(fbAuth, new GoogleAuthProvider());
      const idToken = await cred.user.getIdToken(true);
      await establishSession(idToken);
      toAdmin();
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    }
  }

  async function loginWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const cred = await signInWithEmailAndPassword(
        fbAuth,
        email.trim(),
        password
      );
      const idToken = await cred.user.getIdToken(true);
      await establishSession(idToken);
      toAdmin();
    } catch (e: any) {
      // mesaje mai prietenoase pt. erorile uzuale
      const msg = String(e?.code || e?.message || "");
      if (msg.includes("auth/invalid-credential"))
        setErr("Email sau parolă incorecte.");
      else if (msg.includes("auth/user-disabled"))
        setErr("Contul este dezactivat.");
      else setErr(e?.message ?? "Eroare la autentificare.");
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-sm opacity-70">
          Acces doar pentru utilizatori cu rol de admin.
        </p>
      </header>

      {/* Email + Parolă */}
      <form onSubmit={loginWithEmail} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-xl border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@exemplu.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Parolă</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl border px-4 py-2"
        >
          {isPending ? "Se autentifică..." : "Intră"}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs opacity-60">sau</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {/* Google */}
      <button
        onClick={loginWithGoogle}
        disabled={isPending}
        className="w-full rounded-xl border px-4 py-2"
      >
        {isPending ? "Se autentifică..." : "Continuă cu Google"}
      </button>

      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
