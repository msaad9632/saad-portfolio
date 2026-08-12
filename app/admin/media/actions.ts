"use server";

import sharp from "sharp";
import { requireAdmin } from "@/lib/session";
import { commitBinary } from "@/lib/github-commit";

export type UploadResult = { ok: true; path: string } | { ok: false; error: string };

const MAX_DIMENSION = 1920;

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  let accessToken: string;
  try {
    accessToken = await requireAdmin();
  } catch {
    return { ok: false, error: "Not signed in." };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "No file provided." };
  if (!file.type.startsWith("image/")) return { ok: false, error: "Only image files are accepted." };

  const inputBytes = Buffer.from(await file.arrayBuffer());

  let webp: Buffer;
  try {
    // .rotate() applies EXIF orientation then the pipeline drops all metadata
    // (no .withMetadata() call) — GPS/EXIF from phone photos never reaches the repo.
    webp = await sharp(inputBytes)
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return { ok: false, error: "Could not process that image — is it a valid image file?" };
  }

  const safeName = String(formData.get("name") ?? file.name)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const path = `public/uploads/${Date.now()}-${safeName || "image"}.webp`;

  try {
    await commitBinary(accessToken, path, webp, `admin: upload ${path}`);
  } catch (e) {
    return { ok: false, error: `Upload failed: ${e instanceof Error ? e.message : "unknown error"}` };
  }

  return { ok: true, path: `/${path.replace(/^public\//, "")}` };
}
