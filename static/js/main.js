document.addEventListener('DOMContentLoaded', function () {
    // Initialize content
    // console.log('Plant Seeds Cook website loaded');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const lineEl = document.getElementById('seed-signal-line');
    if (lineEl) {
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lines = [
            'planting seed: what is the problem?',
            'planting seed: what is the vision?',
            'cultivate: what data is involved?',
            'cultivate: identify patterns',
            'cultivate: scaffold the project',
            'cooking: build the domain model',
            'cooking: build the data model',
            'cooking: build the API',
            'cooking: deploy the next version',
        ];

        if (!prefersReducedMotion) {
            let i = 0;
            const swap = () => {
                i = (i + 1) % lines.length;
                lineEl.textContent = lines[i];
            };
            setInterval(swap, 3500);
        }
    }
});
