// js/scenes/scene6-personality.js

const QUESTIONS = [
    {
        q: "Favorite snack?",
        opts: ["Something sweet", "Something salty"],
        roast: "Fascinating choice. Highly suspicious."
    },
    {
        q: "Always late?",
        opts: ["Never", "...Sometimes"],
        roast: "I'll pretend I believe that."
    },
    {
        q: "Professional yapper?",
        opts: ["No comment", "Guilty as charged"],
        roast: "'No comment' is basically a yes."
    },
    {
        q: "Steals food off other people's plates?",
        opts: ["Absolutely not", "It's a taste, not a theft"],
        roast: "The file grows heavier."
    },
    {
        q: "Sleeps way too much?",
        opts: ["I rest efficiently", "It's a lifestyle"],
        roast: "A tactical approach to naps. Noted."
    }
];

window.Scene6 = {
    init: function(container, state, mascot) {
        mascot.setExpression('thinking');
        mascot.speak("Let's see if your personality matches our records.", 2000);

        const qArea = document.getElementById('s6-question');
        const aArea = document.getElementById('s6-answers');
        let currentQ = 0;

        const showQuestion = () => {
            if (currentQ >= QUESTIONS.length) {
                qArea.textContent = "Personality profile complete.";
                aArea.innerHTML = '';
                mascot.setExpression('suspicious', 'magnifying');
                mascot.speak("It's a match. An alarmingly specific match.");
                
                const nextBtn = document.createElement('button');
                nextBtn.className = 'btn-primary';
                nextBtn.textContent = 'Continue';
                nextBtn.onclick = () => window.App.goToScene(7);
                aArea.appendChild(nextBtn);
                return;
            }

            const qData = QUESTIONS[currentQ];
            qArea.textContent = qData.q;
            aArea.innerHTML = '';

            qData.opts.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = idx === 0 ? 'btn-primary' : 'btn-secondary';
                btn.textContent = opt;
                btn.onclick = () => {
                    state.addEvidence(1); // answering provides evidence
                    state.choices[`q${currentQ}`] = opt;
                    
                    mascot.setExpression('thinking');
                    mascot.speak(qData.roast, 1500);
                    
                    currentQ++;
                    setTimeout(showQuestion, 1500);
                };
                aArea.appendChild(btn);
            });
        };

        setTimeout(showQuestion, 2000);
    }
};
