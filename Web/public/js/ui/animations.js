/**
 * Scroll-reveal animation and smooth-scroll helpers.
 * Astro migration target: BaseLayout.astro <script is:inline>
 */

export function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

export function initSmoothScroll() {
    document.querySelectorAll('a[href="#about"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('about');
            const offset = target.offsetTop - Math.max(0, (window.innerHeight - target.offsetHeight) / 2);
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
}
