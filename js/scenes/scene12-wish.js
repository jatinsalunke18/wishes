// js/scenes/scene12-wish.js
window.Scene12 = {
    init: function(container, state, mascot) {
        mascot.hide(); // Mascot leaves for the finale
        
        const candle = document.getElementById('s12-candle');
        const flame = document.getElementById('s12-flame');
        const message = document.getElementById('s12-message');
        const hint = document.getElementById('s12-hint');
        
        // Ensure flame is lit
        flame.classList.remove('extinguished');
        message.classList.add('hidden');
        if (hint) hint.style.display = 'block';

        // Allow one-time click to blow out
        const blowOut = () => {
            flame.classList.add('extinguished');
            candle.removeEventListener('click', blowOut);
            
            // Hide the hint
            if (hint) hint.style.display = 'none';

            // Trigger fireworks
            window.Particles.setMode('fireworks');
            
            // Show final message
            setTimeout(() => {
                message.classList.remove('hidden');
                
                // Add soft pop-in animation
                message.style.opacity = 0;
                message.style.transform = 'translateY(10px)';
                message.style.transition = 'all 1s ease';
                
                // Trigger reflow
                void message.offsetWidth;
                
                message.style.opacity = 1;
                message.style.transform = 'translateY(0)';
            }, 1000);
        };

        candle.addEventListener('click', blowOut);
    }
};
