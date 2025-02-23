// app/data/page.tsx
import { createClient } from "@/lib/supabase/server";
import { SearchInterface } from "@/components/search-interface";
import { Overview } from "@/components/overview";
import { CorpusChart } from "@/components/corpus-chart";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    src?: string;
    tgt?: string;
  };
}

type LanguageDistribution = {
  language_name: string;
  count: number;
};

type LanguagePair = {
  source_language_id: number;
  target_language_id: number;
};

export default async function DataPage({ searchParams }: PageProps) {
  if (searchParams.src && searchParams.tgt) {
    return redirect(`/data/table?src=${searchParams.src}&tgt=${searchParams.tgt}`);
  }

  const supabase = await createClient();

  // Get total number of translations
  const { count: totalTranslations } = await supabase
    .from("translations")
    .select("*", { count: "exact", head: true });

  // Get languages
  const { data: languages } = await supabase
    .from("languages")
    .select("id, name, code");

  // Get distinct language pairs
  const { data: languagePairs } = await supabase
    .from("translations")
    .select("source_language_id, target_language_id")
    .then((response) => {
      // Remove duplicates
      const uniquePairs = new Set(
        response.data?.map((pair) =>
          `${pair.source_language_id}-${pair.target_language_id}`,
        ),
      );
      return {
        data: Array.from(uniquePairs).map((pair) => {
          const [source, target] = pair.split("-").map(Number);
          return { source_language_id: source, target_language_id: target };
        }),
      };
    });

  // Get number of contributors
  const { count: totalContributors } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Get language distribution data
  const { data: languageDistribution } = await supabase
    .rpc("get_language_distribution") as { data: LanguageDistribution[] | null };

  const stats = {
    translations: totalTranslations || 0,
    languages: languages?.length || 0,
    languagePairs: languagePairs?.length || 0, // Updated to reflect actual pairs
    contributors: totalContributors || 0,
  };

  const distributionData = (languageDistribution || []).map((item) => ({
    name: item.language_name,
    value: item.count,
    percentage: Math.round((item.count / (totalTranslations || 1)) * 100),
  }));

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Translation Database</h1>
      <SearchInterface languages={languages || []} languagePairs={languagePairs || []} />
      <Overview stats={stats} />
      <CorpusChart data={distributionData} />
    </main>
  );
}