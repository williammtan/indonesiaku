import { Button } from "@/components/ui/button"
import Image from 'next/image'

export function HuggingFaceButton() {
  return (
    <Button
      variant="outline"
      className="gap-2"
      asChild
    >
      <a
        href="https://huggingface.co/datasets/williamhtan/indonesiaku-contrib"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        Download Dataset
        <Image src="/hf-logo.svg" alt="hugging face logo" width={24} height={24} />
      </a>
    </Button>
  )
}
