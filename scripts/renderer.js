const createRenderer = (canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.width = CONFIG.WIDTH;
    canvas.height = CONFIG.HEIGHT;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CONFIG.WIDTH * dpr;
    canvas.height = CONFIG.HEIGHT * dpr;
    canvas.style.width = `${CONFIG.WIDTH}px`;
    canvas.style.height = `${CONFIG.HEIGHT}px`;
    ctx.scale(dpr, dpr);

    const clear = () => {
        ctx.clearRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
    };

    const drawGradientBg = () => {
        const grad = ctx.createLinearGradient(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
        grad.addColorStop(0, CONFIG.COLORS.BG_PRIMARY);
        grad.addColorStop(1, CONFIG.COLORS.BG_SECONDARY);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
    };

    const drawStars = (time) => {
        const starPositions = Array.from({ length: 40 }, (_, i) => ({
            x: (i * 137.508) % CONFIG.WIDTH,
            y: (i * 89.333) % CONFIG.HEIGHT,
            size: (i % 3) + 1,
            speed: (i % 5) + 1,
        }));

        starPositions.forEach(({ x, y, size, speed }) => {
            const alpha = 0.3 + 0.3 * Math.sin(time * 0.002 * speed + x);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        });
    };

    const drawRoundedRect = (x, y, w, h, r, fill, stroke) => {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill();
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    };

    const drawText = (text, x, y, font, color, align = 'center', maxWidth) => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        if (maxWidth) {
            ctx.fillText(text, x, y, maxWidth);
        } else {
            ctx.fillText(text, x, y);
        }
    };

    const drawWrappedText = (text, x, y, maxWidth, lineHeight, font, color, align = 'center') => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';

        const words = text.split(' ');
        let line = '';
        let currentY = y;

        words.forEach((word) => {
            const testLine = line + (line ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = word;
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        });
        ctx.fillText(line, x, currentY);
        return currentY + lineHeight;
    };

    const drawButton = (x, y, w, h, text, color, hovered) => {
        const glowColor = hovered ? color + '66' : color + '33';

        if (hovered) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 20;
        }

        drawRoundedRect(x, y, w, h, 12, hovered ? color : 'transparent', color);

        if (hovered) {
            ctx.fillStyle = color;
            ctx.fill();
        }

        ctx.shadowBlur = 0;

        const textColor = hovered ? '#ffffff' : color;
        drawText(text, x + w / 2, y + h / 2, CONFIG.FONTS.BUTTON, textColor);
    };

    const drawProgressBar = (x, y, w, h, progress, color) => {
        drawRoundedRect(x, y, w, h, h / 2, CONFIG.COLORS.BG_CARD);
        const fillWidth = Math.max(h, w * progress);
        drawRoundedRect(x, y, fillWidth, h, h / 2, color);
    };

    const drawParticles = (particles) => {
        particles.forEach(({ x, y, size, color, alpha }) => {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    };

    const drawGlowCircle = (x, y, radius, color, alpha) => {
        ctx.globalAlpha = alpha;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    };

    const getTextWidth = (text, font) => {
        ctx.font = font;
        return ctx.measureText(text).width;
    };

    return Object.freeze({
        ctx,
        clear,
        drawGradientBg,
        drawStars,
        drawRoundedRect,
        drawText,
        drawWrappedText,
        drawButton,
        drawProgressBar,
        drawParticles,
        drawGlowCircle,
        getTextWidth,
    });
};
