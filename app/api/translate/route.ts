import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// Environment variables in Next.js are accessed directly from process.env
const NLLB_ENDPOINT = process.env.NLLB_ENDPOINT;

// Define types for the request body
interface TranslationRequest {
	sourceLanguage: {
		name: string;
		nllb_code: string;
	};
	targetLanguage: {
		name: string;
		nllb_code: string;
	};
	text: string | string[];
}

export async function POST(request: NextRequest) {
	try {
		// Parse the request body
		const body: TranslationRequest = await request.json();
		let { sourceLanguage, targetLanguage, text } = body;

		// Validate request parameters
		if (!sourceLanguage || !targetLanguage || !text) {
			return NextResponse.json(
				{ error: "Invalid request parameters" },
				{ status: 400 }
			);
		}

		// Handle array input
		if (Array.isArray(text)) {
			text = text[0];
		}

		// NLLB Implementation
		const nllbResponse = await fetch(`${NLLB_ENDPOINT}/translate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				source: [text],
				src_lang: sourceLanguage.nllb_code,
				tgt_lang: targetLanguage.nllb_code,
			}),
		});

		if (!nllbResponse.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch translation" },
				{ status: nllbResponse.status }
			);
		}

		const nllbBody = await nllbResponse.json();
		const translatedText = nllbBody.translation;

		// Return the response
		return NextResponse.json({
			sourceLanguage,
			targetLanguage,
			text,
			translatedText,
		});
	} catch (error) {
		console.error("Translation error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
