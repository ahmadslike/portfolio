"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

// motion's useReducedMotion() resolves the real matchMedia value synchronously
// on its very first client render (before hydration finishes), while the
// server always renders the animated branch. Applying the reduced branch
// immediately would make the client's first render diverge from the server's
// HTML and trigger a hydration mismatch. useLayoutEffect (no-op on the
// server) defers the switch until strictly after hydration commits, so the
// first render always matches the server, then flips synchronously before
// paint — no mismatch, no visible flash.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Props = {
  children: ReactNode;
  delay?: number;
};

export default function Reveal({ children, delay = 0 }: Props) {
  const shouldReduce = useReducedMotion();
  const [reduceApplied, setReduceApplied] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduce) setReduceApplied(true);
  }, [shouldReduce]);

  if (reduceApplied) {
    // Stay on the same `motion.div` element (never swap to a plain host tag).
    // motion's own mount-time render pass (initial={false} + animate)
    // overwrites the DOM style imperatively, snapping content to visible.
    return (
      <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
