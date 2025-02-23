// components/search-interface.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Language = {
  id: number;
  name: string;
  code: string;
};

type LanguagePair = {
  source_language_id: number;
  target_language_id: number;
};

interface SearchInterfaceProps {
  languages: Language[];
  languagePairs: LanguagePair[];
}

export function SearchInterface({ languages, languagePairs }: SearchInterfaceProps) {
  const router = useRouter();
  const [sourceLanguage, setSourceLanguage] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");

  // Filter target languages based on the selected source language
  const availableTargetLanguages = languages.filter((lang) =>
    languagePairs.some(
      (pair) =>
        pair.source_language_id === Number(sourceLanguage) &&
        pair.target_language_id === lang.id,
    ),
  );

  const handleSearch = () => {
    if (sourceLanguage && targetLanguage) {
      router.push(`/data/table?src=${sourceLanguage}&tgt=${targetLanguage}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end justify-center">
      <div className="w-full sm:w-[200px] space-y-2">
        <label className="text-sm font-medium">Source language</label>
        <Select value={sourceLanguage} onValueChange={(value) => {
          setSourceLanguage(value);
          setTargetLanguage(""); // Reset target language when source changes
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={lang.id.toString()}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-[200px] space-y-2">
        <label className="text-sm font-medium">Target language</label>
        <Select
          value={targetLanguage}
          onValueChange={setTargetLanguage}
          disabled={!sourceLanguage} // Disable until source is selected
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {availableTargetLanguages.length > 0 ? (
              availableTargetLanguages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id.toString()}>
                  {lang.name}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">
                No available target languages
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <Button
        size="lg"
        className="w-full sm:w-auto"
        onClick={handleSearch}
        disabled={!sourceLanguage || !targetLanguage}
      >
        Search
      </Button>
    </div>
  );
}