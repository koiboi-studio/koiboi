"use client";

import { useEffect } from "react";

type TiltNode = HTMLElement & {
  vanillaTilt?: {
    destroy: () => void;
  };
};

export function TiltWindows() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    import("vanilla-tilt").then((module) => {
      if (cancelled) {
        return;
      }

      const VanillaTilt = module.default;
      const nodes = Array.from(document.querySelectorAll<TiltNode>("[data-tilt-window]"));

      VanillaTilt.init(nodes, {
        max: 5,
        speed: 450,
        scale: 1.015,
        perspective: 1200,
        glare: true,
        "max-glare": 0.12,
        gyroscope: true,
        "mouse-event-element": ".site-shell",
      });

      cleanup = () => {
        nodes.forEach((node) => node.vanillaTilt?.destroy());
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
