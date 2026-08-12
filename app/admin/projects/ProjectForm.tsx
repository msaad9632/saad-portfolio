"use client";

import { useState, useTransition } from "react";
import { saveProject, removeProject, moveProject, type SaveResult } from "./actions";
import type { Project } from "@/lib/schema";

export default function ProjectForm({ project, index, total }: { project: Project; index: number; total: number }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleResult(result: SaveResult) {
    if (result.ok) setStatus("saved");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  async function onSubmit(formData: FormData) {
    setStatus("saving");
    handleResult(await saveProject(project.slug, formData));
  }

  function onMove(direction: -1 | 1) {
    setStatus("saving");
    startTransition(async () => handleResult(await moveProject(project.slug, direction)));
  }

  function onRemove() {
    if (!confirm(`Remove "${project.name}"? This commits immediately.`)) return;
    setStatus("saving");
    startTransition(async () => handleResult(await removeProject(project.slug)));
  }

  return (
    <form
      action={onSubmit}
      className="mb-6 rounded-sm p-6"
      style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="label" style={{ color: "var(--text-3)" }}>
          {project.slug}
        </p>
        <div className="flex gap-3">
          <button type="button" disabled={index === 0 || pending} onClick={() => onMove(-1)} className="label" style={{ color: "var(--text-3)" }}>
            ↑ Up
          </button>
          <button
            type="button"
            disabled={index === total - 1 || pending}
            onClick={() => onMove(1)}
            className="label"
            style={{ color: "var(--text-3)" }}
          >
            ↓ Down
          </button>
          <button type="button" disabled={pending} onClick={onRemove} className="label" style={{ color: "#f87171" }}>
            Remove
          </button>
        </div>
      </div>

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
          Card size
        </span>
        <select name="size" defaultValue={project.size ?? "md"} className="admin-input">
          <option value="lg">Large (full-width, with description)</option>
          <option value="md">Medium (paired)</option>
        </select>
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
