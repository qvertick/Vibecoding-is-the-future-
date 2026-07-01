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
// ВЫПАДАЮЩЕЕ МЕНЮ "СТАТЬЯ 1" (ПО КЛИКУ)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const streamlineDropdown = document.querySelector('.streamline-dropdown');

    if (dropdownTrigger && streamlineDropdown) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            streamlineDropdown.classList.toggle('active');
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!streamlineDropdown.contains(e.target)) {
                streamlineDropdown.classList.remove('active');
            }
        });
    }

    // ========================================
    // ГЛИЧ ЭФФЕКТ - ХАОТИЧНОЕ ДВИЖЕНИЕ БУКВ
    // ========================================
    const glitchWords = document.querySelectorAll('.glitch-word');
    
    glitchWords.forEach(word => {
        const text = word.textContent;
        word.textContent = '';
        
        // Оборачиваем каждую букву в span
        text.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.className = 'letter-glitch';
            letterSpan.style.setProperty('--letter-index', index);
            word.appendChild(letterSpan);
        });
    });
});

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
                    typingTimeoutId = setTimeout(typeCode, 40); // Быстрая печать
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

/* ========================================
   CANVAS - Интерактивные фоновые линии (Git-граф слева)
   ======================================== */
(function() {
    'use strict';

    const canvas = document.getElementById('bg-lines-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const body = document.body;
    
    // Состояние мыши
    let mouseX = 0;
    let mouseY = window.innerHeight / 2;
    let isDarkTheme = body.classList.contains('dark-theme');
    
    // Цвета линий для светлой и темной темы (строгие тона без свечения)
    const lineColors = {
        light: [
            'rgba(255, 71, 71, 1)',    // Серая
            'rgba(252, 255, 103, 1)',     // Оранжевая
            'rgba(55, 255, 119, 1)',       // Темно-серая
            'rgba(0, 60, 255, 1)',     // Желтая
            'rgba(193, 193, 193, 1)'     // Светло-серая
        ],
        dark: [
            'rgba(156, 163, 175, 0.8)',  // Серая (для темной темы)
            'rgba(251, 191, 36, 0.8)',   // Оранжевая (для темной темы)
            'rgba(75, 85, 99, 0.8)',     // Темно-серая (для темной темы)
            'rgba(241, 196, 15, 0.8)',   // Желтая (для темной темы)
            'rgba(156, 163, 175, 0.8)'   // Светло-серая (для темной темы)
        ]
    };

    // Параметры линий
    const lineCount = 5;
    const lines = [];
    const canvasWidth = 120;
    const centerX = canvasWidth / 2; // 60px - центр холста
    const maxSpread = 25; // Максимальное отклонение от центра
    const baseFrequency = 0.004;
    const mouseInfluenceRadius = 180;
    const lerpSpeed = 0.06;

    // Инициализация линий
    function initLines() {
        lines.length = 0;
        const spacing = canvasWidth / (lineCount + 1);
        
        for (let i = 0; i < lineCount; i++) {
            // Центрируем линии в пределах 120px холста
            const baseX = centerX + (i - Math.floor(lineCount / 2)) * spacing * 0.6;
            
            lines.push({
                baseX: baseX,
                x: baseX,
                phase: (i * Math.PI) / lineCount,
                points: [],
                targetPoints: []
            });
        }
        
        updateLinePoints();
    }

    // Обновление точек линий
    function updateLinePoints() {
        for (let line of lines) {
            line.points = [];
            line.targetPoints = [];
            
            for (let y = 0; y < canvas.height; y += 4) {
                // Плавное переплетение в стиле Git (синусоиды с разными фазами)
                const gitOffset = Math.sin(y * baseFrequency + line.phase) * maxSpread;
                const gitOffset2 = Math.cos(y * baseFrequency * 0.8 + line.phase * 1.3) * (maxSpread * 0.5);
                const x = line.baseX + gitOffset + gitOffset2;
                
                line.points.push({ x, y });
                line.targetPoints.push({ x, y });
            }
        }
    }

    // Обновление состояния линий под влиянием мыши (магнитный эффект)
    function updateMouseInfluence() {
        // Мышь влияет только в левой части экрана (до 250px)
        const isMouseNear = mouseX <= 250;
        
        for (let line of lines) {
            for (let i = 0; i < line.targetPoints.length; i++) {
                const point = line.targetPoints[i];
                const y = point.y;
                
                // Базовое положение точки (без влияния мыши)
                const gitOffset = Math.sin(y * baseFrequency + line.phase) * maxSpread;
                const gitOffset2 = Math.cos(y * baseFrequency * 0.8 + line.phase * 1.3) * (maxSpread * 0.5);
                const baseX = line.baseX + gitOffset + gitOffset2;
                
                if (isMouseNear) {
                    const dx = mouseX - point.x;
                    const dy = mouseY - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseInfluenceRadius) {
                        const influence = 1 - distance / mouseInfluenceRadius;
                        const maxPullDistance = 35;
                        const angle = Math.atan2(dy, dx);
                        
                        point.x = baseX + Math.cos(angle) * maxPullDistance * influence;
                        point.y = y + Math.sin(angle) * maxPullDistance * influence * 0.06;
                        continue;
                    }
                }
                
                point.x = baseX;
                point.y = y;
            }
        }
    }

    // Плавное возвращение линий в исходное состояние (интерполяция)
    function smoothLines() {
        for (let line of lines) {
            for (let i = 0; i < line.points.length; i++) {
                const current = line.points[i];
                const target = line.targetPoints[i];
                
                // Интерполяция для плавного движения
                current.x += (target.x - current.x) * lerpSpeed;
                current.y += (target.y - current.y) * lerpSpeed;
            }
        }
    }

    // Отрисовка линий
    function drawLines() {
        const colors = isDarkTheme ? lineColors.dark : lineColors.light;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            ctx.strokeStyle = colors[i];
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 0;
            
            ctx.beginPath();
            
            // Рисуем кривую через точки
            for (let j = 0; j < line.points.length; j++) {
                const point = line.points[j];
                if (j === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
            
            ctx.stroke();
        }
    }

    // Изменение размера canvas (жестко задаем ширину 120px)
    function resizeCanvas() {
        canvas.width = 120;
        canvas.height = window.innerHeight;
        initLines();
    }

    // Основной цикл анимации
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateMouseInfluence();
        smoothLines();
        drawLines();
        
        requestAnimationFrame(animate);
    }

    // Обработчик движения мыши
    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY; // Используем клиентские координаты (относительно окна)
    }

    // Отслеживание изменения темы
    const themeObserver = new MutationObserver(() => {
        isDarkTheme = body.classList.contains('dark-theme');
    });

    themeObserver.observe(body, { attributes: true, attributeFilter: ['class'] });

    // Инициализация
    function init() {
        resizeCanvas();
        animate();
    }

    window.addEventListener('load', init);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);

    // Fallback
    if (document.readyState !== 'loading') {
        init();
    }
})();
