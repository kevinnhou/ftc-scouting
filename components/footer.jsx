"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Github, Paintbrush } from "lucide-react";

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Footer() {
  const { setTheme, themes } = useTheme();

  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <footer className="border-t">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <span className="text-sm font-medium">{siteConfig.name.short}</span>
        <div className="flex items-center space-x-4">
          <Link href={siteConfig.links.repo} target="_blank">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub repository</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paintbrush className="h-5 w-5 text-primary" />
                <span className="sr-only">Change theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themes.map((theme) => (
                <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                  {capitalise(theme)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  );
}
