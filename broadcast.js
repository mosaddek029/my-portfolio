/* =================================================
   SECTION BROADCAST DIVIDERS
   A moving headline strip between sections.
   Each strip has its own text, based on the
   section it leads into, and alternates direction.
================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Headlines for each section (keyed by the section's id)
    const headlinesBySection = {
        about:        ["GET TO KNOW ME", "SOFTWARE ENGINEERING STUDENT", "PASSIONATE ABOUT CODE", "BUILDING USEFUL SOLUTIONS"],
        education:    ["BSC IN SOFTWARE ENGINEERING", "HSC GPA 5.00", "SSC GPA 5.00", "ALWAYS LEARNING"],
        skills:       ["JAVA", "C PROGRAMMING", "SQL AND DATABASES", "HTML CSS JAVASCRIPT", "DATA STRUCTURES", "GIT"],
        journey:      ["FROM C TO JAVA", "ONE STEP AT A TIME", "STRONG FUNDAMENTALS", "MOVING TOWARD BACKEND"],
        projects:     ["MEDICAL STORE MANAGEMENT SYSTEM", "PERSONAL PORTFOLIO WEBSITE", "JAVA PRACTICE PROJECTS", "LEARNING BY BUILDING"],
        achievements: ["ACADEMIC MILESTONES", "RESEARCH CONTRIBUTION", "CONTINUOUS LEARNING"],
        certificates: ["COURSES AND CERTIFICATIONS", "LEARNING NEVER STOPS", "GROWING SKILL SET"],
        research:     ["AI IN MEDICAL DIAGNOSTICS", "LITERATURE REVIEW", "23 PAPERS REVIEWED", "UNDER SUBMISSION"],
        latestUpdates:["WHAT'S NEW", "RECENT ACTIVITIES", "FRESH UPDATES"],
        gallery:      ["MY MOMENTS", "UNIVERSITY MEMORIES", "PEOPLE AND PLACES"],
        contact:      ["LET'S CONNECT", "OPEN TO OPPORTUNITIES", "COLLABORATION WELCOME", "SAY HELLO"]
    };

    // Used if a section has no entry above
    const defaultHeadlines = [
        "SOFTWARE ENGINEERING",
        "JAVA BACKEND DEVELOPMENT",
        "LEARNING AND IMPROVING",
        "PROBLEM SOLVING"
    ];

    // Only these sections get a moving strip above them (fewer effects = calmer page)
    const showBefore = ["about", "projects", "contact"];

    const MIN_ITEMS_PER_HALF = 8;   // keeps the strip wider than the screen (no gaps)
    const SECONDS_PER_ITEM = 4;     // same scroll speed for short and long lists

    // Remove any dividers from an earlier run
    document.querySelectorAll(".section-broadcast").forEach(el => el.remove());

    const sections = Array.from(document.querySelectorAll("main > section"));

    let stripCount = 0;

    sections.forEach((section, index) => {

        const nextSection = sections[index + 1];

        // No divider after the last section (it sits right above the footer)
        if (!nextSection) return;

        // Skip sections that are not in the list above
        if (!showBefore.includes(nextSection.id)) return;

        const list = headlinesBySection[nextSection.id] || defaultHeadlines;

        // Repeat the list until one half is long enough to fill the screen
        const repeats = Math.ceil(MIN_ITEMS_PER_HALF / list.length);
        const half = [];

        for (let i = 0; i < repeats; i++) {
            half.push(...list);
        }

        // The CSS animation moves the track by -50%, so it needs two identical halves
        const items = half.concat(half);

        const divider = document.createElement("div");
        divider.className = "section-broadcast";
        divider.setAttribute("aria-hidden", "true");   // decorative only

        const track = document.createElement("div");
        track.className = "section-broadcast-track";

        items.forEach(text => {
            const span = document.createElement("span");
            span.textContent = `${text} ✦`;
            track.appendChild(span);
        });

        // Alternate direction so neighbouring strips look different
        track.style.animationDuration = `${half.length * SECONDS_PER_ITEM}s`;
        track.style.animationDirection = stripCount % 2 === 0 ? "normal" : "reverse";
        stripCount++;

        divider.appendChild(track);
        section.after(divider);
    });

});
