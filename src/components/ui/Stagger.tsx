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

// container only orchestrates timing — no visual change on the wrapper itself
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// every item: fade + slide-up, once, easeOut
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const motionGroupMap = {
  div: motion.div,
  ol: motion.ol,
  ul: motion.ul,
  section: motion.section,
} as const;

const motionItemMap = {
  div: motion.div,
  li: motion.li,
} as const;

type GroupAs = keyof typeof motionGroupMap;
type ItemAs = keyof typeof motionItemMap;

export function StaggerGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: GroupAs;
}) {
  const shouldReduce = useReducedMotion();
  const [reduceApplied, setReduceApplied] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduce) setReduceApplied(true);
  }, [shouldReduce]);

  // Cast to typeof motion.div so TS accepts variants/whileInView/viewport —
  // all motion elements share these props; only className+children differ by tag.
  const Tag = motionGroupMap[as] as typeof motion.div;

  if (reduceApplied) {
    // Stay on the same motion element (never swap to a plain host tag). The
    // server always renders the animated branch below, baking the "hidden"
    // variant style into the SSR HTML for descendant StaggerItems. Applying
    // this branch only after mount keeps the first client render identical
    // to the server's, avoiding a hydration mismatch; initial={false} +
    // animate="show" then propagates to children and overwrites their DOM
    // style imperatively.
    return (
      <Tag className={className} variants={container} initial={false} animate="show">
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ItemAs;
}) {
  // No initial/animate here — variant state (hidden/show, and initial={false}
  // when reduced motion is on) propagates down from the parent StaggerGroup.
  const Tag = motionItemMap[as] as typeof motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
