// ========================================
// Переключатель тем с сохранением в localStorage
// ========================================

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const THEME_KEY = 'user-theme';
    const DARK_THEME = 'dark-theme';

    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme) {
            if (savedTheme === 'dark') {
                body.classList.add(DARK_THEME);
            }
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                body.classList.add(DARK_THEME);
                localStorage.setItem(THEME_KEY, 'dark');
            } else {
                localStorage.setItem(THEME_KEY, 'light');
            }
        }
    }

    function toggleTheme() {
        const isDark = body.classList.toggle(DARK_THEME);
        
        if (isDark) {
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            localStorage.setItem(THEME_KEY, 'light');
        }
    }

    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
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
    
    initTheme();
    watchSystemTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

})();

// ========================================
// ЛОГИКА БЛЮР-ПЛАШКИ (ОТКРЫТИЕ, ЗАКРЫТИЕ И СКРОЛЛ)
// ========================================
const paywallArrow = document.getElementById('paywallArrow');
const paywallOffer = document.getElementById('paywallOffer');

// Функция закрытия плашки
function closePaywall() {
    if (paywallOffer && paywallOffer.classList.contains('visible')) {
        paywallOffer.classList.remove('visible');
        setTimeout(() => {
            paywallOffer.style.display = 'none';
        }, 300);
    }
}

if (paywallArrow && paywallOffer) {
    // Открытие плашки по стрелке
    paywallArrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы клик по стрелке не считался кликом "на свободное место"
        
        if (paywallOffer.style.display === 'none' || !paywallOffer.classList.contains('visible')) {
            paywallOffer.style.display = 'block';
            setTimeout(() => {
                paywallOffer.classList.add('visible');
            }, 10);
        } else {
            closePaywall();
        }
    });

    // Находим кнопку внутри плашки (ищем тег button или ссылку)
    const actionBtn = paywallOffer.querySelector('button, a, .paywall-btn');
    if (actionBtn) {
        actionBtn.innerText = 'Хочу! <3'; // Меняем текст на твой вариант
        
        actionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closePaywall(); // Сначала закрываем
            
            // Плавный скролл к секции цен (замени 'prices-section' на id своего блока с ценами, когда создашь его)
            const pricesSection = document.getElementById('prices-section');
            if (pricesSection) {
                pricesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.log('Секция цен еще не создана, но скролл сработает!');
            }
        });
    }

    // Закрытие при клике на ЛЮБОЕ свободное место экрана
    document.addEventListener('click', (e) => {
        // Если плашка открыта, и клик произошел НЕ по самой плашке
        if (paywallOffer.classList.contains('visible') && !paywallOffer.contains(e.target)) {
            closePaywall();
        }
    });
}

// ========================================
// НАДЁЖНАЯ И КРАСИВАЯ ПЕЧАТЬ КОДА VS CODE (ЗАПОЛНЕННАЯ)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Массив увеличен в 2.5 раза, чтобы полностью забить черное окно текстом!
    const codeLines = [
        ' <span class="code-tag">&lt;div</span> <span class="code-attr">class</span>=<span class="code-string">"author-profile"</span><span class="code-tag">&gt;</span>',
        '   <span class="code-tag">&lt;h3&gt;</span><span class="code-text">Привет, я создатель этого <b>сайта</b></span><span class="code-tag">&lt;/h3&gt;</span>',
        '   <span class="code-tag">&lt;p&gt;</span><span class="code-text">Спасибо, что пришел почитать материалы!</span><span class="code-tag">&lt;/p&gt;</span>',
        '   <span class="code-tag">&lt;span</span> <span class="code-attr">class</span>=<span class="code-string">"stack"</span><span class="code-tag">&gt;</span><span class="code-text">Мой СТЕК: HTML5, CSS3, JS, AI</span><span class="code-tag">&lt;/span&gt;</span>',
        ' ',
        '   <span class="code-comment">&lt;!-- Дополнительный блок информации --&gt;</span>',
        '   <span class="code-tag">&lt;div</span> <span class="code-attr">class</span>=<span class="code-string">"project-info"</span><span class="code-tag">&gt;</span>',
        '     <span class="code-tag">&lt;span</span> <span class="code-attr">class</span>=<span class="code-string">"status"</span><span class="code-tag">&gt;</span><span class="code-text">Статус: Завершен ✓</span><span class="code-tag">&lt;/span&gt;</span>',
        '     <span class="code-tag">&lt;p&gt;</span><span class="code-text">Проект оптимизирован под деплой на быстрых хостингах</span><span class="code-tag">&lt;/p&gt;</span>',
        '     <span class="code-tag">&lt;p&gt;</span><span class="code-text">Проект собран в соло. Фичи кликаются, баги фиксятся на лету..</span><span class="code-tag">&lt;/p&gt;</span>',
        '   <span class="code-tag">&lt;/div&gt;</span>',
        ' ',
        ' ',
        '   <span class="code-tag">&lt;p</span> <span class="code-attr">class</span>=<span class="code-string">"ps"</span><span class="code-tag">&gt;</span><span class="code-text">P.S. <span class="highlight">магические</span> Ctrl+C + Ctrl+V не использовались. Почти.</span><span class="code-tag">&lt;/p&gt;</span>',
        ' ',
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
                    if (lineStr.substr(currentChar, 5) === '<span' || lineStr.substr(currentChar, 7) === '</span') {
                        let endTag = lineStr.indexOf('>', currentChar);
                        outputHTML += lineStr.substring(currentChar, endTag + 1);
                        currentChar = endTag + 1;
                    } 
                    else if (lineStr.substr(currentChar, 4) === '&lt;') {
                        outputHTML += '&lt;';
                        currentChar += 4;
                    } else if (lineStr.substr(currentChar, 4) === '&gt;') {
                        outputHTML += '&gt;';
                        currentChar += 4;
                    } 
                    else {
                        outputHTML += lineStr[currentChar];
                        currentChar++;
                    }
                    
                    typingContainer.innerHTML = outputHTML + '<span class="code-cursor"></span>';
                    typingTimeoutId = setTimeout(typeCode, 35); // Печать чуть медленнее и мягче
                } else {
                    outputHTML += '<br>';
                    currentLine++;
                    currentChar = 0;
                    typingTimeoutId = setTimeout(typeCode, 250);
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