let score = 0;
let answeredCount = 0;

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const total = document.querySelectorAll('.question').length;
    const totalQuestions = document.getElementById('totalQuestions');
    const totalScore = document.getElementById('totalScore');
    if (totalQuestions) totalQuestions.textContent = total;
    if (totalScore) totalScore.textContent = score;
});

function checkAnswer(button) {
    if (!button) return;
    const questionEl = button.closest('.question');
    if (!questionEl) return;

    // prevent double answers
    if (questionEl.dataset.answered === 'true') return;

    const isCorrect = String(button.dataset.correct) === 'true';
    const feedback = questionEl.querySelector('.feedback');

    // disable all buttons for this question and highlight
    const buttons = questionEl.querySelectorAll('.quiz-buttons button');
    buttons.forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
    });

    if (isCorrect) {
        if (feedback) {
            feedback.textContent = '✔️ Bonne réponse !';
            feedback.style.color = '#2e8a3a';
        }
        score += 1;
    } else {
        if (feedback) {
            feedback.textContent = '❌ Réponse incorrecte.';
            feedback.style.color = '#c0392b';
        }
        button.classList.add('incorrect');
    }

    answeredCount += 1;
    updateTotalScore();
    questionEl.dataset.answered = 'true';
}

function updateTotalScore() {
    const totalScore = document.getElementById('totalScore');
    if (totalScore) totalScore.textContent = score;
}

function resetQuiz() {
    score = 0;
    answeredCount = 0;
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => {
        q.dataset.answered = 'false';
        const feedback = q.querySelector('.feedback');
        if (feedback) {
            feedback.textContent = '';
            feedback.style.color = '';
        }
        const buttons = q.querySelectorAll('.quiz-buttons button');
        buttons.forEach(b => {
            b.disabled = false;
            b.classList.remove('correct', 'incorrect');
        });
    });
    updateTotalScore();
}

function sendAIMessage(event) {
    event.preventDefault();
    const questionInput = document.getElementById('questionIA');
    const question = questionInput ? questionInput.value.trim().toLowerCase() : '';
    const responseBox = document.getElementById('reponseIA');

    if (!responseBox) return;
    if (!question) {
        responseBox.textContent = 'Pose une question claire pour obtenir de l’aide.';
        return;
    }

    if (question.includes('manteau')) {
        responseBox.textContent = 'Le manteau est la couche située entre la croûte et le noyau. Il est très chaud et semi-solide.';
    } else if (question.includes('séisme')) {
        responseBox.textContent = 'Un séisme est un tremblement de terre provoqué par une rupture des roches en profondeur.';
    } else if (question.includes('volcan')) {
        responseBox.textContent = 'Un volcan est une ouverture dans la croûte terrestre qui laisse sortir le magma, les gaz et la lave.';
    } else if (question.includes('plaques tectoniques')) {
        responseBox.textContent = 'Les plaques tectoniques sont de grandes roches qui composent la croûte terrestre et se déplacent lentement sur le manteau.';
     } else if (question.includes('Foyer')) {
        responseBox.textContent = 'Le foyer d’un séisme est le point de l’intérieur de la Terre où se produit la rupture des roches.';
     } else if (question.includes('hypocentre')) {
        responseBox.textContent = 'L’hypocentre d’un séisme est le point de l’intérieur de la Terre où se produit la rupture des roches.';
     } else if (question.includes('Epicentre')) {
         responseBox.textContent = 'L’épicentre d’un séisme est le point de la surface terrestre situé directement au-dessus de l’hypocentre.';
      } else if (question.includes('Ondes sismiques')) {
        responseBox.textContent = 'Vibrations qui se propagent à partir du foyer et font trembler le sol.';
} else if (question.includes('Zone sismiques')) {
        responseBox.textContent = 'Région de la Terre où les séismes sont fréquents.';
        } else if (question.includes('sismographes')) {
        responseBox.textContent = 'Appareils utilisés pour enregistrer les mouvements du sol lors d’un séisme.';
        } else if (question.includes('Magnitude')) {
        responseBox.textContent = 'Mesure de l’énergie libérée par un séisme.';
} else if (question.includes('lave')) {
        responseBox.textContent = 'Matière liquide issue du volcan.';
        } else if (question.includes('magma')) {
        responseBox.textContent = 'Matière solide ou semi-solide située dans le manteau.';
     
     
        } else {
        responseBox.textContent = 'Je peux t’aider à expliquer une notion ou te guider sur un concept du cours.';
    }

    if (questionInput) {
        questionInput.value = '';
    }
}

function toggleChat() {
    const panel = document.getElementById('assistantPanel');
    if (!panel) return;

    panel.classList.toggle('open');
    panel.classList.toggle('hidden');
}
