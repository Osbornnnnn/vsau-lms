export default function Practice2() {
  return (
    <>
      <h1>Практическая работа 2. Изменение через ветку и pull request</h1>
      <nav aria-label="Оглавление">
        <p>Содержание</p>
        <ul>
          <li>
            <a href="#section-1">Что потребуется</a>
          </li>
          <li>
            <a href="#section-2">Исходное состояние</a>
          </li>
          <li>
            <a href="#section-3">Порядок выполнения</a>
          </li>
          <li>
            <a href="#section-5">Ожидаемый результат</a>
          </li>
          <li>
            <a href="#section-6">Контрольные вопросы</a>
          </li>
        </ul>
      </nav>
      <p className="practice-goal">
        <strong>Цель:</strong> Добавить инструкцию в README через отдельную ветку, исправить её по
        замечанию в том же pull request и включить проверенное изменение в main.
      </p>
      <h2 id="section-1">Что потребуется</h2>
      <p>
        Понадобятся репозиторий course-notes из практики 1, его рабочая копия, Windows PowerShell,
        редактор UTF-8 и права на отправку веток и слияние PR.
      </p>
      <h2 id="section-2">Исходное состояние</h2>
      <p>
        В main находятся README.md и .gitignore. Раздела «Как начать работу», ветки{" "}
        <code>docs/add-start</code> и workflow пока нет.
      </p>
      <h2 id="section-3">Порядок выполнения</h2>
      <p>
        Откройте PowerShell в папке course-notes из практики 1 по{" "}
        <a href="?page=practice-1#windows-basics">инструкции по работе с командами</a>. Если команда
        завершается ошибкой или работа уже начата, воспользуйтесь{" "}
        <a href="?page=practice-1#troubleshooting">таблицей типичных ошибок Git</a>. Назначение
        команд переключения и обновления веток разобрано в{" "}
        <a href="?page=lecture-2#branch-commands">лекции 2</a>.
      </p>
      <ol>
        <li>
          <strong>Проверьте копию и обновите main.</strong> После <code>git status</code> убедитесь,
          что рабочая копия чистая. Незавершённые правки сначала разберите по таблице ошибок выше.
          Продолжайте после восстановления исходного состояния. Сохранение через Ctrl+S не создаёт
          коммит.
          <pre>
            <code className="language-powershell">
              {"git status\ngit remote -v\ngit switch main\ngit pull --ff-only origin main"}
            </code>
          </pre>
          Origin должен указывать на ваш проект.
        </li>
        <li>
          <strong>Создайте рабочую ветку.</strong>
          <pre>
            <code className="language-powershell">
              {"git switch -c docs/add-start\ngit branch --show-current"}
            </code>
          </pre>
          Вторая команда должна показать docs/add-start.
        </li>
        <li>
          <strong>Дополните README.</strong> Выполните <code>notepad.exe README.md</code>, сохраните
          исходные заголовок и цель, добавьте раздел ниже и нажмите Ctrl+S. Этот текст вставляйте в
          редактор, а не в PowerShell. Это первый вариант инструкции. После создания PR вы уточните
          третий шаг по замечанию.
          <pre>
            <code className="language-markdown">
              {
                "## Как начать работу\n\n1. Откройте проект в GitHub.\n2. Клонируйте репозиторий по HTTPS.\n3. Проверьте состояние командой `git status`."
              }
            </code>
          </pre>
        </li>
        <li>
          <strong>Проверьте и зафиксируйте правку.</strong>
          <pre>
            <code className="language-powershell">
              {
                'git diff -- README.md\ngit add README.md\ngit diff --staged\ngit commit -m "Добавлена инструкция начала работы"'
              }
            </code>
          </pre>
          В изменениях должен быть только README. Проверьте, нет ли случайных удалений и секретных
          данных.
        </li>
        <li>
          <strong>Отправьте ветку.</strong>
          <pre>
            <code className="language-powershell">
              {"git push -u origin docs/add-start\ngit rev-parse --short HEAD"}
            </code>
          </pre>
          Откройте docs/add-start в Code, прочитайте README и сравните SHA.
        </li>
      </ol>
      <ol start={6}>
        <li>
          <strong>Подготовьте PR.</strong> В Pull requests нажмите New pull request. Установите{" "}
          <code>base: main</code>, <code>compare: docs/add-start</code>. Проверьте diff. Нажмите
          Create pull request, укажите название «Добавлена инструкция начала работы». В описании
          поясните, зачем нужен раздел. Подтвердите создание кнопкой Create pull request.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-2/02-create-pull-request.png">
          <img
            src="images/lecture-2/02-create-pull-request.png"
            alt="Подготовка pull request из docs/add-start в main"
          />
        </a>
        <figcaption>Рисунок 1. Направление base и compare проверяют до создания PR.</figcaption>
      </figure>
      <ol start={7}>
        <li>
          <strong>Разберите замечание в PR.</strong> Откройте Files changed и проверьте, что изменён
          только README. Предложите преподавателю или одногруппнику оставить замечание «В третьем
          шаге укажите, что git status выполняется в каталоге рабочей копии». При самостоятельной
          работе запишите это замечание обычным комментарием в Conversation и пометьте его как
          самопроверку. Самопроверка не заменяет независимое одобрение, если оно требуется правилами
          проекта.
        </li>
        <li>
          <strong>Исправьте README в той же ветке.</strong> Проверьте текущую ветку командой{" "}
          <code>git branch --show-current</code>. Должна быть docs/add-start. В Блокноте замените
          только третий шаг следующим текстом и сохраните файл.
          <pre>
            <code className="language-markdown">
              {"3. В каталоге рабочей копии проверьте состояние командой `git status`."}
            </code>
          </pre>
          Проверьте изменение, создайте второй коммит и отправьте его командами ниже.
          <pre>
            <code className="language-powershell">
              {
                'git diff -- README.md\ngit add README.md\ngit diff --staged\ngit commit -m "Уточнён каталог для git status"\ngit push\ngit rev-parse --short HEAD'
              }
            </code>
          </pre>
          Сохраните SHA исправления. Новую ветку и второй PR создавать не требуется.
        </li>
        <li>
          <strong>Проверьте обновление PR.</strong> Вернитесь в тот же запрос. В Commits должны быть
          исходный коммит и коммит исправления с записанным SHA. В Files changed проверьте итоговый
          раздел с уточнённым третьим шагом и сохранность исходного текста. Ответьте на замечание,
          указав, что исправили, и SHA нового коммита.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-2/01-feature-branch.png">
          <img
            src="images/lecture-2/01-feature-branch.png"
            alt="Ветка docs/add-start с итоговой инструкцией после уточнения третьего шага"
          />
        </a>
        <figcaption>
          Рисунок 2. Итоговая инструкция после исправления. Снимок показывает содержимое файла. Ход
          обсуждения и оба коммита проверяйте в своём PR по схеме ниже.
        </figcaption>
      </figure>
      <table>
        <caption>Схема исправления по замечанию в одном PR</caption>
        <thead>
          <tr>
            <th scope="col">Этап</th>
            <th scope="col">Что видно в PR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Создан PR после первой отправки</td>
            <td>
              В Commits один коммит «Добавлена инструкция начала работы» с исходным третьим шагом.
            </td>
          </tr>
          <tr>
            <td>Получено замечание</td>
            <td>
              В Conversation записана просьба уточнить каталог для git status. Содержимое README
              пока прежнее.
            </td>
          </tr>
          <tr>
            <td>Отправлено исправление в docs/add-start</td>
            <td>
              В том же PR два коммита с разными SHA. Второй — «Уточнён каталог для git status». В
              Files changed показан итоговый раздел, а в обсуждении есть ответ со ссылкой на
              исправление или его SHA.
            </td>
          </tr>
        </tbody>
      </table>
      <ol start={10}>
        <li>
          <strong>Выполните слияние.</strong> Проверьте условия проекта, отсутствие конфликтов и
          направление PR. В этой работе CI ещё не настроен. Нажмите Merge pull request → Confirm
          merge. Используйте обычный merge commit. В списке рядом с кнопкой выберите Create a merge
          commit. Сохраните ветку для последующего сравнения.
        </li>
        <li>
          <strong>Проверьте статус Merged.</strong> Закрытие PR без слияния не включает изменения в
          main. Откройте main в Code и найдите новый раздел.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-2/04-merged-result.png">
          <img
            src="images/lecture-2/04-merged-result.png"
            alt="Pull request после успешного слияния"
          />
        </a>
        <figcaption>
          Рисунок 3. Пример статуса Merged. В вашей работе PR также содержит второй коммит с
          исправлением после замечания.
        </figcaption>
      </figure>
      <ol start={12}>
        <li>
          <strong>Обновите рабочую копию.</strong>
          <pre>
            <code className="language-powershell">
              {
                "git switch main\ngit pull --ff-only origin main\ngit rev-parse HEAD\nGet-Content -LiteralPath README.md -Encoding UTF8\ngit status"
              }
            </code>
          </pre>
          В локальном README должны сохраниться заголовок, цель и новый раздел. Рабочая копия должна
          быть чистой. Сохраните SHA main после слияния и вывод остальных команд до начала работы 3.
        </li>
      </ol>

      <h2 id="section-5">Ожидаемый результат</h2>
      <p>
        Изменения из docs/add-start приняты в main через PR. В README сохранён исходный текст и
        добавлены три шага начала работы с уточнением каталога в третьем шаге. Один PR содержит
        исходный коммит и исправление по замечанию. Локальная main обновлена, рабочая копия чистая.
        Workflow и обязательную фразу пока не добавляйте. Они понадобятся в третьей работе.
      </p>
      <h2 id="section-6">Контрольные вопросы</h2>
      <ol>
        <li>Чем git add отличается от git commit и git push?</li>
        <li>Какая ветка указывается как base, а какая как compare?</li>
        <li>Как отправить исправление в уже созданный PR?</li>
        <li>Почему после Merged нужно отдельно обновить локальную main?</li>
      </ol>
      <nav aria-label="Переходы по курсу">
        <a href="?page=lecture-2">← Назад</a> · <a href="?page=home">На главную</a> ·{" "}
        <a href="?page=lecture-3">Далее →</a>
      </nav>
    </>
  );
}
