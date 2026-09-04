const rankingList =
    document.getElementById("rankingList");

const studentCount =
    document.getElementById("studentCount");


/*
    Demo studentlar.

    Keyinchalik backend qo‘shilganda
    bu ma'lumotlar database'dan olinadi.
*/

const students = [

    {
        name: "Muhammad Ali",
        course: "Frontend Development",
        points: 980
    },

    {
        name: "Aziza Karimova",
        course: "Python",
        points: 940
    },

    {
        name: "Sardor Bekov",
        course: "JavaScript",
        points: 890
    },

    {
        name: "Madina Tursunova",
        course: "Frontend Development",
        points: 850
    },

    {
        name: "Jasur Axmedov",
        course: "Python",
        points: 810
    },

    {
        name: "Dilnoza Rahimova",
        course: "UI/UX Design",
        points: 760
    },

    {
        name: "Akmal Sobirov",
        course: "JavaScript",
        points: 710
    },

    {
        name: "Shahnoza Qodirova",
        course: "Frontend Development",
        points: 680
    }

];


/*
    Agar user ro‘yxatdan o‘tgan bo‘lsa,
    uni ham reytingga qo‘shamiz.
*/

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "itAcademyUser"
        )
    );


if (currentUser) {

    students.push({

        name: currentUser.name,

        course: currentUser.course,

        points: currentUser.points || 0

    });

}


/*
    Ball bo‘yicha yuqoridan pastga
    tartiblaymiz.
*/

students.sort(
    (a, b) =>
        b.points - a.points
);


studentCount.textContent =
    students.length;


/*
    Reytingni ekranga chiqaramiz.
*/

students.forEach(
    (student, index) => {

        const row =
            document.createElement("div");

        row.className =
            "ranking-row";


        let position = index + 1;


        let medal = "";


        if (position === 1) {
            medal = "🥇";
        }

        if (position === 2) {
            medal = "🥈";
        }

        if (position === 3) {
            medal = "🥉";
        }


        row.innerHTML = `

            <span class="position">
                ${medal || position}
            </span>

            <span class="student-info">

                <span class="avatar">
                    ${student.name
                        .charAt(0)
                        .toUpperCase()}
                </span>

                <strong>
                    ${student.name}
                </strong>

            </span>

            <span class="student-course">
                ${student.course}
            </span>

            <strong class="student-points">
                ${student.points}
            </strong>

        `;


        rankingList.appendChild(row);

    }
);