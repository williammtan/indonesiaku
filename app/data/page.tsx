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
}

export default async function DataPage({ searchParams }: PageProps) {
	// If source and target are provided, redirect to the table view
	if (searchParams.src && searchParams.tgt) {
		return redirect(`/data/table?src=${searchParams.src}&tgt=${searchParams.tgt}`);
	}

	const supabase = await createClient();

	// Get total number of translations
	const { count: totalTranslations } = await supabase
		.from("translations")
		.select("*", { count: "exact", head: true });

	// Get number of unique language pairs
	const { data: languages } = await supabase
		.from("languages")
		.select("id, name, code");

	// Get number of contributors
	const { count: totalContributors } = await supabase
		.from("profiles")
		.select("*", { count: "exact", head: true });

	// Get language distribution data using the SQL function
	const { data: languageDistribution } = await supabase
		.rpc('get_language_distribution') as { data: LanguageDistribution[] | null };

	const stats = {
		translations: totalTranslations || 0,
		languages: languages?.length || 0,
		languagePairs: languages ? (languages.length * (languages.length - 1)) / 2 : 0,
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
			<SearchInterface languages={languages || []} />
			<Overview stats={stats} />
			<CorpusChart data={distributionData} />
		</main>
	);
}
