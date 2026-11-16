import { useEffect, useRef, useState, type FormEvent } from "react";
import QuestionFields from "../QuestionFields";
import { grade, isComplete, isCorrect, questions, readAnswer } from "../quiz";

export default function Test() {
  const form = useRef<HTMLFormElement>(null);
  const warning = useRef<HTMLParagraphElement>(null);
  const result = useRef<HTMLElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [missing, setMissing] = useState(0);
  const [answers, setAnswers] = useState<FormData | null>(null);
  const score =
    answers === null ? null : questions.filter((q) => isCorrect(q, readAnswer(q, answers))).length;

  useEffect(() => {
    if (score !== null) result.current?.focus();
  }, [score]);
  useEffect(() => {
    if (missing > 0) warning.current?.focus();
  }, [missing]);
  useEffect(() => {
    if (attempt > 0) form.current?.querySelector<HTMLElement>("input, select")?.focus();
  }, [attempt]);

  function finish(allowMissing = false) {
    if (answers || !form.current) return;
    const data = new FormData(form.current);
    const count = questions.filter((q) => !isComplete(readAnswer(q, data))).length;
    if (count && !allowMissing) {
      setMissing(count);
      return;
    }
    setMissing(0);
    setAnswers(data);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    finish();
  }

  return (
    <>
      <h1>Итоговый тест</h1>
      <p>
        Тест содержит 30 вопросов. Из них 10 с выбором одного ответа, 8 с кратким ответом, 6 на
        сопоставление и 6 на порядок действий. За полностью правильный вопрос начисляется 1 балл.
        Частичных баллов нет.
      </p>
      <p>
        В сопоставлении выберите по одному значению для каждого понятия. В вопросах на порядок
        назначьте каждому действию позицию от первой до последней. Одно значение или позицию нельзя
        назначить дважды. Чтобы освободить выбор, верните поле к «Выберите…».
      </p>
      <p>
        Оценки: 27–30 — «Отлично», 23–26 — «Хорошо», 18–22 — «Удовлетворительно», 0–17 —
        «Неудовлетворительно». После проверки появятся объяснения и ссылки на материалы. Ответы
        остаются на странице до новой попытки. Между посещениями они не сохраняются.
      </p>
      <form
        id="test-form"
        ref={form}
        noValidate
        onSubmit={submit}
        onInput={() => setMissing(0)}
        onChange={() => setMissing(0)}
      >
        <div id="questions" key={attempt}>
          {questions.map((q, index) => {
            const correct = answers !== null && isCorrect(q, readAnswer(q, answers));
            return (
              <fieldset
                key={q.id}
                id={`q-${q.id}`}
                data-question-id={q.id}
                disabled={answers !== null}
                aria-describedby={`feedback-${q.id}`}
              >
                <legend>
                  {index + 1}. {q.prompt}
                </legend>
                <QuestionFields question={q} />
                <p id={`feedback-${q.id}`} className="feedback" hidden={answers === null}>
                  {answers !== null && (
                    <>
                      <strong>{correct ? "Правильно. " : "Неправильно. "}</strong>
                      {q.explanation}
                      {" Подробнее в материале «"}
                      <a href={q.source}>
                        {q.source.includes("lecture-") ? "Лекция" : "Практика"} {q.block}
                      </a>
                      {"»."}
                    </>
                  )}
                </p>
              </fieldset>
            );
          })}
        </div>
        <p id="unanswered-warning" ref={warning} role="alert" tabIndex={-1} hidden={!missing}>
          {missing > 0 &&
            `Осталось без ответа ${missing} из ${questions.length} вопросов. Заполните их или завершите тест с пропусками. За такие вопросы начисляется 0 баллов.`}
        </p>
        <button id="check-test" type="submit" disabled={answers !== null}>
          Проверить ответы
        </button>{" "}
        <button id="finish-incomplete" type="button" hidden={!missing} onClick={() => finish(true)}>
          Завершить с пропусками
        </button>
      </form>
      <section
        id="result"
        ref={result}
        aria-live="polite"
        aria-labelledby="result-heading"
        tabIndex={-1}
        hidden={score === null}
      >
        <h2 id="result-heading">Результат</h2>
        <p id="result-summary">
          {score !== null &&
            `Правильных ответов ${score} из ${questions.length} (${((score / questions.length) * 100).toFixed(1).replace(".", ",")} %). Оценка «${grade(score)}».`}
        </p>
      </section>
      <button
        id="retry-test"
        type="button"
        hidden={answers === null}
        onClick={() => {
          setAnswers(null);
          setMissing(0);
          setAttempt(attempt + 1);
        }}
      >
        Пройти заново
      </button>
      <p>
        <a href="?page=practice-3">Назад к практике 3</a> · <a href="?page=home">На главную</a>
      </p>
    </>
  );
}
