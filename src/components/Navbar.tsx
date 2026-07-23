"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "./Providers";
import {
  Home,
  PlaySquare,
  Store,
  Users,
  Gamepad2,
  Grid3x3,
  MessageCircle,
  Bell,
  Search,
  Sun,
  Moon,
} from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: "home", icon: Home, href: "#" },
    { id: "watch", icon: PlaySquare, href: "#" },
    { id: "store", icon: Store, href: "#" },
    { id: "groups", icon: Users, href: "#" },
    { id: "games", icon: Gamepad2, href: "#game" },
  ];

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 flex items-center gap-2 px-4"
      style={{
        height: "var(--fb-topbar-h)",
        background: "var(--fb-card)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* ── LEFT: Logo + Search ── */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Facebook "f" logo */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "var(--fb-blue)" }}
        >
          <span
            className="text-2xl leading-none font-bold text-white"
            style={{ fontFamily: "Georgia, serif", marginTop: "-2px" }}
          >
            f
          </span>
        </div>

        {/* Search bar */}
        <div
          className="hidden h-10 w-60 items-center gap-2 rounded-full px-3 sm:flex"
          style={{ background: "var(--fb-icon-bg)" }}
        >
          <Search
            className="h-4 w-4 shrink-0"
            style={{ color: "var(--fb-muted)" }}
          />
          <input
            type="text"
            readOnly
            placeholder={
              language === "vi" ? "Tìm kiếm trên Portfolio" : "Search Portfolio"
            }
            className="w-full bg-transparent text-sm text-[var(--fb-text)] outline-none placeholder:text-[var(--fb-muted)]"
          />
        </div>
      </div>

      {/* ── CENTER: Nav icons ── */}
      <div className="absolute left-1/2 hidden h-full -translate-x-1/2 items-stretch md:flex">
        {navItems.map(({ id, icon: Icon, href }) => {
          const isActive = activeNav === id;
          return (
            <a
              key={id}
              href={href}
              onClick={(e) => {
                if (href === "#") e.preventDefault();
                setActiveNav(id);
              }}
              className="relative flex w-[116px] items-center justify-center transition-colors"
              style={{
                color: isActive ? "var(--fb-blue)" : "var(--fb-muted)",
                borderBottom: isActive
                  ? "3px solid var(--fb-blue)"
                  : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--fb-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              <Icon className="h-6 w-6" />
            </a>
          );
        })}
      </div>

      {/* ── RIGHT: Action buttons ── */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Dark / light toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fb-icon-btn"
          aria-label="Toggle theme"
        >
          {!mounted ? (
            <div className="h-5 w-5" />
          ) : theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
          className="fb-icon-btn text-xs font-bold"
          style={{ color: "var(--fb-text)" }}
        >
          {language === "vi" ? "EN" : "VI"}
        </button>

        {/* Apps grid */}
        <button className="fb-icon-btn">
          <Grid3x3 className="h-5 w-5" />
        </button>

        {/* Messenger */}
        <button className="fb-icon-btn">
          <MessageCircle className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="fb-icon-btn relative">
          <Bell className="h-5 w-5" />
          <span
            className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full font-bold text-white"
            style={{ background: "#e41e3f", fontSize: "10px" }}
          >
            3
          </span>
        </button>

        {/* Profile avatar */}
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--fb-blue) 0%, #7c3aed 100%)",
          }}
        >
          DN
        </div>
      </div>
    </nav>
  );
}
