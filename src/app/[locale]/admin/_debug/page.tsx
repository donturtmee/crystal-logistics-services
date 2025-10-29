"use client";

import { fbAuth } from "@/lib/firebase-client";
import { useEffect, useState } from "react";

export default function AdminDebug() {
  const [state, setState] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = fbAuth.currentUser;
        if (!user) return setErr("Nu ești logat în Firebase (client).");
        const t = await user.getIdTokenResult(true);
        setState({
          email: user.email,
          admin: (t.claims as any).admin === true,
          claims: t.claims,
        });
      } catch (e: any) {
        setErr(e?.message || "Eroare");
      }
    })();
  }, []);

  if (err) return <pre className="p-4 text-red-600">{err}</pre>;
  return <pre className="p-4">{JSON.stringify(state, null, 2)}</pre>;
}
