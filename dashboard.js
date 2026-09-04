const user =
    JSON.parse(
        localStorage.getItem(
            "itAcademyUser"
        )
    );


/*
    Agar student login qilmagan bo‘lsa,
    login sahifasiga yuboramiz.
*/

if (!user) {

    window.location.href =
        "../login.html";

}


/* Student ma'lumotlari */

const studentName =
    document.getElementById(
        "studentName"
    );

const studentAvatar =
    document.getElementById(
        "studentAvatar"
    );

const profileName =
    document.getElementById(
        "profileName"
    );

const profileEmail =
    document.getElementById(
        "profileEmail"
    );

const profileCourse =
    document.getElementById(
        "profileCourse"
    );


/* Ma'lumotlarni chiqarish */

studentName.textContent =
    user.name || "Student";


profileName.textContent =
    user.name || "-";


profileEmail.textContent =
    user.email || "-";


profileCourse.textContent =
    user.course || "Frontend Development";


studentAvatar.textContent =
    (user.name || "S")
        .charAt(0)
        .toUpperCase();


/*
    Kurslar
*/

const courses = [

    {
        id: "frontend",

        name: "Frontend Development",

        icon: "💻",

        description:
            "HTML, CSS va JavaScriptni o‘rganing."

    },

    {
        id: "javascript",

        name: "JavaScript",

        icon: "⚡",

        description:
            "JavaScript dasturlash tilini o‘rganing."

    },

    {
        id: "python",

        name: "Python",

        icon: "🐍",

        description:
            "Python dasturlash asoslarini o‘rganing."

    },

    {
        id: "uiux",

        name: "UI/UX Design",

        icon: "🎨",

        description:
            "Figma va zamonaviy dizaynni o‘rganing."

    }

];


const myCourses =
    document.getElementById(
        "myCourses"
    );


/*
    Demo sifatida studentga
    Frontend kursini beramiz.

    Keyinchalik database orqali
    student qaysi kursga yozilganini
    aniqlaymiz.
*/

const enrolledCourses = [
    "frontend"
];


let totalProgress = 0;

let completedCourses = 0;


courses.forEach(
    course => {

        if (
            !enrolledCourses.includes(
                course.id
            )
        ) {

            return;

        }


        const storageKey =
            "courseProgress_" +
            course.id;


        const progressData =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                )
            ) || {
                completed: []
            };


        let lessonTotal = 0;


        if (course.id === "frontend") {

            lessonTotal = 5;

        }


        if (course.id === "javascript") {

            lessonTotal = 3;

        }


        if (course.id === "python") {

            lessonTotal = 3;

        }


        if (course.id === "uiux") {

            lessonTotal = 2;

        }


        const completed =
            progressData.completed.length;


        let percent = 0;


        if (lessonTotal > 0) {

            percent =
                Math.round(
                    (completed /
                    lessonTotal) * 100
                );

        }


        totalProgress += percent;


        if (percent === 100) {

            completedCourses++;

        }


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "my-course-card";


        card.innerHTML = `

            <div class="course-icon">
                ${course.icon}
            </div>

            <div class="course-card-content">

                <span>
                    Online kurs
                </span>

                <h3>
                    ${course.name}
                </h3>

                <p>
                    ${course.description}
                </p>


                <div class="course-progress-top">

                    <span>
                        Progress
                    </span>

                    <strong>
                        ${percent}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${percent}%"
                    ></div>

                </div>


                <a
                    href="../course.html?id=${course.id}"
                    class="primary-btn"
                >
                    ${
                        percent > 0
                        ? "Davom etish →"
                        : "Kursni boshlash →"
                    }
                </a>

            </div>

        `;


        myCourses.appendChild(
            card
        );

    }
);


/* Statistics */

document.getElementById(
    "courseCount"
).textContent =
    enrolledCourses.length;


const averageProgress =
    enrolledCourses.length
    ? Math.round(
        totalProgress /
        enrolledCourses.length
    )
    : 0;


document.getElementById(
    "overallProgress"
).textContent =
    averageProgress;


document.getElementById(
    "completedCourses"
).textContent =
    completedCourses;


document.getElementById(
    "totalPoints"
).textContent =
    user.points || 0;


/* Logout */

document.getElementById(
    "logoutButton"
).addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "itAcademyUser"
        );


        window.location.href =
            "../login.html";

    }
);