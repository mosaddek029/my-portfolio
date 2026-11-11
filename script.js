 
// =================================
// 1. Mobile Navigation
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});
// Typing Animation


/* =================================
   HERO TYPING ANIMATION
================================= */

const typingElement = document.getElementById("typing");

if (typingElement) {

    const roles = [
        "Software Engineering Student",
        "Aspiring Java Backend Developer",
        "Problem Solver",
        "Technology Enthusiast",
        "Future Software Engineer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingElement.textContent =
            currentRole.substring(0, characterIndex);

        let speed = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentRole.length) {

            deleting = true;
            speed = 1600;

        } else if (deleting && characterIndex === 0) {

            deleting = false;

            roleIndex = (roleIndex + 1) % roles.length;

            speed = 400;

        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

}


let messageIndex = 0;
let characterIndex = 0;


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =================================
// 2. Dark / Light Mode
// =================================

const themeButton = document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    themeButton.textContent = isLight
        ? "🌙"
        : "☀️";

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

});

// =================================
// 4. Dynamic Copyright Year
// =================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// =================================
// 5. Contact Form Validation
// =================================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {

        formStatus.textContent = "Please fill in all fields.";

        return;

    }

    formStatus.textContent =
        "Your form passed validation! Message delivery is not configured yet.";

    contactForm.reset();

});
// Developer Journey Scroll Animation

const journeyItems = document.querySelectorAll(".timeline-item");

const journeyObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                journeyObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

journeyItems.forEach((item) => {

    item.classList.add("hidden");

    journeyObserver.observe(item);

});

/* =================================
   SCROLL PROGRESS & BACK TO TOP
================================= */

const scrollProgress = document.getElementById("scrollProgress");

// Update progress and button visibility
window.addEventListener("scroll", () => {

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    if (scrollProgress) {
        scrollProgress.style.width = scrollPercentage + "%";
    }

    if (backToTop) {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

});

// Scroll smoothly to the top
if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// =================================
// DYNAMIC PORTFOLIO DATA
// =================================

fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load JSON file");
        }

        return response.json();
    })

    .then(data => {

        console.log("JSON loaded successfully!");

        // =================================
        // 1. ACADEMIC ACHIEVEMENTS
        // =================================

        const academicContainer =
            document.getElementById("academicAchievementContainer");

        if (academicContainer) {

            academicContainer.innerHTML = "";

            data.academicAchievements.forEach(achievement => {

                const card = document.createElement("div");
                card.className = "academic-gpa-card";

                const heading = document.createElement("h3");
                heading.textContent = "Academic Achievement";

                const gpa = document.createElement("div");
                gpa.className = "gpa-value";
                gpa.textContent = achievement.gpa;

                const semester = document.createElement("p");
                semester.className = "gpa-semester";
                semester.textContent = achievement.semester;

                const description = document.createElement("p");
                description.className = "gpa-description";
                description.textContent =
                    `${achievement.resultType} | ${achievement.institution} | ${achievement.description}`;

                card.appendChild(heading);
                card.appendChild(gpa);
                card.appendChild(semester);
                card.appendChild(description);

                academicContainer.appendChild(card);
            });
        }

        console.log("Academic achievements displayed!");

        // =================================
        // 2. PDF CERTIFICATES
        // =================================

        const certificatesContainer =
            document.getElementById("certificatesContainer");

        if (certificatesContainer) {

            certificatesContainer.innerHTML = "";

            if (Array.isArray(data.certificates) &&
                data.certificates.length > 0) {

                data.certificates.forEach(certificate => {

                    const card = document.createElement("div");
                    card.className = "certificate-card";

                    const preview = document.createElement("div");
                    preview.className = "certificate-preview";
                    preview.textContent = "📄 PDF CERTIFICATE";

                    const title = document.createElement("h3");
                    title.textContent = certificate.title;

                    const description = document.createElement("p");
                    description.textContent =
                        certificate.description || "";

                    const link = document.createElement("a");
                    link.href = certificate.pdf;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = "View Certificate ↗";

                    card.appendChild(preview);
                    card.appendChild(title);
                    card.appendChild(description);
                    card.appendChild(link);

                    certificatesContainer.appendChild(card);
                });

                console.log("Certificates displayed successfully!");

            } else {
                certificatesContainer.textContent =
                    "No certificates added yet.";
            }
        } else {
            console.error("Certificates container not found in HTML!");
        }

        // =================================
        // 3. LATEST UPDATES
        // =================================

        const updatesContainer =
            document.getElementById("latestUpdatesContainer");

        if (updatesContainer) {

            updatesContainer.innerHTML = "";

            const updates = Array.isArray(data.latestUpdates)
                ? [...data.latestUpdates].reverse()
                : [];

            updates.forEach(update => {

                const card = document.createElement("article");
                card.className = "update-card";

                const category = document.createElement("span");
                category.className = "update-category";
                category.textContent = update.category;

                const title = document.createElement("h3");
                title.textContent = update.title;

                const description = document.createElement("p");
                description.textContent = update.description;

                card.appendChild(category);
                card.appendChild(title);
                card.appendChild(description);

                updatesContainer.appendChild(card);
            });
        }

        console.log("Latest updates displayed!");

    })

    .catch(error => {
        console.error("JSON Error:", error);
    });
