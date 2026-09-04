const questions = [

    {
        question: "HTML nima uchun ishlatiladi?",

        answers: [
            "Web sahifaning strukturasini yaratish",
            "Rasm tahrirlash",
            "Video montaj qilish",
            "Internet tezligini oshirish"
        ],

        correct: 0
    },


    {
        question: "CSS nima uchun ishlatiladi?",

        answers: [
            "Database yaratish",
            "Web sahifaga dizayn berish",
            "Server yaratish",
            "Fayl yuklash"
        ],

        correct: 1
    },


    {
        question: "HTMLdagi sarlavha uchun qaysi teg ishlatiladi?",

        answers: [
            "<p>",
            "<img>",
            "<h1>",
            "<div>"
        ],

        correct: 2
    },


    {
        question: "CSSda matn rangini o‘zgartirish uchun qaysi property ishlatiladi?",

        answers: [
            "font-size",
            "color",
            "background",
            "margin"
        ],

        correct: 1
    },


    {
        question: "HTMLda link yaratish uchun qaysi teg ishlatiladi?",

        answers: [
            "<a>",
            "<link>",
            "<url>",
            "<href>"
        ],

        correct: 0
    },


    {
        question: "CSSda tashqi bo‘shliq qaysi property orqali beriladi?",

        answers: [
            "padding",
            "border",
            "margin",
            "display"
        ],

        correct: 2
    },


    {
        question: "HTMLda rasm qo‘yish uchun qaysi teg ishlatiladi?",

        answers: [
            "<picture>",
            "<image>",
            "<img>",
            "<photo>"
        ],

        correct: 2
    },


    {
        question: "CSSda elementni flex qilish uchun nima yoziladi?",

        answers: [
            "display: flex;",
            "position: flex;",
            "flex: display;",
            "layout: flex;"
        ],

        correct: 0
    },


    {
        question: "HTML faylining asosiy kengaytmasi qaysi?",

        answers: [
            ".css",
            ".html",
            ".js",
            ".php"
        ],

        correct: 1
    },


    {
        question: "CSSda element ichidagi bo‘shliq qaysi property?",

        answers: [
            "margin",
            "padding",
            "gap",
            "space"
        ],

        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;


const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextButton");

const questionNumber =
    document.getElementById("questionNumber");

const currentScore =
    document.getElementById("currentScore");

const testProgress =
    document.getElementById("testProgress");

const resultSection =
    document.getElementById("resultSection");


function loadQuestion() {

    selectedAnswer = false;

    nextButton.disabled = true;

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        currentQuestion + 1;


    questionText.textContent =
        question.question;


    answersContainer.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.textContent =
                answer;


            button.onclick = () => {

                selectAnswer(
                    button,
                    index
                );

            };


            answersContainer.appendChild(
                button
            );

        }
    );


    const progress =
        ((currentQuestion) /
        questions.length) * 100;


    testProgress.style.width =
        progress + "%";

}


function selectAnswer(button, index) {

    if (selectedAnswer) {
        return;
    }


    selectedAnswer = true;

    const question =
        questions[currentQuestion];


    const allAnswers =
        document.querySelectorAll(
            ".answer"
        );


    allAnswers.forEach(
        answer => {
            answer.disabled = true;
        }
    );


    if (index === question.correct) {

        button.classList.add("correct");

        score += 10;

        currentScore.textContent =
            score;

    } else {

        button.classList.add("wrong");

        allAnswers[
            question.correct
        ].classList.add("correct");

    }


    nextButton.disabled = false;

}


nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        } else {

            finishTest();

        }

    }
);


function finishTest() {

    document.querySelector(
        ".test-section"
    ).style.display = "none";


    resultSection.style.display =
        "block";


    document.getElementById(
        "finalScore"
    ).textContent = score;


    let message;


    if (score >= 90) {

        message =
            "Ajoyib! Sizning bilimingiz juda yaxshi! 🔥";

    } else if (score >= 70) {

        message =
            "Juda yaxshi! Yana biroz mashq qiling. 💪";

    } else if (score >= 50) {

        message =
            "Yaxshi natija. Bilimingizni yanada mustahkamlang.";

    } else {

        message =
            "Ko‘proq mashq qiling. Siz albatta uddalaysiz! 🚀";

    }


    document.getElementById(
        "resultMessage"
    ).textContent = message;


    saveResult();

}


function saveResult() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "itAcademyUser"
            )
        );


    if (!user) {
        return;
    }


    user.points =
        (user.points || 0) + score;


    user.progress =
        Math.min(
            100,
            Math.max(
                user.progress || 0,
                score
            )
        );


    localStorage.setItem(
        "itAcademyUser",
        JSON.stringify(user)
    );

}


function restartTest() {

    currentQuestion = 0;

    score = 0;

    currentScore.textContent = "0";

    resultSection.style.display =
        "none";

    document.querySelector(
        ".test-section"
    ).style.display = "block";


    loadQuestion();

}


loadQuestion();