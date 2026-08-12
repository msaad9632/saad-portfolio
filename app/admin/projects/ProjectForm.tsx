"use client";

import { useState } from "react";
import { saveProject } from "./actions";
import type { Project } from "@/lib/schema";

export default function ProjectForm({ project }: { project: Project }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("saving");
    const result = await saveProject(project.slug, formData);
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
        {project.slug}
      </p>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Name
        </span>
        <input name="name" defaultValue={project.name} className="admin-input" />
      </label>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Role
        </span>
        <input name="role" defaultValue={project.role} className="admin-input" />
      </label>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          One-liner
        </span>
        <input name="oneLiner" defaultValue={project.oneLiner} className="admin-input" />
      </label>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Description
        </span>
        <textarea name="description" defaultValue={project.description} rows={3} className="admin-input" />
      </label>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Stack (comma-separated)
        </span>
        <input name="stack" defaultValue={project.stack.join(", ")} className="admin-input" />
      </label>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Live URL
        </span>
        <input name="live" defaultValue={project.live ?? ""} className="admin-input" />
      </label>

      <label className="mb-4 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Repo URL
        </span>
        <input name="repo" defaultValue={project.repo ?? ""} className="admin-input" />
      </label>

      <div className="flex items-center gap-4">
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
