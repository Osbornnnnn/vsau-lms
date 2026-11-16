import bank from "./questions.json";

type Item = { id: string; text: string };
type BaseQuestion = {
  id: string;
  block: number;
  prompt: string;
  explanation: string;
  source: string;
};

export type Question = BaseQuestion &
  (
    | { type: "single_choice"; options: Item[]; answer: string }
    | { type: "short_answer"; answer: string[] }
    | { type: "matching"; left: Item[]; right: Item[]; answer: Record<string, string> }
    | { type: "ordering"; items: Item[]; answer: string[]; displayOrder: string[] }
  );

export type Answer = string | Record<string, string>;
export const questions = bank as Question[];

export function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function grade(score: number) {
  if (score >= 27) return "Отлично";
  if (score >= 23) return "Хорошо";
  if (score >= 18) return "Удовлетворительно";
  return "Неудовлетворительно";
}

export function isCorrect(question: Question, answer: Answer) {
  if (typeof answer === "string") {
    if (question.type === "single_choice") return answer === question.answer;
    if (question.type === "short_answer") {
      return question.answer.some((accepted) => normalize(answer) === normalize(accepted));
    }
    return false;
  }

  if (question.type === "matching") {
    return (
      Object.keys(answer).length === question.left.length &&
      question.left.every((item) => answer[item.id] === question.answer[item.id])
    );
  }

  if (question.type === "ordering") {
    return (
      Object.keys(answer).length === question.answer.length &&
      question.answer.every((id, index) => answer[id] === String(index + 1))
    );
  }

  return false;
}

export function readAnswer(question: Question, data: FormData): Answer {
  if (question.type === "single_choice" || question.type === "short_answer") {
    return String(data.get(question.id) ?? "");
  }

  const items = question.type === "matching" ? question.left : question.items;

  return Object.fromEntries(
    items.map((item) => [item.id, String(data.get(`${question.id}-${item.id}`) ?? "")]),
  );
}

export function isComplete(answer: Answer) {
  return typeof answer === "string"
    ? normalize(answer) !== ""
    : Object.values(answer).every((value) => value !== "");
}

export function shuffled<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }

  return result;
}
