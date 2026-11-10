 
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
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";

});


// =================================
// 3. Back to Top Button
// =================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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

