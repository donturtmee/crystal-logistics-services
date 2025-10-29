"use server";

import "@/lib/firebase-admin";
import { getServerUser } from "@/lib/auth";
import { PostInput } from "@/lib/postSchema";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

const db = getFirestore();
function assertAdmin(user: any) {
  if (!user?.admin) throw new Error("Forbidden");
}

export async function listPosts() {
  assertAdmin(await getServerUser());
  const snap = await db
    .collection("posts")
    .orderBy("publishedAt", "desc")
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function saveDraft(input: any) {
  assertAdmin(await getServerUser());
  const data = PostInput.parse(input);
  const ref = data.id
    ? db.collection("drafts").doc(data.id)
    : db.collection("drafts").doc();
  const now = Timestamp.now();
  await ref.set(
    { ...data, createdAt: data.createdAt ?? now, updatedAt: now },
    { merge: true }
  );
  return { id: ref.id };
}

export async function publishDraft(id: string) {
  assertAdmin(await getServerUser());
  const draftRef = db.collection("drafts").doc(id);
  const draft = await draftRef.get();
  if (!draft.exists) throw new Error("Draft not found");
  const d: any = draft.data();

  const postRef = db.collection("posts").doc(d.slug);
  const now = Timestamp.now();
  await postRef.set(
    {
      ...d,
      published: true,
      publishedAt: d.publishedAt ?? now,
      updatedAt: now,
    },
    { merge: true }
  );
  await draftRef.delete();

  revalidatePath("/blog");
  revalidatePath(`/blog/${d.slug}`);
  return { id: postRef.id };
}
