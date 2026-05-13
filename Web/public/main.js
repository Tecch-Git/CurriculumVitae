import { renderProjects } from './js/components/projectCard.js';
import { initModal } from './js/components/projectModal.js';
import { initAccordions } from './js/ui/accordion.js';
import { initMobileNav } from './js/ui/nav.js';
import { initReveal, initSmoothScroll } from './js/ui/animations.js';

renderProjects();
initReveal();
initSmoothScroll();
initModal();
initAccordions();
initMobileNav();
