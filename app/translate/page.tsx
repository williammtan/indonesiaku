"use client";

import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "@/lib/useDebounce";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Language {
  name: string;
  nllb_code: string;
}

const allLanguages: Language[] = [
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
  const [sourceText, setSourceText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [sourceLang, setSourceLang] = useState<Language>(allLanguages[0]);
  const [targetLang, setTargetLang] = useState<Language>(allLanguages[1]);
  const [visibleSourceLangs, setVisibleSourceLangs] = useState<Language[]>([
    allLanguages[0],
    allLanguages[1],
    allLanguages[2],
  ]);
  const [visibleTargetLangs, setVisibleTargetLangs] = useState<Language[]>([
    allLanguages[1],
    allLanguages[0],
    allLanguages[2],
  ]);
  const debouncedSourceText = useDebounce(sourceText, 500);

  const updateVisibleLanguages = useCallback(
    (currentVisible: Language[], selected: Language): Language[] => {
      const newVisible = [
        selected,
        ...currentVisible.filter((lang) => lang.name !== selected.name),
      ];
      return newVisible.slice(0, 3);
    },
    []
  );

  const handleLanguageChange = useCallback(
    (lang: Language, isSource: boolean) => {
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
      // Backtranslate by setting the new source as the previous target
      setSourceText(translatedText[0]);
      handleTranslation(sourceText, targetLang, sourceLang);
    }
  }, [sourceLang, targetLang, sourceText, translatedText, updateVisibleLanguages]);

  const handleTranslation = useCallback(
    async (text: string, srcLang: Language = sourceLang, tgtLang: Language = targetLang) => {
      if (!text || !text.trim()) {
        setTranslatedText("");
        setIsTranslating(false);
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
    },
    [sourceLang, targetLang]
  );

  useEffect(() => {
    handleTranslation(debouncedSourceText);
  }, [debouncedSourceText, handleTranslation]);

  const renderLanguageTabs = useCallback(
    (languages: Language[], selectedLang: Language, isSource: boolean) => (
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
              .filter((lang) => !languages.find((l: Language) => l.name === lang.name))
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
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <div>{renderLanguageTabs(visibleSourceLangs, sourceLang, true)}</div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex h-8 w-8"
            onClick={handleSwapLanguages}
            aria-label="Swap languages"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div>{renderLanguageTabs(visibleTargetLangs, targetLang, false)}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Textarea
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                setIsTranslating(true);
              }}
              placeholder="Enter text"
              className="min-h-[200px] text-lg rounded-md p-4"
              maxLength={5000}
            />
            <div className="absolute right-3 bottom-3 flex flex-col gap-2">
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
          <Link href="/data">
            Help improve translations
          </Link>
        </Button>
      </div>
    </div>
  );
}