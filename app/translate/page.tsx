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
  { name: "English", nllb_code: "eng_Latn" },
  { name: "Indonesian", nllb_code: "ind_Latn" },
  { name: "Balinese", nllb_code: "ban_Latn" },
  { name: "Minangkabau", nllb_code: "min_Latn" },
  { name: "Acehnese", nllb_code: "ace_Latn" },
  { name: "Buginese", nllb_code: "bug_Latn" },
  { name: "Banjarese", nllb_code: "bjn_Latn" },
  { name: "Javanese", nllb_code: "jav_Latn" },
  { name: "Sundanese", nllb_code: "sun_Latn" },
];

export default function Component() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState(allLanguages[0]);
  const [targetLang, setTargetLang] = useState(allLanguages[1]);
  const [visibleSourceLangs, setVisibleSourceLangs] = useState([
    allLanguages[0],
    allLanguages[1],
    allLanguages[2],
  ]);
  const [visibleTargetLangs, setVisibleTargetLangs] = useState([
    allLanguages[1],
    allLanguages[0],
    allLanguages[2],
  ]);

  const updateVisibleLanguages = useCallback(
    (currentVisible, selected) => {
      const newVisible = [
        selected,
        ...currentVisible.filter((lang) => lang.name !== selected.name),
      ];
      return newVisible.slice(0, 3);
    },
    []
  );

  const handleLanguageChange = useCallback(
    (lang, isSource) => {
      if (isSource) {
        setSourceLang(lang);
        setVisibleSourceLangs((prev) => updateVisibleLanguages(prev, lang));
      } else {
        setTargetLang(lang);
        setVisibleTargetLangs((prev) => updateVisibleLanguages(prev, lang));
      }
      // Translate if there's text
      if (sourceText.trim()) {
        handleTranslation(sourceText, isSource ? lang : sourceLang, isSource ? targetLang : lang);
      }
    },
    [sourceText, sourceLang, targetLang, updateVisibleLanguages]
  );

  const handleSwapLanguages = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setVisibleSourceLangs((prev) => updateVisibleLanguages(prev, targetLang));
    setVisibleTargetLangs((prev) => updateVisibleLanguages(prev, sourceLang));
    // Translate with swapped languages if there's text
    if (sourceText.trim()) {
      handleTranslation(sourceText, targetLang, sourceLang);
    }
  }, [sourceLang, targetLang, sourceText, updateVisibleLanguages]);

  const handleTranslation = async (text: string, srcLang = sourceLang, tgtLang = targetLang) => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceLanguage: srcLang,
          targetLanguage: tgtLang,
          text: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation error occurred. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const renderLanguageTabs = useCallback(
    (languages, selectedLang, isSource) => (
      <div className="flex items-center gap-2 overflow-x-auto">
        {languages.map((lang) => (
          <Button
            key={lang.name}
            variant={selectedLang.name === lang.name ? "default" : "ghost"}
            className="h-8 whitespace-nowrap"
            onClick={() => handleLanguageChange(lang, isSource)}
          >
            {lang.name}
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
              .filter((lang) => !languages.find(l => l.name === lang.name))
              .map((lang) => (
                <DropdownMenuItem
                  key={lang.name}
                  onSelect={() => handleLanguageChange(lang, isSource)}
                >
                  {lang.name}
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
            {renderLanguageTabs(visibleSourceLangs, sourceLang, true)}
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
            {renderLanguageTabs(visibleTargetLangs, targetLang, false)}
          </div>
        </div>

        {/* Text Areas Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Textarea
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                handleTranslation(e.target.value);
              }}
              placeholder="Enter text"
              className="min-h-[200px] text-lg rounded-md p-4"
              maxLength={5000}
            />
            <div className="absolute right-3 bottom-3 flex flex-col gap-2">
              {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice input</span>
              </Button> */}
              <div className="text-xs text-muted-foreground">
                {sourceText.length} / 5,000
              </div>
            </div>
          </div>

          <div className="min-h-[200px] text-lg rounded-md bg-muted/50 p-4">
            {isTranslating ? (
              <p className="text-muted-foreground">Translating...</p>
            ) : translatedText ? (
              <p>{translatedText}</p>
            ) : (
              <p className="text-muted-foreground">Translation</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="link" className="text-xs text-muted-foreground">
          Send feedback
        </Button>
      </div>
    </div>
  );
}
