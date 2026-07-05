// js/mascot.js

const MASCOT_HTML = `
    <div class="mascot-body mascot-idle">
        <div class="mascot-hat">
            <div class="hat-brim"></div>
            <div class="hat-top"></div>
        </div>
        <div class="mascot-face">
            <div class="blush blush-left"></div>
            <div class="blush blush-right"></div>
            <div class="eye eye-left"></div>
            <div class="eye eye-right"></div>
            <div class="mouth"></div>
            <div class="sweat">💧</div>
            <div class="zzz">Z</div>
        </div>
        <div class="mascot-prop">
            <div class="prop-magnifying">🔍</div>
            <div class="prop-wrench">🔧</div>
            <div class="prop-coffee">☕</div>
            <div class="prop-water">🪣</div>
        </div>
    </div>
`;

const MASCOT_CSS = `
    #mascot {
        width: 180px;
        height: 180px;
        position: relative;
    }
    
    .mascot-body {
        width: 100%;
        height: 100%;
        background: var(--color-cream);
        border-radius: 45% 45% 50% 50%;
        box-shadow: inset -10px -15px 20px rgba(0,0,0,0.05), 0 15px 25px rgba(201, 182, 245, 0.4);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.3s;
    }

    .mascot-hat {
        position: absolute;
        top: -15px;
        left: 20px;
        transform: rotate(-8deg);
        z-index: 2;
        transition: opacity 0.5s, transform 0.5s;
    }

    .hat-top {
        width: 60px;
        height: 45px;
        background: var(--color-deep-lavender);
        border-radius: 10px 10px 0 0;
        margin: 0 auto;
        box-shadow: inset -5px -5px 10px rgba(0,0,0,0.2);
    }

    .hat-brim {
        width: 100px;
        height: 15px;
        background: var(--color-ink);
        border-radius: 8px;
        margin-top: -2px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .mascot-face {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 60px;
    }

    .eye {
        width: 12px;
        height: 12px;
        background: var(--color-ink);
        border-radius: 50%;
        position: absolute;
        top: 20px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .eye-left { left: 25px; }
    .eye-right { right: 25px; }

    .mouth {
        width: 16px;
        height: 10px;
        border: 3px solid var(--color-ink);
        border-top: none;
        border-radius: 0 0 10px 10px;
        position: absolute;
        top: 35px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s;
    }

    .blush {
        width: 24px;
        height: 12px;
        background: var(--color-pink);
        border-radius: 50%;
        position: absolute;
        top: 30px;
        opacity: 0;
        filter: blur(2px);
        transition: opacity 0.3s;
    }
    .blush-left { left: 10px; }
    .blush-right { right: 10px; }

    .sweat { position: absolute; top: -10px; right: 10px; font-size: 24px; opacity: 0; transition: opacity 0.2s; }
    .zzz { position: absolute; top: -10px; right: 15px; font-size: 20px; color: var(--color-ink); font-weight: bold; opacity: 0; font-family: 'Baloo 2'; }

    .mascot-prop {
        position: absolute;
        bottom: 20px;
        right: -10px;
        font-size: 45px;
        transition: transform 0.3s;
        z-index: 3;
    }
    .mascot-prop > div {
        position: absolute;
        bottom: 0; right: 0;
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.3s;
    }

    /* --- EXPRESSIONS --- */
    
    /* Happy (Default) */
    .expr-happy .eye { height: 12px; border-radius: 50%; }
    .expr-happy .mouth { height: 10px; border-radius: 0 0 10px 10px; border-top: none; }
    
    /* Suspicious */
    .expr-suspicious .eye { height: 4px; top: 24px; border-radius: 2px; }
    .expr-suspicious .mouth { height: 3px; border-radius: 2px; border: none; background: var(--color-ink); top: 38px; width: 12px; }
    .expr-suspicious .prop-magnifying { transform: scale(1) rotate(-15deg); }
    
    /* Thinking */
    .expr-thinking .eye-left { top: 15px; height: 14px; }
    .expr-thinking .eye-right { top: 22px; height: 8px; }
    .expr-thinking .mouth { width: 6px; height: 6px; border-radius: 50%; border: none; background: var(--color-ink); left: 60%; }
    
    /* Confused */
    .expr-confused .eye-left { height: 6px; top: 20px; }
    .expr-confused .eye-right { height: 14px; top: 16px; }
    .expr-confused .mouth { width: 12px; height: 4px; border-radius: 2px; border: none; background: var(--color-ink); transform: translateX(-50%) rotate(15deg); }
    
    /* Excited */
    .expr-excited .eye { width: 16px; height: 16px; top: 18px; }
    .expr-excited .mouth { width: 20px; height: 24px; border-radius: 0 0 20px 20px; border: none; background: var(--color-ink); top: 32px; }
    .expr-excited .blush { opacity: 0.6; }
    
    /* Proud */
    .expr-proud .eye { height: 4px; top: 24px; border-radius: 4px 4px 0 0; background: transparent; border: 3px solid var(--color-ink); border-bottom: none; width: 14px; }
    .expr-proud .mouth { height: 8px; width: 14px; }
    .expr-proud .mascot-face { transform: translate(-50%, -60%); }
    
    /* Embarrassed */
    .expr-embarrassed .eye { height: 6px; top: 22px; }
    .expr-embarrassed .mouth { width: 6px; height: 6px; border-radius: 50%; border: none; background: var(--color-ink); }
    .expr-embarrassed .blush { opacity: 1; width: 30px; height: 16px; background: #ff4d4d; }
    
    /* Panicking */
    .expr-panicking .eye { width: 14px; height: 14px; top: 18px; }
    .expr-panicking .mouth { width: 16px; height: 20px; border-radius: 50%; border: none; background: var(--color-ink); top: 34px; }
    .expr-panicking .sweat { opacity: 1; animation: shake 0.5s infinite; }
    .expr-panicking .mascot-body { animation: shake 0.2s infinite; }
    
    /* Celebrating */
    .expr-celebrating .eye { height: 6px; top: 22px; border-radius: 4px 4px 0 0; background: transparent; border: 3px solid var(--color-ink); border-bottom: none; width: 16px; }
    .expr-celebrating .mouth { width: 24px; height: 18px; border-radius: 0 0 24px 24px; border: none; background: var(--color-ink); top: 32px; }
    .expr-celebrating .blush { opacity: 0.8; }
    
    /* Sleeping */
    .expr-sleeping .eye { height: 3px; top: 24px; border-radius: 2px; background: var(--color-ink); width: 14px; }
    .expr-sleeping .mouth { width: 8px; height: 8px; border-radius: 50%; border: none; background: var(--color-ink); top: 38px; }
    .expr-sleeping .zzz { opacity: 1; animation: floatUp 2s infinite; }
    
    /* Loving */
    .expr-loving .eye { background: transparent; border: none; }
    .expr-loving .eye::before { content: '🤎'; position: absolute; top: -8px; left: -2px; font-size: 16px; }
    .expr-loving .mouth { height: 8px; width: 14px; border-radius: 0 0 10px 10px; }
    .expr-loving .blush { opacity: 0.5; }
    .expr-loving .mascot-hat { opacity: 0; transform: translateY(-50px) rotate(-20deg); }

    /* Props Activation */
    .prop-active-magnifying .prop-magnifying { opacity: 1; transform: scale(1); }
    .prop-active-wrench .prop-wrench { opacity: 1; transform: scale(1); }
    .prop-active-coffee .prop-coffee { opacity: 1; transform: scale(1); }
    .prop-active-water .prop-water { opacity: 1; transform: scale(1); }

    @keyframes floatUp {
        0% { transform: translateY(0) scale(0.8); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
    }
`;

