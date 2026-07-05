// js/scenes/scene2-trust.js
window.Scene2 = {
    init: function(container, state, mascot) {
        mascot.setExpression('thinking');
        mascot.speak("I have a tiny feeling you're trying to trick me. So, one more verification. Purely procedural.");

        const btns = container.querySelectorAll('.s2-btn');
        btns.forEach(btn => {
            btn.onclick = (e) => {
                state.addSuspicion();
                const val = e.target.dataset.val;
                
                if (val === 'yes') {
                    mascot.setExpression('proud', 'coffee');
                    mascot.speak("Promises are legally non-binding. But duly noted for the file.", 2000);
                } else {
                    mascot.setExpression('proud', 'coffee');
                    mascot.speak("Thank you for your honesty. Unfortunately, you're still probably Kash.", 2000);
                }

                window.Toast.maybeShowToast();

                // Fast transition
                setTimeout(() => {
                    window.App.goToScene(3);
                }, 2000);
            };
        });
    }
};
