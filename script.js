 
// =================================
// 1. Mobile Navigation
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });
}
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


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =================================
// 2. Dark / Light Mode
// =================================

const themeButton = document.getElementById("themeButton");

function applyMode(isLight) {

    document.body.classList.toggle("light-mode", isLight);

    if (themeButton) {
        themeButton.textContent = isLight ? "🌙" : "☀️";
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
    }

}

let savedMode = null;
try { savedMode = localStorage.getItem("portfolioMode"); } catch (e) {}

applyMode(savedMode === "light");

if (themeButton) {
    themeButton.addEventListener("click", function () {

        const isLight = !document.body.classList.contains("light-mode");

        applyMode(isLight);

        try {
            localStorage.setItem("portfolioMode", isLight ? "light" : "dark");
        } catch (e) {}

    });
}

// =================================
// 4. Dynamic Copyright Year
// =================================

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =================================
// 5. Contact Form Validation
// =================================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const CONTACT_EMAIL = "mdmosaddek20032@gmail.com";

// To send messages straight to your inbox (no email app needed):
// 1. Create a free form at https://formspree.io
// 2. Paste its address below, e.g. "https://formspree.io/f/abcdwxyz"
// Leave it empty to use the email-app fallback.
const FORM_ENDPOINT = "";

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            formStatus.textContent = "Please fill in all fields.";

            return;

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            formStatus.textContent = "Please enter a valid email address.";

            return;

        }

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        if (FORM_ENDPOINT) {

            // Send directly through the form service
            try {

                if (submitButton) submitButton.disabled = true;
                formStatus.textContent = "Sending...";

                const response = await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (!response.ok) throw new Error("Send failed");

                formStatus.textContent =
                    "Thank you! Your message has been sent.";

                contactForm.reset();

            } catch (error) {

                formStatus.textContent =
                    "Sorry, the message could not be sent. " +
                    `Please email me directly at ${CONTACT_EMAIL}.`;

            } finally {

                if (submitButton) submitButton.disabled = false;

            }

            return;
        }

        // Fallback: open the visitor's email app with the message filled in
        const body =
            `Name: ${name}\nEmail: ${email}\n\n${message}`;

        window.location.href =
            `mailto:${CONTACT_EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        formStatus.textContent =
            "Opening your email app. Press Send there to deliver your message.";

        contactForm.reset();

    });

}

// Developer Journey Scroll Animation

const journeyItems = document.querySelectorAll(".timeline-item");

const journeyObserver = !("IntersectionObserver" in window) ? null : new IntersectionObserver(
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

    if (!journeyObserver) {
        item.classList.add("show");
        return;
    }

    item.classList.add("hidden");

    journeyObserver.observe(item);

});

/* =================================
   SCROLL PROGRESS & BACK TO TOP
================================= */

const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

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

            (Array.isArray(data.academicAchievements)
                ? data.academicAchievements : []).forEach(achievement => {

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

        // Show a visible message instead of leaving empty sections
        ["certificatesContainer", "latestUpdatesContainer"].forEach(id => {
            const box = document.getElementById(id);
            if (box && !box.children.length) {
                box.textContent =
                    "Content could not be loaded. Make sure data.json exists " +
                    "and the site is opened through a web server (not file://).";
            }
        });
    });
// =================================
// Active Sidebar Navigation
// =================================

const pageSections = document.querySelectorAll("section[id]");
const sidebarLinks = document.querySelectorAll(
    ".nav-links a[href^='#']"
);

function updateActiveNavigation() {

    let currentSection = "home";

    // Sections without their own menu link (Journey, Certificates, Research,
    // Latest Updates) highlight the closest earlier section that has one.
    const linkedIds = Array.from(sidebarLinks).map(function (link) {
        return link.getAttribute("href").slice(1);
    });

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200 &&
            linkedIds.includes(section.getAttribute("id"))) {
            currentSection = section.getAttribute("id");
        }

    });

    sidebarLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();

/* =====================================
   DYNAMIC THEME COLOR CONTROLLER
===================================== */


document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("themeColorToggle");
    const dropdown = document.getElementById("themeColorDropdown");
    const colorButtons = document.querySelectorAll(".color-options button");
    const resetButton = document.getElementById("resetThemeColor");

    if (!toggle || !dropdown) return;

    const defaultColor = "#60A5FA";

    function closeColorDropdown() {
        dropdown.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    }

    function applyThemeColor(color) {

        // Apply selected color to both dark and light modes
        document.body.style.setProperty("--visitor-accent", color);
        document.body.style.setProperty("--accent-color", color);

        // Highlight selected color
        colorButtons.forEach(button => {
            const selected =
                button.dataset.color.toLowerCase() === color.toLowerCase();

            button.classList.toggle("selected", selected);
        });

        // Remember visitor preference
        try {
            localStorage.setItem("portfolioThemeColor", color);
        } catch (e) {}
    }

    // Load previously selected color
    let savedColor = defaultColor;
    try {
        savedColor =
            localStorage.getItem("portfolioThemeColor") || defaultColor;
    } catch (e) {}

    applyThemeColor(savedColor);

    // Open and close dropdown
    toggle.addEventListener("click", function (event) {
        event.stopPropagation();

        const isOpen = dropdown.classList.toggle("active");
        toggle.setAttribute("aria-expanded", isOpen);
    });

    // Select a color and automatically close dropdown
    colorButtons.forEach(button => {

        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const selectedColor = this.dataset.color;

            applyThemeColor(selectedColor);
            closeColorDropdown();
        });

    });

    // Reset color and automatically close dropdown
    if (resetButton) {
        resetButton.addEventListener("click", function (event) {
            event.stopPropagation();

            applyThemeColor(defaultColor);
            closeColorDropdown();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {

        if (!event.target.closest(".theme-color-picker")) {
            closeColorDropdown();
        }

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const galleryImage = document.getElementById("galleryImage");
    const previousButton = document.getElementById("galleryPrev");
    const nextButton = document.getElementById("galleryNext");
    const dotsContainer = document.getElementById("galleryDots");
    const counter = document.getElementById("galleryCounter");

    if (!galleryImage || !previousButton || !nextButton || !dotsContainer) return;

    // position = which part of the photo stays visible when it is cropped
    // "50% 0%" = keep the top (heads), "50% 50%" = centre, "50% 100%" = keep the bottom
    const photos = [
        { src: "photo1.jpg",  caption: "Memory 1", position: "50% 0%"  },
        { src: "photo2.jpeg", caption: "Memory 2", position: "50% 30%" },
        { src: "photo3.jpeg", caption: "Memory 3", position: "50% 30%" },
        { src: "photo4.jpeg", caption: "Memory 4", position: "50% 30%" },
        { src: "photo5.jpeg", caption: "Memory 5", position: "50% 30%" }
    ];

    let currentIndex = 0;
    let slideshowTimer;

    // If a photo fails to load, try the other extension (.jpg <-> .jpeg) once.
    // The flag is reset every time a new photo is shown, so a missing file
    // can never cause an endless retry loop.
    let retriedCurrent = false;

    galleryImage.addEventListener("error", function () {

        if (retriedCurrent) return;
        retriedCurrent = true;

        const current = galleryImage.getAttribute("src") || "";

        if (/\.jpe?g$/i.test(current)) {
            galleryImage.src = current.replace(/\.(jpe?g)$/i, function (match, ext) {
                return ext.toLowerCase() === "jpg" ? ".jpeg" : ".jpg";
            });
        }

    });

    function showPhoto(index) {
        currentIndex = (index + photos.length) % photos.length;

        galleryImage.classList.add("changing");

        setTimeout(function () {
            galleryImage.style.setProperty("--photo-position", photos[currentIndex].position);
            retriedCurrent = false;
            galleryImage.src = photos[currentIndex].src;
            galleryImage.alt = photos[currentIndex].caption;

            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${photos.length}`;
            }

            document.querySelectorAll(".gallery-dot").forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentIndex);
            });

            galleryImage.classList.remove("changing");
        }, 200);
    }

    photos.forEach(function (photo, index) {
        const dot = document.createElement("button");

        dot.className = "gallery-dot";
        dot.setAttribute("aria-label", `Show photo ${index + 1}`);

        dot.addEventListener("click", function () {
            showPhoto(index);
            startSlideshow();
        });

        dotsContainer.appendChild(dot);
    });

    function startSlideshow() {
        clearInterval(slideshowTimer);
        slideshowTimer = setInterval(function () {
            showPhoto(currentIndex + 1);
        }, 4000);
    }

    nextButton.addEventListener("click", function () {
        showPhoto(currentIndex + 1);
        startSlideshow();
    });

    previousButton.addEventListener("click", function () {
        showPhoto(currentIndex - 1);
        startSlideshow();
    });

    const slider = galleryImage.closest(".gallery-slider");

    if (slider) {
        slider.addEventListener("mouseenter", function () {
            clearInterval(slideshowTimer);
        });
        slider.addEventListener("mouseleave", startSlideshow);
    }

    showPhoto(0);
    startSlideshow();

});

