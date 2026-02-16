// // app/api/upload/route.ts
// import { writeFile, mkdir } from "fs/promises";
// import { join } from "path";
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { getUserFromCookie } from "@/lib/get-user";

// // Konfigurasi tipe file yang diizinkan
// const ALLOWED_FILE_TYPES: Record<string, { dir: string; maxSize: number }> = {
//   // Images
//   "image/jpeg": { dir: "images", maxSize: 10 * 1024 * 1024 },
//   "image/png": { dir: "images", maxSize: 10 * 1024 * 1024 },
//   "image/gif": { dir: "images", maxSize: 10 * 1024 * 1024 },
//   "image/webp": { dir: "images", maxSize: 10 * 1024 * 1024 },
//   "image/svg+xml": { dir: "images", maxSize: 5 * 1024 * 1024 },
//   "image/jpg": { dir: "images", maxSize: 10 * 1024 * 1024 },

//   // Videos
//   "video/mp4": { dir: "videos", maxSize: 100 * 1024 * 1024 },
//   "video/webm": { dir: "videos", maxSize: 100 * 1024 * 1024 },
//   "video/ogg": { dir: "videos", maxSize: 100 * 1024 * 1024 },
//   "video/quicktime": { dir: "videos", maxSize: 100 * 1024 * 1024 },

//   // Documents
//   "application/pdf": { dir: "documents", maxSize: 50 * 1024 * 1024 },
//   "application/msword": { dir: "documents", maxSize: 20 * 1024 * 1024 },
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
//     dir: "documents",
//     maxSize: 20 * 1024 * 1024,
//   },
//   "application/vnd.ms-excel": { dir: "documents", maxSize: 20 * 1024 * 1024 },
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
//     dir: "documents",
//     maxSize: 20 * 1024 * 1024,
//   },
//   "application/vnd.ms-powerpoint": {
//     dir: "documents",
//     maxSize: 50 * 1024 * 1024,
//   },
//   "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
//     dir: "documents",
//     maxSize: 50 * 1024 * 1024,
//   },

//   // Archives
//   "application/zip": { dir: "files", maxSize: 100 * 1024 * 1024 },
//   "application/x-rar-compressed": { dir: "files", maxSize: 100 * 1024 * 1024 },

//   // Text
//   "text/plain": { dir: "files", maxSize: 5 * 1024 * 1024 },
// };

// // Format bytes ke human readable
// function formatBytes(bytes: number, decimals = 2): string {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Check authentication
//     const user = await getUserFromCookie();
//     if (!user) {
//       return NextResponse.json(
//         { error: "Unauthorized. Please login first." },
//         { status: 401 },
//       );
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Debug log
//     console.log("Upload attempt:", {
//       name: file.name,
//       type: file.type,
//       size: file.size,
//     });

//     // Cek tipe file - gunakan fallback untuk image/jpg
//     let fileType = file.type;
//     if (!fileType && file.name.endsWith(".jpg")) {
//       fileType = "image/jpeg";
//     }
//     if (!fileType && file.name.endsWith(".png")) {
//       fileType = "image/png";
//     }

//     const fileConfig = ALLOWED_FILE_TYPES[fileType];

//     if (!fileConfig) {
//       return NextResponse.json(
//         {
//           error: "File type not allowed",
//           receivedType: fileType,
//           filename: file.name,
//         },
//         { status: 400 },
//       );
//     }

//     // Cek ukuran file
//     if (file.size > fileConfig.maxSize) {
//       return NextResponse.json(
//         {
//           error: `File too large. Max size is ${formatBytes(fileConfig.maxSize)}`,
//           maxSize: formatBytes(fileConfig.maxSize),
//           receivedSize: formatBytes(file.size),
//         },
//         { status: 400 },
//       );
//     }

//     // Convert file ke buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Buat direktori berdasarkan tipe file
//     const uploadDir = join(process.cwd(), "public", "uploads", fileConfig.dir);

//     // Pastikan direktori ada
//     try {
//       await mkdir(uploadDir, { recursive: true });
//     } catch (mkdirError) {
//       console.error("Error creating directory:", mkdirError);
//       // Continue anyway, mungkin direktori sudah ada
//     }

