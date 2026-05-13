/**
 * Project detail modal - open, close, and event setup.
 * Astro migration target: src/components/ProjectModal.astro
 */

import { projects } from '../data/projects.js';

export function openModal(id) {
    const data = projects.find(p => p.id === id);
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;

    const teamInfo = document.getElementById('modalTeamInfo');
    if (data.team || data.role) {
        teamInfo.innerHTML = [
            data.team ? `<span class="text-gray-500">Team:</span> ${data.team}` : '',
            data.role ? `<span class="text-gray-500">Rolle:</span> ${data.role}` : '',
        ].filter(Boolean).join(' &nbsp;|&nbsp; ');
        teamInfo.classList.remove('hidden');
    } else {
        teamInfo.textContent = '';
        teamInfo.classList.add('hidden');
    }

    document.getElementById('modalBadges').innerHTML = `
        <span class="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded">${data.period}</span>
        <span class="bg-white/10 text-gray-400 text-xs font-bold px-3 py-1 rounded">${data.client}</span>
    `;

    document.getElementById('modalBullets').innerHTML = data.bullets.map(b => `
        <div class="flex gap-3">
            <span class="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
            <p class="text-sm text-gray-300 leading-relaxed"><span class="font-semibold text-white">${b.label}:</span> ${b.text}</p>
        </div>
    `).join('');

    document.getElementById('modalStack').innerHTML = data.stack
        .map(s => `<span class="bg-white/5 text-gray-300 px-2 py-1 rounded text-xs">${s}</span>`)
        .join('');

    const overlay = document.getElementById('projectModal');
    overlay.classList.add('modal-visible');
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal-content').scrollTop = 0;
}

export function closeModal() {
    document.getElementById('projectModal').classList.remove('modal-visible');
    document.body.classList.remove('modal-open');
}

export function initModal() {
    const overlay = document.getElementById('projectModal');

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Close button
    document.getElementById('modalClose').addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Open modal via event delegation (handles dynamically rendered cards)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-id]');
        if (btn) openModal(btn.dataset.modalId);
    });
}
