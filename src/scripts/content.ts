import chromep from "chrome-promise";
import { addPanel } from "./libs/addPanel";
import { removePanel } from "./libs/removePanel";
import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;
import {
  getReservedDOM,
  setActionPairList,
  setReservedDOM
} from "./libs/DOMinGoStorage";
import { ActionPair, CustomTheme, DOMinGoAction } from "./libs/DOMinGOTypes";
import AlarmCreateInfo = chrome.alarms.AlarmCreateInfo;
import local = chrome.storage.local;
import {
  domingoBold,
  domingoChangeBGColor,
  domingoEnlarge,
  domingoHide,
  domingoWidenLine
} from "./libs/defaultActionList";

declare var require: any;
const getSelector = require("get-selector");
const md5 = require("md5");

let removeList: Array<string> = [];
let prevDOM: HTMLElement;
let lastExecTime: number;

let controlPanel: HTMLElement;
let hideButton: HTMLElement;

const reservedList: string[] = [];
const actionPairList: ActionPair[] = [];

/*TODO: disable Redo button when list is empty*/
export const redo = () => {
  const lastDOMSelector = removeList[removeList.length - 1];
  const lastDOM = document.querySelector(lastDOMSelector);
};

const startDOMManipulation = () => {
  controlPanel = addPanel();
  window.document.addEventListener("mousemove", handleMouseMoving, false);
  window.document.addEventListener("click", handleMouseClick);
};

const stopDOMManipulation = () => {
  removePanel();
  window.document.removeEventListener("mousemove", handleMouseMoving);
  if (prevDOM) {
    prevDOM.classList.remove("domingo-overlay");
  }
  window.document.removeEventListener("click", handleMouseClick);
  //removeHighlight();
};

export const applyAction = (targetElm: string, targetAction: DOMinGoAction) => {
  const elms = document.querySelectorAll(targetElm);
  if (elms) {
    elms.forEach((elm: HTMLElement) => {
      elm.classList.add(targetAction.class);
    });
  }
};

export const setActionPair = async (
  targetElm: string,
  targetAction: DOMinGoAction
) => {
  const localPairList = await chromep.storage.local.get("actionPairList");
  const pairList = Object.values(localPairList) as ActionPair[];
  if (pairList) {
    const pair: ActionPair = { target: targetElm, action: targetAction };
    console.dir(pair);
    pairList.push(pair);
    console.dir(pairList);
    setActionPairList(pairList);
  }
};

export const clearReservedListAndSetActionPair = () => {
  if (reservedList && actionPairList) {
    reservedList.length = 0;
    setReservedDOM([]);
    setActionPairList(actionPairList);
  }
};

async function handleMouseClick(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  const srcElement = event.srcElement as HTMLElement;

  if (!srcElement.classList.contains("domingo-dom")) {
    const selector = getSelector(srcElement);
    console.log(selector);

    /*detect macro*/
    const classList = srcElement.classList;
    console.dir(classList);

    if (reservedList.includes(selector)) {
      /*if exists already, cancel*/
      reservedList.splice(reservedList.indexOf(selector), 1);
      srcElement.classList.remove("domingo-hide-book");
      setReservedDOM(reservedList);
      const localList = await chromep.storage.local.get("reservedList");
      console.dir(localList);
    } else {
      reservedList.push(selector);
      srcElement.classList.add("domingo-hide-book");
      setReservedDOM(reservedList);
      const localList = await chromep.storage.local.get("reservedList");
      console.dir(localList);
    }
  }
}

function handleMouseMoving(event: MouseEvent) {
  const srcElement = event.srcElement as HTMLElement;
  if (!srcElement.classList.contains("domingo-dom")) {
    if (prevDOM) {
      prevDOM.classList.remove("domingo-overlay");
    }
    srcElement.classList.add("domingo-overlay");
    prevDOM = srcElement;
  }
}

chrome.storage.onChanged.addListener(details => {
  if (Object.keys(details).includes("mode")) {
    if (details.mode.newValue === true) {
      startDOMManipulation();
    } else if (details.mode.newValue === false) {
      stopDOMManipulation();
    }
  }
});

const anonymousChecker = async (url: string, hash: string) => {
  const anonymousHash = md5(url);
  return anonymousHash === hash;
};

window.onload = async () => {
  console.log("this is Content Script");

  const mode = await chromep.storage.local.get("mode");
  console.log(`mode : ${mode.mode}`);

  /*Check local data*/
  const localReservedList = await chromep.storage.local.get("reservedList");
  const localPairList = await chromep.storage.local.get("actionPairList");
  const localCustomThemeList = await chromep.storage.local.get(
    "customThemeList"
  );

  if (
    Object.keys(localReservedList).includes("reservedList") &&
    Object.keys(localPairList).includes("actionPairList") &&
    Object.keys(localCustomThemeList).includes("customThemeList")
  ) {
    const customThemeList = Object.values(
      localCustomThemeList
    ) as CustomTheme[];
    const pairList = Object.values(localPairList) as ActionPair[];
    const thisPageHash = md5(location.hostname);
    console.log("all OK");

    const defaultActions: DOMinGoAction[] = [
      domingoHide,
      domingoEnlarge,
      domingoBold,
      domingoWidenLine,
      domingoChangeBGColor
    ];
    await chromep.storage.local.set({ actionList: defaultActions });
    const storedActionList = await chromep.storage.local.get("actionList");
    console.dir(storedActionList);

    chrome.runtime.sendMessage({
      tag: "loadStyles",
      body: Object.values(storedActionList)
    });

    if (customThemeList && pairList) {
      customThemeList.forEach(async (theme: CustomTheme) => {
        if (theme.hostName === location.hostname) {
          console.log("CustomTheme for this site detected!");
          // theme.actionPairList.forEach(pair => {
          //     localPairList.push(pair);
          // });
        } else if (theme.isAnonymous) {
          if (await anonymousChecker(theme.hostName, thisPageHash)) {
            console.log("Anonymous CustomTheme for this site detected!");
          }
          // console.log("Anonymous CustomTheme for this site detected!");
          // theme.actionPairList.forEach(pair => {
          //     localPairList.push(pair);
          // });
        }
      });
    }
  } else if (!Object.keys(localReservedList).includes("reservedList")) {
    await chromep.storage.local.set({ reservedList: [] });
  } else if (!Object.keys(localPairList).includes("actionPairList")) {
    await chromep.storage.local.set({ actionPairList: [] });
  } else if (!Object.keys(localCustomThemeList).includes("customThemeList")) {
    await chromep.storage.local.set({ customThemeList: [] });
  } else {
    /*Initialization*/
    console.log("Initializing...");
    await chromep.storage.local.set({ reservedList: [] });
    await chromep.storage.local.set({ actionPairList: [] });
    await chromep.storage.local.set({ customThemeList: [] });
  }

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
