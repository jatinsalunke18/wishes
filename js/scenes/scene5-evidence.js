// js/scenes/scene5-evidence.js

const CAPTIONS = [
    "Suspiciously adorable.",
    "Still doesn't prove anything.",
    "This person definitely steals fries.",
    "Main Character Energy detected.",
    "Cuteness readings off the chart.",
    "Filed under 'unreasonably charming'.",
    "Evidence inconclusive. Also, cute.",
    "Confirmed: menace. Adorable menace."
];

window.Scene5 = {
    init: function(container, state, mascot) {
        mascot.setExpression('thinking');
        mascot.speak("I still don't fully believe you. Please submit photographic evidence for the board.");

        const fileInput = document.getElementById('s5-file-input');
        const corkboard = document.getElementById('s5-corkboard');
        const actionBtn = document.getElementById('s5-action');
        const actionsDiv = corkboard.querySelector('.evidence-actions');
        
        let fileCount = 0;
        let hasUploaded = false;

        // Reset on initialization
        fileInput.value = '';
        actionBtn.textContent = 'Upload Your Proof 📸';
        
        // Remove old appended photos if any
        corkboard.querySelectorAll('.pinned-photo').forEach(el => el.remove());

        const newFileInput = fileInput.cloneNode(true);
        fileInput.parentNode.replaceChild(newFileInput, fileInput);

        newFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    state.photos.push(dataUrl);
                    state.addEvidence();
                    
                    fileCount++;
                    addPhotoToBoard(dataUrl, fileCount);
                    
                    // After first upload, morph the button
                    if (!hasUploaded) {
                        hasUploaded = true;
                        actionBtn.textContent = 'Continue Further →';
                    }

                    if (fileCount >= 3) {
                        // Max photos reached — auto-continue after a beat
                        setTimeout(() => {
                            mascot.hideBubble();
                            window.App.goToScene(6);
                        }, 1500);
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        const addPhotoToBoard = (dataUrl, count) => {
            const photoEl = document.createElement('div');
            photoEl.className = 'pinned-photo';
            
            const rot = (Math.random() * 20 - 10).toFixed(1);
            const leftOffset = 20 + ((count - 1) * 20) + (Math.random() * 10 - 5);
            const topOffset = 10 + (Math.random() * 20 - 10);
            
            photoEl.style.transform = `rotate(${rot}deg)`;
            photoEl.style.left = `${leftOffset}%`;
            photoEl.style.top = `${topOffset}%`;

            const img = document.createElement('img');
            img.src = dataUrl;
            
            const pin = document.createElement('div');
            pin.className = 'pin';
            
            const caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.textContent = CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];

            photoEl.appendChild(pin);
            photoEl.appendChild(img);
            photoEl.appendChild(caption);
            
            corkboard.insertBefore(photoEl, actionsDiv);
            
            mascot.setExpression('confused');
            mascot.speak(caption.textContent);
        };

        // Single button: upload first, then continue
        window.App.bindButton('s5-action', () => {
            if (hasUploaded) {
                mascot.hideBubble();
                window.App.goToScene(6);
            } else {
                newFileInput.click();
            }
        });
    }
};
