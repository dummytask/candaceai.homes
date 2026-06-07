"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-8 text-center">
      {/* Label */}
      <p className="text-[10px] tracking-[0.3em] text-[#888] uppercase">
        ACCESS GRANTED
      </p>

      {/* Headline */}
      <h1 className="text-4xl font-light text-white mt-4">
        You&apos;re on the list.
      </h1>

      {/* Body */}
      <p className="text-[#555] text-sm max-w-md mt-4 leading-relaxed">
        Your application has been received. You will be contacted within 72
        hours with next steps.
      </p>

      {/* Home link */}
      <Link
        href="/"
        className="border border-[#333] text-[#e8e8e8] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 mt-8 inline-block"
      >
        RETURN HOME →
      </Link>
    </div>
  );
}
