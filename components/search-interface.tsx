"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Language = {
  id: number
  name: string
  code: string
}

interface SearchInterfaceProps {
  languages: Language[]
}

export function SearchInterface({ languages }: SearchInterfaceProps) {
  const router = useRouter()
  const [sourceLanguage, setSourceLanguage] = useState<string>("")
  const [targetLanguage, setTargetLanguage] = useState<string>("")

  const handleSearch = () => {
    if (sourceLanguage && targetLanguage) {
      router.push(`/data/table?src=${sourceLanguage}&tgt=${targetLanguage}`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end justify-center">
      <div className="w-full sm:w-[200px] space-y-2">
        <label className="text-sm font-medium">Source language</label>
        <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
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
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
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
      <Button size="lg" className="w-full sm:w-auto" onClick={handleSearch}>
        Search
      </Button>
    </div>
  )
} 