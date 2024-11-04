"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftRight, ChevronDown, Mic } from "lucide-react";

const allLanguages = [
	"English",
	"Indonesian",
	"Balinese",
	"Spanish",
	"French",
	"German",
	"Italian",
	"Portuguese",
	"Russian",
	"Chinese",
	"Japanese",
	"Korean",
];

export default function Component() {
	const [sourceText, setSourceText] = useState("");
	const [sourceLang, setSourceLang] = useState("Detect language");
	const [targetLang, setTargetLang] = useState("Indonesian");
	const [visibleSourceLangs, setVisibleSourceLangs] = useState([
		"English",
		"Indonesian",
		"Balinese",
	]);
	const [visibleTargetLangs, setVisibleTargetLangs] = useState([
		"Indonesian",
		"English",
		"Balinese",
	]);

	const updateVisibleLanguages = useCallback(
		(currentVisible, selected, isSource) => {
			if (isSource && selected === "Detect language") {
				return currentVisible;
			}
			const newVisible = [
				selected,
				...currentVisible.filter((lang) => lang !== selected),
			];
			return newVisible.slice(0, 3);
		},
		[]
	);

	const handleLanguageChange = useCallback(
		(lang, isSource) => {
			if (isSource) {
				setSourceLang(lang);
				if (lang !== "Detect language") {
					setVisibleSourceLangs((prev) =>
						updateVisibleLanguages(prev, lang, true)
					);
				}
			} else {
				setTargetLang(lang);
				setVisibleTargetLangs((prev) =>
					updateVisibleLanguages(prev, lang, false)
				);
			}
		},
		[updateVisibleLanguages]
	);

	const handleSwapLanguages = useCallback(() => {
		if (sourceLang !== "Detect language") {
			setSourceLang(targetLang);
			setTargetLang(sourceLang);
			setVisibleSourceLangs((prev) =>
				updateVisibleLanguages(prev, targetLang, true)
			);
			setVisibleTargetLangs((prev) =>
				updateVisibleLanguages(prev, sourceLang, false)
			);
		}
	}, [sourceLang, targetLang, updateVisibleLanguages]);

	const renderLanguageTabs = useCallback(
		(languages, selectedLang, isSource) => (
			<div className="flex items-center gap-2 overflow-x-auto">
				{isSource && (
					<Button
						variant={
							selectedLang === "Detect language"
								? "default"
								: "ghost"
						}
						className="h-8 whitespace-nowrap"
						onClick={() =>
							handleLanguageChange("Detect language", true)
						}
					>
						Detect language
					</Button>
				)}
				{languages.map((lang) => (
					<Button
						key={lang}
						variant={selectedLang === lang ? "default" : "ghost"}
						className="h-8 whitespace-nowrap"
						onClick={() => handleLanguageChange(lang, isSource)}
					>
						{lang}
					</Button>
				))}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8">
							More
							<ChevronDown className="h-4 w-4 ml-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{allLanguages
							.filter((lang) => !languages.includes(lang))
							.map((lang) => (
								<DropdownMenuItem
									key={lang}
									onSelect={() =>
										handleLanguageChange(lang, isSource)
									}
								>
									{lang}
								</DropdownMenuItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
		[handleLanguageChange]
	);

	return (
		<div className="w-full max-w-6xl mx-auto p-4 m-5">
			<div className="space-y-2">
				{/* Language Selection Row */}
				<div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
					<div>
						{renderLanguageTabs(
							visibleSourceLangs,
							sourceLang,
							true
						)}
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="hidden md:inline-flex h-8 w-8"
						onClick={handleSwapLanguages}
						aria-label="Swap languages"
					>
						<ArrowLeftRight className="h-4 w-4" />
					</Button>

					<div>
						{renderLanguageTabs(
							visibleTargetLangs,
							targetLang,
							false
						)}
					</div>
				</div>

				{/* Text Areas Row */}
				<div className="grid md:grid-cols-2 gap-4">
					<div className="relative">
						<Textarea
							value={sourceText}
							onChange={(e) => setSourceText(e.target.value)}
							placeholder="Enter text"
							className="min-h-[200px] resize-none pr-12"
							maxLength={5000}
						/>
						<div className="absolute right-3 bottom-3 flex flex-col gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
							>
								<Mic className="h-4 w-4" />
								<span className="sr-only">Voice input</span>
							</Button>
							<div className="text-xs text-muted-foreground">
								{sourceText.length} / 5,000
							</div>
						</div>
					</div>

					<div className="min-h-[200px] rounded-md bg-muted/50 p-4">
						<p className="text-muted-foreground">Translation</p>
					</div>
				</div>
			</div>

			<div className="flex justify-end mt-4">
				<Button
					variant="link"
					className="text-xs text-muted-foreground"
				>
					Send feedback
				</Button>
			</div>
		</div>
	);
}
