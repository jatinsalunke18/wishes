// js/scenes/scene7-approval.js
window.Scene7 = {
    init: function(container, state, mascot) {
        mascot.setExpression('thinking');
        mascot.speak("This is the final verification. Just tap continue and we're done.");

        const btn = document.getElementById('s7-btn');
        const labels = [
            "Continue",
            "Almost",
            "Wait",
            "Actually, wait",
            "One more thing",
            "Fine. Continue."
        ];
        
        let tapCount = 0;
        let yOffset = 0;

        // Reset
        btn.textContent = labels[0];
        btn.style.transform = 'translateY(0)';

        // Remove old listener
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', (e) => {
            tapCount++;
            
            if (tapCount >= labels.length - 1) {
                // Last tap
                newBtn.textContent = labels[labels.length - 1];
                window.Toast.maybeShowToast(1.0); // force a toast
                setTimeout(() => {
                    window.App.goToScene(8);
                }, 400);
            } else {
                newBtn.textContent = labels[tapCount];
                yOffset += (Math.random() * 20) - 5; // slight unpredictable downward nudge
                newBtn.style.transform = `translateY(${yOffset}px)`;
                state.addSuspicion(1);
            }
        });
    }
};
