/**
 * Project card renderer - builds and injects cards into #projects-grid.
 * Astro migration target: src/components/ProjectCard.astro
 */

import { projects } from '../data/projects.js';

function renderCard(project) {
    const stackTags = project.stack
        .map(s => `<span class="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">${s}</span>`)
        .join('');

    return `
        <div class="glass-card p-8 rounded-xl reveal border-l-4 border-l-accent flex flex-col">
            <div class="flex justify-between items-start mb-4">
                <span class="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded">${project.period}</span>
                <span class="bg-white/10 text-gray-400 text-xs font-bold px-3 py-1 rounded">${project.client}</span>
            </div>
            <h4 class="text-2xl font-bold mb-3">${project.cardTitle}</h4>
            <p class="text-gray-400 mb-6 text-sm leading-relaxed">${project.cardDescription}</p>
            <div class="flex flex-wrap gap-2 mb-8">${stackTags}</div>
            <button
                data-modal-id="${project.id}"
                class="mt-auto w-full inline-flex justify-center items-center bg-zinc-800 border border-white/10 text-white font-medium py-3 px-4 rounded hover:bg-accent hover:text-black transition cursor-pointer"
            >
                <i class="fas fa-circle-info mr-2"></i> Details
            </button>
        </div>
    `;
}

export function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = projects.map(renderCard).join('');
}
