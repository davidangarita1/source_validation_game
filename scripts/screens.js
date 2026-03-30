const createParticleSystem = () => {
    let particles = [];

    const spawn = (x, y, color, count = CONFIG.ANIM.PARTICLE_COUNT) => {
        const newParticles = Array.from({ length: count }, () => ({
            x,
            y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2,
            color,
            life: CONFIG.ANIM.PARTICLE_LIFE,
            maxLife: CONFIG.ANIM.PARTICLE_LIFE,
        }));
        particles = [...particles, ...newParticles];
    };

    const update = () => {
        particles = particles
            .map((p) => ({
                ...p,
                x: p.x + p.vx,
                y: p.y + p.vy,
                vy: p.vy + 0.1,
                life: p.life - 1,
                alpha: p.life / p.maxLife,
            }))
            .filter((p) => p.life > 0);
    };

    const getParticles = () => particles;

    return Object.freeze({ spawn, update, getParticles });
};

const createWelcomeScreen = (renderer) => {
    let playerName = '';
    let cursorVisible = true;
    let lastBlink = 0;
    let inputFocused = true;

    const inputBox = { x: 250, y: 310, w: 400, h: 50 };
    const startBtn = { x: 325, y: 400, w: 250, h: 55 };

    const handleKey = (key) => {
        if (!inputFocused) return;
        if (key === 'Backspace') {
            playerName = playerName.slice(0, -1);
        } else if (key.length === 1 && playerName.length < 20) {
            playerName += key;
        }
    };

    const isStartHovered = (mx, my) =>
        mx >= startBtn.x && mx <= startBtn.x + startBtn.w &&
        my >= startBtn.y && my <= startBtn.y + startBtn.h;

    const canStart = () => playerName.trim().length > 0;

    const getName = () => playerName.trim();

    const draw = (time, mouseX, mouseY) => {
        if (time - lastBlink > 500) {
            cursorVisible = !cursorVisible;
            lastBlink = time;
        }

        renderer.drawGlowCircle(450, 150, 120, CONFIG.COLORS.ACCENT, 0.15);

        renderer.drawText('🔍', 450, 100, CONFIG.FONTS.EMOJI, CONFIG.COLORS.TEXT_PRIMARY);
        renderer.drawText('Detective de Fuentes', 450, 170, CONFIG.FONTS.TITLE, CONFIG.COLORS.TEXT_PRIMARY);
        renderer.drawText('Pensamiento Crítico: Validación de Fuentes', 450, 215, CONFIG.FONTS.SMALL, CONFIG.COLORS.ACCENT_LIGHT);

        renderer.drawText('¿Cómo te llamas, detective?', 450, 275, CONFIG.FONTS.BODY, CONFIG.COLORS.TEXT_SECONDARY);

        const borderColor = inputFocused ? CONFIG.COLORS.ACCENT : CONFIG.COLORS.TEXT_MUTED;
        renderer.drawRoundedRect(inputBox.x, inputBox.y, inputBox.w, inputBox.h, 10, CONFIG.COLORS.BG_CARD, borderColor);

        const displayText = playerName + (cursorVisible && inputFocused ? '|' : '');
        renderer.drawText(
            displayText || '',
            inputBox.x + inputBox.w / 2,
            inputBox.y + inputBox.h / 2,
            CONFIG.FONTS.INPUT,
            playerName ? CONFIG.COLORS.TEXT_PRIMARY : CONFIG.COLORS.TEXT_MUTED
        );

        if (!playerName) {
            renderer.drawText('Tu nombre...', inputBox.x + inputBox.w / 2, inputBox.y + inputBox.h / 2,
                CONFIG.FONTS.BODY, CONFIG.COLORS.TEXT_MUTED);
        }

        const hovered = isStartHovered(mouseX, mouseY) && canStart();
        const btnColor = canStart() ? CONFIG.COLORS.ACCENT : CONFIG.COLORS.TEXT_MUTED;
        renderer.drawButton(startBtn.x, startBtn.y, startBtn.w, startBtn.h, '▶  Comenzar', btnColor, hovered);

        renderer.drawText('Evalúa 5 fuentes de información al azar', 450, 490, CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_MUTED);
        renderer.drawText('¿Podrás distinguir lo real de lo falso?', 450, 515, CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_MUTED);
    };

    return Object.freeze({
        handleKey,
        isStartHovered,
        canStart,
        getName,
        draw,
        getStartBtn: () => startBtn,
    });
};

