import { Blossom, Bud } from "./Blossom";

/**
 * Decorative blossom branch used in corners of hero/sections.
 * Positioned absolutely by the parent; `flip` mirrors it for the opposite corner.
 */
export function Branch({
  className = "",
  flip = false,
  scale = 1,
}: {
  className?: string;
  flip?: boolean;
  scale?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: flip ? "top right" : "top left" }}
    >
      <div className={`relative h-[260px] w-[300px] ${flip ? "-scale-x-100" : ""}`}>
        <svg
          viewBox="0 0 300 260"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="#4a7397"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M8 250 C 60 200, 110 140, 190 90 C 230 65, 260 40, 292 12" />
          <path d="M120 150 C 130 120, 150 110, 165 100" />
          <path d="M200 84 C 210 70, 225 60, 245 62" />
          <path d="M60 205 C 70 185, 90 180, 100 178" />
        </svg>
        <Blossom size={70} className="absolute left-[140px] top-[62px] animate-float" />
        <Blossom size={54} className="absolute left-[40px] top-[150px] animate-float [animation-delay:1.2s]" />
        <Blossom size={44} className="absolute left-[228px] top-[10px] animate-float [animation-delay:2.1s]" />
        <Bud className="absolute left-[112px] top-[118px]" />
        <Bud className="absolute left-[236px] top-[52px]" size={22} />
        <Bud className="absolute left-[86px] top-[172px]" size={24} />
        <Bud className="absolute left-[180px] top-[100px]" size={20} />
      </div>
    </div>
  );
}
