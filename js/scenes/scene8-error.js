// js/scenes/scene8-error.js
window.Scene8 = {
    init: function(container, state, mascot) {
        mascot.hide();
        window.Toast.disable();
        
        // Immediate trigger
        document.body.classList.add('shake-active');
        
        // Hold for 2 seconds
        setTimeout(() => {
            document.body.classList.remove('shake-active');
            window.App.goToScene(9);
            
            // Mascot returns with wrench in scene 9
            setTimeout(() => {
                mascot.show();
                mascot.setExpression('embarrassed', 'wrench');
                mascot.speak("False alarm. I fixed it. Probably.", 3000);
            }, 600);
        }, 2000);
    }
};
