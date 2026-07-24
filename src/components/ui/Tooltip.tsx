"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom";
}

export function Tooltip({ content, children, placement = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePos = () => {
    // display:contents means the wrapper span has no box — use its first real child
    const el =
      (wrapperRef.current?.firstElementChild as HTMLElement) ??
      wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      top: placement === "top" ? rect.top - 8 : rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  };

  const show = () => {
    updatePos();
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <>
      <span
        ref={wrapperRef}
        style={{ display: "contents" }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>

      {mounted &&
        visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              transform:
                placement === "top"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0%)",
              zIndex: 99999,
              background: "rgba(0,0,0,0.80)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            {content}
            {/* Arrow */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                ...(placement === "top"
                  ? {
                      bottom: "-4px",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: "4px solid rgba(0,0,0,0.80)",
                    }
                  : {
                      top: "-4px",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderBottom: "4px solid rgba(0,0,0,0.80)",
                    }),
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}
