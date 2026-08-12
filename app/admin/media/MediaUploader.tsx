"use client";

import { useState } from "react";
import { uploadImage } from "./actions";

export default function MediaUploader() {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState<string[]>([]);

  async function onSubmit(formData: FormData) {
    setStatus("uploading");
    const result = await uploadImage(formData);
    if (result.ok) {
      setStatus("done");
      setUploaded((prev) => [result.path, ...prev]);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <div>
      <form
        action={onSubmit}
        className="mb-6 rounded-sm p-6"
        style={{ border: "1px dashed var(--hairline)" }}
      >
        <p className="label mb-4" style={{ color: "var(--text-3)" }}>
          Upload image
        </p>
        <label className="mb-3 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Image file
          </span>
          <input type="file" name="file" accept="image/*" required className="admin-input" />
        </label>
        <label className="mb-4 block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            File name (optional)
          </span>
          <input type="text" name="name" placeholder="e.g. dashboard" className="admin-input" />
        </label>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "uploading"}
            className="label rounded-sm px-4 py-2"
            style={{ border: "1px solid var(--hairline)" }}
          >
            {status === "uploading" ? "Uploading…" : "Upload"}
          </button>
          {status === "error" && (
            <span className="label" style={{ color: "#f87171" }}>
              {error}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--text-3)" }}>
          Resized to max 1920px, re-encoded as WebP, EXIF/GPS metadata stripped. Committed straight to{" "}
          <code>public/uploads/</code>.
        </p>
      </form>

      {uploaded.length > 0 && (
        <div className="mb-6 rounded-sm p-6" style={{ border: "1px solid var(--hairline)" }}>
          <p className="label mb-4" style={{ color: "var(--text-3)" }}>
            Uploaded this session — copy the path into a project&apos;s images list on the Projects page
          </p>
          <ul className="space-y-2">
            {uploaded.map((path) => (
              <li key={path} className="flex items-center justify-between gap-4">
                <code className="text-sm" style={{ color: "var(--text-2)" }}>
                  {path}
                </code>
                <span className="label" style={{ color: "#4ade80" }}>
                  committed
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
