// Plant Seeds Cook - Main JavaScript file
// Future enhancements and interactive features

document.addEventListener('DOMContentLoaded', function () {
    // Initialize any dynamic content
    console.log('Plant Seeds Cook website loaded');

    // Add smooth scrolling for anchor links
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
});
