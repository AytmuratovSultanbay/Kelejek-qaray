const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value;

        const email =
            document.getElementById("registerEmail").value;

        const password =
            document.getElementById("registerPassword").value;

        const course =
            document.getElementById("registerCourse").value;


        if (password.length < 6) {

            alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");

            return;
        }


        const user = {

            name: name,
            email: email,
            password: password,
            course: course,

            progress: 0,
            points: 0,

            registeredAt: new Date().toLocaleDateString()

        };


        localStorage.setItem(
            "itAcademyUser",
            JSON.stringify(user)
        );


        alert(
            "Tabriklaymiz! Hisobingiz muvaffaqiyatli yaratildi."
        );


        window.location.href = "student/dashboard.html";

    });

}



const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;


        const savedUser =
            JSON.parse(
                localStorage.getItem("itAcademyUser")
            );


        if (!savedUser) {

            alert(
                "Bunday foydalanuvchi topilmadi. Avval ro‘yxatdan o‘ting."
            );

            return;
        }


        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            window.location.href =
                "student/dashboard.html";

        } else {

            alert(
                "Email yoki parol noto‘g‘ri!"
            );

        }

    });

}