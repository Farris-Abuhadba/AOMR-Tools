// API for fetching a single build by ID
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { build_id: string } }
) {
  try {
    const build = await prisma.build.findUnique({
      where: {
        id: params.build_id,
      },
    });

    if (!build) {
      return NextResponse.json({ message: "Build not found" }, { status: 404 });
    }

    return NextResponse.json(build);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch build" },
      { status: 500 }
    );
  }
}
