// Placeholder for Google AdSense slots. Returns null until real ad unit
// IDs are wired in (data-ad-client + data-ad-slot). The AdSense script
// itself is loaded in src/app/layout.tsx, so once an actual <ins class="adsbygoogle">
// is rendered here, ads will fill automatically. The CSS rule in globals.css
// hides any AdSense slot that returns data-ad-status="unfilled".
//
// To wire: replace the null return with:
//   <ins
//     className="adsbygoogle block"
//     data-ad-client="ca-pub-4822220549367368"
//     data-ad-slot="<your-slot-id-for-this-position>"
//     data-ad-format="auto"
//     data-full-width-responsive="true"
//   />
// and add a tiny client-side useEffect that calls (window.adsbygoogle = window.adsbygoogle || []).push({}).

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdSlot(_props: { position: string }) {
  return null;
}
