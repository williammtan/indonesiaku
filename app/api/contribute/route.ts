import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { ContributionType, Contribution } from "../../../lib/types";
import { validateContribution } from "@/lib/validation";

export async function POST(request: Request) {
	try {
		const supabase = await createClient();

		const contribution = await request.json();

		// Validate the contribution data
		const validationResult = await validateContribution(contribution);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: validationResult.error },
				{ status: 400 }
			);
		}

		// Store in Supabase
        const { data: data_t, error: error_t } = await supabase
            .from("contribution_types")
            .select()
            .eq('name', contribution.type)
            .single();

		if (error_t) throw error_t;
		if (!data_t) {
			return NextResponse.json(
				{ error: "Contribution type not found" },
				{ status: 400 }
			);
		}

		const type_id = data_t.id

		const { data, error } = await supabase
			.from("contributions")
			.insert({
				type_id: type_id,
				content: contribution.content,
				metadata: contribution.metadata,
				status: "pending",
			})
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error creating contribution:", error);
		return NextResponse.json(
			{ error: "Failed to create contribution" },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type") as ContributionType;
	const status = searchParams.get("status");
	const userId = searchParams.get("userId");

	try {
		const supabase = await createClient();

		let query = supabase.from("contributions").select("*");

		if (type) query = query.eq("type", type);
		if (status) query = query.eq("status", status);
		if (userId) query = query.eq("userId", userId);

		const { data, error } = await query;
		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching contributions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch contributions" },
			{ status: 500 }
		);
	}
}
