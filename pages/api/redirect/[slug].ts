import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

export default async function RedirectToRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const url = await prisma.urls.findFirst({
    where: {
      slug: (slug! as string).toLowerCase(),
    },
  });
  if (!url) return res.status(404).json({ message: "Slug not found" });
  await prisma.urls.update({
    where: {
      slug: url.slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  return res.status(308).redirect(url.url);
}
