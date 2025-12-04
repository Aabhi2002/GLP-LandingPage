// Type definitions for Risk Score Test

export interface QuestionOption {
    id: string;
    label: string;
    score: number;
}

export interface Question {
    id: string;
    section: string;
    question: string;
    type: "single" | "multi";
    options: QuestionOption[];
    isOverride?: boolean;
    overrideCategory?: string;
}

export interface Answers {
    [questionId: string]: string | string[];
}

export interface TestResult {
    answers: Answers;
    totalScore: number;
    baseCategory: string;
    finalCategory: string;
    isOverride: boolean;
    triggeredBy: string | null;
    triggeredFlags: string[];
    name: string;
    phone: string;
    contactRequested: boolean;
}

export interface CategoryExplanation {
    title: string;
    subtitle: string;
    meaning: string[];
    youNeed: string[];
    note?: string;
}

export interface OverrideResult {
    isOverride: boolean;
    category: string | null;
    triggeredBy: string | null;
    flags: string[];
}
