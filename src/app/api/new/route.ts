import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface BuildStep {
  description: string;
  isNote: boolean;
  time: number;
  workingBuilding: number | null;
  workingFood: number | null;
  workingWood: number | null;
  workingGold: number | null;
  workingFavor: number | null;
}

interface BuildGuide {
  name: string;
  author: string;
  description: string;
  gods: string[];
  tags: string[];
  rating: number;
  guide: {
    [key: string]: BuildStep[];
  };
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body: BuildGuide = await req.json();

    const { name, author, description, gods, tags, rating, guide } = body;

    // Dynamically handle all the ages and steps
    const guideSteps = Object.entries(guide).flatMap(([age, steps]) =>
      steps.map((step) => ({
        age: age as "i" | "ii" | "iii" | "iv" | "v",
        description: step.description || null,
        isNote: step.isNote || false,
        time: step.time || null,
        workingBuilding: step.workingBuilding || null,
        workingFood: step.workingFood || null,
        workingWood: step.workingWood || null,
        workingGold: step.workingGold || null,
        workingFavor: step.workingFavor || null,
      }))
    );

    // Create the Build and associated BuildSteps in the database
    const build = await prisma.build.create({
      data: {
        name,
        author,
        description,
        gods,
        tags,
        rating,
        build: {
          create: guideSteps,
        },
      },
    });

    return NextResponse.json(build, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Error creating build" },
      { status: 500 }
    );
  }
}
