"use client";

import { useState } from "react";
import type { SaveResult } from "../projects/actions";

export default function SaveForm({
  title,
  action,
  children,
}: {
  title: string;
  action: (formData: FormData) => Promise<SaveResult>;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("saving");
    const result = await action(formData);
    if (result.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <form
      action={onSubmit}
      className="mb-6 rounded-sm p-6"
      style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
    >
      <p className="label mb-4" style={{ color: "var(--text-3)" }}>
        {title}
      </p>
      {children}
      <div className="mt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="label rounded-sm px-4 py-2"
          style={{ border: "1px solid var(--hairline)" }}
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
        {status === "saved" && (
          <span className="label" style={{ color: "#4ade80" }}>
            Committed — live in ~60s
          </span>
        )}
        {status === "error" && (
          <span className="label" style={{ color: "#f87171" }}>
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
