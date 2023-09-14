"use client";

import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function HomePageContent() {
	const urlRef = useRef<HTMLInputElement>(null);
	const slugRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const {} = useRouter;
		if (!urlRef.current?.value || !slugRef.current?.value) {
			setLoading(false);
			return toast.error("Please fill in all fields");
		}
		try {
			const req = await fetch("/api/shorten", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					url: urlRef.current?.value,
					slug: slugRef.current?.value,
				}),
			});
			const res = await req.json();
			if (!req.ok) {
				return toast.error(res.message);
			}
			toast.success("Successfully created short URL");
			push(`/success?slug=${res.slug}`);
		} catch (e) {
			toast.error("An error occurred");
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="w-96 px-5">
			<form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="url"
						className="block mb-2 ml-1 text-sm font-medium text-stone-400"
					>
						Enter URL
					</label>
					<input
						disabled={loading}
						ref={urlRef}
						type="url"
						name="url"
						id="url"
						required
						pattern="https?://.+"
						placeholder="https://example.com"
						className="shadow-sm bg-transparent border-2 border-stone-700 placeholder-stone-600 text-stone-300 outline-none text-sm rounded-lg transition-all focus:border-stone-500 block w-full p-2.5"
					/>
				</div>
				<div>
					<div className="flex flex-row items-center">
						<label
							htmlFor="slug"
							className="block mb-2 ml-1 text-sm font-medium text-stone-400"
						>
							Slug 
						<span className="text-stone-500 text-sm"> (optional)</span>
						</label>
					</div>
					<input
						disabled={loading}
						type="text"
						name="slug"
						id="slug"
						ref={slugRef}
						required
						placeholder={`.../custom-slug`}
						className="shadow-sm bg-transparent border-2 border-stone-700 placeholder-stone-600 text-stone-300 outline-none text-sm rounded-lg transition-all focus:border-stone-500 block w-full p-2.5"
					/>
				</div>

				<button
					type="submit"
					className="bg-stone-400 transition-all hover:bg-stone-100 text-black font-semibold rounded-md p-2 mt-2 text-center disabled:opacity-50 w-full disabled:cursor-not-allowed"
					disabled={loading}
				>
					{loading ? (
						<Loader2 className="w-6 h-6 animate-spin mx-auto" />
					) : (
						"Create"
					)}
				</button>
			</form>
		</div>
	);
}

export default HomePageContent;
