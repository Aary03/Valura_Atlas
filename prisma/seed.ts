import { PrismaClient } from "@prisma/client";
import { SEED_MODULES } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding Valura Atlas database…\n");

  // ── Wipe in dependency order ──────────────────────────────
  await prisma.progress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.module.deleteMany();

  // ── Seed ─────────────────────────────────────────────────
  for (const mod of SEED_MODULES) {
    const { chapterData, outcomes, ...moduleFields } = mod;

    const created = await prisma.module.create({
      data: {
        ...moduleFields,
        outcomes: JSON.stringify(outcomes),
      },
    });

    console.log(`  ✓ Module ${created.order}: ${created.title}`);

    for (const ch of chapterData) {
      const { lessons, ...chapterFields } = ch;

      const chapter = await prisma.chapter.create({
        data: { ...chapterFields, moduleId: created.id },
      });

      console.log(`      Chapter ${ch.order}: ${ch.title}`);

      for (const lesson of lessons) {
        await prisma.lesson.create({
          data: { ...lesson, chapterId: chapter.id },
        });
        console.log(`        └─ ${lesson.title} (${lesson.readTime} min)`);
      }
    }

    console.log();
  }

  const counts = await Promise.all([
    prisma.module.count(),
    prisma.chapter.count(),
    prisma.lesson.count(),
  ]);

  console.log(
    `✅  Done — ${counts[0]} modules · ${counts[1]} chapters · ${counts[2]} lessons\n`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
