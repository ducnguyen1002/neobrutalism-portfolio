"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../Providers";

interface RotatingGlobeProps {
  className?: string;
  size?: number;
}

export function RotatingGlobe({ className = "", size = 280 }: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Pause rendering when outside viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Setup High-DPI Canvas
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = size;
    const height = size;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const cx = width / 2;
    const cy = height / 2;

    // Fibonacci Sphere Distribution (450 dots)
    const numPoints = 460;
    const points: { x: number; y: number; z: number; isLand: boolean }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);
      // Density cluster to approximate continents vs oceans
      const isLand = Math.sin(lat * 3) * Math.cos(lon * 2.5) > -0.25;
      points.push({ x, y, z, isLand });
    }

    // Geolocation: Thanh Hoa, Vietnam (Lat: 19.8067, Lon: 105.7852)
    const targetLat = (19.8 * Math.PI) / 180;
    const targetLon = (105.8 * Math.PI) / 180;
    const targetPoint = {
      x: Math.cos(targetLat) * Math.sin(targetLon),
      y: Math.sin(targetLat),
      z: Math.cos(targetLat) * Math.cos(targetLon),
    };

    let rotationAngle = 0;
    let tiltAngle = 0.35; // Earth axial tilt
    let currentSpeed = 0.007;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      rotationAngle += currentSpeed;

      const isDark = document.documentElement.classList.contains("dark");

      // 1. Atmospheric Ambient Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, isDark ? "rgba(26, 115, 232, 0.16)" : "rgba(26, 115, 232, 0.12)");
      glowGrad.addColorStop(0.5, isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(139, 92, 246, 0.05)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Silhouette
      const globeBg = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      if (isDark) {
        globeBg.addColorStop(0, "rgba(18, 24, 42, 0.85)");
        globeBg.addColorStop(1, "rgba(8, 10, 18, 0.98)");
      } else {
        globeBg.addColorStop(0, "rgba(240, 245, 255, 0.9)");
        globeBg.addColorStop(1, "rgba(225, 232, 248, 0.98)");
      }
      ctx.fillStyle = globeBg;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Globe Border Ring
      ctx.strokeStyle = isDark ? "rgba(138, 180, 248, 0.3)" : "rgba(26, 115, 232, 0.3)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 4. Orbital Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.38);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(138, 180, 248, 0.2)" : "rgba(26, 115, 232, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // Satellite Dot orbiting on the ring
      const satTime = rotationAngle * 1.6;
      const satX = Math.cos(satTime) * (radius * 1.25);
      const satY = Math.sin(satTime) * (radius * 0.4);
      ctx.fillStyle = "#34A853";
      ctx.beginPath();
      ctx.arc(satX, satY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Rotate and Project Points
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);
      const cosT = Math.cos(tiltAngle);
      const sinT = Math.sin(tiltAngle);

      const projected = points.map((p) => {
        // Y-axis rotation
        const rx = p.x * cosR - p.z * sinR;
        const rz = p.x * sinR + p.z * cosR;
        // X-axis axial tilt
        const ry = p.y * cosT - rz * sinT;
        const finalZ = p.y * sinT + rz * cosT;

        return {
          screenX: cx + rx * radius,
          screenY: cy - ry * radius,
          z: finalZ,
          isLand: p.isLand,
        };
      });

      // Sort points so back points are rendered before front points
      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const distFromCenter = Math.hypot(p.screenX - cx, p.screenY - cy);
        if (distFromCenter > radius) return;

        const isFront = p.z > 0;
        const depthAlpha = isFront ? 0.38 + p.z * 0.62 : 0.08 + (1 + p.z) * 0.14;
        const dotRadius = isFront ? 1.4 + p.z * 0.9 : 0.85;

        if (p.isLand) {
          ctx.fillStyle = isDark
            ? `rgba(138, 180, 248, ${depthAlpha.toFixed(2)})`
            : `rgba(26, 115, 232, ${depthAlpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(197, 138, 249, ${(depthAlpha * 0.7).toFixed(2)})`
            : `rgba(139, 92, 246, ${(depthAlpha * 0.7).toFixed(2)})`;
        }

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Project and Render Vietnam Location Pin
      const vx = targetPoint.x * cosR - targetPoint.z * sinR;
      const vz = targetPoint.x * sinR + targetPoint.z * cosR;
      const vy = targetPoint.y * cosT - vz * sinT;
      const vFinalZ = targetPoint.y * sinT + vz * cosT;

      if (vFinalZ > 0.05) {
        const vScreenX = cx + vx * radius;
        const vScreenY = cy - vy * radius;

        // Radar Ripple Effect
        const pulse = (Math.sin(Date.now() * 0.006) + 1) / 2;
        ctx.strokeStyle = `rgba(52, 168, 83, ${(0.85 - pulse * 0.65).toFixed(2)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(vScreenX, vScreenY, 4 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();

        // Pin Node
        ctx.fillStyle = "#34A853";
        ctx.beginPath();
        ctx.arc(vScreenX, vScreenY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag interaction for interactive spinning
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotationAngle += dx * 0.008;
      tiltAngle = Math.max(-0.6, Math.min(0.6, tiltAngle + dy * 0.005));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing transition-transform duration-300 hover:scale-105"
        title={
          language === "vi"
            ? "Địa cầu 3D tương tác - Kéo để xoay"
            : "Interactive 3D Globe - Drag to rotate"
        }
      />
      {/* Geolocation Coordinate Capsule */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#121520]/80 border border-foreground/10 text-[11px] font-medium text-foreground/80 -mt-2 backdrop-blur-md shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
        <span className="font-mono text-[11px]">Thanh Hóa, VN // 19.8°N 105.8°E</span>
      </div>
    </div>
  );
}
