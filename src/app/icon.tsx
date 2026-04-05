import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_LOGO_PATH, SITE_NAME } from "../lib/site";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

const loadLogoDataUrl = async () => {
  const relativePath = SITE_LOGO_PATH.replace(/^\//, "");
  const filePath = join(process.cwd(), "public", relativePath);
  const buffer = await readFile(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

export default async function Icon() {
  const logoDataUrl = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#00080D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
        }}
      >
        <img
          src={logoDataUrl}
          alt={`${SITE_NAME} logo`}
          width={64}
          height={64}
          style={{ width: "80%", height: "80%", objectFit: "contain" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
