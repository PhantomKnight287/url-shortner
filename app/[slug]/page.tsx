import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
interface Props {
  params: {
    slug: string;
  };
}

async function RedirectToUrl(props: Props) {
  const prisma = new PrismaClient();
  const url = await prisma.shortUrl.findUnique({
    where: { slug: props.params.slug.toLowerCase() },
  });
  if (!url) return redirect("/");
  await prisma.$disconnect();
  return redirect(url.url);
  return <div>RedirectToUrl</div>;
}

export default RedirectToUrl;
