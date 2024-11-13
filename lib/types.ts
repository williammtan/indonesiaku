export type ContributionType = "translation" | "audio" | "rating";

export interface BaseContribution {
	id: string;
	userId?: string;
	type: ContributionType;
	status: "pending" | "validated" | "rejected";
	createdAt: Date;
	metadata: Record<string, any>;
}

export interface TranslationContribution extends BaseContribution {
	type: "translation";
	content: {
		sourceText: string;
		targetText: string;
		sourceLang: string;
		targetLang: string;
	};
}

export interface AudioContribution extends BaseContribution {
	type: "audio";
	content: {
		audioUrl: string;
		transcription?: string;
		language: string;
		duration: number;
	};
}

export interface RatingContribution extends BaseContribution {
	type: "rating";
	content: {
		modelId: string;
		sourceText: string;
		translation: string;
		rating: number;
		feedback?: string;
	};
}

export type Contribution =
	| TranslationContribution
	| AudioContribution
	| RatingContribution;

// Database schema
export interface ContributionTypeConfig {
	name: ContributionType;
	schema: Record<string, any>;
	validationRules: Record<string, any>;
	requiredFields: string[];
}
