// // import { writeFile, mkdir } from "fs/promises";
// // import { join } from "path";
// // import { NextResponse } from "next/server";
// // import { v4 as uuidv4 } from "uuid";

// // export async function POST(req: Request) {
// //   const formData = await req.formData();
// //   const file = formData.get("file") as File;

// //   if (!file) {
// //     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
// //   }

// //   const bytes = await file.arrayBuffer();
// //   const buffer = Buffer.from(bytes);

// //   const uploadDir = join(process.cwd(), "public/uploads");
// //   await mkdir(uploadDir, { recursive: true });

// //   const filename = `${uuidv4()}-${file.name}`;
// //   const filepath = join(uploadDir, filename);

// //   await writeFile(filepath, buffer);

// //   return NextResponse.json({
// //     success: true,
// //     url: `/uploads/${filename}`,
// //   });
// // }

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
import { v4 as uuidv4 } from "uuid";
import { getUserFromCookie } from "@/lib/get-user";

// Konfigurasi tipe file yang diizinkan
const ALLOWED_FILE_TYPES: Record<string, { dir: string; maxSize: number }> = {
  // Images
  "image/jpeg": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/png": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/gif": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/webp": { dir: "images", maxSize: 10 * 1024 * 1024 },
  "image/svg+xml": { dir: "images", maxSize: 5 * 1024 * 1024 },

  // Videos
  "video/mp4": { dir: "videos", maxSize: 100 * 1024 * 1024 },
  "video/webm": { dir: "videos", maxSize: 100 * 1024 * 1024 },
  "video/ogg": { dir: "videos", maxSize: 100 * 1024 * 1024 },

  // Documents
  "application/pdf": { dir: "documents", maxSize: 50 * 1024 * 1024 },
  "application/msword": { dir: "documents", maxSize: 20 * 1024 * 1024 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    dir: "documents",
    maxSize: 20 * 1024 * 1024,
  },
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

    // Debug log
    console.log("Upload attempt:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Deteksi tipe file dari extension jika type tidak tersedia
    let fileType = file.type;
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileType || fileType === "application/octet-stream") {
      // Fallback berdasarkan extension
      const extensionMap: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        mp4: "video/mp4",
        webm: "video/webm",
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };

      if (fileExtension && extensionMap[fileExtension]) {
        fileType = extensionMap[fileExtension];
      }
    }

    const fileConfig = ALLOWED_FILE_TYPES[fileType];

    if (!fileConfig) {
      return NextResponse.json(
        {
          error: "File type not allowed",
          receivedType: fileType,
          filename: file.name,
          allowedTypes: Object.keys(ALLOWED_FILE_TYPES),
        },
        { status: 400 },
      );
    }

    // Cek ukuran file
    if (file.size > fileConfig.maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Max size is ${formatBytes(fileConfig.maxSize)}`,
          maxSize: formatBytes(fileConfig.maxSize),
          receivedSize: formatBytes(file.size),
        },
        { status: 400 },
      );
    }

    // Convert file ke base64 untuk storage (karena Vercel read-only filesystem)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    // Generate nama file yang aman
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/_{2,}/g, "_");

    const uniqueId = uuidv4().split("-")[0];
    const filename = `${uniqueId}_${sanitizedName}`;

    // Simpan ke database atau external storage
    // Untuk sekarang, kita gunakan base64 data URL untuk development
    // Di production, gunakan Cloudinary, S3, atau service lain

    let fileUrl: string;
    let thumbnailUrl: string | null = null;

    // Jika image, buat data URL
    if (fileType.startsWith("image/")) {
      fileUrl = `data:${fileType};base64,${base64Data}`;
      thumbnailUrl = fileUrl;
    } else if (fileType.startsWith("video/")) {
      // Untuk video, tetap perlu external storage
      // Sementara return error dengan instruksi
      return NextResponse.json(
        {
          error:
            "Video upload requires external storage. Please use YouTube URL instead.",
          code: "VIDEO_STORAGE_REQUIRED",
        },
        { status: 400 },
      );
    } else {
      // Untuk dokumen lain
      fileUrl = `data:${fileType};base64,${base64Data}`;
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
      type: fileType,
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
        stack: error instanceof Error ? error.stack : undefined,
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

    return NextResponse.json({ message: "List files endpoint" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 },
    );
  }
}
