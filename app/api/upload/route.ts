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
import { put } from "@vercel/blob";
import { getUserFromCookie } from "@/lib/get-user";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Max size untuk base64 content (2MB)
const MAX_CONTENT_SIZE = 2 * 1024 * 1024;
// Max size untuk thumbnail file (4.5MB - batas Vercel Blob)
const MAX_THUMBNAIL_SIZE = 4.5 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadType = (formData.get("type") as string) || "content";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("Upload attempt:", {
      name: file.name,
      type: file.type,
      size: file.size,
      uploadType,
    });

    // Deteksi tipe file dengan fallback
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

    // Validasi tipe file
    if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
          message: `Tipe file tidak diizinkan: ${fileType || fileExtension}. Gunakan: JPG, PNG, GIF, WEBP`,
        },
        { status: 400 },
      );
    }

    // Convert file ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ==================== MODE: THUMBNAIL (Save to Vercel Blob) ====================
    if (uploadType === "thumbnail") {
      // Validasi ukuran untuk thumbnail
      if (buffer.length > MAX_THUMBNAIL_SIZE) {
        return NextResponse.json(
          {
            error: "File too large",
            message: `Thumbnail terlalu besar (${formatBytes(buffer.length)}). Maksimal ${formatBytes(MAX_THUMBNAIL_SIZE)}.`,
          },
          { status: 400 },
        );
      }

      try {
        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedName = file.name
          .replace(/[^a-zA-Z0-9.-]/g, "_")
          .replace(/_{2,}/g, "_");

        const filename = `thumbnails/${timestamp}-${sanitizedName}`;

        // Upload ke Vercel Blob
        const blob = await put(filename, buffer, {
          access: "public",
          contentType: fileType,
        });

        console.log("Thumbnail saved to Vercel Blob:", blob.url);

        return NextResponse.json({
          success: true,
          url: blob.url, // URL lengkap dari Vercel Blob (contoh: https://xxxxx.blob.vercel-storage.com/thumbnails/...)
          type: "thumbnail",
          size: formatBytes(buffer.length),
          filename: filename,
        });
      } catch (blobError) {
        console.error("Vercel Blob error:", blobError);
        return NextResponse.json(
          {
            error: "Upload failed",
            message:
              "Gagal mengupload ke storage. Pastikan BLOB_READ_WRITE_TOKEN sudah di-set di environment variables.",
          },
          { status: 500 },
        );
      }
    }

    // ==================== MODE: CONTENT (Base64) ====================
    // Validasi ukuran untuk content
    if (buffer.length > MAX_CONTENT_SIZE) {
      return NextResponse.json(
        {
          error: "File too large",
          message: `Gambar terlalu besar (${formatBytes(buffer.length)}). Maksimal ${formatBytes(MAX_CONTENT_SIZE)} untuk konten artikel.`,
        },
        { status: 400 },
      );
    }

    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${fileType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      type: "content",
      size: formatBytes(buffer.length),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat upload",
      },
      { status: 500 },
    );
  }
}
