// js/toast.js

const TOAST_MESSAGES = [
    "Reminder: being this cute is making my job harder.",
    "The Cake Department has approved your application.",
    "Your birthday license is under review.",
    "Detective is taking emotional damage.",
    "Please stop smiling. You're biasing the scanner."
];

class ToastSystem {
    constructor() {
        this.container = document.getElementById('toast-container');
        this.activeToasts = 0;
        this.disabled = false; // Disabled during serious scenes
    }

    disable() {
        this.disabled = true;
    }

    maybeShowToast(probability = 0.4) {
        if (this.disabled) return;
        if (Math.random() < probability && this.activeToasts === 0) {
            this.showToast();
        }
    }

    showToast() {
        const msg = TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = msg;
        
        this.container.appendChild(el);
        this.activeToasts++;

        setTimeout(() => {
            el.classList.add('leaving');
            el.addEventListener('animationend', () => {
                el.remove();
                this.activeToasts--;
            });
        }, 3000);
    }
}

window.Toast = new ToastSystem();
