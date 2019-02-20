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
    const selector = getSelector(dom);
    removeList.push(selector);
    console.log(`selector : ${selector}`);
    dom.classList.add("hidden");
    console.dir(removeList);
    window.localStorage.setItem("removeList", JSON.stringify(removeList));
    //chromep.storage.local.set({url : {removeList}}).catch(e => console.log(e));
};

const startElimination = () => {
    addPrompt();
    window.document.addEventListener('mousemove', mouseMoving, false);
    //document.addEventListener('click', removeAndStore);
};

const stopElimination = () => {
    removePrompt();
    window.document.removeEventListener('mousemove', mouseMoving);
    //document.removeEventListener('click', removeAndStore);
    //removeHighlight();
};

let prevDOM: HTMLElement;

function mouseMoving(event: MouseEvent) {
    const srcElement = event.srcElement as HTMLElement;
    if (prevDOM) {
        prevDOM.classList.remove('crx_mouse_visited');
    }
    console.log('classlist add!');
    srcElement.classList.add('crx_mouse_visited');
    prevDOM = srcElement;
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
    if (localList && localList.length != 0 && mode.mode === true) {
        const list = JSON.parse(localList);
        list.forEach(item => {
            removeList.push(item);
        });
        console.dir(removeList);
        //DOMを削除していく
        removeList.forEach(item => {
            try {
                const removeDOM = document.querySelector(item);
                removeDOM.classList.add("hidden");
            } catch (e) {
                console.log(e);
            }
        });
    }
};