"use client";

import { Video, Image, Smile } from "lucide-react";
import { useLanguage } from "./Providers";

export function CreatePost() {
  const { language } = useLanguage();

  const actions = [
    {
      icon: <Video className="h-5 w-5" style={{ color: "#f02849" }} />,
      labelVi: "Video trực tiếp",
      labelEn: "Live video",
    },
    {
      icon: <Image className="h-5 w-5" style={{ color: "#45bd62" }} />,
      labelVi: "Ảnh/video",
      labelEn: "Photo/video",
    },
    {
      icon: <Smile className="h-5 w-5" style={{ color: "#f7b928" }} />,
      labelVi: "Cảm xúc",
      labelEn: "Feeling",
    },
  ];

  return (
    <div className="fb-card mb-3 p-3">
      {/* Input row */}
      <div className="mb-3 flex items-center gap-2">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
          }}
        >
          DN
        </div>

        {/* Fake input */}
        <div
          className="flex-1 cursor-text rounded-full px-4 py-2.5 text-sm transition-colors"
          style={{
            background: "var(--fb-hover)",
            color: "var(--fb-muted)",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.background = "var(--fb-icon-bg)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background = "var(--fb-hover)")
          }
        >
          {language === "vi"
            ? "Duc ơi, bạn đang nghĩ gì thế?"
            : "What's on your mind, Duc?"}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ borderTop: "1px solid var(--fb-border)", marginBottom: "8px" }}
      />

      {/* Action buttons */}
      <div className="flex">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[15px] font-semibold transition-colors"
            style={{ color: "var(--fb-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--fb-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "transparent")
            }
          >
            {action.icon}
            <span className="hidden sm:inline">
              {language === "vi" ? action.labelVi : action.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
