// js/scenes/scene0-boot.js

window.Scene0 = {
    init: function(container, state, mascot) {
        const termLines = document.getElementById('term-lines');
        termLines.innerHTML = '';
        
        const actionArea = document.getElementById('term-action');
        actionArea.classList.add('hidden');

        const lines = [
            { text: "> Initializing Birthday Verification Engine...", delay: 800 },
            { text: "Loading Cake Recognition Module...", bar: true, delay: 600 },
            { text: "Loading Friendship Database...", bar: true, delay: 500 },
            { text: "Loading Birthday Calendar...", bar: true, delay: 500 },
            { text: "Loading Suspicious Activity Detector...", bar: true, stall: true, delay: 1500 },
            { text: "Loading Cuteness Analyzer...", bar: true, delay: 400 },
            { text: "Loading Detective Assistant...", bar: true, delay: 500 },
            { text: "Loading Emergency Confetti Reserves...", bar: true, delay: 800 }
        ];

        let i = 0;
        
        const runNext = () => {
            if (i >= lines.length) {
                setTimeout(() => {
                    mascot.show();
                    mascot.speak("Did someone say... birthday? 🎂");
                    actionArea.classList.remove('hidden');
                }, 800);
                return;
            }

            const step = lines[i];
            const lineEl = document.createElement('div');
            lineEl.className = 'term-line';
            lineEl.textContent = step.text;
            
            termLines.appendChild(lineEl);
            
            // Force reflow for animation
            void lineEl.offsetWidth;
            lineEl.classList.add('visible');

            if (step.bar) {
                const track = document.createElement('div');
                track.className = 'term-progress-track';
                const fill = document.createElement('div');
                fill.className = 'term-progress-fill';
                track.appendChild(fill);
                lineEl.appendChild(track);

                if (step.stall) {
                    fill.style.transition = "width 0.5s ease-out";
                    fill.style.width = "60%";
                    
                    setTimeout(() => {
                        const warn = document.createElement('div');
                        warn.className = 'term-warning blink';
                        warn.textContent = "⚠ Module unstable... recalibrating.";
                        lineEl.appendChild(warn);
                        
                        setTimeout(() => {
                            warn.classList.remove('blink');
                            warn.className = 'term-success';
                            warn.textContent = "✓ Fixed it.";
                            fill.style.transition = "width 0.2s linear";
                            fill.style.width = "100%";
                            i++;
                            runNext();
                        }, 1200);
                    }, 500);
                    return; // Pause execution for stall
                } else {
                    fill.style.animation = `fillBar ${step.delay}ms linear forwards`;
                }
            }

            i++;
            setTimeout(runNext, step.delay);
        };

        // Start sequence
        setTimeout(runNext, 500);

        // Bind button
        window.App.bindButton('btn-begin', () => {
            mascot.hideBubble();
            window.App.goToScene(1);
        });
    }
};
