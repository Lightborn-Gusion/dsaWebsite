// master.js
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // 1. Theme Toggle Logic (Dark/Light Mode)
    // =======================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Safety check: Only run theme logic if the toggle button exists on this page
    if (themeToggle && themeIcon) {
        // Check local storage on load
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }

        // Click Event
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            let theme = 'light';

            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            } else {
                themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            }

            localStorage.setItem('theme', theme);
        });
    }

    // =======================================================================
    // 2. Dashboard Exit Animations (Sliding Header/Footer + Fading Content)
    // =======================================================================
    const homeLinks = document.querySelectorAll('a[href="/home"], a[href="/"], .nav-home');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    // Grab the main middle content (adjust the selector if your middle content uses a different tag)
    const mainContent = document.querySelector('main') || document.querySelector('.section');

    if (homeLinks.length > 0) {
        homeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.target !== "_blank") {
                    e.preventDefault();
                    const targetUrl = link.getAttribute('href');

                    // 1. Slide the header up and footer down
                    if (header) header.classList.add('slide-up-out');
                    if (footer) footer.classList.add('slide-down-out');

                    // 2. NEW: Fade out the middle content so it doesn't look "stuck"!
                    if (mainContent) {
                        mainContent.style.transition = 'opacity 0.4s ease';
                        mainContent.style.opacity = '0';
                    }

                    // Wait 500ms for everything to animate, then switch pages
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500);
                }
            });
        });
    }
});