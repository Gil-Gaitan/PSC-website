// Simple JavaScript for interactivity
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
