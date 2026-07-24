"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useLanguage } from "./Providers";

type Status = "idle" | "loading" | "success" | "error";

export function ContactFloat() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const t = {
    vi: {
      title: "Liên hệ với tôi",
      subtitle: "Hãy để lại tin nhắn, tôi sẽ phản hồi sớm nhất!",
      name: "Họ và tên *",
      email: "Email *",
      subject: "Chủ đề",
      message: "Tin nhắn *",
      send: "Gửi tin nhắn",
      sending: "Đang gửi...",
      success: "Tin nhắn đã gửi thành công! 🎉",
      successSub: "Tôi sẽ liên hệ lại trong vòng 24 giờ.",
      error: "Gửi thất bại. Vui lòng thử lại.",
      sendAnother: "Gửi tin nhắn khác",
      namePlaceholder: "Nguyễn Văn A",
      emailPlaceholder: "example@email.com",
      subjectPlaceholder: "Hợp tác dự án / Tuyển dụng...",
      messagePlaceholder: "Xin chào Duc, tôi muốn...",
    },
    en: {
      title: "Contact Me",
      subtitle: "Leave a message and I'll get back to you soon!",
      name: "Full name *",
      email: "Email *",
      subject: "Subject",
      message: "Message *",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! 🎉",
      successSub: "I'll get back to you within 24 hours.",
      error: "Failed to send. Please try again.",
      sendAnother: "Send another message",
      namePlaceholder: "John Doe",
      emailPlaceholder: "example@email.com",
      subjectPlaceholder: "Project collaboration / Job opportunity...",
      messagePlaceholder: "Hi Duc, I'd like to...",
    },
  };
  const tx = t[language];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--fb-icon-bg)",
    color: "var(--fb-text)",
    border: "1px solid var(--fb-border)",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => {
          setOpen((o) => !o);
          if (status === "success" || status === "error") setStatus("idle");
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--fb-blue)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(27,116,228,0.45)",
        }}
        aria-label={open ? "Close contact" : "Open contact"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              bottom: "96px",
              right: "24px",
              zIndex: 999,
              width: "360px",
              maxHeight: "calc(100vh - 120px)",
              background: "var(--fb-card)",
              borderRadius: "16px",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid var(--fb-border)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "var(--fb-blue)",
                padding: "16px 20px",
                flexShrink: 0,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  DN
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: 1.2 }}>
                    {tx.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "2px" }}>
                    {tx.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
              {status === "success" ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <CheckCircle
                    className="h-14 w-14"
                    style={{ color: "var(--fb-green)" }}
                  />
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--fb-text)" }}
                  >
                    {tx.success}
                  </p>
                  <p className="text-sm" style={{ color: "var(--fb-muted)" }}>
                    {tx.successSub}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="fb-btn-secondary mt-2"
                    style={{ height: "32px", fontSize: "13px" }}
                  >
                    {tx.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {/* Error */}
                  {status === "error" && (
                    <div
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                      style={{
                        background: "rgba(244,67,54,0.08)",
                        border: "1px solid rgba(244,67,54,0.3)",
                        color: "#e53935",
                      }}
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {tx.error}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "var(--fb-muted)" }}>
                      {tx.name}
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={tx.namePlaceholder}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-blue)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-border)")
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "var(--fb-muted)" }}>
                      {tx.email}
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={tx.emailPlaceholder}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-blue)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-border)")
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "var(--fb-muted)" }}>
                      {tx.subject}
                    </label>
                    <input
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={tx.subjectPlaceholder}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-blue)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-border)")
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "var(--fb-muted)" }}>
                      {tx.message}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={tx.messagePlaceholder}
                      required
                      rows={4}
                      style={{
                        ...inputStyle,
                        resize: "none",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-blue)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--fb-border)")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="fb-btn-primary w-full justify-center"
                    style={{ height: "40px", marginTop: "4px" }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {tx.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {tx.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
