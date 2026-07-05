// js/app.js

class AppState {
    constructor() {
        this.evidence = 0;
        this.suspiciousAnswers = 0;
        this.confidence = 3; // Starts at 3%
        this.photos = []; // Base64 data URLs
        this.choices = {}; // Store choices for later
    }

    addEvidence(amount = 1) {
        this.evidence += amount;
        this.updateUI('stat-evidence', this.evidence);
        this.bumpConfidence(5);
    }

    addSuspicion(amount = 1) {
        this.suspiciousAnswers += amount;
        this.updateUI('stat-suspicious', this.suspiciousAnswers);
        this.bumpConfidence(2); // Suspicion ironically increases confidence they are Kash
    }

    bumpConfidence(amount) {
        this.confidence = Math.min(100, this.confidence + amount);
        this.updateUI('stat-confidence', this.confidence + '%');
    }

    updateUI(id, val) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = val;
            el.classList.remove('bump');
            void el.offsetWidth; // trigger reflow
            el.classList.add('bump');
            setTimeout(() => el.classList.remove('bump'), 300);
        }
    }
}

class App {
    constructor() {
        this.state = new AppState();
        this.mascot = null;
        this.currentScene = -1;
        this.scenes = {};
        
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.mascot = new MascotController();
        
        // Expose to scenes
        window.Mascot = this.mascot;
        window.State = this.state;
        window.App = this;

        // Load scene modules
        this.scenes[0] = window.Scene0;
        this.scenes[1] = window.Scene1;
        this.scenes[2] = window.Scene2;
        this.scenes[3] = window.Scene3;
        this.scenes[4] = window.Scene4;
        this.scenes[5] = window.Scene5;
        this.scenes[6] = window.Scene6;
        this.scenes[7] = window.Scene7;
        this.scenes[8] = window.Scene8;
        this.scenes[9] = window.Scene9;
        this.scenes[10] = window.Scene10;
        this.scenes[11] = window.Scene11;
        this.scenes[12] = window.Scene12;

        this.goToScene(0);
    }

    goToScene(sceneIndex) {
        const oldScene = document.querySelector('.scene.active');
        if (oldScene) {
            oldScene.classList.remove('active');
        }

        this.currentScene = sceneIndex;
        const newScene = document.getElementById(`scene-${sceneIndex}`);
        
        // Show/hide case file based on scene
        const caseFile = document.getElementById('case-file');
        if (sceneIndex >= 2 && sceneIndex <= 9) {
            caseFile.classList.remove('hidden');
        } else {
            caseFile.classList.add('hidden');
        }

        // Initialize scene logic if it exists
        if (this.scenes[sceneIndex] && this.scenes[sceneIndex].init) {
            this.scenes[sceneIndex].init(newScene, this.state, this.mascot);
        }

        // Slight delay to allow previous scene to fade out
        setTimeout(() => {
            if (newScene) {
                newScene.classList.add('active');
            }
        }, 400); // matches CSS transition time
    }

    // Helper for buttons
    bindButton(id, callback) {
        const btn = document.getElementById(id);
        if (btn) {
            // Remove old listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => {
                // Play subtle haptic/audio if implemented later
                callback(e);
            });
            return newBtn;
        }
        return null;
    }
}

// Start app
const verifyKashApp = new App();
