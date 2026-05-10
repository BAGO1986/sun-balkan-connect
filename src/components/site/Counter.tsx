import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ to, suffix = "", duration = 1.6, decimals = 0 }: { to: number; suffix?: string; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (val) => setV(val) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{v.toLocaleString("hr-HR", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}
