import { Metadata } from "next";
import HomePageContent from "./page.content";

export const metadata: Metadata = {
  title: "Shortly",
  description: "A URL shortener",
  openGraph: {
    type: "website",
    url: "https://shortly.cantcode.fyi",
    title: "Shortly",
    description: "A URL shortener",
  },
};

export default function Home() {
  return (
    <main>
      <HomePageContent />
    </main>
  );
}
