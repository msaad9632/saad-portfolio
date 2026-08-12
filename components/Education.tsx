import Timeline from "./Timeline";
import { getExperience } from "@/lib/content";

export default function Education() {
  const entries = getExperience().filter((e) => e.type === "education");
  if (entries.length === 0) return null;

  return <Timeline id="education" eyebrow="04 — Education" heading="Where it started." entries={entries} />;
}
