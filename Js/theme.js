// ========================================
// Переключатель тем с сохранением в localStorage
// ========================================

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const THEME_KEY = 'user-theme';
    const DARK_THEME = 'dark-theme';

    // ========================================
    // Проверяем сохраненную тему или системные настройки
    // ========================================
    function initTheme() {
        // Проверяем, есть ли сохраненная тема в localStorage
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme) {
            // Используем сохраненную тему
            if (savedTheme === 'dark') {
                body.classList.add(DARK_THEME);
            }
        } else {
            // Проверяем системную тему при первом заходе
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                body.classList.add(DARK_THEME);
                localStorage.setItem(THEME_KEY, 'dark');
            } else {
                localStorage.setItem(THEME_KEY, 'light');
            }
        }
    }

    // ========================================
    // Переключение темы
    // ========================================
    function toggleTheme() {
        const isDark = body.classList.toggle(DARK_THEME);
        
        // Сохраняем выбор пользователя
        if (isDark) {
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            localStorage.setItem(THEME_KEY, 'light');
        }
    }

    // ========================================
    // Отслеживаем изменение системной темы
    // ========================================
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Слушаем изменения только если пользователь не выбрал тему вручную
        mediaQuery.addEventListener('change', (e) => {
            // Обновляем тему только если нет явного выбора пользователя
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (!savedTheme) {
                if (e.matches) {
                    body.classList.add(DARK_THEME);
                } else {
                    body.classList.remove(DARK_THEME);
                }
            }
        });
    }
    
    // ========================================
    // Инициализация
    // ========================================
    initTheme();
    watchSystemTheme();

    // Обработчик клика на кнопку
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        // Доступность: переключение по клавише Enter/Space
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

})();

// Логика отображения плашки строго по клику на жирную стрелку
    const paywallArrow = document.getElementById('paywallArrow');
    const paywallOffer = document.getElementById('paywallOffer');

    if (paywallArrow && paywallOffer) {
        paywallArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (paywallOffer.style.display === 'none') {
                paywallOffer.style.display = 'block';
                setTimeout(() => {
                    paywallOffer.classList.add('visible');
                }, 10);
            } else {
                paywallOffer.classList.remove('visible');
                setTimeout(() => {
                    paywallOffer.style.display = 'none';
                }, 300);
            }
        });
    }

// ========================================
    // НАДЁЖНАЯ И КРАСИВАЯ ПЕЧАТЬ КОДА VS CODE
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        // Здесь строго текстовые строки, чтобы скрипт видел каждую букву и тег!
        const codeLines = [
            ' <span class="code-tag">&lt;div</span> <span class="code-attr">class</span>=<span class="code-string">"author-profile"</span><span class="code-tag">&gt;</span>',
            '   <span class="code-tag">&lt;h3&gt;</span><span class="code-text">Привет, я создатель этого <b>сайта</b></span><span class="code-tag">&lt;/h3&gt;</span>',
            '   <span class="code-tag">&lt;p&gt;</span><span class="code-text">Спасибо, что пришел почитать, а может и приобрести материалы с данной странички</span><span class="code-tag">&lt;/p&gt;</span>',
            '   <span class="code-tag">&lt;span</span> <span class="code-attr">class</span>=<span class="code-string">"stack"</span><span class="code-tag">&gt;</span><span class="code-text">Мой <u>СТЕК</u>: HTML5, CSS3, JS, AI</span><span class="code-tag">&lt;/span&gt;</span>',
            ' <span class="code-tag">&lt;/div&gt;</span>'
        ];

        const typingContainer = document.getElementById('typingCode');
        const skipTypingBtn = document.getElementById('skipTypingBtn');
        
        if (typingContainer) {
            let currentLine = 0;
            let currentChar = 0;
            let outputHTML = "";
            let typingTimeoutId = null;

            function renderFullCode() {
                typingContainer.innerHTML = codeLines.join('<br>') + '<span class="code-cursor"></span>';
                typingContainer.dataset.started = 'true';
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                    typingTimeoutId = null;
                }
            }

            function typeCode() {
                if (currentLine < codeLines.length) {
                    let lineStr = codeLines[currentLine];

                    if (currentChar < lineStr.length) {
                        // Если натыкаемся на внутренний тег стилей оформления (span), хаваем его целиком
                        if (lineStr.substr(currentChar, 5) === '<span' || lineStr.substr(currentChar, 7) === '</span') {
                            let endTag = lineStr.indexOf('>', currentChar);
                            outputHTML += lineStr.substring(currentChar, endTag + 1);
                            currentChar = endTag + 1;
                        } 
                        // Если встречаем спецсимволы скобок, выводим их правильно
                        else if (lineStr.substr(currentChar, 4) === '&lt;') {
                            outputHTML += '&lt;';
                            currentChar += 4;
                        } else if (lineStr.substr(currentChar, 4) === '&gt;') {
                            outputHTML += '&gt;';
                            currentChar += 4;
                        } 
                        // Обычный символ текста
                        else {
                            outputHTML += lineStr[currentChar];
                            currentChar++;
                        }
                        
                        // Рендерим и вешаем каретку в конец строки
                        typingContainer.innerHTML = outputHTML + '<span class="code-cursor"></span>';
                        
                        // Плавная скорость прописи букв (40мс — кайфовый вайб)
                        typingTimeoutId = setTimeout(typeCode, 40);
                    } else {
                        // Переход на новую строку
                        outputHTML += '<br>';
                        currentLine++;
                        currentChar = 0;
                        typingTimeoutId = setTimeout(typeCode, 300); // Небольшая пауза между строками
                    }
                } else {
                    typingContainer.dataset.started = 'true';
                }
            }

            function startTyping() {
                if (typingContainer.dataset.started === 'true') return;
                typingContainer.dataset.started = 'true';
                typingTimeoutId = setTimeout(typeCode, 600);
            }

            if (skipTypingBtn) {
                skipTypingBtn.addEventListener('click', renderFullCode);
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            startTyping();
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });

                observer.observe(typingContainer);
            } else {
                startTyping();
            }
        }
    });