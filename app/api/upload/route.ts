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
import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/get-user";
import { put } from "@vercel/blob";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Max size untuk thumbnail (2MB)
const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024;
// Max size untuk content images (2MB)
const MAX_CONTENT_SIZE = 2 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// Kompres image menggunakan Canvas API (browser-compatible)
async function compressImage(
  buffer: Buffer,
  maxWidth: number,
  quality: number,
  type: string,
): Promise<Buffer> {
  // Gunakan sharp jika ada (local dev), fallback ke canvas (production)
  try {
    const sharp = await import("sharp");
    return await sharp
      .default(buffer)
      .resize(maxWidth, null, { withoutEnlargement: true, fit: "inside" })
      .jpeg({ quality, progressive: true })
      .toBuffer();
  } catch (e) {
    // Fallback: return buffer as-is jika sharp tidak ada
    // Di Vercel, kita akan upload original dan biarkan Vercel Blob handle optimization
    console.warn("Sharp not available, using original buffer");
    return buffer;
  }
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
    let buffer = Buffer.from(bytes);

    // Check size
    const maxSize =
      uploadType === "thumbnail" ? MAX_THUMBNAIL_SIZE : MAX_CONTENT_SIZE;
    if (buffer.length > maxSize) {
      return NextResponse.json(
        {
          error: "File too large",
          message: `Max ${formatBytes(maxSize)}`,
        },
        { status: 400 },
      );
    }

    // ==================== MODE: THUMBNAIL (Upload ke Vercel Blob) ====================
    if (uploadType === "thumbnail") {
      try {
        // Kompres thumbnail (max 800px, quality 80%)
        const processedBuffer = await compressImage(buffer, 800, 80, fileType);

        // Generate nama file unik
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 10);
        const filename = `thumbnails/${timestamp}-${randomId}.jpg`;

        // Upload ke Vercel Blob
        const blob = await put(filename, processedBuffer, {
          access: "public",
          contentType: "image/jpeg",
          addRandomSuffix: false,
        });

        return NextResponse.json({
          success: true,
          url: blob.url, // URL pendek dari Vercel Blob
          type: "thumbnail-blob",
          size: formatBytes(processedBuffer.length),
          originalSize: formatBytes(buffer.length),
          pathname: blob.pathname,
        });
      } catch (error) {
        console.error("Thumbnail upload error:", error);
        return NextResponse.json(
          {
            error: "Upload failed",
            message:
              error instanceof Error
                ? error.message
                : "Gagal upload thumbnail ke storage",
          },
          { status: 500 },
        );
      }
    }

    // ==================== MODE: CONTENT (Base64 dengan kompresi) ====================
    if (uploadType === "content") {
      try {
        // Kompres untuk konten artikel (max 1200px, quality 85%)
        const processedBuffer = await compressImage(buffer, 1200, 85, fileType);

        // Jika masih besar (>500KB), kompres lebih agresif
        let finalBuffer = processedBuffer;
        if (processedBuffer.length > 500 * 1024) {
          finalBuffer = await compressImage(buffer, 800, 70, fileType);
        }

        // Convert ke base64
        const base64Data = finalBuffer.toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;

        // Warning jika masih panjang
        if (dataUrl.length > 50000) {
          console.warn("Content image base64 masih panjang:", dataUrl.length);
        }

        return NextResponse.json({
          success: true,
          url: dataUrl,
          type: "content-base64",
          size: formatBytes(finalBuffer.length),
          length: dataUrl.length,
        });
      } catch (error) {
        console.error("Content processing error:", error);
        return NextResponse.json(
          {
            error: "Processing failed",
            message:
              error instanceof Error ? error.message : "Gagal memproses gambar",
          },
          { status: 500 },
        );
      }
    }

    // ==================== MODE: GENERAL (Vercel Blob) ====================
    try {
      const processedBuffer = await compressImage(buffer, 1920, 90, fileType);
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 10);
      const filename = `images/${timestamp}-${randomId}.jpg`;

      const blob = await put(filename, processedBuffer, {
        access: "public",
        contentType: "image/jpeg",
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        type: "image-blob",
        size: formatBytes(processedBuffer.length),
      });
    } catch (error) {
      console.error("General upload error:", error);
      return NextResponse.json(
        {
          error: "Upload failed",
          message: error instanceof Error ? error.message : "Gagal upload",
        },
        { status: 500 },
      );
    }
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
