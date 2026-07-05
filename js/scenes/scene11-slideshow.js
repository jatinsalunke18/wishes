// js/scenes/scene11-slideshow.js
window.Scene11 = {
    init: function(container, state, mascot) {
        mascot.setExpression('loving');

        const slideshow = document.getElementById('s11-slideshow');
        const fallback = document.getElementById('s11-fallback');
        const actions = document.getElementById('s11-actions');
        
        // Remove previously added slides (if any)
        slideshow.querySelectorAll('.slide').forEach(el => el.remove());

        if (state.photos.length === 0) {
            fallback.classList.remove('hidden');
            mascot.speak("No photo evidence was filed. The birthday twinkle in your eyes was proof enough anyway.", 4000);
            
            setTimeout(() => {
                actions.classList.remove('hidden');
            }, 3000);
        } else {
            fallback.classList.add('hidden');
            mascot.speak("A little evidence, kept for the right reason.", 3000);
            
            const slides = [];
            state.photos.forEach(dataUrl => {
                const el = document.createElement('div');
                el.className = 'slide';
                const img = document.createElement('img');
                img.src = dataUrl;
                el.appendChild(img);
                
                // Add randomly rotated polaroid look
                const rot = (Math.random() * 6 - 3).toFixed(1);
                el.style.transform = `scale(0.95) rotate(${rot}deg)`;
                
                slideshow.insertBefore(el, fallback);
                slides.push(el);
            });

            let currentSlide = 0;
            const showNextSlide = () => {
                if (currentSlide > 0) {
                    slides[currentSlide - 1].classList.remove('active');
                }
                if (currentSlide < slides.length) {
                    slides[currentSlide].classList.add('active');
                    currentSlide++;
                    setTimeout(showNextSlide, 2500); // 2.5s per slide
                } else {
                    // Done
                    actions.classList.remove('hidden');
                }
            };
            
            setTimeout(showNextSlide, 1000);
        }

        window.App.bindButton('s11-continue', () => {
            mascot.hideBubble();
            window.App.goToScene(12);
        });
    }
};
