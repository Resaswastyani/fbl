import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

// GET /api/trading-videos/[id] - Get single video & increment view
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const video = await prisma.tradingVideo.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Increment view count asynchronously (don't wait)
    prisma.tradingVideo
      .update({
        where: { id: params.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) => console.error("Failed to increment view count:", err));

    return NextResponse.json({ video });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 },
    );
  }
}
