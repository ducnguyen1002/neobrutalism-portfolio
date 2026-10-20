"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll() {
	useEffect(() => {
		// Initialize Lenis smooth scroll
		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1.0,
			touchMultiplier: 1.8,
		});

		// Connect Lenis scroll events to GSAP ScrollTrigger
		lenis.on("scroll", ScrollTrigger.update);

		const rafHandler = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(rafHandler);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(rafHandler);
			lenis.destroy();
		};
	}, []);

	return null;
}
