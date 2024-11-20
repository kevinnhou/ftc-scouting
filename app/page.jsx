import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(51%_51%_at_-11%_9%,#f2ff61a3_1%,#f2ff6100_100%),radial-gradient(51%_67%_at_115%_96%,#06B48B_0%,#ff57dd00_100%),radial-gradient(50%_66%_at_50%_50%,#6666FF_0%,#ff57dd00_100%),radial-gradient(22%_117%_at_2%_87%,#59b8a200_20%,#00f3ba94_100%),linear-gradient(0deg,#90E4C1_0%,#d3e5eea3_100%)]">
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center px-4">
        <h1 className="animate-fade-in-up text-5xl font-bold text-black sm:text-7xl md:text-8xl">
          Try Curator
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-medium text-black sm:text-2xl md:text-3xl">
          Optimise Your Strategy With Curator
        </p>
        <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/docs">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              View Docs
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/scout">
            <Button
              size="lg"
              variant="outline"
              className="border-black bg-white text-black hover:bg-black/10"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