//     // Generate nama file yang aman
//     const sanitizedName = file.name
//       .replace(/[^a-zA-Z0-9.-]/g, "_")
//       .replace(/_{2,}/g, "_");

//     const uniqueId = uuidv4().split("-")[0];
//     const filename = `${uniqueId}_${sanitizedName}`;
//     const filepath = join(uploadDir, filename);

//     // Simpan file
//     await writeFile(filepath, buffer);

//     // Generate URL
//     const fileUrl = `/uploads/${fileConfig.dir}/${filename}`;

//     // Generate thumbnail untuk video (placeholder)
//     let thumbnailUrl = null;
//     if (fileType.startsWith("video/")) {
//       thumbnailUrl = "/images/video-placeholder.jpg";
//     } else if (fileType.startsWith("image/")) {
//       thumbnailUrl = fileUrl;
//     }

//     // Response sukses
//     return NextResponse.json({
//       success: true,
//       url: fileUrl,
//       thumbnail: thumbnailUrl,
//       filename: sanitizedName,
//       originalName: file.name,
//       size: file.size,
//       sizeFormatted: formatBytes(file.size),
//       type: fileType,
//       category: fileConfig.dir,
//       uploadedBy: user.id,
//       uploadedAt: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to upload file",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }

// // GET - List uploaded files (optional, untuk admin)
// export async function GET(req: NextRequest) {
//   try {
//     const user = await getUserFromCookie();

//     if (!user || (user.role !== "ADMIN" && user.role !== "MENTOR")) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json({ message: "List files endpoint" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch files" },
//       { status: 500 },
//     );
//   }
// }

// app/api/upload/route.ts
// app/api/upload/route.ts - Versi Lengkap (Fixed Thumbnail + Content)
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/get-user";
import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

// BATASAN UKURAN
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; // 5MB untuk thumbnail sebelum kompres
const MAX_CONTENT_SIZE = 2 * 1024 * 1024; // 2MB untuk content Base64
const MAX_FILE_UPLOAD = 10 * 1024 * 1024; // 10MB untuk file upload biasa

// KONFIGURASI MODE UPLOAD
// Ganti ke "storage" jika ingin simpan ke folder public/uploads (recommended)
// Biarkan "base64" untuk backward compatibility
const UPLOAD_MODE: "base64" | "storage" = "storage";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// ==================== HELPER: Simpan ke Storage ====================
async function saveToStorage(
  buffer: Buffer,
  filename: string,
  folder: string,
): Promise<string> {
  const uploadDir = join(process.cwd(), "public", "uploads", folder);

  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {
    // Directory mungkin sudah ada
  }

  const uniqueId = uuidv4().split("-")[0];
  const sanitizedName = filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_");

  const finalFilename = `${uniqueId}_${sanitizedName}`;
  const filepath = join(uploadDir, finalFilename);

  await writeFile(filepath, buffer);

  return `/uploads/${folder}/${finalFilename}`;
}

// ==================== HELPER: Kompres Thumbnail ====================
async function compressThumbnail(buffer: Buffer): Promise<{
  dataUrl: string;
  size: number;
  quality: string;
}> {
  // Level 1: 150px, quality 40%
  let compressed = await sharp(buffer)
    .resize(150, null, { withoutEnlargement: true })
    .jpeg({ quality: 40, progressive: true, mozjpeg: true })
    .toBuffer();

  let quality = "normal";

  // Level 2: Jika masih besar, 120px quality 30%
  if (compressed.length > 350) {
    compressed = await sharp(buffer)
      .resize(120, null, { withoutEnlargement: true })
      .jpeg({ quality: 30, progressive: true, mozjpeg: true })
      .toBuffer();
    quality = "high-compression";
  }

  const base64 = compressed.toString("base64");
  const dataUrl = `data:image/jpeg;base64,${base64}`;

  // Level 3 (Ekstrim): 80px quality 20%
  if (dataUrl.length > 500) {
    const extreme = await sharp(buffer)
      .resize(80, null, { withoutEnlargement: true })
      .jpeg({ quality: 20, progressive: true })
      .toBuffer();

    const extremeBase64 = extreme.toString("base64");
    return {
      dataUrl: `data:image/jpeg;base64,${extremeBase64}`,
      size: extreme.length,
      quality: "extreme",
    };
  }

  return { dataUrl, size: compressed.length, quality };
}

