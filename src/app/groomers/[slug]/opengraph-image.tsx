import { ImageResponse } from "next/og";
import { allGroomers, getGroomerBySlug, stateNames, slugToAbbr } from "@/data/all-groomers";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isState = !!slugToAbbr[slug];

  let title: string, subtitle: string;
  if (isState) {
    const abbr = slugToAbbr[slug];
    const name = stateNames[abbr];
    const count = allGroomers.filter(g => g.stateAbbr === abbr).length;
    title = `Dog Groomers in ${name}`;
    subtitle = `${count.toLocaleString()} groomers with ratings & reviews`;
  } else {
    const g = getGroomerBySlug(slug);
    title = g?.name || "Dog Groomer";
    subtitle = g ? `${g.city}, ${stateNames[g.stateAbbr] || g.state}` : "";
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #2D8A4E, #1E6B3A)", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", marginBottom: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>BarkSeeker</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "white", textAlign: "center" as const, maxWidth: 900, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.75)", marginTop: 16 }}>{subtitle}</div>
      </div>
    ),
    { ...size }
  );
}
