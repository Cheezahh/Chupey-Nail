import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-50 disabled:pointer-events-none";
const variants = {
  primary: "bg-navy-800 text-white hover:bg-navy-700 hover:shadow-lift hover:-translate-y-0.5",
  secondary: "bg-white text-navy-800 ring-1 ring-navy-800/15 hover:ring-navy-800/40 hover:shadow-soft hover:-translate-y-0.5",
  ghost: "text-navy-800 hover:bg-navy-800/5",
  sky: "bg-sky-300 text-navy-900 hover:bg-sky-400 hover:shadow-soft hover:-translate-y-0.5",
};
const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };

type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", size = "md", href, className = "", children, ...rest }: BtnProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-navy-500 ${className}`}>{children}</p>
  );
}

export function Heading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const size = Tag === "h1" ? "text-5xl sm:text-6xl lg:text-7xl" : Tag === "h2" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";
  return <Tag className={`font-display font-medium leading-[1.05] tracking-tight text-navy-800 ${size} ${className}`}>{children}</Tag>;
}

export function Badge({ children, tone = "sky" }: { children: ReactNode; tone?: "sky" | "navy" | "outline" }) {
  const t = {
    sky: "bg-sky-200 text-navy-800",
    navy: "bg-navy-800 text-white",
    outline: "ring-1 ring-navy-800/20 text-navy-700",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${t}`}>{children}</span>;
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-navy-500/40 bg-sky-50 px-4 py-3 text-xs text-navy-600">
      <span className="font-semibold">Placeholder:</span> {children}
    </p>
  );
}
