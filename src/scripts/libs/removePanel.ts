export const removePanel = () => {
    const controlPanel = document.getElementById("domingo-control-panel");
    if (controlPanel) {
        controlPanel.remove();
    }
};