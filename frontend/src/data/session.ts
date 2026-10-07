// In-memory session hand-off between screens (Phase 1 UI only — no backend).
// Screens like MCQ practice write their result here; result screens read it.

import type { MCQQuestion } from "./demo";

export type PracticeResult = {
  title: string;
  questions: MCQQuestion[];
  answers: (number | null)[];
  timeSpentSec: number;
};

let practiceResult: PracticeResult | null = null;

export function setPracticeResult(result: PracticeResult) {
  practiceResult = result;
}

export function getPracticeResult(): PracticeResult | null {
  return practiceResult;
}

export type MockTestResult = {
  testId: string;
  testTitle: string;
  questions: MCQQuestion[];
  answers: (number | null)[];
  timeSpentSec: number;
};

let mockTestResult: MockTestResult | null = null;

export function setMockTestResult(result: MockTestResult) {
  mockTestResult = result;
}

export function getMockTestResult(): MockTestResult | null {
  return mockTestResult;
}