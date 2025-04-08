"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Navigation() {
  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">{siteConfig.name.short}</span>
      </Link>
      <div className="flex items-center space-x-4"></div>
    </div>
  );
}
