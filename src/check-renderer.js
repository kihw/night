const { ipcRenderer } = require('electron');

let countdown = 30;
let countdownInterval = null;
let action = 'shutdown';

// Éléments DOM
const countdownNumber = document.getElementById('countdownNumber');
const actionText = document.getElementById('actionText');
const respondBtn = document.getElementById('respondBtn');
const progressRing = document.querySelector('.progress-ring-progress');

// Configuration du cercle de progression
const radius = 52;
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = circumference;

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    respondBtn.addEventListener('click', () => {
        ipcRenderer.send('user-responded');
        window.close();
    });

    // Raccourcis clavier
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            respondBtn.click();
        }
        
        if (event.key === 'Escape') {
            // Permettre la fermeture avec Escape (équivaut à ne pas répondre)
            window.close();
        }
    });
}

function startCountdown(initialTime, actionType) {
    countdown = initialTime;
    action = actionType;
    
    // Mettre à jour le texte de l'action
    const actionTexts = {
        'shutdown': 'extinction',
        'suspend': 'mise en veille',
        'lock': 'verrouillage'
    };
    actionText.textContent = actionTexts[action] || action;

    // Démarrer le compte à rebours
    updateCountdown();
    
    countdownInterval = setInterval(() => {
        countdown--;
        updateCountdown();
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            // La fenêtre se fermera automatiquement et l'action sera exécutée
        }
    }, 1000);
}

function updateCountdown() {
    countdownNumber.textContent = countdown;
    
    // Mettre à jour le cercle de progression
    const progress = countdown / 30; // Supposer 30 secondes max
    const offset = circumference - (progress * circumference);
    progressRing.style.strokeDashoffset = offset;
    
    // Changer la couleur selon le temps restant
    if (countdown <= 5) {
        progressRing.style.stroke = '#ef4444'; // Rouge
        countdownNumber.style.color = '#ef4444';
    } else if (countdown <= 10) {
        progressRing.style.stroke = '#f59e0b'; // Orange
        countdownNumber.style.color = '#f59e0b';
    }
}

// Gestionnaires IPC
ipcRenderer.on('start-countdown', (event, responseTime, actionType) => {
    startCountdown(responseTime, actionType);
});

// Focus automatique sur le bouton
window.addEventListener('focus', () => {
    respondBtn.focus();
});

// Focus initial
setTimeout(() => {
    respondBtn.focus();
}, 100);