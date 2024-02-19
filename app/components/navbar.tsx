"use client";

import Link from "next/link";
import Brand from "./brand";

export default function Navbar() {
  return (
    <nav className="w-full p-2 px-10 flex items-center justify-between border-b">
      <Brand />
      <div className="flex gap-5">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="flex gap-2">
        <a href="http://">LinkedIn</a>
        <a href="http://">Twitter</a>
        <a href="http://">Github</a>
        <a href="http://">Dribble</a>
      </div>
    </nav>
  );
}
