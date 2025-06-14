const { ipcRenderer } = require('electron');

let isMonitoring = false;
let nextCheckTime = null;
let countdownInterval = null;

// Éléments DOM
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const statusDot = statusIndicator.querySelector('.status-dot');
const nextCheck = document.getElementById('nextCheck');
const timeDisplay = document.getElementById('timeDisplay');
const toggleBtn = document.getElementById('toggleBtn');

// Boutons de la barre de titre
const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');

// Éléments de configuration
const intervalSelect = document.getElementById('interval');
const responseTimeSelect = document.getElementById('responseTime');
const actionSelect = document.getElementById('action');
const soundEnabledCheck = document.getElementById('soundEnabled');
const autoStartCheck = document.getElementById('autoStart');
const minimizeToTrayCheck = document.getElementById('minimizeToTray');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    loadStatus();
    setupEventListeners();
});

function setupEventListeners() {
    // Bouton principal
    toggleBtn.addEventListener('click', () => {
        if (isMonitoring) {
            ipcRenderer.send('stop-monitoring');
        } else {
            saveConfig();
            ipcRenderer.send('start-monitoring');
        }
    });

    // Boutons de la barre de titre
    minimizeBtn.addEventListener('click', () => {
        ipcRenderer.send('minimize-window');
    });

    closeBtn.addEventListener('click', () => {
        ipcRenderer.send('close-window');
    });

    // Sauvegarder la config quand elle change
    [intervalSelect, responseTimeSelect, actionSelect, soundEnabledCheck, autoStartCheck, minimizeToTrayCheck].forEach(element => {
        element.addEventListener('change', saveConfig);
    });

    // Raccourcis clavier
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            ipcRenderer.send('minimize-window');
        }
        
        if (event.ctrlKey && event.key === 'q') {
            ipcRenderer.send('close-window');
        }

        if (event.key === ' ' && event.target === document.body) {
            event.preventDefault();
            toggleBtn.click();
        }
    });
}

function loadConfig() {
    ipcRenderer.send('get-config');
}

function loadStatus() {
    ipcRenderer.send('get-status');
}

function saveConfig() {
    const config = {
        interval: parseInt(intervalSelect.value),
        responseTime: parseInt(responseTimeSelect.value),
        action: actionSelect.value,
        soundEnabled: soundEnabledCheck.checked,
        autoStart: autoStartCheck.checked,
        minimizeToTray: minimizeToTrayCheck.checked
    };

    ipcRenderer.send('update-config', config);
}

function updateUI() {
    if (isMonitoring) {
        statusText.textContent = 'Surveillance active';
        statusDot.classList.add('active');
        toggleBtn.textContent = 'Arrêter surveillance';
        toggleBtn.className = 'btn btn-danger';
        nextCheck.style.display = 'block';
    } else {
        statusText.textContent = 'Surveillance inactive';
        statusDot.classList.remove('active');
        toggleBtn.textContent = 'Démarrer surveillance';
        toggleBtn.className = 'btn btn-primary';
        nextCheck.style.display = 'none';
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }
}

function startCountdown(minutes) {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    nextCheckTime = Date.now() + (minutes * 60 * 1000);
    
    countdownInterval = setInterval(() => {
        const remaining = nextCheckTime - Date.now();
        
        if (remaining <= 0) {
            timeDisplay.textContent = 'Vérification en cours...';
            clearInterval(countdownInterval);
            countdownInterval = null;
            return;
        }

        const totalMinutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        if (totalMinutes > 0) {
            timeDisplay.textContent = `${totalMinutes}min ${seconds}s`;
        } else {
            timeDisplay.textContent = `${seconds}s`;
        }
    }, 1000);
}

// Gestionnaires IPC
ipcRenderer.on('config-data', (event, config) => {
    intervalSelect.value = config.interval;
    responseTimeSelect.value = config.responseTime;
    actionSelect.value = config.action;
    soundEnabledCheck.checked = config.soundEnabled;
    autoStartCheck.checked = config.autoStart;
    minimizeToTrayCheck.checked = config.minimizeToTray;
});

ipcRenderer.on('status-data', (event, status) => {
    isMonitoring = status.isMonitoring;
    updateUI();
});

ipcRenderer.on('monitoring-started', () => {
    isMonitoring = true;
    updateUI();
});

ipcRenderer.on('monitoring-stopped', () => {
    isMonitoring = false;
    updateUI();
});

ipcRenderer.on('next-check-scheduled', (event, minutes) => {
    startCountdown(minutes);
});