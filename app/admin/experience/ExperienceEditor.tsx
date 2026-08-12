"use client";

import { useState, useTransition } from "react";
import { updateEntry, addEntry, removeEntry, moveEntry } from "./actions";
import type { ExperienceEntry } from "@/lib/schema";

function StatusLine({ status, error }: { status: "idle" | "pending" | "done" | "error"; error: string }) {
  if (status === "done") return <span style={{ color: "#4ade80" }}>Committed — live in ~60s</span>;
  if (status === "error") return <span style={{ color: "#f87171" }}>{error}</span>;
  return null;
}

function EntryRow({ entry, index, total }: { entry: ExperienceEntry; index: number; total: number }) {
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setStatus("pending");
    startTransition(async () => {
      const result = await action();
      if (result.ok) setStatus("done");
      else {
        setStatus("error");
        setError(result.error ?? "Failed.");
      }
    });
  }

  return (
    <form
      action={(formData) => run(() => updateEntry(index, formData))}
      className="mb-6 rounded-sm p-6"
      style={{ border: "1px solid var(--hairline)", background: "rgba(255,255,255,0.015)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="label" style={{ color: "var(--text-3)" }}>
          Entry {index + 1}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            disabled={index === 0 || pending}
            onClick={() => run(() => moveEntry(index, -1))}
            className="label"
            style={{ color: "var(--text-3)" }}
          >
            ↑ Up
          </button>
          <button
            type="button"
            disabled={index === total - 1 || pending}
            onClick={() => run(() => moveEntry(index, 1))}
            className="label"
            style={{ color: "var(--text-3)" }}
          >
            ↓ Down
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm("Remove this entry?")) run(() => removeEntry(index));
            }}
            className="label"
            style={{ color: "#f87171" }}
          >
            Remove
          </button>
        </div>
      </div>

      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          When (tag, e.g. &quot;SINCE ~JULY 2026&quot;)
        </span>
        <input name="when" defaultValue={entry.when} className="admin-input" />
      </label>
      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          What
        </span>
        <input name="what" defaultValue={entry.what} className="admin-input" />
      </label>
      <label className="mb-3 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Where
        </span>
        <input name="where" defaultValue={entry.where} className="admin-input" />
      </label>
      <label className="mb-4 block">
        <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
          Note
        </span>
        <textarea name="note" defaultValue={entry.note} rows={2} className="admin-input" />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="label rounded-sm px-4 py-2"
          style={{ border: "1px solid var(--hairline)" }}
        >
          Save
        </button>
        <StatusLine status={status} error={error} />
      </div>
    </form>
  );
}

function AddEntryForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("pending");
    const result = await addEntry(formData);
    if (result.ok) setStatus("done");
    else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <form
      action={onSubmit}
      className="mb-6 rounded-sm p-6"
      style={{ border: "1px dashed var(--hairline)" }}
    >
      <p className="label mb-4" style={{ color: "var(--text-3)" }}>
        Add new entry
      </p>
      <input aria-label="When" name="when" placeholder="When" className="admin-input mb-3" />
      <input aria-label="What" name="what" placeholder="What" className="admin-input mb-3" />
      <input aria-label="Where" name="where" placeholder="Where" className="admin-input mb-3" />
      <textarea aria-label="Note" name="note" placeholder="Note" rows={2} className="admin-input mb-4" />
      <div className="flex items-center gap-4">
        <button type="submit" className="label rounded-sm px-4 py-2" style={{ border: "1px solid var(--hairline)" }}>
          Add
        </button>
        <StatusLine status={status} error={error} />
      </div>
    </form>
  );
}

export default function ExperienceEditor({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div>
      {entries.map((entry, i) => (
        <EntryRow key={i} entry={entry} index={i} total={entries.length} />
      ))}
      <AddEntryForm />
    </div>
  );
}
