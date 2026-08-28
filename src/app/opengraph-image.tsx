import { ImageResponse } from "next/og";

// Превью для соцсетей и мессенджеров. Генерируется в настоящий PNG на этапе
// сборки — SVG краулерами соцсетей не поддерживается.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Njord Group — международная логистика Азия — Европа — Россия";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #04182A 0%, #0A3757 55%, #106094 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#072742" />
            <path
              d="M8 40c6-9 12-9 18 0s12 9 18 0s12-9 18 0"
              fill="none"
              stroke="#16BEDC"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M20 26 L32 14 L44 26"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>
            <span style={{ color: "#FFFFFF" }}>NJORD</span>
            <span style={{ color: "#7BDCEE", marginLeft: 12 }}>GROUP</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>
            Морская логистика с гарантией места на борту
          </div>
          <div style={{ fontSize: 30, color: "#93C6E8", marginTop: 28 }}>
            Азия — Европа — Россия · собственный флот
          </div>
        </div>
      </div>
    ),
    size,
  );
}
