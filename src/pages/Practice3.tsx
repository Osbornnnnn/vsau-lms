export default function Practice3() {
  return (
    <>
      <h1>Практическая работа 3. Проверка обязательной фразы через GitHub Actions</h1>
      <nav aria-label="Оглавление">
        <p>Содержание</p>
        <ul>
          <li>
            <a href="#section-1">Что потребуется</a>
          </li>
          <li>
            <a href="#section-2">Исходное состояние и файлы</a>
          </li>
          <li>
            <a href="#section-3">Порядок выполнения</a>
          </li>
          <li>
            <a href="#section-5">Ожидаемый результат</a>
          </li>
          <li>
            <a href="#troubleshooting">Типичные ошибки Actions</a>
          </li>
          <li>
            <a href="#section-6">Контрольные вопросы</a>
          </li>
        </ul>
      </nav>
      <p className="practice-goal">
        <strong>Цель:</strong> Добавить CI, который проверяет наличие текста «проверочная фраза» в
        README.md, получить ошибку при её отсутствии, затем добавить фразу и подтвердить исправление
        новым коммитом.
      </p>
      <h2 id="section-1">Что потребуется</h2>
      <p>
        Понадобятся репозиторий course-notes после работы 2, Windows PowerShell, редактор UTF-8 и
        права на отправку веток и слияние PR. В Settings репозитория → Actions → General должны быть
        разрешены используемые действия. Для PAT нужны "Contents: Read and write" и "Workflows: Read
        and write". На компьютере команды вводятся в PowerShell. На GitHub проверка выполняется
        отдельно, на стандартном Linux-раннере <code>ubuntu-latest</code> с оболочкой Bash.
        Подключать собственный сервер не нужно. Настройку Workflow permissions на Read and write
        менять не нужно, поскольку учебной проверке достаточно чтения.
      </p>
      <p>
        Если работаете с PAT из первой практики, проверьте его срок и разрешение "Workflows: Read
        and write". Изменить разрешения можно в Settings профиля → Developer settings → Personal
        access tokens → Fine-grained tokens → выбранный токен → Edit → Repository permissions.
        Сохраните изменения кнопкой Update token. При входе через браузер с GCM создавать PAT
        отдельно не требуется.
      </p>
      <h2 id="section-2">Исходное состояние и файлы</h2>
      <p>
        В main находятся README с разделом «Как начать работу» и .gitignore. Workflow и обязательной
        фразы в README ещё нет. Скачайте{" "}
        <a href="downloads/check-readme.yml" download>
          check-readme.yml
        </a>
        . Пока оставьте файл в «Загрузках». Папку назначения создадите на шаге 2, а файл скопируете
        на шаге 3. Сначала проверка обнаружит отсутствие фразы. Затем вы добавите её новым коммитом
        и сравните результаты.
      </p>
      <p>
        Работайте в своём репозитории. Снимки автора показывают примеры ошибки и успешной проверки.
        Сообщения коммитов и номера запусков могут отличаться от ваших. В отчёте должны быть
        результаты вашей работы.
      </p>
      <h2 id="section-3">Порядок выполнения</h2>
      <p>
        Откройте PowerShell в папке course-notes из предыдущей практики по{" "}
        <a href="?page=practice-1#windows-basics">инструкции по работе с командами</a>. Назначение
        отступов YAML и условий Bash разобрано в{" "}
        <a href="?page=lecture-3#workflow-example">лекции 3 на примере этого workflow</a>. При
        ошибках Git или продолжении ранее начатой работы используйте{" "}
        <a href="?page=practice-1#troubleshooting">таблицу из практики 1</a>.
      </p>
      <ol>
        <li>
          <strong>Проверьте состояние и обновите main.</strong> После <code>git status</code>
          убедитесь, что рабочая копия чистая. Незавершённые правки сначала разберите по таблице
          ошибок Git. Продолжайте после восстановления исходного состояния.
          <pre>
            <code className="language-powershell">
              {
                "git status\ngit remote -v\ngit switch main\ngit pull --ff-only origin main\nGet-Content -LiteralPath README.md -Encoding UTF8"
              }
            </code>
          </pre>
          Origin должен указывать на ваш проект, а в README должен быть раздел из практики 2.
        </li>
        <li>
          <strong>Создайте ветку CI.</strong>
          <pre>
            <code className="language-powershell">
              {
                "git switch -c ci/check-readme\ngit branch --show-current\nNew-Item -ItemType Directory -Path .github/workflows -Force | Out-Null"
              }
            </code>
          </pre>
        </li>
        <li>
          <strong>Сохраните образец workflow.</strong> Скопируйте check-readme.yml из «Загрузок» в
          папку course-notes → .github → workflows. Команда{" "}
          <code>Get-ChildItem -LiteralPath .github/workflows -Force</code> должна показать файл с
          точным именем check-readme.yml без .txt. Сверьте содержимое с образцом ниже.
        </li>
      </ol>
      <p>
        YAML ниже записывается в файл. Команды Bash внутри него выполняет GitHub Actions на Linux.
        Вводить их в PowerShell не нужно.
      </p>
      <pre>
        <code className="language-yaml">
          {
            "name: Проверка README\non:\n  push:\n  pull_request:\npermissions:\n  contents: read\njobs:\n  check-readme:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Получение репозитория\n        uses: actions/checkout@v7\n        with:\n          persist-credentials: false\n      - name: Проверка обязательной фразы\n        shell: bash\n        run: |\n          if [ ! -f README.md ]; then\n            printf '%s\\n' 'Ошибка: файл README.md не найден'\n            exit 1\n          fi\n          if ! grep -Fq -- 'проверочная фраза' README.md; then\n            printf '%s\\n' 'Проверка не пройдена: обязательная фраза не найдена'\n            exit 1\n          fi\n          printf '%s\\n' 'Проверка пройдена: обязательная фраза найдена'\n"
          }
        </code>
      </pre>
      <ol start={4}>
        <li>
          <strong>Отправьте workflow без изменения README.</strong> Сохраните заголовок, цель и
          раздел «Как начать работу». Текста <code>проверочная фраза</code> в README пока быть не
          должно. В коммит должен попасть только workflow.
          <pre>
            <code className="language-powershell">
              {
                'git status\ngit add .github/workflows/check-readme.yml\ngit diff --staged\ngit commit -m "Добавлена проверка обязательной фразы"\ngit push -u origin ci/check-readme\ngit rev-parse --short HEAD'
              }
            </code>
          </pre>
          Запишите первый SHA.
        </li>
        <li>
          <strong>Найдите автоматический запуск.</strong> Откройте Actions своего репозитория.
          Выберите запуск по событию push для ci/check-readme и SHA предыдущего шага. Run workflow
          не требуется, поскольку проверка запускается при отправке коммита.
        </li>
        <li>
          <strong>Разберите ожидаемую ошибку.</strong> Дождитесь Failure, откройте задание
          check-readme в списке Jobs и раскройте шаг «Проверка обязательной фразы». Найдите
          сообщение «Проверка не пройдена: обязательная фраза не найдена» и код завершения 1.
          Запишите номер запуска, SHA и причину ошибки. Ошибка получения репозитория, ожидание или
          отмена не подтверждают, что проверка обнаружила отсутствие фразы. Пока не сливайте ветку в
          main.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-3/03-failed-job-log.png">
          <img
            src="images/lecture-3/03-failed-job-log.png"
            alt="Журнал Failure при отсутствии обязательной фразы в непустом README"
          />
        </a>
        <figcaption>
          Рисунок 1. Ожидаемая ошибка при наличии README без обязательной фразы.
        </figcaption>
      </figure>
      <ol start={7}>
        <li>
          <strong>Добавьте обязательную фразу.</strong> Откройте <code>notepad.exe README.md</code>{" "}
          и в конец файла добавьте следующую строку.
          <pre>
            <code>проверочная фраза</code>
          </pre>
          Используйте строчные буквы, один обычный пробел, без кавычек. Сохраните заголовок, цель и
          три шага начала работы. Фраза должна быть именно в README.md, а не только в YAML или
          сообщении коммита. Нажмите Ctrl+S. Не меняйте условие YAML ради зелёного статуса.
        </li>
        <li>
          <strong>Проверьте и отправьте исправление.</strong>
          <pre>
            <code className="language-powershell">
              {
                'git diff -- README.md\ngit add README.md\ngit diff --staged\ngit commit -m "Добавлена проверочная фраза"\ngit push\ngit rev-parse --short HEAD'
              }
            </code>
          </pre>
          В diff должна добавляться только строка с фразой. Запишите второй SHA и дождитесь
          автоматического push-запуска именно этого коммита.
        </li>
        <li>
          <strong>Подтвердите исправление.</strong> Новый запуск должен завершиться со статусом
          Success. В задании check-readme раскройте шаг «Проверка обязательной фразы» и найдите
          сообщение «Проверка пройдена: обязательная фраза найдена». Запишите номер запуска, SHA и
          результат. Кнопка Re-run jobs старого неуспешного запуска проверяет прежнее состояние и не
          заменяет запуск исправленного коммита.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-3/04-fixed-job-log.png">
          <img
            src="images/lecture-3/04-fixed-job-log.png"
            alt="Пример успешной проверки README с обязательной фразой"
          />
        </a>
        <figcaption>
          Рисунок 2. Успешная проверка при наличии обязательной фразы в README.
        </figcaption>
      </figure>
      <ol start={10}>
        <li>
          <strong>Сопоставьте два состояния.</strong> Заполните таблицу собственными данными. Для
          сравнения используйте push-запуски. Сохраните неуспешную запись, поскольку она показывает,
          что проверка обнаружила отсутствие фразы.
        </li>
      </ol>
      <table>
        <thead>
          <tr>
            <th scope="col">Состояние README</th>
            <th scope="col">SHA, номер и ссылка на push-запуск</th>
            <th scope="col">Ожидается</th>
            <th scope="col">Фактический статус и сообщение из лога</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Обязательной фразы ещё нет, остальной текст сохранён</td>
            <td>Заполните</td>
            <td>Failure, фраза не найдена</td>
            <td>Заполните</td>
          </tr>
          <tr>
            <td>Фраза добавлена новым коммитом</td>
            <td>Заполните</td>
            <td>Success, фраза найдена</td>
            <td>Заполните</td>
          </tr>
        </tbody>
      </table>
      <ol start={11}>
        <li>
          <strong>Откройте PR исправленной ветки.</strong> В Pull requests создайте запрос с base
          main и compare ci/check-readme. Укажите название «Добавлена проверка обязательной фразы».
          В описании укажите условие проверки, причину первого Failure и результат исправления.
        </li>
        <li>
          <strong>Проверьте итоговые изменения и CI.</strong> Должны добавляться
          .github/workflows/check-readme.yml и обязательная фраза в README. Инструкция из работы 2
          должна сохраниться. Дождитесь успешной проверки PR. Событие pull_request может
          использовать временный merge commit и создать дополнительный запуск. Это ожидаемо.
        </li>
        <li>
          <strong>Выполните слияние.</strong> Когда требования проекта выполнены, нажмите Merge pull
          request → Confirm merge. Используйте обычный merge commit и сохраните ветку. Убедитесь в
          статусе Merged и наличии workflow и фразы в main. Слияние вызовет ещё один push-запуск для
          основной ветки. Убедитесь, что он завершился успешно.
        </li>
        <li>
          <strong>Обновите локальную main.</strong>
          <pre>
            <code className="language-powershell">
              {
                "git switch main\ngit pull --ff-only origin main\ngit rev-parse HEAD\nSelect-String -LiteralPath README.md -Pattern 'проверочная фраза' -SimpleMatch -CaseSensitive -Quiet -Encoding UTF8\nTest-Path -LiteralPath .github/workflows/check-readme.yml -PathType Leaf\ngit status"
              }
            </code>
          </pre>
          Команды <code>Select-String</code> и <code>Test-Path</code> должны вывести{" "}
          <code>True</code>, если фраза найдена, а файл workflow существует. Значение{" "}
          <code>False</code> означает, что соответствующее условие не выполнено. Команда{" "}
          <code>git status</code> должна показать чистое состояние рабочей копии. Сохраните SHA main
          после слияния вместе с результатами этих команд.
        </li>
      </ol>
      <h2 id="section-5">Ожидаемый результат</h2>
      <p>
        У вас есть два коммита с разными SHA и результаты их проверок. Failure получен для README
        без обязательной фразы и Success после её добавления. Сообщения учебного шага написаны
        по-русски. Workflow и фраза приняты через PR в main, проверка основной ветки прошла успешно,
        локальная рабочая копия чистая.
      </p>
      <h2 id="troubleshooting">Типичные ошибки Actions</h2>
      <table>
        <caption>Как отличить ожидаемую ошибку README от ошибки настройки</caption>
        <thead>
          <tr>
            <th scope="col">Ситуация</th>
            <th scope="col">Следующее действие</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>После push запуск не появился</td>
            <td>
              Сверьте успешность отправки и SHA ветки ci/check-readme на GitHub. В её файлах должен
              быть .github/workflows/check-readme.yml с событием push. В Actions откройте All
              workflows и уберите фильтры. Откройте Settings → Actions → General и проверьте, что
              Actions и используемое действие actions/checkout должны быть разрешены. После
              исправления файла отправьте новый коммит. Если менялись только настройки, повторите
              исходный push-запуск через Re-run jobs, когда он доступен, либо отправьте новое
              изменение.
            </td>
          </tr>
          <tr>
            <td>Invalid workflow file или ошибка YAML</td>
            <td>
              Откройте сообщение проверки соответствующего коммита, найдите указанный файл и строку.
              Сравните отступы с образцом, замените табуляцию пробелами и проверьте расширение .yml.
              Сохраните исправление новым коммитом и проверьте запуск его SHA.
            </td>
          </tr>
          <tr>
            <td>Ошибка в шаге «Получение репозитория» или длительный Queued</td>
            <td>
              При ошибке прочитайте лог checkout и проверьте разрешение на его использование. При
              ожидании проверьте доступность Actions и лимиты аккаунта, дождитесь раннера. Если
              причина — временный сбой и файлы не менялись, повторите существующий запуск. Такой
              результат пока не подтверждает проверку README.
            </td>
          </tr>
          <tr>
            <td>После исправления всё ещё Failure из-за отсутствия фразы</td>
            <td>
              Сверьте SHA запуска с новым коммитом. Откройте README.md именно этого коммита и
              проверьте строчные буквы, один обычный пробел и сохранение файла в UTF-8. Фраза должна
              находиться в README. Если проверялся старый SHA, откройте новый push-запуск. Если
              неверен сам файл, исправьте его и отправьте следующий коммит.
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="section-6">Контрольные вопросы</h2>
      <ol>
        <li>Почему наличие непустого README не гарантирует прохождение этой проверки?</li>
        <li>Почему фраза только в YAML или сообщении коммита не помогает?</li>
        <li>Чем push-запуск отличается от проверки PR?</li>
        <li>Зачем после исправления сверять новый SHA?</li>
        <li>Что должно остаться в итоговом diff и в основной ветке?</li>
      </ol>
      <nav aria-label="Переходы по курсу">
        <a href="?page=lecture-3">← Назад</a> · <a href="?page=home">На главную</a> ·{" "}
        <a href="?page=test">Далее →</a>
      </nav>
    </>
  );
}
