(() => {
    if (
        !window.matchMedia("(pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let lastTime = 0;

    document.addEventListener("pointermove", (event) => {
        const now = performance.now();

        if (now - lastTime < 18) return;
        lastTime = now;

        // Main glowing particle
        const dot = document.createElement("span");
        dot.className = "cursor-trail-dot";

        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;

        dot.style.setProperty(
            "--dot-size",
            `${6 + Math.random() * 12}px`
        );

        document.body.appendChild(dot);

        dot.addEventListener("animationend", () => dot.remove(), {
            once: true
        });

        // Random sparkling stars
        if (Math.random() < 0.65) {
            const star = document.createElement("span");

            star.className = "cursor-trail-star";
            star.textContent = "✦";

            star.style.left = `${event.clientX}px`;
            star.style.top = `${event.clientY}px`;

            star.style.setProperty(
                "--star-size",
                `${9 + Math.random() * 12}px`
            );

            star.style.setProperty(
                "--move-x",
                `${(Math.random() - 0.5) * 65}px`
            );

            star.style.setProperty(
                "--move-y",
                `${(Math.random() - 0.5) * 65}px`
            );

            document.body.appendChild(star);

            star.addEventListener("animationend", () => star.remove(), {
                once: true
            });
        }
    }, { passive: true });
})();