const courses = {

    frontend: {

        name: "Frontend Development",

        lessons: [

            {
                title: "HTML bilan tanishuv",

                description:
                    "HTML asoslari va web sahifa strukturasi.",

                video:
                    "videos/frontend/lesson1.mp4"
            },

            {
                title: "HTML teglar",

                description:
                    "Asosiy HTML teglar bilan ishlash.",

                video:
                    "videos/frontend/lesson2.mp4"
            },

            {
                title: "CSS asoslari",

                description:
                    "CSS yordamida web sahifaga dizayn berish.",

                video:
                    "videos/frontend/lesson3.mp4"
            },

            {
                title: "CSS Flexbox",

                description:
                    "Flexbox yordamida elementlarni joylashtirish.",

                video:
                    "videos/frontend/lesson4.mp4"
            },

            {
                title: "Responsive Design",

                description:
                    "Saytni telefon va planshetlarga moslashtirish.",

                video:
                    "videos/frontend/lesson5.mp4"
            }

        ]

    },


    javascript: {

        name: "JavaScript",

        lessons: [

            {
                title: "JavaScriptga kirish",

                description:
                    "JavaScript nima va u nima uchun kerak?",

                video:
                    "videos/javascript/lesson1.mp4"
            },

            {
                title: "O‘zgaruvchilar",

                description:
                    "let, const va var bilan ishlash.",

                video:
                    "videos/javascript/lesson2.mp4"
            },

            {
                title: "Funksiyalar",

                description:
                    "JavaScript funksiyalarini o‘rganish.",

                video:
                    "videos/javascript/lesson3.mp4"
            }

        ]

    },


    python: {

        name: "Python",

        lessons: [

            {
                title: "Python bilan tanishuv",

                description:
                    "Python dasturlash tiliga kirish.",

                video:
                    "videos/python/lesson1.mp4"
            },

            {
                title: "O‘zgaruvchilar",

                description:
                    "Python o‘zgaruvchilari bilan ishlash.",

                video:
                    "videos/python/lesson2.mp4"
            },

            {
                title: "Shart operatorlari",

                description:
                    "if va else operatorlarini o‘rganish.",

                video:
                    "videos/python/lesson3.mp4"
            }

        ]

    },


    uiux: {

        name: "UI/UX Design",

        lessons: [

            {
                title: "UI/UX nima?",

                description:
                    "UI va UX tushunchalarini o‘rganish.",

                video:
                    "videos/uiux/lesson1.mp4"
            },

            {
                title: "Figma bilan tanishuv",

                description:
                    "Figma dasturida ishlashni boshlash.",

                video:
                    "videos/uiux/lesson2.mp4"
            }

        ]

    }

};


/* URLdan kursni aniqlaymiz */

const params =
    new URLSearchParams(
        window.location.search
    );


const courseId =
    params.get("id") || "frontend";


const course =
    courses[courseId] || courses.frontend;


/* Kurs nomi */

document.getElementById(
    "courseName"
).textContent =
    course.name;


/* LocalStorage */

const storageKey =
    "courseProgress_" + courseId;


let progress =
    JSON.parse(
        localStorage.getItem(storageKey)
    ) || {

        completed: []

    };


let currentLesson = 0;


/* DOM */

const lessonList =
    document.getElementById(
        "lessonList"
    );

const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );

const lessonDescription =
    document.getElementById(
        "lessonDescription"
    );

const lessonVideo =
    document.getElementById(
        "lessonVideo"
    );

const videoSource =
    document.getElementById(
        "videoSource"
    );

const lessonProgress =
    document.getElementById(
        "lessonProgress"
    );

const lessonPercent =
    document.getElementById(
        "lessonPercent"
    );


/* Sidebar */

function renderLessons() {

    lessonList.innerHTML = "";


    course.lessons.forEach(
        (lesson, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "lesson-item";


            if (
                index === currentLesson
            ) {

                button.classList.add(
                    "active"
                );

            }


            if (
                progress.completed.includes(
                    index
                )
            ) {

                button.classList.add(
                    "completed"
                );

            }


            button.innerHTML = `

                <span class="lesson-number">
                    ${
                        progress.completed.includes(index)
                        ? "✓"
                        : index + 1
                    }
                </span>

                <span>
                    ${lesson.title}
                </span>

            `;


            button.onclick = () => {

                currentLesson = index;

                loadLesson();

            };


            lessonList.appendChild(
                button
            );

        }
    );

}


/* Darsni yuklash */

function loadLesson() {

    const lesson =
        course.lessons[
            currentLesson
        ];


    lessonTitle.textContent =
        lesson.title;


    lessonDescription.textContent =
        lesson.description;


    videoSource.src =
        lesson.video;


    lessonVideo.load();


    renderLessons();

    updateProgress();

}


/* Darsni tugatish */

document.getElementById(
    "completeButton"
).addEventListener(
    "click",
    () => {

        if (
            !progress.completed.includes(
                currentLesson
            )
        ) {

            progress.completed.push(
                currentLesson
            );

        }


        saveProgress();

        updateProgress();

        renderLessons();

        alert(
            "Dars muvaffaqiyatli tugatildi! 🎉"
        );

    }
);


/* Keyingi dars */

document.getElementById(
    "nextLesson"
).addEventListener(
    "click",
    () => {

        if (
            currentLesson <
            course.lessons.length - 1
        ) {

            currentLesson++;

            loadLesson();

        } else {

            alert(
                "Tabriklaymiz! Kursdagi barcha darslarni tugatdingiz! 🏆"
            );

        }

    }
);


/* Progress */

function updateProgress() {

    const total =
        course.lessons.length;


    const completed =
        progress.completed.length;


    const percent =
        Math.round(
            (completed / total) * 100
        );


    lessonProgress.style.width =
        percent + "%";


    lessonPercent.textContent =
        percent + "%";


    updateUserProgress(
        percent
    );

}


/* Saqlash */

function saveProgress() {

    localStorage.setItem(

        storageKey,

        JSON.stringify(progress)

    );

}


/* Student kabinetidagi progress */

function updateUserProgress(percent) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "itAcademyUser"
            )
        );


    if (!user) {
        return;
    }


    user.progress =
        percent;


    localStorage.setItem(

        "itAcademyUser",

        JSON.stringify(user)

    );

}


/* Boshlash */

loadLesson();