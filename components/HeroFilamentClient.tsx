"use client";

import dynamic from "next/dynamic";
import type { HeroVisual } from "@/lib/schema";

const HeroFilament = dynamic(() => import("./HeroFilament"), { ssr: false });

export default function HeroFilamentClient({ visual }: { visual?: Partial<HeroVisual> }) {
  return <HeroFilament visual={visual} />;
}
