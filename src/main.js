import { app, BrowserWindow, Tray, Menu, ipcMain, dialog, shell } from 'electron';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import notifier from 'node-notifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
let checkWindow = null;
let tray = null;
let isMonitoring = false;
let checkInterval = null;
let checkTimeout = null;

// Configuration par défaut
let config = {
  interval: 20, // minutes
  responseTime: 30, // secondes
  action: 'shutdown', // shutdown, suspend, lock
  soundEnabled: true,
  autoStart: false,
  minimizeToTray: true
};

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    title: 'NightMod',
    resizable: false,
    show: false
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.once('ready-to-show', () => {
    if (!config.minimizeToTray) {
      mainWindow.show();
    }
  });

  mainWindow.on('close', (event) => {
    if (config.minimizeToTray) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createCheckWindow() {
  checkWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    alwaysOnTop: true,
    center: true,
    resizable: false,
    skipTaskbar: true,
    title: 'NightMod - Vérification'
  });

  checkWindow.loadFile('src/check.html');

  checkWindow.on('closed', () => {
    checkWindow = null;
  });
}

function createTray() {
  const iconPath = path.join(__dirname, '../assets/tray-icon.png');
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'NightMod',
      type: 'normal',
      enabled: false
    },
    { type: 'separator' },
    {
      label: isMonitoring ? 'Arrêter surveillance' : 'Démarrer surveillance',
      click: () => {
        if (isMonitoring) {
          stopMonitoring();
        } else {
          startMonitoring();
        }
      }
    },
    {
      label: 'Ouvrir interface',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quitter',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('NightMod - Protection nocturne');

  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function startMonitoring() {
  if (isMonitoring) return;

  isMonitoring = true;
  updateTrayMenu();
  
  if (mainWindow) {
    mainWindow.webContents.send('monitoring-started');
  }

  scheduleNextCheck();
  
  if (config.soundEnabled) {
    notifier.notify({
      title: 'NightMod',
      message: 'Surveillance démarrée',
      sound: true
    });
  }
}

function stopMonitoring() {
  if (!isMonitoring) return;

  isMonitoring = false;
  
  if (checkInterval) {
    clearTimeout(checkInterval);
    checkInterval = null;
  }
  
  if (checkTimeout) {
    clearTimeout(checkTimeout);
    checkTimeout = null;
  }

  if (checkWindow) {
    checkWindow.close();
  }

  updateTrayMenu();
  
  if (mainWindow) {
    mainWindow.webContents.send('monitoring-stopped');
  }

  if (config.soundEnabled) {
    notifier.notify({
      title: 'NightMod',
      message: 'Surveillance arrêtée',
      sound: true
    });
  }
}

function scheduleNextCheck() {
  if (!isMonitoring) return;

  const intervalMs = config.interval * 60 * 1000;
  
  checkInterval = setTimeout(() => {
    performCheck();
  }, intervalMs);

  if (mainWindow) {
    mainWindow.webContents.send('next-check-scheduled', config.interval);
  }
}

function performCheck() {
  if (!isMonitoring) return;

  createCheckWindow();
  
  const responseTimeMs = config.responseTime * 1000;
  
  checkTimeout = setTimeout(() => {
    if (checkWindow) {
      checkWindow.close();
    }
    executeAction();
  }, responseTimeMs);

  if (checkWindow) {
    checkWindow.webContents.send('start-countdown', config.responseTime, config.action);
  }

  if (config.soundEnabled) {
    notifier.notify({
      title: 'NightMod',
      message: 'Êtes-vous éveillé ?',
      sound: true
    });
  }
}

function executeAction() {
  let command = '';
  
  switch (config.action) {
    case 'shutdown':
      command = 'shutdown -h now';
      break;
    case 'suspend':
      command = 'systemctl suspend';
      break;
    case 'lock':
      command = 'loginctl lock-session';
      break;
  }

  if (command) {
    exec(command, (error) => {
      if (error) {
        console.error('Erreur lors de l\'exécution de l\'action:', error);
        dialog.showErrorBox('Erreur', `Impossible d'exécuter l'action: ${error.message}`);
      }
    });
  }
}

function updateTrayMenu() {
  if (!tray) return;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'NightMod',
      type: 'normal',
      enabled: false
    },
    { type: 'separator' },
    {
      label: isMonitoring ? '● Surveillance active' : '○ Surveillance inactive',
      enabled: false
    },
    {
      label: isMonitoring ? 'Arrêter surveillance' : 'Démarrer surveillance',
      click: () => {
        if (isMonitoring) {
          stopMonitoring();
        } else {
          startMonitoring();
        }
      }
    },
    {
      label: 'Ouvrir interface',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quitter',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
}

// Gestionnaires IPC
ipcMain.on('start-monitoring', () => {
  startMonitoring();
});

ipcMain.on('stop-monitoring', () => {
  stopMonitoring();
});

ipcMain.on('user-responded', () => {
  if (checkTimeout) {
    clearTimeout(checkTimeout);
    checkTimeout = null;
  }
  
  if (checkWindow) {
    checkWindow.close();
  }

  // Programmer la prochaine vérification
  scheduleNextCheck();
});

ipcMain.on('update-config', (event, newConfig) => {
  config = { ...config, ...newConfig };
  
  // Redémarrer la surveillance si elle était active
  if (isMonitoring) {
    stopMonitoring();
    startMonitoring();
  }
});

ipcMain.on('get-config', (event) => {
  event.reply('config-data', config);
});

ipcMain.on('get-status', (event) => {
  event.reply('status-data', { isMonitoring });
});

// Événements de l'application
app.whenReady().then(() => {
  createMainWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Ne pas quitter sur Linux quand toutes les fenêtres sont fermées
  // L'app continue à tourner dans le tray
});

app.on('before-quit', () => {
  stopMonitoring();
});

// Empêcher plusieurs instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}