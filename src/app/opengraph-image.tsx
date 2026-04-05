import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#00080D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#eaf4f8",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 24,
            color: "#a9bdc8",
            maxWidth: 820,
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 42,
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#46a6cc",
          }}
        >
          {SITE_URL.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
