// import { writeFile, mkdir } from "fs/promises";
// import { join } from "path";
// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadDir = join(process.cwd(), "public/uploads");
//   await mkdir(uploadDir, { recursive: true });

//   const filename = `${uuidv4()}-${file.name}`;
//   const filepath = join(uploadDir, filename);

//   await writeFile(filepath, buffer);

//   return NextResponse.json({
//     success: true,
//     url: `/uploads/${filename}`,
//   });
// }

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getUserFromCookie } from "@/lib/get-user";

// Konfigurasi tipe file yang diizinkan
const ALLOWED_FILE_TYPES = {
  // Images
  "image/jpeg": { dir: "images", maxSize: 10 * 1024 * 1024 }, // 10MB
  "image/png": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/gif": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/webp": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/svg+xml": { dir: "images", maxSize: 5 * 1024 * 1024 },

  // Videos
  "video/mp4": { dir: "videos", maxSize: 100 * 1024 * 1024 }, // 100MB
  "video/webm": { dir: "videos", maxSize: 100 * 1024 * 1024 },
  "video/ogg": { dir: "videos", maxSize: 100 * 1024 * 1024 },
  "video/quicktime": { dir: "videos", maxSize: 100 * 1024 * 1024 }, // MOV

  // Documents
  "application/pdf": { dir: "documents", maxSize: 50 * 1024 * 1024 }, // 50MB
  "application/msword": { dir: "documents", maxSize: 20 * 1024 * 1024 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    dir: "documents",
    maxSize: 20 * 1024 * 1024,
  }, // DOCX
  "application/vnd.ms-excel": { dir: "documents", maxSize: 20 * 1024 * 1024 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    dir: "documents",
    maxSize: 20 * 1024 * 1024,
  }, // XLSX
  "application/vnd.ms-powerpoint": {
    dir: "documents",
    maxSize: 50 * 1024 * 1024,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    dir: "documents",
    maxSize: 50 * 1024 * 1024,
  }, // PPTX

  // Archives
  "application/zip": { dir: "files", maxSize: 100 * 1024 * 1024 },
  "application/x-rar-compressed": { dir: "files", maxSize: 100 * 1024 * 1024 },

  // Text
  "text/plain": { dir: "files", maxSize: 5 * 1024 * 1024 },
};

// Format bytes ke human readable
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Cek tipe file
    const fileConfig = ALLOWED_FILE_TYPES[file.type];

    if (!fileConfig) {
      return NextResponse.json(
        {
          error: "File type not allowed",
          allowedTypes: Object.keys(ALLOWED_FILE_TYPES),
          receivedType: file.type,
        },
        { status: 400 },
      );
    }

    // Cek ukuran file
    if (file.size > fileConfig.maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Max size for ${file.type} is ${formatBytes(fileConfig.maxSize)}`,
          maxSize: formatBytes(fileConfig.maxSize),
          receivedSize: formatBytes(file.size),
        },
        { status: 400 },
      );
    }

    // Convert file ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat direktori berdasarkan tipe file
    const uploadDir = join(process.cwd(), "public", "uploads", fileConfig.dir);
    await mkdir(uploadDir, { recursive: true });

    // Generate nama file yang aman
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_") // Ganti karakter spesial dengan underscore
      .replace(/_{2,}/g, "_"); // Hindari multiple underscore

    const uniqueId = uuidv4().split("-")[0]; // Ambil 8 karakter pertama saja
    const filename = `${uniqueId}_${sanitizedName}`;
    const filepath = join(uploadDir, filename);

    // Simpan file
    await writeFile(filepath, buffer);

    // Generate URL
    const fileUrl = `/uploads/${fileConfig.dir}/${filename}`;

    // Generate thumbnail untuk video (placeholder)
    let thumbnailUrl = null;
    if (file.type.startsWith("video/")) {
      // Untuk video, bisa generate thumbnail atau gunakan placeholder
      thumbnailUrl = "/images/video-placeholder.jpg";
    } else if (file.type.startsWith("image/")) {
      // Untuk gambar, thumbnail = gambar itu sendiri
      thumbnailUrl = fileUrl;
    }

    // Response sukses
    return NextResponse.json({
      success: true,
      url: fileUrl,
      thumbnail: thumbnailUrl,
      filename: sanitizedName,
      originalName: file.name,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
      type: file.type,
      category: fileConfig.dir,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// GET - List uploaded files (optional, untuk admin)
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();

    if (!user || (user.role !== "ADMIN" && user.role !== "MENTOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Bisa ditambahkan logic untuk list files jika diperlukan

    return NextResponse.json({ message: "List files endpoint" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 },
    );
  }
}
