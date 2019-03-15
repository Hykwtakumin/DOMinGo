import chromep from 'chrome-promise';

declare var require: any;
const getSelector = require('get-selector');
import {addPanel} from "./libs/addPanel";
import {removePanel} from "./libs/removePanel";

let removeList: Array<string> = [];
let prevDOM: HTMLElement;
let lastExecTime: number;

let controlPanel: HTMLElement;
let hideButton: HTMLElement;

/*TODO: disable Redu button when list is empty*/
const redo = () => {
    const lastDOMSelector = removeList[removeList.length - 1];
    const lastDOM = document.querySelector(lastDOMSelector);
};

const removeAndStore = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const dom = event.srcElement;
    const selector = getSelector(dom);
    removeList.push(selector);
    console.log(`selector : ${selector}`);
    dom.classList.add("domingo-hidden");
    console.dir(removeList);
    window.localStorage.setItem("removeList", JSON.stringify(removeList));
    //chromep.storage.local.set({url : {removeList}}).catch(e => console.log(e));
};

const startDOMManipulation = () => {
    //addPrompt();
    controlPanel = addPanel();
    hideButton = document.getElementById("hideButton");

    if (controlPanel && hideButton) {
        window.document.addEventListener('mousemove', handleMouseMoving, false);
        // window.document.addEventListener('mousedown', handelMouseDown, false);
        // window.document.addEventListener('mouseup', handleMouseUp, false);
        window.document.addEventListener('click', handleMouseClick);
        hideButton.addEventListener('click', handleHideButton);
    }
};

const stopDOMManipulation = () => {
    //removePrompt();
    removePanel();
    window.document.removeEventListener('mousemove', handleMouseMoving);
    // window.document.removeEventListener('mousedown', handelMouseDown);
    // window.document.removeEventListener('mouseup', handleMouseUp);
    if (prevDOM) {
        prevDOM.classList.remove('domingo-overlay');
    }
    window.document.removeEventListener('click', handleMouseClick);
    //removeHighlight();
};

const hideAllElement = () => {
    removeList.forEach(item => {
        try {
            const removeDOM = document.querySelector(item);
            removeDOM.classList.add("domingo-hidden");
        } catch (e) {
            console.log(e);
        }
    });
};

function handleHideButton(event: MouseEvent) {
    hideAllElement();
}

function handleMouseClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const srcElement = event.srcElement as HTMLElement;

    if (!srcElement.classList.contains('domingo-control-panel') &&
        !srcElement.classList.contains('domingo-action-button') &&
        !srcElement.classList.contains('domingo-sub-control-panel') &&
        !srcElement.classList.contains('domingo-control-button')
    ) {
        const selector = getSelector(srcElement);
        console.log(selector);
        const classList = srcElement.classList;
        console.dir(classList);
        if (removeList.includes(selector)) {
            /*if exists already, cancel*/
            removeList = removeList.filter(item => {
                return item !== selector
            });
            srcElement.classList.remove('domingo-hide-book');
        } else {
            removeList.push(selector);
            srcElement.classList.add('domingo-hide-book');
        }
    }
}

function handleMouseMoving(event: MouseEvent) {
    const srcElement = event.srcElement as HTMLElement;
    if (!srcElement.classList.contains('domingo-control-panel') &&
        !srcElement.classList.contains('domingo-action-button') &&
        !srcElement.classList.contains('domingo-sub-control-panel') &&
        !srcElement.classList.contains('domingo-control-button')
    ) {
        if (prevDOM) {
            prevDOM.classList.remove('domingo-overlay');
        }
        srcElement.classList.add('domingo-overlay');
        prevDOM = srcElement;
    }
}

chrome.storage.onChanged.addListener((details) => {
    if (details.mode.newValue === true) {
        startDOMManipulation();
    } else if (details.mode.newValue === false) {
        stopDOMManipulation();
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
                removeDOM.classList.add("domingo-hidden");
            } catch (e) {
                console.log(e);
            }
        });
    }
};