import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db";

export default async function ShortneURL(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not Allowed" });
  const { slug, url } = JSON.parse(req.body);
  console.table({slug,url})
  if (!slug) return res.status(400).json({ message: "Slug wasn't provided" });
  if (!url) return res.status(400).json({ message: "Url wasn't provided" });
  const oldUrl = await prisma.urls.findFirst({
    where: {
      slug,
    },
  });
  if (oldUrl)
    return res.status(400).json({ message: "This slug is already taken." });
  const newUrl = await prisma.urls.create({
    data: {
      url,
      slug,
      views: 0,
    },
    select: {
      url: true,
    },
  });
  return res.status(200).json(newUrl);
}
