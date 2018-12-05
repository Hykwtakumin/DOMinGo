import chromep from 'chrome-promise';
import addPrompt from "./libs/addPrompt";
import removePrompt from "./libs/removePrompt";


const getSelector = (event: MouseEvent) => {
    console.log("mouseDown!");
    const mouseElm = document.elementFromPoint(event.clientX, event.clientY);
    console.dir(mouseElm);
};

const startElimination = () => {
    console.log("モード:ON");
    addPrompt();
    window.document.addEventListener('mousedown', getSelector)
};

const stopElimination = () => {
    console.log("モード:OFF");
    removePrompt();
    window.document.removeEventListener('mousedown', getSelector)
};

chrome.storage.onChanged.addListener((details) => {
    if (details.mode.newValue === true) {
        startElimination();
    } else if (details.mode.newValue === false) {
        stopElimination();
    }
});

window.onload = () => {
    console.log("this is Content Script");
};