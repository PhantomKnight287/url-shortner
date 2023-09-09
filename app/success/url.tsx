"use client";

import toast from "react-hot-toast";

interface Props {
  slug: string;
}

function Input(props: Props) {
  return (
    <div className="flex flex-row items w-full">
      <input
        type="url"
        name="url"
        id="url"
        readOnly
        defaultValue={`${
          typeof window !== "undefined" ? window.location.origin : ""
        }/${props.slug}`}
        className="border border-gray-300 rounded-md p-2 bg-transparent w-full"
      />
      <button
        className="bg-white text-black font-semibold rounded-md p-2 ml-2"
        onClick={() => {
          navigator.clipboard
            .writeText(
              `${typeof window !== "undefined" ? window.location.origin : ""}/${
                props.slug
              }`
            )
            .then(() => {
              toast.success("Copied to clipboard");
            })
            .catch(() => {
              toast.error("An error occurred");
            });
        }}
      >
        Copy
      </button>
    </div>
  );
}

export default Input;