const createPlayingScreen = (renderer, particleSystem) => {
    let hoveredOption = -1;
    let feedbackState = null;
    let feedbackTimer = 0;

    const optionBtns = [
        { x: 100, y: 410, w: 320, h: 55 },
        { x: 480, y: 410, w: 320, h: 55 },
    ];

    const setHoveredOption = (mx, my) => {
        hoveredOption = optionBtns.findIndex(
            (btn) => mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h
        );
    };

    const getClickedOption = (mx, my) =>
        optionBtns.findIndex(
            (btn) => mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h
        );

    const showFeedback = (isCorrect, x, y) => {
        feedbackState = { isCorrect, startTime: performance.now() };
        feedbackTimer = CONFIG.ANIM.FEEDBACK_DURATION;

        const color = isCorrect ? CONFIG.COLORS.SUCCESS : CONFIG.COLORS.ERROR;
        particleSystem.spawn(x, y, color, 15);
    };

    const isFeedbackActive = () => feedbackTimer > 0;

    const updateFeedback = (dt) => {
        if (feedbackTimer > 0) {
            feedbackTimer = Math.max(0, feedbackTimer - dt);
        }
    };

    const draw = (time, mouseX, mouseY, question, questionIndex, totalQuestions, score, playerName, answeredCount) => {
        setHoveredOption(mouseX, mouseY);

        renderer.drawProgressBar(50, 20, CONFIG.WIDTH - 100, 8, (questionIndex + 1) / totalQuestions, CONFIG.COLORS.ACCENT);

        renderer.drawText(
            `Pregunta ${questionIndex + 1}/${totalQuestions}`,
            150, 50, CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_MUTED, 'left'
        );
        renderer.drawText(
            `🏆 ${score}/${answeredCount}`,
            CONFIG.WIDTH - 100, 50, CONFIG.FONTS.SMALL, CONFIG.COLORS.GOLD, 'right'
        );
        renderer.drawText(
            `🔍 ${playerName}`,
            450, 50, CONFIG.FONTS.SMALL, CONFIG.COLORS.ACCENT_LIGHT
        );

        renderer.drawRoundedRect(50, 75, CONFIG.WIDTH - 100, 50, 10, CONFIG.COLORS.BG_CARD);
        renderer.drawText(
            `📌 Criterio: ${question.criteria}`,
            450, 100, CONFIG.FONTS.BODY_BOLD, CONFIG.COLORS.WARNING
        );

        renderer.drawRoundedRect(50, 140, CONFIG.WIDTH - 100, 160, 14, CONFIG.COLORS.BG_CARD + 'cc');

        renderer.drawWrappedText(
            question.scenario,
            450, 180, CONFIG.WIDTH - 160, 24, CONFIG.FONTS.BODY, CONFIG.COLORS.TEXT_PRIMARY
        );

        renderer.drawText('¿Esta fuente es confiable?', 450, 370, CONFIG.FONTS.BODY_BOLD, CONFIG.COLORS.ACCENT_LIGHT);

        if (feedbackState && feedbackTimer > 0) {
            const bgColor = feedbackState.isCorrect ? CONFIG.COLORS.SUCCESS : CONFIG.COLORS.ERROR;
            const emoji = feedbackState.isCorrect ? '✅' : '❌';
            const label = feedbackState.isCorrect ? '¡Correcto!' : 'Incorrecto';

            renderer.drawRoundedRect(50, 400, CONFIG.WIDTH - 100, 160, 14, bgColor + '33', bgColor);

            renderer.drawText(`${emoji} ${label}`, 450, 435, CONFIG.FONTS.HEADING, bgColor);

            renderer.drawWrappedText(
                question.explanation, 450, 482, CONFIG.WIDTH - 160, 20,
                CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_SECONDARY
            );
        } else {
            question.options.forEach((opt, i) => {
                const colors = ['#10b981', '#ef4444'];
                const emojis = ['✅', '❌'];
                const hovered = hoveredOption === i;
                renderer.drawButton(
                    optionBtns[i].x, optionBtns[i].y, optionBtns[i].w, optionBtns[i].h,
                    `${emojis[i]}  ${opt}`, colors[i], hovered
                );
            });

            renderer.drawRoundedRect(50, 490, CONFIG.WIDTH - 100, 60, 10, CONFIG.COLORS.BG_CARD + '88');
            renderer.drawText(
                '💡 Analiza: ¿Quién lo dice? ¿Con qué evidencia? ¿Qué interés tiene?',
                450, 520, CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_MUTED
            );
        }

        particleSystem.update();
        renderer.drawParticles(particleSystem.getParticles());
    };

    return Object.freeze({
        getClickedOption,
        showFeedback,
        isFeedbackActive,
        updateFeedback,
        draw,
    });
};

