import { ImageResponse } from "next/og";
import { business } from "@/config/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: business.colors.blue,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {business.shortName}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 44,
            fontWeight: 600,
            color: business.colors.yellow,
          }}
        >
          {business.tagline}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 26,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {`${business.location.city}, Philippines`}
        </div>
      </div>
    ),
    size,
  );
}
