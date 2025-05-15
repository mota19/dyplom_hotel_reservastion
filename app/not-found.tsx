"use client";
import Link from "next/link";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="m-auto flex min-h-screen max-w-[1440px] flex-col">
      <Header />
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl">
          <h2 className="mb-4 text-4xl font-extrabold text-red-600">
            404 – Page Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => router.back()}
              className="flex-1 cursor-pointer rounded-lg border border-blue-600 px-6 py-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Go Back
            </button>
            <Link
              href="/"
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition hover:bg-blue-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
