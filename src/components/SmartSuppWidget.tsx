"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmartSuppWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof (window as any).smartsupp === "function") return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadWidget = () => {
      if (cancelled || typeof (window as any).smartsupp === "function") return;

      (window as any)._smartsupp = {
        key: "8792d0dba0d1bc8eb69d5343a7911db273c723c9",
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
    };

    const scheduleLoad = () => {
      timeoutId = setTimeout(loadWidget, 1200);
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      window.addEventListener("load", scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener("load", scheduleLoad);
    };
  }, []);

  useEffect(() => {
    if (typeof (window as any).smartsupp !== "function") return;
    (window as any).smartsupp(
      pathname.startsWith("/access") ? "chat:hide" : "chat:show"
    );
  }, [pathname]);

  return null;
}
