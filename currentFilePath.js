saveAsBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.saveAs(textarea.value);
    if (result.success) {
        lastSavedText = textarea.value;
        currentFilePath = result.filepath; //New - remember this path
        statusEl.textContent = `Saved to: ${result.filePath}`;
    } else {
        statusEl.textContent = `Save As cancelled.`;
    }
});