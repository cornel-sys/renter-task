import Link from "next/link";
import { Suspense } from "react";
import Bikes from "./bikes";

export default async function Bike() {
  return (
    <main className="flex h-screen w-screen items-center flex-col mt-32 gap-10">
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <Bikes />
      </Suspense>
      <Link href={"/"}>
        <button className="border-2 bg-slate-300 py-2 px-4 rounded-xl ">
          Back Home
        </button>
      </Link>
    </main>
  );
}
