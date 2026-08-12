"use client";

import { useState } from "react";
import SaveForm from "./SaveForm";
import { saveSkills } from "./actions";
import type { Site } from "@/lib/schema";

type Row = { key: number; category: string; items: string };

export default function SkillsEditor({ skills }: { skills: Site["skills"] }) {
  const [rows, setRows] = useState<Row[]>(
    (skills ?? []).map((s, i) => ({ key: i, category: s.category, items: s.items.join(", ") }))
  );
  const [nextKey, setNextKey] = useState(rows.length);

  function addRow() {
    setRows((r) => [...r, { key: nextKey, category: "", items: "" }]);
    setNextKey((k) => k + 1);
  }

  function removeRow(key: number) {
    setRows((r) => r.filter((row) => row.key !== key));
  }

  return (
    <SaveForm title="Skills" action={saveSkills}>
      {rows.map((row) => (
        <div key={row.key} className="mb-3 flex items-center gap-2">
          <input aria-label="Category" name="category" defaultValue={row.category} placeholder="category" className="admin-input w-32 shrink-0" />
          <input aria-label="Items" name="items" defaultValue={row.items} placeholder="comma-separated items" className="admin-input" />
          <button
            type="button"
            onClick={() => removeRow(row.key)}
            className="label shrink-0"
            style={{ color: "#f87171" }}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow} className="label mb-2" style={{ color: "var(--accent)" }}>
        + Add category
      </button>
    </SaveForm>
  );
}
