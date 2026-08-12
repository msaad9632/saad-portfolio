import Timeline from "./Timeline";
import { getExperience } from "@/lib/content";

export default function Experience() {
  const entries = getExperience().filter((e) => e.type === "work");
  if (entries.length === 0) return null;

  return <Timeline id="experience" eyebrow="03 — Experience" heading="Where the work happened." entries={entries} />;
}
