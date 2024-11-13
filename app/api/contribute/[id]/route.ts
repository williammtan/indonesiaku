import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

interface RouteParams {
	params: {
		id: string;
	};
}

export async function GET(request: Request, { params }: RouteParams) {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("contributions")
			.select("*")
			.eq("id", params.id)
			.single();

		if (error) throw error;
		if (!data) {
			return NextResponse.json(
				{ error: "Contribution not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching contribution:", error);
		return NextResponse.json(
			{ error: "Failed to fetch contribution" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request, { params }: RouteParams) {
	try {
		const supabase = await createClient();

		const updates = await request.json();

		const { data, error } = await supabase
			.from("contributions")
			.update(updates)
			.eq("id", params.id)
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error updating contribution:", error);
		return NextResponse.json(
			{ error: "Failed to update contribution" },
			{ status: 500 }
		);
	}
}
