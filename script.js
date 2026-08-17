/* =====================================
   AGRINHO 2026
   INTERATIVIDADE
===================================== */


/* MENU MOBILE */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {

    const menuIsOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        menuIsOpen
    );

    menuButton.textContent = menuIsOpen
        ? "✕"
        : "☰";
});


/* FECHAR MENU AO CLICAR */

const navigationLinks =
    document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "☰";
    });

});


/* MENU ATIVO CONFORME A SEÇÃO */

const sections =
    document.querySelectorAll("main section");


function updateActiveNavigation() {

    let currentSection = "inicio";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* CONTADOR DE NÚMEROS */

const statistics =
    document.querySelectorAll(".stat strong");

let counterStarted = false;


function startCounters() {

    if (counterStarted) {
        return;
    }

    counterStarted = true;

    statistics.forEach((counter) => {

        const target =
            Number(counter.dataset.target);

        const prefix =
            counter.dataset.prefix || "";

        const suffix =
            counter.dataset.suffix || "";

        let current = 0;

        const increment =
            Math.max(1, target / 70);

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);
                }

                counter.textContent =
                    prefix +
                    Math.floor(current).toLocaleString("pt-BR") +
                    suffix;

            }, 25);

    });

}


/* DETECTAR QUANDO OS NÚMEROS APARECEM */

const impactSection =
    document.querySelector("#impacto");


const impactObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    startCounters();

                    impactObserver.disconnect();
                }

            });

        },
        {
            threshold: 0.35
        }
    );


impactObserver.observe(impactSection);


/* BOTÃO FINAL */

const contactButton =
    document.getElementById("contactButton");

const contactMessage =
    document.getElementById("contactMessage");


contactButton.addEventListener("click", () => {

    contactMessage.textContent =
        "Obrigado por fazer parte dessa mudança! 🌱";

    contactButton.textContent =
        "IDEIA APOIADA ✓";

    contactButton.style.background =
        "#a9d86b";

    setTimeout(() => {

        contactMessage.textContent = "";

    }, 5000);

});


/* ANIMAÇÃO DE ENTRADA */

const animatedElements =
    document.querySelectorAll(
        ".solution-card, .concept-image, .stat"
    );


const animationObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    animationObserver.observe(element);

});
