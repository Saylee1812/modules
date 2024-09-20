

const quizData = [
    {
        question: "What principle holds athletes responsible for any prohibited substance found in their body, regardless of intent?",
        a: "Fair Play Principle",
        b: "Strict Liability Principle",
        c: "Integrity Principle",
        d: "Code of Conduct Principle",
        correct: "b",
    },
    {
        question: "Which of the following substances is classified as an anabolic agent and is banned by WADA?",
        a: "Insulin",
        b: "Caffeine",
        c: "Testosterone",
        d: "Vitamin D",
        correct: "c",
    },
    {
        question: "What must an athlete obtain if they need to use a prohibited substance for a legitimate medical reason?",
        a: "Medical Waiver",
        b: "Therapeutic Use Exemption (TUE)",
        c: "Special Permission",
        d: "Doctor’s Note",
        correct: "b",
    },
    {
        question: "What is the purpose of the WADA Prohibited List?",
        a: "To list all allowed supplements",
        b: "To identify substances and methods banned in sport",
        c: "To provide diet recommendations for athletes",
        d: "To list exercises that are not allowed in competition",
        correct: "b",
    },
    {
        question: "What consequence might a team face if one of its members is found guilty of a doping violation?",
        a: "Loss of sponsorships",
        b: "The athlete receives a warning",
        c: "Nothing happens to the team",
        d: "Team disqualification from events",
        correct: "d",
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let selectedAnswer = null;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl;
        }
    });
    return selectedAnswer;
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (selectedAnswer) {
        const correctAnswerId = quizData[currentQuiz].correct;
        let isCorrect = selectedAnswer.id === correctAnswerId;

        // Apply background color changes
        answerEls.forEach(answerEl => {
            const label = document.querySelector(`label[for=${answerEl.id}]`);
            if (answerEl.id === correctAnswerId) {
                label.classList.add('correct');
            } else {
                label.classList.add('wrong');
            }
        });

        if (isCorrect) {
            score += 10;  // Add 10 points for the correct answer
        }

        // Delay before moving to the next question
        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                <h2>Congratulations on finishing the quiz! <br>You scored ${score} points.<br> Here is your reward! <br> Keep it up!</h2>
                <div class="next">
                <a href="module.html"><button ">Proceed</button></a>
                </div>
                `;
            }
        }, 1000);  // Wait 1 second before proceeding
    }
});

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
        const label = document.querySelector(`label[for=${answerEl.id}]`);
        label.classList.remove('correct', 'wrong');  // Remove color classes
    });
}

