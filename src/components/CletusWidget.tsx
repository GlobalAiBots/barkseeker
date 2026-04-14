"use client";

import { useEffect } from "react";

export default function CletusWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.globalaibots.com/widget.js";
    script.setAttribute("data-id", "fe1aa7b6-f745-4c92-b353-2589e2599bc3");
    script.setAttribute("data-agent-name", "BarkSeeker Guide");
    script.setAttribute("data-business", "BarkSeeker");
    script.setAttribute("data-color", "#2D6A4F");
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch { /* already removed */ }
    };
  }, []);
  return null;
}
