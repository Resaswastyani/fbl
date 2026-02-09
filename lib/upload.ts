"use server";

import { writeFile, mkdir, unlink, stat } from "fs/promises";
import fs from "fs";
import path from "path";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

/* ================= CONFIG ================= */

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_TYPES = {
  video: ["video/mp4", "video/webm", "video/ogg"],
  pdf: ["application/pdf"],
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
} as const;

type UploadType = keyof typeof ALLOWED_TYPES;

/* ================= HELPERS ================= */

async function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

function validateFileType(file: File, type: UploadType): boolean {
  return ALLOWED_TYPES[type].includes(file.type);
}

function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

function generateFilename(originalName: string): string {
  const ext = originalName.split(".").pop() || "";
  return `${uuidv4()}.${ext}`;
}

function formatBytes(bytes: number): string {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/* ================= UPLOAD ================= */

export async function uploadFile(
  file: File,
  type: UploadType,
): Promise<{ url: string }> {
  await ensureUploadDir();

  if (!validateFileType(file, type)) {
    throw new Error(`File type not allowed for ${type}`);
  }

  if (!validateFileSize(file)) {
    throw new Error("File size exceeds maximum limit");
  }

  const filename = generateFilename(file.name);
  const filePath = join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return { url: `/uploads/${filename}` };
}

export async function uploadFiles(
  files: File[],
  type: UploadType,
): Promise<string[]> {
  const results = await Promise.all(
    files.map((file) => uploadFile(file, type)),
  );
  return results.map((r) => r.url);
}

/* ================= DELETE ================= */

export async function deleteFile(filePath: string): Promise<void> {
  const fullPath = join(process.cwd(), "public", filePath);
  await unlink(fullPath);
}

/* ================= INFO ================= */

export async function getFileInfo(filePath: string) {
  const fullPath = join(process.cwd(), "public", filePath);

  if (!fs.existsSync(fullPath)) return null;

  const stats = await stat(fullPath);

  return {
    path: filePath,
    name: path.basename(filePath),
    extension: path.extname(filePath).toLowerCase(),
    size: stats.size,
    sizeFormatted: formatBytes(stats.size),
  };
}
