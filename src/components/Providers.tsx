"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { translations, Language, TranslationType } from "@/lib/translations";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function Providers({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("vi");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedLang = localStorage.getItem("language") as Language;
		if (savedLang) setLanguage(savedLang);
	}, []);

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const handleSetLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("language", lang);
	};

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
		>
			<LanguageContext.Provider
				value={{
					language,
					setLanguage: handleSetLanguage,
					t: translations[language],
				}}
			>
				{children}
			</LanguageContext.Provider>
		</ThemeProvider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
