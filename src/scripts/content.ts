import chromep from 'chrome-promise';

declare var require: any;
const getSelector = require('get-selector');
import addPrompt from "./libs/addPrompt";
import removePrompt from "./libs/removePrompt";

const removeList: Array<string> = [];

const mouseElm = (event: MouseEvent): Element => {
    return window.document.elementFromPoint(event.clientX, event.clientY);
};

const removeAndStore = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const dom = mouseElm(event);
    const url = window.location;
    const selector = getSelector(dom);
    removeList.push(selector);
    console.log(`selector : ${selector}`);
    dom.remove();
    console.dir(removeList);
    window.localStorage.setItem("removeList", JSON.stringify(removeList));
    //chromep.storage.local.set({url : {removeList}}).catch(e => console.log(e));
};

const addHighlight = () => {
    //mouseElm(event).classList.add("domingo_target");
    const highLight = window.document.createElement('div');
    highLight.id = "domingo_target";
    highLight.classList.add("domingo_target");
    window.document.body.appendChild(highLight);
};

const removeHighlight = () => {
    const highLight = window.document.getElementById("domingo_target");
    if (highLight != null) {
        highLight.remove();
    }
};

// const mouseMoving = (event: MouseEvent) => {
//     const dom = mouseElm(event);
//     console.dir(dom);
//     const highLight = window.document.getElementById("domingo_target");
//     if (highLight != null) {
//         console.dir(highLight);
//         highLight.style.width = dom.clientWidth.toString();
//         highLight.style.height = dom.clientHeight.toString();
//         highLight.style.left = dom.clientLeft.toString();
//         highLight.style.top = dom.clientTop.toString();
//     } else {
//         console.log("highLight is null");
//     }
// };

const startElimination = () => {
    //addPrompt();
    //addHighlight();
    //document.addEventListener('mousemove', mouseMoving);
    document.addEventListener('click', removeAndStore);
};

const stopElimination = () => {
    //removePrompt();
    //document.removeEventListener('mousemove', mouseMoving);
    document.removeEventListener('click', removeAndStore);
    //removeHighlight();
};

chrome.storage.onChanged.addListener((details) => {
    if (details.mode.newValue === true) {
        startElimination();
    } else if (details.mode.newValue === false) {
        stopElimination();
    }
});

window.onload = async () => {
    console.log("this is Content Script");

    const mode = await chromep.storage.local.get("mode");
    console.log(`mode : ${mode.mode}`);

    const localList = window.localStorage.getItem("removeList");
    if (localList != undefined && localList.length != 0 && mode.mode === true) {
        const list = JSON.parse(localList);
        list.forEach(item => {
            removeList.push(item);
        });
        console.dir(removeList);
        //DOMを削除していく
        removeList.forEach(item => {
            try {
                const removeDOM = document.querySelector(item);
                removeDOM.remove();
            } catch (e) {
                console.log(e);
            }
        });
    }
};