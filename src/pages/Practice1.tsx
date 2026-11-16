export default function Practice1() {
  return (
    <>
      <h1>Практическая работа 1. Первый репозиторий в GitHub</h1>
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
            <a href="#troubleshooting">Типичные ошибки Git</a>
          </li>
          <li>
            <a href="#section-6">Контрольные вопросы</a>
          </li>
        </ul>
      </nav>
      <p className="practice-goal">
        <strong>Цель:</strong> Создать свой репозиторий, получить рабочую копию и отправить
        начальные файлы в main.
      </p>
      <h2 id="section-1">Что потребуется</h2>
      <ul>
        <li>Учётная запись на github.com с возможностью создать личный репозиторий.</li>
        <li>
          Компьютер с Windows, браузер, Git for Windows с командой git switch и Windows PowerShell
          5.1.
        </li>
        <li>
          Редактор UTF-8 и средство распаковки ZIP. Команда <code>git --version</code> показывает
          версию установленного Git.
        </li>
      </ul>
      <p>
        Если Git ещё не установлен, выполните{" "}
        <a href="#install-git">инструкцию по установке ниже</a>. Все команды этой работы выполняйте
        в стандартном Windows PowerShell.
      </p>
      <h3 id="install-git">Установка Git в Windows</h3>
      <p>
        Все практические работы курса выполняются в стандартном Windows PowerShell 5.1, который
        входит в Windows. Git устанавливается отдельно и вызывается командой <code>git</code> из
        окна PowerShell. Установите Git перед созданием локального репозитория.
      </p>
      <ol>
        <li>
          <strong>Скачайте установщик.</strong> Откройте{" "}
          <a href="https://git-scm.com/install/windows">официальную страницу Git для Windows</a> и
          выберите Git for Windows/x64 Setup. Если у вас компьютер на ARM, выберите ARM64 Setup. Тип
          системы указан в параметрах Windows в разделе «Система» → «О системе».
        </li>
        <li>
          <strong>Установите Git.</strong> Запустите скачанный файл .exe. Оставьте стандартную папку
          установки и стандартные компоненты. На шаге выбора редактора укажите знакомый редактор,
          например Notepad, если он доступен в списке, или установленный Visual Studio Code. Для
          PATH выберите «Git from the command line and also from 3rd-party software», а для
          помощника учётных записей оставьте Git Credential Manager. Остальные параметры можно
          оставить по умолчанию. Нажмите Install и дождитесь завершения установки.
        </li>
        <li>
          <strong>Проверьте установку.</strong> Откройте меню «Пуск», найдите Windows PowerShell и
          запустите его. Введите следующую команду и нажмите Enter.
          <pre>
            <code className="language-powershell">git --version</code>
          </pre>
          В ответ должна появиться строка вида <code>git version 2.x.y.windows.1</code>. Номер
          версии может отличаться. Если команда не найдена, закройте окно, снова откройте PowerShell
          и повторите проверку. Если ошибка осталась, повторите установку Git for Windows.
        </li>
        <li>
          <strong>Откройте папку для работы.</strong> В Проводнике создайте папку для учебных
          проектов и откройте её. В адресной строке Проводника введите <code>powershell</code> и
          нажмите Enter. В открывшемся окне выполните <code>Get-Location</code>. Команда должна
          показать путь к выбранной папке. В практиках вводите команды в этом окне.
        </li>
      </ol>
      <p>
        Команды <code>git</code> работают в PowerShell после установки Git for Windows. Для
        просмотра папок и файлов используются встроенные команды PowerShell. При копировании берите
        только текст команды, без приглашения вида <code>PS C:\…&gt;</code>. Если Git уже
        установлен, достаточно проверить его версию.
      </p>
      <h3 id="windows-basics">Подготовка файлов и работа с командами</h3>
      <p>
        В Проводнике Windows 11 включите «Вид» → «Показать» → «Расширения имён файлов» и «Скрытые
        элементы». В Windows 10 эти флажки находятся на вкладке «Вид». Так вы увидите папку{" "}
        <code>.git</code> и сможете отличить <code>README.md</code> от <code>README.md.txt</code>.
        Содержимое папки <code>.git</code> вручную не меняйте.
      </p>
      <p>
        Для редактирования достаточно встроенного Блокнота Windows. В PowerShell, открытом в папке
        проекта, выполните <code>notepad.exe README.md</code>. Измените текст, нажмите Ctrl+S и
        вернитесь в PowerShell. При создании файла через «Сохранить как» выберите тип «Все файлы»,
        кодировку UTF-8 и точное имя с расширением. Для README и YAML используйте обычный текстовый
        редактор. Word сохраняет документы в другом формате.
      </p>
      <p>
        Команды вводите по одной, нажимая Enter после каждой. Для вставки в PowerShell используйте
        Ctrl+V или правую кнопку мыши. Дождитесь появления приглашения перед следующей командой.
        Если произошла ошибка, сначала устраните её. Если вместо приглашения появилось приглашение{" "}
        <code>&gt;&gt;</code>, команда не завершена. Нажмите Ctrl+C и введите её заново, проверив
        парные кавычки.
      </p>
      <p>
        Команда <code>Get-Location</code> показывает текущую папку, а{" "}
        <code>Get-ChildItem -Force</code> — её файлы, включая скрытые. Для чтения файлов с русским
        текстом используется <code>Get-Content -Encoding UTF8</code>. После клонирования команды Git
        выполняют внутри папки <code>course-notes</code>. При следующем занятии откройте её в
        Проводнике и запустите <code>powershell</code> через адресную строку. Клонировать проект
        повторно не нужно. Проверка <code>git status</code> должна показать состояние репозитория.
        Если длинный вывод <code>git diff</code> или <code>git log</code> открылся в отдельном
        режиме просмотра, прокручивайте его стрелками, а для выхода нажмите английскую{" "}
        <code>q</code>.
      </p>

      <h2 id="section-2">Исходное состояние и файлы</h2>
      <p>
        В начале работы в вашем аккаунте ещё нет учебного <code>course-notes</code>, а в выбранной
        папке компьютера нет его рабочей копии.
      </p>
      <p>
        Скачайте{" "}
        <a href="downloads/course-notes.zip" download>
          course-notes.zip
        </a>
        . Архив содержит <code>README.md</code> и <code>.gitignore</code>. Доступны также{" "}
        <a href="downloads/README.md" download>
          README.md
        </a>{" "}
        и{" "}
        <a href="downloads/gitignore.txt" download=".gitignore">
          образец .gitignore
        </a>{" "}
        для скачивания по отдельности. Образец должен называться <code>.gitignore</code> в рабочей
        копии. Если браузер сохранил его как <code>gitignore.txt</code>, переименуйте файл в
        Проводнике с включёнными расширениями. Workflow и обязательная фраза понадобятся в третьей
        работе. В начальных файлах их нет.
      </p>
      <p>
        На рисунках показан репозиторий автора <code>Osbornnnnn/course-notes</code>. Все задания
        выполняйте в собственном проекте. Репозиторий и рабочую копию сохраните для следующих работ.
      </p>
      <h2 id="section-3">Порядок выполнения</h2>
      <ol>
        <li>
          <strong>Войдите в GitHub.</strong> Откройте github.com, проверьте аккаунт, при
          необходимости подтвердите вход с помощью 2FA. Если аккаунта нет, сначала зарегистрируйтесь
          по <a href="?page=lecture-1#section-3">инструкции в лекции 1</a>.
        </li>
        <li>
          <strong>Откройте форму нового репозитория.</strong> Нажмите «+» → New repository. В Owner
          выберите свой аккаунт, в Repository name укажите <code>course-notes</code>. В описание
          впишите «Учебные заметки по Git, PR и CI». Выберите Public — репозиторий должен быть
          публичным. Add README выключите, .gitignore и лицензию не добавляйте. Поле задания для
          Copilot оставьте пустым.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-1/02-create-repository.png">
          <img
            src="images/lecture-1/02-create-repository.png"
            alt="Частично заполненная форма нового репозитория GitHub"
          />
        </a>
        <figcaption>
          Рисунок 1. Форма с именем course-notes-student и публичной видимостью. На снимке форма ещё
          не отправлена. В своей работе укажите имя course-notes и выберите Public.
        </figcaption>
      </figure>
      <ol start={3}>
        <li>
          <strong>Создайте пустой проект.</strong> Нажмите Create repository. На странице Quick
          setup выберите HTTPS и скопируйте URL. Убедитесь, что в адресе указаны ваш аккаунт и имя
          проекта. Токена в адресе быть не должно.
        </li>
        <li>
          <strong>Выберите способ входа по HTTPS.</strong> Если при установке оставлен Git
          Credential Manager, при клонировании выберите Sign in with your browser, войдите в свой
          аккаунт и подтвердите запрос доступа, если он появится. После входа вернитесь в
          PowerShell. При таком способе отдельный PAT не нужен. Если используете токен, подготовьте
          его заранее. В меню аватара → Settings профиля → Developer settings → Personal access
          tokens → Fine-grained tokens откройте Generate new token. Укажите имя{" "}
          <code>course-notes-git</code> и ограничьте срок действия токена. В поле владельца выберите
          свой аккаунт, затем Only select repositories и созданный репозиторий. В Repository
          permissions добавьте "Contents: Read and write" и "Workflows: Read and write" — второе
          разрешение понадобится в работе 3. Создайте токен кнопкой Generate token и сохраните
          значение в личном хранилище паролей. Повторно посмотреть его нельзя.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-1/04-git-access.png">
          <img
            src="images/lecture-1/04-git-access.png"
            alt="Форма fine-grained токена GitHub до его выпуска"
          />
        </a>
        <figcaption>
          Рисунок 2. Название, срок и область доступа в частично заполненной форме PAT. Токен ещё не
          выпущен, репозиторий и разрешения не выбраны.
        </figcaption>
      </figure>
      <ol start={5}>
        <li>
          <strong>Клонируйте пустой проект.</strong> В отдельной папке учебных проектов откройте
          PowerShell через адресную строку Проводника. Замените весь образец
          HTTPS-АДРЕС-ВАШЕГО-ПРОЕКТА своим URL в командах ниже.
          <pre>
            <code className="language-powershell">
              {
                'git clone "HTTPS-АДРЕС-ВАШЕГО-ПРОЕКТА" course-notes\nSet-Location course-notes\ngit remote -v\ngit status'
              }
            </code>
          </pre>
          Предупреждение о пустом репозитории ожидаемо. Если открыт вход GCM, используйте браузер
          либо вкладку Personal access token для подготовленного PAT. Если Git спрашивает в
          PowerShell Username и Password, введите логин GitHub и PAT соответственно. При вводе
          токена в командной строке символы могут не отображаться. Вставьте значение один раз и
          нажмите Enter. Пароль сайта вместо PAT не подходит. Если клонирование завершилось ошибкой,
          не переходите к следующим командам. После успешного <code>Set-Location course-notes</code>{" "}
          вы должны находиться в папке рабочей копии.
        </li>
        <li>
          <strong>Задайте основную ветку.</strong> Пока репозиторий пуст, выполните{" "}
          <code>git branch -M main</code>, затем <code>git branch --show-current</code>. Имя ветки
          должно быть main. До первого коммита история отсутствует.
        </li>
        <li>
          <strong>Скопируйте начальные файлы.</strong> В Проводнике нажмите правой кнопкой по ZIP,
          выберите «Извлечь все» и поместите именно README.md и .gitignore в корень рабочей копии
          рядом с папкой .git. Команда <code>Get-ChildItem -Force</code> должна показать оба файла
          без дополнительного расширения .txt. Не копируйте внешнюю папку архива целиком. Чтобы
          увидеть расширения и скрытую папку .git, выполните{" "}
          <a href="#windows-basics">подготовку Проводника выше</a>.
        </li>
        <li>
          <strong>Укажите автора.</strong> Замените образцы своими данными. Адрес электронной почты
          возьмите из Settings → Emails. Можно использовать выданный GitHub адрес noreply. Параметр
          --local сохраняет настройки только в этом проекте.
          <pre>
            <code className="language-powershell">
              {
                'git config --local user.name "Ваше имя и фамилия"\ngit config --local user.email "ВАШ-EMAIL-ДЛЯ-КОММИТОВ"\ngit config --local --get user.name\ngit config --local --get user.email'
              }
            </code>
          </pre>
        </li>
        <li>
          <strong>Прочитайте файлы и подготовьте коммит.</strong> В README должны быть заголовок
          «Учебные заметки» и цель курса. В .gitignore должны быть перечислены .env, *.pem и *.key.
          Назначение команд объясняется в{" "}
          <a href="?page=lecture-1#first-commit-commands">таблице команд первого коммита</a>.
          <pre>
            <code className="language-powershell">
              {
                "Get-Content -LiteralPath README.md -Encoding UTF8\nGet-Content -LiteralPath .gitignore -Encoding UTF8\ngit status\ngit add README.md .gitignore\ngit diff --staged"
              }
            </code>
          </pre>
          В индекс должны попасть только эти два файла. Не включайте токены, пароли и посторонние
          документы. Если вывод diff не помещается в окно, нажмите <code>q</code> для выхода из
          просмотра и только затем вводите следующую команду.
        </li>
        <li>
          <strong>Зафиксируйте и отправьте.</strong>
          <pre>
            <code className="language-powershell">
              {
                'git commit -m "Добавлен начальный README"\ngit rev-parse HEAD\ngit push -u origin main'
              }
            </code>
          </pre>
          Сохраните SHA и дождитесь успешной отправки. До неё коммит существует только локально.
        </li>
        <li>
          <strong>Сверьте результат с GitHub.</strong> Обновите страницу проекта, выберите main,
          найдите README.md и .gitignore. Откройте историю Commits и сравните SHA. Затем выполните{" "}
          <code>git status</code> и <code>git remote -v</code>. Первая команда показывает текущую
          ветку и состояние файлов, вторая выводит адреса получения и отправки. Рабочая копия должна
          быть чистой, а origin должен относиться к вашему репозиторию и не содержать PAT. Команда{" "}
          <code>git log --oneline -5</code> выводит до пяти последних коммитов с короткими
          идентификаторами и сообщениями.
        </li>
      </ol>
      <figure>
        <a href="images/lecture-1/03-repository-clone.png">
          <img
            src="images/lecture-1/03-repository-clone.png"
            alt="Начальные файлы в main и меню Code с HTTPS-адресом"
          />
        </a>
        <figcaption>
          Рисунок 3. Репозиторий автора с начальными файлами. Количество и SHA коммитов в вашей
          работе могут отличаться.
        </figcaption>
      </figure>
      <h2 id="section-5">Ожидаемый результат</h2>
      <p>
        В вашем публичном репозитории на GitHub есть main, README.md и .gitignore. SHA коммита
        совпадает с локальным, рабочая копия чистая. Workflow и раздела «Как начать работу» пока
        нет.
      </p>
      <h2 id="troubleshooting">Типичные ошибки Git</h2>
      <p>
        При ошибке остановитесь на текущем шаге. Проверьте <code>Get-Location</code>,{" "}
        <code>git status</code> и <code>git remote -v</code>. Сначала выясните состояние проекта,
        затем повторяйте команду. Таблица пригодится во всех трёх практиках.
      </p>
      <table>
        <caption>Сообщение или ситуация и следующий шаг</caption>
        <thead>
          <tr>
            <th scope="col">Ситуация</th>
            <th scope="col">Что проверить и сделать</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>not a git repository</td>
            <td>
              Проверьте текущую папку. Откройте существующую course-notes в Проводнике и запустите
              PowerShell через адресную строку. Повторите git status внутри рабочей копии.
            </td>
          </tr>
          <tr>
            <td>Authentication failed, Repository not found или отказ в доступе</td>
            <td>
              Сверьте аккаунт и адрес origin с собственным проектом. Для PAT проверьте срок,
              выбранный репозиторий и разрешения. Если GCM использует другой аккаунт, откройте в
              Windows «Диспетчер учётных данных» → «Учётные данные Windows», найдите запись Git для
              github.com и удалите только её. Повторите Git-команду и войдите нужным аккаунтом.
              Удаление этой записи потребует повторного входа и для других проектов GitHub.
            </td>
          </tr>
          <tr>
            <td>Рабочая копия не чистая перед переключением ветки</td>
            <td>
              Прочитайте git status и git diff, определите назначение правок. Продолжение текущей
              задачи зафиксируйте в её рабочей ветке. Если правки появились в main или их назначение
              непонятно, сохраните файлы отдельно и согласуйте дальнейшие действия с преподавателем
              до переключения. Произвольный коммит в main не заменяет разбор ситуации.
            </td>
          </tr>
          <tr>
            <td>Ветка already exists при git switch -c</td>
            <td>
              Это может быть продолжение начатой работы. При чистой рабочей копии переключитесь
              через <code>git switch docs/add-start</code> или{" "}
              <code>git switch ci/check-readme</code> и прочитайте <code>git log --oneline -5</code>
              . Если нужный PR ещё открыт, продолжайте с первого незавершённого шага. Если он уже
              слит, для повторного выполнения выберите новое изменение и имя ветки. Удалять прежнюю
              ветку не требуется.
            </td>
          </tr>
          <tr>
            <td>Not possible to fast-forward или отказ push: non-fast-forward</td>
            <td>
              Сначала проверьте чистоту рабочей копии, затем выполните <code>git fetch origin</code>{" "}
              и <code>git log --oneline --graph --all -10</code>. При отказе pull --ff-only
              локальная ветка не объединяется с серверной. Сохраните вывод и согласуйте объединение
              историй с преподавателем. В учебном маршруте расхождения не ожидаются. Команды reset
              --hard и push --force могут уничтожить нужные изменения.
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="section-6">Контрольные вопросы</h2>
      <ol>
        <li>Зачем создавать пустой проект без автоматического README?</li>
        <li>Какие данные вводят при Git-доступе по HTTPS с PAT?</li>
        <li>Почему настройки автора не заменяют аутентификацию?</li>
        <li>Что доказывают git status, git remote -v и совпадение SHA?</li>
        <li>Почему .gitignore не удаляет секрет из истории?</li>
      </ol>
      <nav aria-label="Переходы по курсу">
        <a href="?page=lecture-1">← Назад</a> · <a href="?page=home">На главную</a> ·{" "}
        <a href="?page=lecture-2">Далее →</a>
      </nav>
    </>
  );
}
