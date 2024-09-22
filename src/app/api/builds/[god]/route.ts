// API for fetching builds by God
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { god: string } }
) {
  const godName = params.god;

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
          some: {
            name: godName,
          },
        },
      },
      include: {
        gods: true,
        guides: {
          include: {
            steps: true,
          },
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
    console.error("Error fetching builds:", error);
    return NextResponse.json(
      { error: "Failed to fetch builds." },
      { status: 500 }
    );
  }
}
