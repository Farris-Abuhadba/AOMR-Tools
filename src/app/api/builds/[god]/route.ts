import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const godName = searchParams.get("god");

  if (!godName) {
    return NextResponse.json(
      { error: "God name is required" },
      { status: 400 }
    );
  }

  try {
    const builds = await prisma.build.findMany({
      where: {
        gods: {
          has: godName,
        },
      },
    });

    if (builds.length === 0) {
      return NextResponse.json(
        { error: `No builds found for ${godName}` },
        { status: 404 }
      );
    }

    return NextResponse.json(builds);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch builds" },
      { status: 500 }
    );
  }
}
