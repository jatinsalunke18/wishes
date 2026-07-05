// js/scenes/scene10-caseclosed.js
window.Scene10 = {
    init: function(container, state, mascot) {
        // Tone shift
        document.getElementById('bg-gradient').className = 'slow-warm';
        document.getElementById('case-file').classList.add('hidden');
        window.Toast.disable();
        
        mascot.setExpression('loving'); // removes hat via CSS
        mascot.speak("Case closed. Detective hat: off. Let's just talk for a second.", 4000);

        // Letter text - this uses the placeholder from the brief, but is meant to be personalized.
        const letterDiv = document.getElementById('s10-letter');
        
        // Ensure the scene takes a moment before showing the button
        const btn = document.getElementById('s10-continue');
        btn.classList.add('hidden');
        
        setTimeout(() => {
            btn.classList.remove('hidden');
        }, 5000);

        window.App.bindButton('s10-continue', () => {
            mascot.hideBubble();
            window.App.goToScene(11);
        });
    }
};
