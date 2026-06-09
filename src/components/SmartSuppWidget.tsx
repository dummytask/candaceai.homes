"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmartSuppWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof (window as any).smartsupp === "function") return;

    (window as any)._smartsupp = {
      key: "7d3e10ae18d17d18ad8a97687f70e1d2272eab95",
      color: "#111111",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o: any = ((window as any).smartsupp = function (...args: unknown[]) {
      o._.push(args);
    });
    o._ = [];

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof (window as any).smartsupp !== "function") return;
    (window as any).smartsupp(
      pathname.startsWith("/access") ? "chat:hide" : "chat:show"
    );
  }, [pathname]);

  return null;
}
