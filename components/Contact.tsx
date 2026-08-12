import Reveal from "./Reveal";
import { getSite } from "@/lib/content";

export default function Contact() {
  const { contact } = getSite();

  return (
    <section id="contact" className="layer scrim px-8 pb-24 pt-32 sm:px-14 sm:pb-28 sm:pt-44">
      <Reveal>
        <p className="label mb-3">{contact.eyebrow}</p>
        <h2
          className="mb-12 max-w-[16ch] font-semibold tracking-tight"
          style={{ fontSize: "var(--t-section)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          {contact.heading}
        </h2>

        <a
          href={`mailto:${contact.email}`}
          className="group/cta link-underline inline-flex items-center gap-4 text-2xl font-medium tracking-tight sm:text-3xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {contact.email}
          <span className="cta-arrow text-xl" aria-hidden="true">
            →
          </span>
        </a>

        <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-4">
          <a href={contact.github} target="_blank" rel="noreferrer" className="label link-underline">
            GitHub ↗
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="label link-underline">
            LinkedIn ↗
          </a>
        </div>

        <p className="label mt-24" style={{ color: "var(--text-3)" }}>
          {contact.locationLine}
        </p>
      </Reveal>
    </section>
  );
}
