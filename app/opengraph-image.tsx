import { ImageResponse } from "next/og";
import { getSite } from "@/lib/content";

export const alt = "Muhammad Saad — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { seo } = getSite();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050607",
          color: "#f2f3f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#8b95d9", marginBottom: 24 }}>
          MUHAMMAD SAAD
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.15, maxWidth: 980 }}>
          {seo.title.split("—")[1]?.trim() ?? seo.title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9a9ea8", marginTop: 32, maxWidth: 900 }}>
          {seo.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
