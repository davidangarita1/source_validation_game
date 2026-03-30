const createGameState = () => {
    let state = {
        screen: CONFIG.SCREENS.WELCOME,
        playerName: '',
        questions: [],
        currentIndex: 0,
        score: 0,
        answers: [],
    };

    const reset = (name) => {
        state = {
            screen: CONFIG.SCREENS.PLAYING,
            playerName: name,
            questions: questionBank.getSubset(5),
            currentIndex: 0,
            score: 0,
            answers: [],
        };
    };

    const get = () => ({ ...state });

    const setScreen = (screen) => { state = { ...state, screen }; };

    const recordAnswer = (optionIndex) => {
        const question = state.questions[state.currentIndex];
        const isCorrect = optionIndex === question.correct;
        const newScore = isCorrect ? state.score + 1 : state.score;
        const newAnswers = [...state.answers, { criteria: question.criteria, correct: isCorrect }];

        state = {
            ...state,
            score: newScore,
            answers: newAnswers,
        };

        return { isCorrect, question };
    };

    const nextQuestion = () => {
        if (state.currentIndex + 1 >= state.questions.length) {
            state = { ...state, screen: CONFIG.SCREENS.RESULTS };
            return false;
        }
        state = { ...state, currentIndex: state.currentIndex + 1 };
        return true;
    };

    const getCurrentQuestion = () => state.questions[state.currentIndex];

    return Object.freeze({
        reset,
        get,
        setScreen,
        recordAnswer,
        nextQuestion,
        getCurrentQuestion,
    });
};

const createGame = () => {
    const canvas = document.getElementById('gameCanvas');
    const renderer = createRenderer(canvas);
    const particleSystem = createParticleSystem();
    const gameState = createGameState();

    const welcomeScreen = createWelcomeScreen(renderer);
    const playingScreen = createPlayingScreen(renderer, particleSystem);
    const resultsScreen = createResultsScreen(renderer);

    let mouseX = 0;
    let mouseY = 0;
    let lastTime = 0;

    const getCanvasCoords = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleClick = (e) => {
        const { x, y } = getCanvasCoords(e);
        const state = gameState.get();

        if (state.screen === CONFIG.SCREENS.WELCOME) {
            if (welcomeScreen.isStartHovered(x, y) && welcomeScreen.canStart()) {
                gameState.reset(welcomeScreen.getName());
            }
            return;
        }

        if (state.screen === CONFIG.SCREENS.PLAYING) {
            if (playingScreen.isFeedbackActive()) return;

            const clicked = playingScreen.getClickedOption(x, y);
            if (clicked >= 0) {
                const { isCorrect } = gameState.recordAnswer(clicked);
                const btnCenter = {
                    x: clicked === 0 ? 260 : 640,
                    y: 467,
                };
                playingScreen.showFeedback(isCorrect, btnCenter.x, btnCenter.y);
            }
            return;
        }

        if (state.screen === CONFIG.SCREENS.RESULTS) {
            if (resultsScreen.isRetryHovered(x, y)) {
                gameState.reset(state.playerName);
            }
        }
    };

    const handleMouseMove = (e) => {
        const { x, y } = getCanvasCoords(e);
        mouseX = x;
        mouseY = y;
    };

    const handleKeyDown = (e) => {
        const state = gameState.get();
        if (state.screen === CONFIG.SCREENS.WELCOME) {
            e.preventDefault();
            welcomeScreen.handleKey(e.key);
        }
    };

    const update = (dt) => {
        const state = gameState.get();
        if (state.screen === CONFIG.SCREENS.PLAYING && playingScreen.isFeedbackActive()) {
            playingScreen.updateFeedback(dt);
            if (!playingScreen.isFeedbackActive()) {
                gameState.nextQuestion();
            }
        }
    };

    const draw = (time) => {
        renderer.clear();
        renderer.drawGradientBg();
        renderer.drawStars(time);

        const state = gameState.get();

        if (state.screen === CONFIG.SCREENS.WELCOME) {
            welcomeScreen.draw(time, mouseX, mouseY);
        }

        if (state.screen === CONFIG.SCREENS.PLAYING) {
            playingScreen.draw(
                time, mouseX, mouseY,
                gameState.getCurrentQuestion(),
                state.currentIndex,
                state.questions.length,
                state.score,
                state.playerName,
                state.answers.length
            );
        }

        if (state.screen === CONFIG.SCREENS.RESULTS) {
            resultsScreen.draw(
                time, mouseX, mouseY,
                state.score,
                state.questions.length,
                state.playerName,
                state.answers
            );
        }
    };

    const gameLoop = (timestamp) => {
        const dt = timestamp - lastTime;
        lastTime = timestamp;

        update(dt);
        draw(timestamp);

        requestAnimationFrame(gameLoop);
    };

    const init = () => {
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        requestAnimationFrame(gameLoop);
    };

    return Object.freeze({ init });
};

const game = createGame();
game.init();
