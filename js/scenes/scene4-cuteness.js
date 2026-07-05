// js/scenes/scene4-cuteness.js
window.Scene4 = {
    init: function(container, state, mascot) {
        mascot.setExpression('excited');
        mascot.speak("Wait. Something feels... extremely cute. Running an unscheduled scan.");

        const scanArea = document.getElementById('s4-scan');
        const actionsArea = document.getElementById('s4-actions');
        
        scanArea.innerHTML = '';
        actionsArea.classList.add('hidden');

        const checks = [
            "Smile...",
            "Hair...",
            "Chaos energy...",
            "Friend energy..."
        ];
        
        let i = 0;
        const runCheck = () => {
            if (i >= checks.length) {
                setTimeout(() => {
                    // Overheat
                    mascot.setExpression('panicking');
                    mascot.speak("Cuteness overload. System overheating!");
                    document.body.classList.add('shake-active');
                    
                    setTimeout(() => {
                        document.body.classList.remove('shake-active');
                        mascot.setExpression('embarrassed', 'water');
                        actionsArea.classList.remove('hidden');
                        state.bumpConfidence(10);
                        window.Toast.maybeShowToast();
                    }, 2000);
                }, 500);
                return;
            }

            const line = document.createElement('div');
            line.className = 'scan-line';
            line.innerHTML = `<span>${checks[i]}</span><span class="scan-check pop-in">✓</span>`;
            scanArea.appendChild(line);
            
            i++;
            setTimeout(runCheck, 600);
        };

        setTimeout(runCheck, 2000);

        window.App.bindButton('s4-continue', () => {
            mascot.hideBubble();
            window.App.goToScene(5);
        });
    }
};
