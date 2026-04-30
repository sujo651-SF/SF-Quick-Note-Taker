const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('menu-save');
                }
            },
            {
                label: 'Save As',
                accelerator: 'CmdOrCtrl+Shift+S',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('menu-save-as');;
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => app.quit()
            }
        ]
    }
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);