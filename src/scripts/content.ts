import chromep from 'chrome-promise';

const startElimination = () => {
    console.log("モード:ON");
};

const stopElimination = () => {
    console.log("モード:OFF");
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