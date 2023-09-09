import Link from "next/link";
import Input from "./url";
import { Metadata } from "next";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}
export const metadata: Metadata = {
  title: "Success",
  description: "Your shortened link has been created successfully.",
};

function Success(props: Props) {
  return (
    <main className="mt-10">
      <div className="flex flex-col items-start space-y-5">
        <h1 className="text-2xl font-semibold">Success!</h1>
        <p className="text-gray-500">
          Your shortened link has been created successfully.{" "}
        </p>
        <Input slug={props.searchParams.slug} />
        <Link
          href={"/"}
          className="bg-white text-black font-semibold rounded-md p-2 my-2 hover:bg-white/80 w-full text-center mt-5"
        >
          Shorten another link
        </Link>
      </div>
    </main>
  );
}

export default Success;
