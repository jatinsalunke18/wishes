// js/scenes/scene9-report.js
window.Scene9 = {
    init: function(container, state, mascot) {
        // Mascot state set in Scene 8 transition
        
        setTimeout(() => {
            mascot.setExpression('sleeping', 'coffee');
            mascot.speak("After an extensive investigation, I have reached a conclusion.");
        }, 3500); // after the "Probably" speech

        const statsList = document.getElementById('s9-stats');
        statsList.innerHTML = '';
        
        const stats = [
            { label: "Identity Checks", val: 143 },
            { label: "Suspicious Answers", val: state.suspiciousAnswers },
            { label: "Evidence Filed", val: state.evidence },
            { label: "Cups of Coffee", val: 127 },
            { label: "System Crashes", val: 1 }
        ];

        stats.forEach((s, idx) => {
            const el = document.createElement('li');
            el.className = 'stat';
            el.innerHTML = `<span class="stat-label">${s.label}</span><span class="stat-value">${s.val}</span>`;
            el.style.opacity = 0;
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.3s ease';
            statsList.appendChild(el);
            
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }, 500 + (idx * 200));
        });

        const meter = document.getElementById('s9-meter');
        meter.style.width = `${state.confidence}%`;

        window.App.bindButton('s9-reveal', (e) => {
            e.target.disabled = true; // prevent double tap
            
            // Animate meter to 100%
            meter.style.width = '100%';
            
            setTimeout(() => {
                mascot.setExpression('celebrating');
                window.Particles.setMode('confetti');
                
                mascot.speak("Yep. You're definitely Kash. I probably should've believed you from the beginning.");
                
                e.target.textContent = "Close Case";
                e.target.disabled = false;
                
                // Switch behavior of button for next click
                const newBtn = e.target.cloneNode(true);
                e.target.parentNode.replaceChild(newBtn, e.target);
                
                newBtn.addEventListener('click', () => {
                    mascot.hideBubble();
                    window.App.goToScene(10);
                });
            }, 2000); // wait for meter fill
        });
    }
};
