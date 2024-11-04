import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/data-table";
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
	{
		accessorKey: "source_text",
		header: "Source Text",
	},
	{
		accessorKey: "target_text",
		header: "Translation",
	},
	{
		accessorKey: "proficiency",
		header: "Proficiency",
		cell: (value: number) => {
			const labels = [
				"Not Proficient",
				"Elementary",
				"Limited Working",
				"Native/Bilingual",
			];
			return labels[value];
		},
	},
	{
		accessorKey: "source_language_id.name",
		header: "Source Language",
	},
	{
		accessorKey: "target_language_id.name",
		header: "Target Language",
	},
	{
		accessorKey: "profiles.username",
		header: "User",
	},
] as const;

interface PageProps {
	searchParams: {
		page?: string;
		pageSize?: string;
	};
}

export default async function DataPage({ searchParams }: PageProps) {
	const currentPage = Math.max(1, parseInt(searchParams.page ?? "1"));
	const pageSize = Math.max(10, parseInt(searchParams.pageSize ?? "20"));
	const supabase = await createClient();

	// Get the total count
	const { count } = await supabase
		.from("translations")
		.select("*", { count: "exact", head: true });

	// Get the data for the current page
	const { data: translations, error } = await supabase
		.from("translations")
		.select(
			`*,
            profiles (
                username 
            ),
            source_language_id:languages!translations_source_language_id_fkey (
                name
            ),
            target_language_id:languages!translations_target_language_id_fkey (
                name
            )`
		)
		.range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
		.order("id", { ascending: false });

	if (error) {
		console.log(error);
		return (
			<div className="flex h-[calc(100vh-4rem)] items-center justify-center">
				<p className="text-red-600">Failed to load translations</p>
			</div>
		);
	}

	const pageCount = Math.ceil((count ?? 0) / pageSize);

	return (
		<div className="container py-10">
			<h1 className="text-3xl font-bold">Translations</h1>
			<div className="flex items-center justify-end">
				<div className="mb-2">
					<Button className="h-8 px-2 lg:px-3">
						<Link href="/data/new">
							Add Translation
						</Link>
					</Button>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={translations || []}
				pageCount={pageCount}
				currentPage={currentPage}
				pageSize={pageSize}
				totalItems={count ?? 0}
			/>
		</div>
	);
}
