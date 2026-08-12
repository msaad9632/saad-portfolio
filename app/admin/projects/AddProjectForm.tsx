"use client";

import { useState } from "react";
import { addProject } from "./actions";

export default function AddProjectForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("saving");
    const result = await addProject(formData);
    if (result.ok) setStatus("saved");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <form action={onSubmit} className="mb-6 rounded-sm p-6" style={{ border: "1px dashed var(--hairline)" }}>
      <p className="label mb-4" style={{ color: "var(--text-3)" }}>
        Add new project
      </p>
      <input name="slug" placeholder="slug (e.g. my-project)" className="admin-input mb-3" required />
      <input name="name" placeholder="Name" className="admin-input mb-3" />
      <input name="role" placeholder="Role (e.g. Solo)" className="admin-input mb-3" />
      <input name="oneLiner" placeholder="One-liner" className="admin-input mb-3" />
      <textarea name="description" placeholder="Description" rows={3} className="admin-input mb-3" />
      <input name="stack" placeholder="Stack (comma-separated)" className="admin-input mb-4" />
      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === "saving"} className="label rounded-sm px-4 py-2" style={{ border: "1px solid var(--hairline)" }}>
          {status === "saving" ? "Adding…" : "Add project"}
        </button>
        {status === "saved" && (
          <span className="label" style={{ color: "#4ade80" }}>
            Committed — live in ~60s. Add images via Media, then edit the project.
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
