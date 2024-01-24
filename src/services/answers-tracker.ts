import { Question } from '../types';

class AnswersTracker {
  private static instance: AnswersTracker;

  private _answeredQuestions: Map<string, boolean> = new Map();

  public get answeredQuestionIds() {
    return Array.from(this._answeredQuestions)
      .filter(([_, isAnswered]) => isAnswered)
      .map(([questionId, _]) => questionId);
  }

  private constructor() {}

  public static getInstance(): AnswersTracker {
    if (!AnswersTracker.instance) {
      AnswersTracker.instance = new AnswersTracker();
    }

    return AnswersTracker.instance;
  }

  public init(questions: Question[]) {
    this._answeredQuestions = new Map(questions.map((q) => [q.id, false]));
  }

  public markAsAnswered(questionId: string) {
    this._answeredQuestions.set(questionId, true);
  }

  public isAnswered(questionId: string): boolean {
    return this._answeredQuestions.get(questionId) || false;
  }

  public isAllAnswered(): boolean {
    return Array.from(this._answeredQuestions.values()).every((x) => x);
  }

  public nextQuestion(questionId: string): string | null {
    return this.findNearestUnansweredQuestion(questionId, 'forward');
  }

  public previousQuestion(questionId: string): string | null {
    return this.findNearestUnansweredQuestion(questionId, 'backward');
  }

  private findNearestUnansweredQuestion(questionId: string, direction: 'forward' | 'backward'): string | null {
    // Check if the key is in the map
    if (!this._answeredQuestions.has(questionId)) {
      return null; // Key not found in the map
    }

    // Get the iterator for the map
    const iterator = this._answeredQuestions.entries();

    // Iterate over the map to find the nearest element with value set to false
    let nearestFalseKeyForward: string | null = null;
    let nearestFalseKeyBackward: string | null = null;
    let foundKey = false;

    while (true) {
      const { value, done } = iterator.next();

      if (done) {
        break;
      }

      const [currentKey, currentValue] = value;

      if (currentKey === questionId) {
        foundKey = true;
        continue;
      }

      if (foundKey && nearestFalseKeyForward === null && !currentValue) {
        nearestFalseKeyForward = currentKey;
      }

      if (!foundKey && !currentValue) {
        nearestFalseKeyBackward = currentKey;
      }
    }

    // Choose the nearest key based on the direction (forward or backward)
    return direction === 'forward' ? nearestFalseKeyForward : nearestFalseKeyBackward;
  }
}

export default AnswersTracker;
