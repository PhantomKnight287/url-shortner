import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
const bodySchema = z.object({
  slug: z
    .string({
      description: "The slug for the URL",
      invalid_type_error: "Invalid slug",
      required_error: "Slug is required",
    })
    .optional(),
  url: z.string().url({ message: "Invalid URL" }),
});

export async function POST(req: Request) {
  if (req.headers.get("CONTENT-TYPE") !== "application/json") {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
  const body = await req.json();
  const parseResult = bodySchema.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      { message: parseResult.error.errors[0].message },
      {
        status: 400,
      }
    );
  }
  const { slug, url } = parseResult.data;
  const prisma = new PrismaClient();
  if (slug) {
    const existing = await prisma.shortUrl.findUnique({
      where: {
        slug: slug.toLowerCase(),
      },
    });
    if (existing) {
      return NextResponse.json(
        { message: "Slug is already taken" },
        { status: 409 }
      );
    }
  }
  const shortUrl = await prisma.shortUrl.create({
    data: {
      slug: slug ? slug.toLowerCase() : nanoid(5),
      url,
    },
    select: {
      slug: true,
    },
  });
  return NextResponse.json(shortUrl, { status: 201 });
}
