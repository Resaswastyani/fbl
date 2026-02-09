import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${uuidv4()}-${file.name}`;
  const filepath = join(uploadDir, filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({
    success: true,
    url: `/uploads/${filename}`,
  });
}