class MascotController {
    constructor() {
        // Inject CSS
        const style = document.createElement('style');
        style.textContent = MASCOT_CSS;
        document.head.appendChild(style);

        this.container = document.getElementById('mascot');
        this.container.innerHTML = MASCOT_HTML;
        this.body = this.container.querySelector('.mascot-body');
        
        this.bubble = document.getElementById('speech-bubble');
        this.dialogue = document.getElementById('mascot-dialogue');
        
        this.currentExpression = 'happy';
        this.currentProp = 'none';
        
        this.setExpression('happy');
    }

    setExpression(expr, prop = 'none') {
        // Remove old expression class
        this.body.classList.remove(`expr-${this.currentExpression}`);
        if (this.currentProp !== 'none') {
            this.body.classList.remove(`prop-active-${this.currentProp}`);
        }
        
        // Add new
        this.currentExpression = expr;
        this.currentProp = prop;
        
        this.body.classList.add(`expr-${expr}`);
        if (prop !== 'none') {
            this.body.classList.add(`prop-active-${prop}`);
        }
    }

    async speak(text, duration = 0) {
        this.dialogue.textContent = text;
        this.bubble.classList.remove('hidden');
        
        // Small delay to ensure CSS transition works if it was display:none
        await new Promise(r => requestAnimationFrame(r));
        this.bubble.classList.add('active');

        if (duration > 0) {
            setTimeout(() => this.hideBubble(), duration);
        }
    }

    hideBubble() {
        this.bubble.classList.remove('active');
        setTimeout(() => {
            if (!this.bubble.classList.contains('active')) {
                this.bubble.classList.add('hidden');
            }
        }, 300); // Wait for transition
    }

    show() {
        document.getElementById('mascot-container').classList.remove('hidden');
    }

    hide() {
        document.getElementById('mascot-container').classList.add('hidden');
        this.hideBubble();
    }
}

// Global instance created in app.js
