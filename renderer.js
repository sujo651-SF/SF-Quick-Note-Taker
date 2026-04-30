window.addEventListener('DOMContentLoaded', async () => {
    const textarea = document.getElementById('note');
    const saveBtn = document.getElementById('save');
    const saveAsBtn = document.getElementById('save-as');
    //saveAsBtn.style.color = 'red';

    const savedNote = await window.electronAPI.loadNote();
    textarea.value = savedNote;

    saveAsBtn.addEventListener('click', async () => {
        const result = await window.electronAPI.saveAs(textarea.value);
        if (result.success) {
            lastSavedText = textarea.value; // Update last saved text
            statusEl.textContent = `Saved as ${result.filePath}`;
        } else {
            statusEl.textContent = `Save As cancelled.`;
        }
    });

    // Manual save
    saveBtn.addEventListener('click', async () => {
        try {
            await window.electronAPI.saveNote(textarea.value);
            alert('Note saved successfully!');
        } catch (err) {
            console.error('Manual save failed:', err);
        }
    });


    const saveNote = await window.electronAPI.loadNote();
    textarea.value = saveNote;
    let lastSavedText = textarea.value;

    async function autosave() {
        const currentText = textarea.value;
        if (currentText === lastSavedText) {
            statusEl.textContent = "No change to save";
            return;
        }
        try {
            await window.electronAPI.saveNote(currentText);
            lastSavedText = currentText;
            const now = new Date().toLocaleTimeString();
            statusEl.textContent = `Auto-saved at ${now}`;
        } catch (err) {
            console.error(`Auto-save failed:`, err);
            statusEl.textContent = `Auto-save error!`;
        }
    }

    let debounceTimer;

    textarea.addEventListner('input', () => {
        statusEl.textContent = 'Changes detected - auto-saving in 5s...';
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(autoSave, 5000);
    });

});


//Menu Options

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
