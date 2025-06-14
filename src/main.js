import { app, BrowserWindow, Tray, Menu, ipcMain, dialog, shell } from 'electron';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import notifier from 'node-notifier';
import fs from 'fs';

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

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

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

  checkWindow.loadFile(path.join(__dirname, 'check.html'));

  checkWindow.on('closed', () => {
    checkWindow = null;
  });
}

function createTray() {
  try {
    const iconPath = path.join(__dirname, '../assets/tray-icon.png');
    
    // Vérifier si le fichier existe avant de créer le tray
    if (!fs.existsSync(iconPath)) {
      console.log('Icône tray non trouvée, création d\'une icône par défaut...');
      // Utiliser une icône par défaut ou créer le tray sans icône
      tray = new Tray(path.join(__dirname, '../assets/icon.png'));
    } else {
      tray = new Tray(iconPath);
    }

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
  } catch (error) {
    console.error('Erreur lors de la création du tray:', error);
    // Continuer sans tray si erreur
  }
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
    try {
      notifier.notify({
        title: 'NightMod',
        message: 'Surveillance démarrée',
        sound: true
      });
    } catch (error) {
      console.log('Notification non disponible:', error.message);
    }
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
    try {
      notifier.notify({
        title: 'NightMod',
        message: 'Surveillance arrêtée',
        sound: true
      });
    } catch (error) {
      console.log('Notification non disponible:', error.message);
    }
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
    checkWindow.webContents.once('did-finish-load', () => {
      checkWindow.webContents.send('start-countdown', config.responseTime, config.action);
    });
  }

  if (config.soundEnabled) {
    try {
      notifier.notify({
        title: 'NightMod',
        message: 'Êtes-vous éveillé ?',
        sound: true
      });
    } catch (error) {
      console.log('Notification non disponible:', error.message);
    }
  }
}

function executeAction() {
  let command = '';
  
  switch (config.action) {
    case 'shutdown':
      command = 'shutdown /s /t 0';
      break;
    case 'suspend':
      command = 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0';
      break;
    case 'lock':
      command = 'rundll32.exe user32.dll,LockWorkStation';
      break;
    case 'hibernate':
      command = 'shutdown /h';
      break;
  }

  if (command) {
    exec(command, (error) => {
      if (error) {
        console.error('Erreur lors de l\'exécution de l\'action:', error);
        if (mainWindow) {
          dialog.showErrorBox('Erreur', `Impossible d'exécuter l'action: ${error.message}`);
        }
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

  // Afficher la fenêtre principale au démarrage pour les tests
  if (mainWindow) {
    mainWindow.show();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Sur Windows, quitter l'application quand toutes les fenêtres sont fermées
  // sauf si l'option minimiser dans la barre des tâches est activée
  if (!config.minimizeToTray) {
    app.quit();
  }
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