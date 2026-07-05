// js/scenes/scene3-human.js
window.Scene3 = {
    init: function(container, state, mascot) {
        mascot.setExpression('thinking');
        mascot.speak("Robots have gotten very advanced lately. I need proof you're human before we proceed.");

        const btns = container.querySelectorAll('.s3-btn');
        btns.forEach(btn => {
            btn.onclick = (e) => {
                const val = e.target.dataset.val;
                
                if (val === 'yes') {
                    state.addSuspicion();
                    mascot.setExpression('suspicious', 'magnifying');
                    mascot.speak("Suspicious. A real human would've hesitated.", 2000);
                } else {
                    mascot.setExpression('excited');
                    mascot.speak("Finally. Someone honest.", 2000);
                }

                setTimeout(() => {
                    window.App.goToScene(4);
                }, 2000);
            };
        });
    }
};