// ==================== HELPER: Kompres Content Image ====================
async function compressContentImage(
  buffer: Buffer,
  fileType: string,
): Promise<{ dataUrl: string; size: number; compressed: boolean }> {
  // Jika sudah kecil (<500KB), gunakan as-is
  if (buffer.length < 500 * 1024) {
    const base64 = buffer.toString("base64");
    return {
      dataUrl: `data:${fileType};base64,${base64}`,
      size: buffer.length,
      compressed: false,
    };
  }

  // Kompres gambar besar
  const compressed = await sharp(buffer)
    .resize(1200, null, { withoutEnlargement: true }) // Max width 1200px
    .jpeg({ quality: 70, progressive: true })
    .toBuffer();

  const base64 = compressed.toString("base64");
  return {
    dataUrl: `data:image/jpeg;base64,${base64}`,
    size: compressed.length,
    compressed: true,
  };
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadType = (formData.get("type") as string) || "content";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Detect file type
    let fileType = file.type;
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const extensionMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };

    if (!fileType || fileType === "application/octet-stream") {
      if (fileExtension && extensionMap[fileExtension]) {
        fileType = extensionMap[fileExtension];
      }
    }

    if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
          message: `Tipe tidak diizinkan: ${fileType}`,
        },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ==================== MODE: THUMBNAIL ====================
    if (uploadType === "thumbnail") {
      if (buffer.length > MAX_THUMBNAIL_SIZE) {
        return NextResponse.json(
          {
            error: "File too large",
            message: `Max ${formatBytes(MAX_THUMBNAIL_SIZE)} untuk thumbnail`,
          },
          { status: 400 },
        );
      }

      try {
        // Opsi 1: Simpan ke storage (RECOMMENDED - tidak ada batasan karakter)
        if (UPLOAD_MODE === "storage") {
          const url = await saveToStorage(buffer, file.name, "thumbnails");
          return NextResponse.json({
            success: true,
            url: url,
            type: "thumbnail-storage",
            size: formatBytes(buffer.length),
          });
        }

        // Opsi 2: Base64 dengan kompresi agresif
        const result = await compressThumbnail(buffer);

        if (result.dataUrl.length > 500) {
          return NextResponse.json(
            {
              error: "Thumbnail too complex",
              message:
                "Gambar terlalu kompleks. Coba gambar yang lebih sederhana atau ubah UPLOAD_MODE ke 'storage'",
            },
            { status: 400 },
          );
        }

        return NextResponse.json({
          success: true,
          url: result.dataUrl,
          type: "thumbnail-base64",
          size: formatBytes(result.size),
          quality: result.quality,
          length: result.dataUrl.length,
        });
      } catch (error) {
        console.error("Thumbnail processing error:", error);
        return NextResponse.json(
          { error: "Failed to process thumbnail" },
          { status: 500 },
        );
      }
    }

    // ==================== MODE: CONTENT ====================
    if (uploadType === "content") {
      // Opsi 1: Simpan ke storage (RECOMMENDED)
      if (UPLOAD_MODE === "storage") {
        if (buffer.length > MAX_FILE_UPLOAD) {
          return NextResponse.json(
            {
              error: "File too large",
              message: `Max ${formatBytes(MAX_FILE_UPLOAD)}`,
            },
            { status: 400 },
          );
        }

        const url = await saveToStorage(buffer, file.name, "content");
        return NextResponse.json({
          success: true,
          url: url,
          type: "content-storage",
          size: formatBytes(buffer.length),
        });
      }

      // Opsi 2: Base64 (legacy - ada batasan 2MB)
      if (buffer.length > MAX_CONTENT_SIZE) {
        return NextResponse.json(
          {
            error: "File too large for Base64 mode",
            message: `Max ${formatBytes(MAX_CONTENT_SIZE)}. Gunakan UPLOAD_MODE="storage" untuk file besar`,
          },
          { status: 400 },
        );
      }

      const result = await compressContentImage(buffer, fileType);

      return NextResponse.json({
        success: true,
        url: result.dataUrl,
        type: "content-base64",
        size: formatBytes(result.size),
        compressed: result.compressed,
      });
    }

    // ==================== MODE: DEFAULT/OTHER ====================
    return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
