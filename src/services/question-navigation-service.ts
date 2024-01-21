import { Question } from '../types';

class QuestionNavigationService {
  private static instance: QuestionNavigationService;

  private answeredQuestions: Map<string, boolean> = new Map();

  private constructor() {}

  public static getInstance(): QuestionNavigationService {
    if (!QuestionNavigationService.instance) {
      QuestionNavigationService.instance = new QuestionNavigationService();
    }

    return QuestionNavigationService.instance;
  }

  public init(questions: Question[]) {
    this.answeredQuestions = new Map(questions.map((q) => [q.id, false]));
  }

  public markAsAnswered(questionId: string) {
    this.answeredQuestions.set(questionId, true);
  }

  public isAllAnswered(): boolean {
    return Array.from(this.answeredQuestions.values()).every((x) => x);
  }

  public nextQuestion(questionId: string): string | null {
    return this.findNearestUnansweredQuestion(questionId, 'forward');
  }

  public previousQuestion(questionId: string): string | null {
    return this.findNearestUnansweredQuestion(questionId, 'backward');
  }

  private findNearestUnansweredQuestion(questionId: string, direction: 'forward' | 'backward'): string | null {
    // Check if the key is in the map
    if (!this.answeredQuestions.has(questionId)) {
      return null; // Key not found in the map
    }

    // Get the iterator for the map
    const iterator = this.answeredQuestions.entries();

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

export default QuestionNavigationService;