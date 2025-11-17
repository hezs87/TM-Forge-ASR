// 千模炼阵 · AI 安全靶场 - 动画和视觉效果
class VisualEffects {
    constructor() {
        this.initializeParticles();
        this.initializeBackgroundEffects();
        this.initializeScrollAnimations();
    }

    initializeParticles() {
        // 创建粒子背景效果
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);

        // 创建粒子
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 ${size * 2}px rgba(255, 107, 53, 0.3);
        `;
        
        container.appendChild(particle);

        // 粒子动画
        anime({
            targets: particle,
            translateX: [
                { value: Math.random() * 200 - 100, duration: duration * 1000 },
                { value: Math.random() * 200 - 100, duration: duration * 1000 }
            ],
            translateY: [
                { value: Math.random() * 200 - 100, duration: duration * 1000 },
                { value: Math.random() * 200 - 100, duration: duration * 1000 }
            ],
            opacity: [
                { value: Math.random() * 0.5 + 0.2, duration: duration * 500 },
                { value: Math.random() * 0.5 + 0.2, duration: duration * 500 }
            ],
            scale: [
                { value: Math.random() * 0.5 + 0.5, duration: duration * 500 },
                { value: Math.random() * 0.5 + 0.5, duration: duration * 500 }
            ],
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    initializeBackgroundEffects() {
        // 添加背景渐变动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            body {
                background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #16213e);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }
            
            .glass-effect {
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
            }
            
            .glass-effect:hover {
                background-color: rgba(255, 255, 255, 0.08);
                border-color: rgba(255, 107, 53, 0.3);
                transform: translateY(-2px);
                box-shadow: 0 8px 32px rgba(255, 107, 53, 0.1);
            }
            
            .level-card {
                position: relative;
                overflow: hidden;
            }
            
            .level-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255, 107, 53, 0.1), transparent);
                transform: rotate(45deg);
                transition: all 0.5s ease;
                opacity: 0;
            }
            
            .level-card:hover::before {
                opacity: 1;
                animation: shimmer 0.5s ease;
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
            
            .message-bubble {
                position: relative;
                overflow: hidden;
            }
            
            .message-bubble::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .message-bubble:hover::after {
                left: 100%;
            }
            
            .flag-display {
                background: linear-gradient(45deg, #4caf50, #ff9800, #4caf50);
                background-size: 200% 200%;
                animation: flagGradient 2s ease infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            @keyframes flagGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .pulse-glow {
                animation: pulseGlow 2s ease-in-out infinite;
            }
            
            @keyframes pulseGlow {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
                    transform: scale(1.02);
                }
            }
            
            .security-alert {
                animation: securityPulse 1s ease-in-out;
                border-left: 4px solid #f44336;
                background: linear-gradient(90deg, rgba(244, 67, 54, 0.1), transparent);
            }
            
            @keyframes securityPulse {
                0%, 100% { border-left-color: #f44336; }
                50% { border-left-color: #ff5722; }
            }
            
            .success-alert {
                animation: successGlow 1s ease-in-out;
                border-left: 4px solid #4caf50;
                background: linear-gradient(90deg, rgba(76, 175, 80, 0.1), transparent);
            }
            
            @keyframes successGlow {
                0%, 100% { border-left-color: #4caf50; }
                50% { border-left-color: #8bc34a; }
            }
            
            .typing-indicator {
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-indicator:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-indicator:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }
            
            .achievement-notification {
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                background-color: rgba(76, 175, 80, 0.9);
                border: 1px solid rgba(76, 175, 80, 0.3);
                box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
            }
            
            .modal-overlay {
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                background-color: rgba(0, 0, 0, 0.7);
            }
            
            .progress-bar {
                background: linear-gradient(90deg, #ff6b35, #ff9800, #ffc107);
                background-size: 200% 100%;
                animation: progressShine 2s ease infinite;
            }
            
            @keyframes progressShine {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
            }
            
            .floating-animation {
                animation: floating 3s ease-in-out infinite;
            }
            
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .rotate-animation {
                animation: rotate 10s linear infinite;
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .slide-in-right {
                animation: slideInRight 0.5s ease-out;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .bounce-in {
                animation: bounceIn 0.8s ease-out;
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    initializeScrollAnimations() {
        // 滚动时的视差效果
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate);
    }

    // 成功通关的庆祝动画
    celebrateSuccess() {
        // 创建彩色粒子爆炸效果
        const colors = ['#ff6b35', '#4caf50', '#2196f3', '#ff9800', '#9c27b0'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: 50%;
                top: 50%;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(confetti);
            
            anime({
                targets: confetti,
                translateX: (Math.random() - 0.5) * 1000,
                translateY: (Math.random() - 0.5) * 1000,
                rotate: Math.random() * 360,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 2000,
                easing: 'easeOutQuart',
                complete: () => confetti.remove()
            });
        }
        
        // 屏幕闪烁效果
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 107, 53, 0.3);
            pointer-events: none;
            z-index: 999;
        `;
        
        document.body.appendChild(flash);
        
        anime({
            targets: flash,
            opacity: [0, 1, 0],
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => flash.remove()
        });
    }

    // 添加脉冲效果到活跃元素
    addPulseEffect(element) {
        element.classList.add('pulse-glow');
        
        setTimeout(() => {
            element.classList.remove('pulse-glow');
        }, 3000);
    }

    // 创建打字机效果
    typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    // 添加悬浮效果
    addFloatingEffect(element) {
        element.classList.add('floating-animation');
    }

    // 移除悬浮效果
    removeFloatingEffect(element) {
        element.classList.remove('floating-animation');
    }

    // 创建扫描线效果
    createScanlineEffect(element) {
        const scanline = document.createElement('div');
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.8), transparent);
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(scanline);
        
        anime({
            targets: scanline,
            translateY: element.offsetHeight,
            duration: 2000,
            easing: 'linear',
            complete: () => scanline.remove()
        });
    }

    // 添加数字雨效果（致敬黑客帝国）
    createMatrixRain(element) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(canvas);
        
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(26, 26, 46, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ff6b35';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(draw, 50);
        
        // 5秒后停止效果
        setTimeout(() => {
            clearInterval(interval);
            canvas.remove();
        }, 5000);
    }

    // 添加故障效果
    createGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let glitchInterval = setInterval(() => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, 1000);
    }

    // 添加全息效果
    createHologramEffect(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const hologram = document.createElement('div');
        hologram.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(0, 255, 255, 0.1) 50%,
                transparent 70%
            );
            pointer-events: none;
            animation: hologramScan 2s linear infinite;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hologramScan {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        
        document.head.appendChild(style);
        element.appendChild(hologram);
        
        // 3秒后移除效果
        setTimeout(() => {
            hologram.remove();
            style.remove();
        }, 3000);
    }
}

// 初始化视觉效果
document.addEventListener('DOMContentLoaded', () => {
    window.visualEffects = new VisualEffects();
});
