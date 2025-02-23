import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Translation = {
  source_text: string;
  target_text: string;
  proficiency: number;
  source_language_id: { name: string };
  target_language_id: { name: string };
  profiles: { username: string };
};

// Custom type to allow nested paths
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// Update the Column interface with the object constraint
interface CustomColumn<T extends object> {
  accessorKey: NestedKeyOf<T>;
  header: string;
  cell?: (value: any) => React.ReactNode;
}

const columns: CustomColumn<Translation>[] = [
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
];

interface PageProps {
  searchParams: {
    src?: string;
    tgt?: string;
    page?: string;
    pageSize?: string;
  };
}

export default async function DataTablePage({ searchParams }: PageProps) {
  const currentPage = Math.max(1, parseInt(searchParams.page ?? "1"));
  const pageSize = Math.max(10, parseInt(searchParams.pageSize ?? "20"));
  const supabase = await createClient();

  // Get the total count
  const { count } = await supabase
    .from("translations")
    .select("*", { count: "exact", head: true })
    .eq("source_language_id", searchParams.src)
    .eq("target_language_id", searchParams.tgt);

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
    .eq("source_language_id", searchParams.src)
    .eq("target_language_id", searchParams.tgt)
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
    .order("id", { ascending: false });

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-red-600">Failed to load translations</p>
      </div>
    );
  }

  const pageCount = Math.ceil((count ?? 0) / pageSize);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Translations</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link href="/data">Back to Overview</Link>
          </Button>
          <Button>
            <Link href="/data/new">Add Translation</Link>
          </Button>
        </div>
      </div>
      <DataTable<Translation>
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