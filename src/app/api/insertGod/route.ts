import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GODS } from "@/data/Gods"; // Import the GODS list from GODS.ts

export async function POST(req: Request) {
  try {
    // Iterate over the GODS object and insert each god into the database
    for (const godName in GODS) {
      const god = GODS[godName];

      // Insert each god into the database if it doesn't already exist
      await prisma.god.upsert({
        where: { name: god.name },
        update: {}, // Do nothing if the god already exists
        create: {
          name: god.name,
          pantheon: god.pantheon, // Use the Pantheon enum
        },
      });
    }

    return NextResponse.json(
      { message: "All gods have been inserted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting gods:", error);
    return NextResponse.json(
      { error: "Failed to insert gods." },
      { status: 500 }
    );
  }
}
