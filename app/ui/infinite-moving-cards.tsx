"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  quote: string;
  name: string;
}

export interface InfiniteMovingCardsProps {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  // trigger animation class after mount
  const [started, setStarted] = useState(false);
  useEffect(() => {
    setStarted(true);
  }, []);

  // duplicate items array once
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  // compute CSS vars for direction & duration
  const animationDirection = useMemo(
    () => (direction === "left" ? "forwards" : "reverse"),
    [direction]
  );
  const animationDuration = useMemo(() => {
    switch (speed) {
      case "normal":
        return "40s";
      case "slow":
        return "80s";
      default:
        return "20s";
    }
  }, [speed]);

  const containerStyle = useMemo(
    () => ({
      "--animation-direction": animationDirection,
      "--animation-duration": animationDuration,
    } as React.CSSProperties),
    [animationDirection, animationDuration]
  );

  // compose class names only when dependencies change
  const ulClassName = useMemo(
    () =>
      cn(
        "flex w-max min-w-full flex-nowrap gap-4 py-2 shrink-0",
        started && "animate-scroll",
        pauseOnHover && "hover:[animation-play-state:paused]"
      ),
    [started, pauseOnHover]
  );

  return (
    <div
      style={containerStyle}
      className={cn(
        "scroller relative z-20 max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul ref={null} className={ulClassName}>
        {duplicatedItems.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative w-[250px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
          >
            <blockquote>
              <div
                aria-hidden
                className="pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%+4px)] w-[calc(100%+4px)]"
              />
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.name}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
