// js/scenes/scene1-identity.js

window.Scene1 = {
    init: function(container, state, mascot) {
        // Reset view state in case of re-entry (though linear)
        const promptArea = document.getElementById('s1-prompt');
        const actionsArea = document.getElementById('s1-actions');
        const scanArea = document.getElementById('s1-scan');
        const continueArea = document.getElementById('s1-continue-wrapper');
        
        promptArea.textContent = "Are you Kash?";
        actionsArea.classList.remove('hidden');
        scanArea.classList.add('hidden');
        continueArea.classList.add('hidden');
        scanArea.innerHTML = '';

        mascot.setExpression('happy');
        mascot.speak("Hello. I'm Detective Mochi. I investigate birthdays professionally. We've received a tip that someone named Kash is attempting to celebrate today — before any cake is distributed, I need to verify your identity.");

        const handleChoice = (isKash) => {
            mascot.setExpression('suspicious', 'magnifying');
            state.addSuspicion();

            let response = "";
            if (isKash) {
                response = "Hmm... that's exactly what Kash would say.";
            } else {
                response = "Interesting. So we're being sneaky today.";
            }

            mascot.speak(response, 2500);

            setTimeout(() => {
                promptArea.textContent = "Let's try that again, more officially. Are you Kash? For real this time.";
                actionsArea.classList.add('hidden');
                scanArea.classList.remove('hidden');
                
                mascot.speak("Running official identity checks...", 2000);
                runScanSequence();
            }, 2500);
        };

        const btns = container.querySelectorAll('.s1-btn');
        btns.forEach(btn => {
            btn.onclick = (e) => {
                handleChoice(e.target.dataset.val === 'yes');
            };
        });

        const runScanSequence = () => {
            const checks = [
                "Checking smile...",
                "Checking eyes...",
                "Checking birthday aura...",
                "Checking level of silliness..."
            ];
            
            let i = 0;
            const runCheck = () => {
                if (i >= checks.length) {
                    setTimeout(() => {
                        mascot.setExpression('thinking');
                        mascot.speak("The cuteness levels match our database. You might actually be Kash.");
                        continueArea.classList.remove('hidden');
                    }, 500);
                    return;
                }

                const line = document.createElement('div');
                line.className = 'scan-line';
                line.innerHTML = `<span>${checks[i]}</span><span class="scan-check pop-in">✓</span>`;
                scanArea.appendChild(line);
                
                i++;
                setTimeout(runCheck, 800);
            };

            setTimeout(runCheck, 500);
        };

        window.App.bindButton('s1-continue', () => {
            mascot.hideBubble();
            window.App.goToScene(2);
        });
    }
};
