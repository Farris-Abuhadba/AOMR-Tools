// API for fetching a single build by ID
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { build_id: string } }
) {
  try {
    const build = await prisma.build.findUnique({
      where: { id: params.build_id },
      include: {
        gods: true,
        guides: {
          include: {
            steps: true,
          },
        },
      },
    });

    if (!build) {
      return NextResponse.json({ message: "Build not found" }, { status: 404 });
    }

    return NextResponse.json(build);
  } catch (error) {
    console.error("Error fetching build:", error);
    return NextResponse.json(
      { error: "Failed to fetch build." },
      { status: 500 }
    );
  }
}
