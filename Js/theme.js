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
                    body.classList.add(Light_THEME);
                } else {
                    body.classList.remove(Liht_THEME);
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
    themeToggle.addEventListener('click', toggleTheme);

    // Доступность: переключение по клавише Enter/Space
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });

})();
