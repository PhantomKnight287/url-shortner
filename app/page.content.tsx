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
    <div className="mt-10">
      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <label htmlFor="url" className="text-gray-500">
          URL
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
          className="border border-gray-300 rounded-md p-2 bg-transparent"
        />
        <div className="flex flex-row items-center">
          <label htmlFor="slug" className="text-gray-500">
            Slug
          </label>
          <span className="text-gray-500 text-sm">(optional)</span>
        </div>
        <input
          disabled={loading}
          type="text"
          name="slug"
          id="slug"
          ref={slugRef}
          required
          placeholder={`Slug`}
          className="border border-gray-300 rounded-md p-2 bg-transparent"
        />

        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-md p-2 mt-2 text-center disabled:opacity-50 w-full disabled:cursor-not-allowed"
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