const createResultsScreen = (renderer) => {
    let retryBtn = { x: 325, y: 510, w: 250, h: 55 };

    const isRetryHovered = (mx, my) =>
        mx >= retryBtn.x && mx <= retryBtn.x + retryBtn.w &&
        my >= retryBtn.y && my <= retryBtn.y + retryBtn.h;

    const getRank = (score, total) => {
        const pct = score / total;
        if (pct === 1) return { title: 'Detective Maestro', emoji: '🏆', color: CONFIG.COLORS.GOLD, msg: '¡Perfecto! Eres un experto en validación de fuentes.' };
        if (pct >= 0.8) return { title: 'Investigador Experto', emoji: '🥇', color: CONFIG.COLORS.GOLD, msg: '¡Excelente! Tienes un gran ojo crítico.' };
        if (pct >= 0.6) return { title: 'Analista Competente', emoji: '🥈', color: CONFIG.COLORS.SILVER, msg: 'Buen trabajo. Sigues desarrollando tu pensamiento crítico.' };
        if (pct >= 0.4) return { title: 'Aprendiz Curioso', emoji: '🥉', color: CONFIG.COLORS.BRONZE, msg: 'Vas por buen camino. ¡Sigue practicando!' };
        return { title: 'Novato en Formación', emoji: '📚', color: CONFIG.COLORS.TEXT_MUTED, msg: 'La práctica hace al maestro. ¡Inténtalo de nuevo!' };
    };

    const draw = (time, mouseX, mouseY, score, total, playerName, answers) => {
        const rank = getRank(score, total);
        const pct = Math.round((score / total) * 100);

        renderer.drawGlowCircle(450, 120, 100, rank.color, 0.2);

        renderer.drawText(rank.emoji, 450, 80, CONFIG.FONTS.EMOJI, CONFIG.COLORS.TEXT_PRIMARY);
        renderer.drawText('Resultados', 450, 135, CONFIG.FONTS.HEADING, CONFIG.COLORS.TEXT_PRIMARY);

        renderer.drawRoundedRect(200, 160, 500, 120, 16, CONFIG.COLORS.BG_CARD);

        renderer.drawText(playerName, 450, 190, CONFIG.FONTS.BODY_BOLD, CONFIG.COLORS.ACCENT_LIGHT);
        renderer.drawText(`${score} / ${total}`, 350, 235, CONFIG.FONTS.SCORE, rank.color);
        renderer.drawText(`${pct}%`, 530, 235, CONFIG.FONTS.HEADING, CONFIG.COLORS.TEXT_SECONDARY);

        renderer.drawRoundedRect(200, 295, 500, 55, 12, CONFIG.COLORS.BG_CARD);
        renderer.drawText(rank.title, 450, 312, CONFIG.FONTS.BODY_BOLD, rank.color);
        renderer.drawText(rank.msg, 450, 340, CONFIG.FONTS.SMALL, CONFIG.COLORS.TEXT_SECONDARY);

        renderer.drawRoundedRect(50, 370, CONFIG.WIDTH - 100, 120, 12, CONFIG.COLORS.BG_CARD + '99');
        renderer.drawText('Resumen por criterio:', 450, 395, CONFIG.FONTS.BADGE, CONFIG.COLORS.TEXT_SECONDARY);

        const cols = 2;
        const colW = 380;
        const startX = 110;
        const startY = 415;
        const rowH = 18;

        answers.forEach((ans, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + col * colW;
            const y = startY + row * rowH;
            const icon = ans.correct ? '✅' : '❌';
            const color = ans.correct ? CONFIG.COLORS.SUCCESS : CONFIG.COLORS.ERROR;

            renderer.drawText(
                `${icon} ${ans.criteria}`,
                x, y, CONFIG.FONTS.SMALL, color, 'left'
            );
        });

        const hovered = isRetryHovered(mouseX, mouseY);
        renderer.drawButton(retryBtn.x, retryBtn.y, retryBtn.w, retryBtn.h, '🔄  Jugar de nuevo', CONFIG.COLORS.ACCENT, hovered);
    };

    return Object.freeze({
        isRetryHovered,
        draw,
        getRetryBtn: () => retryBtn,
    });
};
