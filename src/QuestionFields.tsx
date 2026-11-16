import { useState } from "react";
import { shuffled, type Question } from "./quiz";

export default function QuestionFields({ question: q }: { question: Question }) {
  const [options] = useState(() => (q.type === "single_choice" ? shuffled(q.options) : []));

  const [items] = useState(() => {
    if (q.type === "matching") return q.left;
    if (q.type !== "ordering") return [];
    const result = shuffled(q.items);
    if (result.every((item, index) => item.id === q.answer[index])) {
      [result[0], result[1]] = [result[1], result[0]];
    }
    return result;
  });

  const [choices] = useState(() =>
    q.type === "matching"
      ? shuffled(q.right)
      : items.map((_, index) => ({ id: String(index + 1), text: String(index + 1) })),
  );

  const [selected, setSelected] = useState<Record<string, string>>({});

  if (q.type === "single_choice") {
    return options.map((option) => (
      <p key={option.id}>
        <input type="radio" name={q.id} id={`${q.id}-${option.id}`} value={option.id} />{" "}
        <label htmlFor={`${q.id}-${option.id}`}>{option.text}</label>
      </p>
    ));
  }

  if (q.type === "short_answer") {
    return (
      <p>
        <label htmlFor={`${q.id}-answer`}>Ваш ответ: </label>
        <input type="text" name={q.id} id={`${q.id}-answer`} autoComplete="off" />
      </p>
    );
  }

  return (
    <>
      <p>
        {q.type === "matching"
          ? "Для каждого понятия выберите значение."
          : "Назначьте каждому действию его позицию. Число 1 обозначает первое действие."}
      </p>

      {items.map((item) => (
        <p key={item.id}>
          <label htmlFor={`${q.id}-${item.id}`}>{item.text} </label>

          <select
            name={`${q.id}-${item.id}`}
            id={`${q.id}-${item.id}`}
            data-item-id={item.id}
            value={selected[item.id] ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setSelected((current) => ({ ...current, [item.id]: value }));
            }}
          >
            <option value="">Выберите…</option>

            {choices.map((choice) => (
              <option
                key={choice.id}
                value={choice.id}
                disabled={
                  choice.id !== selected[item.id] && Object.values(selected).includes(choice.id)
                }
              >
                {choice.text}
              </option>
            ))}
          </select>
        </p>
      ))}
    </>
  );
}
