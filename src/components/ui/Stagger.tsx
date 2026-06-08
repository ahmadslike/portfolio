"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

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

// PlainTag used for reduced-motion fallback — accepts only what we pass (className + children)
type PlainTag = ElementType<{ className?: string; children?: ReactNode }>;

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

  if (shouldReduce === true) {
    // Mirror `as` — must not always return <div> (would inject div inside ol)
    const Tag = as as PlainTag;
    return <Tag className={className}>{children}</Tag>;
  }

  // Cast to typeof motion.div so TS accepts variants/whileInView/viewport —
  // all motion elements share these props; only className+children differ by tag.
  const Tag = motionGroupMap[as] as typeof motion.div;
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
  const shouldReduce = useReducedMotion();

  if (shouldReduce === true) {
    const Tag = as as PlainTag;
    return <Tag className={className}>{children}</Tag>;
  }

  // No initial/animate here — variant propagation from parent StaggerGroup handles it
  const Tag = motionItemMap[as] as typeof motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
