import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { getSite } from "@/lib/content";
import SaveForm from "../site/SaveForm";
import { saveVisual } from "../site/actions";

const FIELDS: { name: keyof ReturnType<typeof getSite>["heroVisual"]; label: string; step?: string }[] = [
  { name: "rings", label: "Rings (desktop)" },
  { name: "ringsMobile", label: "Rings (mobile)" },
  { name: "segments", label: "Segments (desktop)" },
  { name: "segmentsMobile", label: "Segments (mobile)" },
  { name: "maxRadius", label: "Max radius" },
  { name: "vortexStrength", label: "Vortex strength", step: "0.01" },
  { name: "threadAlpha", label: "Thread alpha", step: "0.01" },
  { name: "rotationSpeed", label: "Rotation speed", step: "0.001" },
];

export default async function AdminVisual() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const { heroVisual } = getSite();

  return (
    <div className="max-w-xl">
      <p className="label mb-3" style={{ color: "var(--text-3)" }}>
        Admin
      </p>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Hero visual (Filament Flow)</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--text-3)" }}>
        Numeric parameters only — open the live site in another tab after saving to see the effect (~60s to
        rebuild). A live in-panel preview is a future improvement, not built in this pass.
      </p>

      <SaveForm title="Parameters" action={saveVisual}>
        {FIELDS.map((f) => (
          <label key={f.name} className="mb-3 block">
            <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
              {f.label}
            </span>
            <input
              type="number"
              step={f.step ?? "1"}
              name={f.name}
              defaultValue={heroVisual[f.name]}
              className="admin-input"
            />
          </label>
        ))}
        <label className="block">
          <span className="label mb-1 block" style={{ color: "var(--text-3)" }}>
            Thread color (hex)
          </span>
          <input name="color" defaultValue={heroVisual.color} className="admin-input" />
        </label>
      </SaveForm>
    </div>
  );
}
