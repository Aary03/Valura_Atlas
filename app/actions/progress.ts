"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Upserts a Progress record for the current user + lessonId.
 * Called on "Next →" click — idempotent on re-click.
 */
export async function markLessonComplete(lessonId: string, revalidateSlug: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  if (!userId) return { error: "Not authenticated" };

  await db.progress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId },
    update: { completedAt: new Date() },
  });

  revalidatePath(`/modules/${revalidateSlug}`);
  revalidatePath("/explore");

  return { success: true };
}
