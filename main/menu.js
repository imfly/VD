let BrowserWindow = require('browser-window');
let Menu = require('menu');

/**
 * Creates a default menu. Augmented with the roles from https://github.com/atom/electron/blob/master/docs/api/menu.md.
 */
let createDefaultMenu = function(app, getMainWindow, checkForUpdates) {

    let template = [{
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }, {
            type: 'separator'
        }, {
            label: 'Settings',
            accelerator: 'CmdOrCtrl+',
            click: function() {
                global.settings.init();
            }
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.reload();
            }
        }, {
            label: 'Toggle Full Screen',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Ctrl+Command+F';
                else
                    return 'F11';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Alt+Command+I';
                else
                    return 'Ctrl+Shift+I';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.toggleDevTools();
            }
        }]
    }, {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }]
    }, {
        label: 'Help',
        submenu: [{
            label: 'About ' + app.getName(),
            role: 'about'
        }, {
            label: 'Home',
            accelerator: 'CmdOrCtrl+H',
            click: function(item, focusedWindow) {
                window.open('#/home');
            }
        }, {
            label: 'Login',
            accelerator: 'CmdOrCtrl+L',
            role: 'close'
        }]
    }];

    if (process.platform == 'darwin') {
        var name = app.getName();
        template.unshift({
            label: name,
            submenu: [{
                label: 'About ' + name,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Hide ' + name,
                accelerator: 'Command+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => {
                    require('app').quit()
                }
            }, ]
        });
        // Window menu.
        template[3].submenu.push({
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            role: 'front'
        });
    }

    if (checkForUpdates) {
        // Add 'Check for Updates' below the 'About' menu item.
        template[3].submenu.splice(1, 0, {
            label: 'Check for Updates',
            click: checkForUpdates
        });
    }

    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

module.exports = createDefaultMenu;