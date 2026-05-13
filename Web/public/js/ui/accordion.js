/**
 * Accordion / collapse panels - event delegation on [data-accordion-trigger].
 * Astro migration target: BaseLayout.astro <script is:inline>
 */

export function initAccordions() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-accordion-trigger]');
        if (!btn) return;

        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panel = btn.nextElementSibling;
        const chevron = btn.querySelector('i');

        if (expanded) {
            panel.style.maxHeight = '0';
            chevron.style.transform = '';
            btn.setAttribute('aria-expanded', 'false');
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            chevron.style.transform = 'rotate(180deg)';
            btn.setAttribute('aria-expanded', 'true');
        }
    });
}
