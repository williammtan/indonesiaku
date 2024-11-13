import { z } from "zod";
import { Contribution, ContributionType } from "./types";

const baseSchema = z.object({
	type: z.enum(["translation", "audio", "rating"]),
	metadata: z.record(z.any()),
});

const translationSchema = baseSchema.extend({
	type: z.literal("translation"),
	content: z.object({
		sourceText: z.string().min(1),
		targetText: z.string().min(1),
		sourceLang: z.string(),
		targetLang: z.string(),
	}),
});

const audioSchema = baseSchema.extend({
	type: z.literal("audio"),
	content: z.object({
		audioUrl: z.string().url(),
		transcription: z.string().optional(),
		language: z.string(),
		duration: z.number().positive(),
	}),
});

const ratingSchema = baseSchema.extend({
	type: z.literal("rating"),
	content: z.object({
		modelId: z.string(),
		sourceText: z.string(),
		translation: z.string(),
		rating: z.number().min(1).max(5),
		feedback: z.string().optional(),
	}),
});

const contributionSchema = z.discriminatedUnion("type", [
	translationSchema,
	audioSchema,
	ratingSchema,
]);

export async function validateContribution(contribution: unknown) {
	const result = contributionSchema.safeParse(contribution);
	return result;
}
