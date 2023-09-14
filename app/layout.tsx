import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/utils/merge";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					inter.className,
					"flex h-screen items-center w-full flex-col p-5 bg-zinc-900 justify-center"
				)}
			>
				<div className="w-96 flex flex-col  gap-6 bg-stone-800 py-7 rounded-lg drop-shadow-xl">
					<Header />
          <div style={{transform: "scale(1.1)"}} className="w-80 ml-8 border-y border-stone-700 mb-5"></div>
					{children}
					<Toaster />
				</div>
			</body>
		</html>
	);
}
