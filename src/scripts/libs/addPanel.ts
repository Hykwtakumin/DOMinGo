import {domingoBold, domingoChangeBGColor, domingoEnlarge, domingoHide, domingoWidenLine} from "./defaultActionList";
import {ActionPair, DOMinGoAction} from "./DOMinGOTypes";
import {getReservedDOM, setReservedDOM} from "./DOMinGoStorage";
import chromep from "chrome-promise";
import {applyAction, clearReservedListAndSetActionPair, setActionPair} from "../content";
import {act} from "react-dom/test-utils";


export const addPanel = (): HTMLElement => {
    const panel = document.createElement('div');
    panel.id = "domingo-control-panel";
    panel.classList.add('domingo-control-panel', 'domingo-dom');

    const subPanel = document.createElement('div');
    subPanel.id = "domingo-sub-control-panel";
    subPanel.classList.add('domingo-sub-control-panel', 'domingo-dom');


    /*generate Action-buttons from local action list*/
    /*also generate EventListener*/
    const defaultActions: DOMinGoAction[] = [domingoHide, domingoEnlarge, domingoBold, domingoWidenLine, domingoChangeBGColor];

    const generateActionButton = (actions: DOMinGoAction[]) => {
        actions.forEach((action: DOMinGoAction) => {
            /*generate button*/
            const button = document.createElement('div');
            button.id = action.name;
            button.innerText = action.desc;
            button.classList.add("domingo-action-button", "domingo-dom");
            /*add EventListener*/
            button.addEventListener('click', async () => {
                /*get reservedList*/
                const localReservedList = await chromep.storage.local.get("reservedList");
                const localPairList = await chromep.storage.local.get("actionPairList");
                if (Object.keys(localReservedList).includes("reservedList") &&
                    Object.keys(localPairList).includes("actionPairList")
                ) {
                    const reservedList = Object.values(localReservedList) as string[];
                    const pairList = Object.values(localPairList) as ActionPair[];
                    console.log(`reservedList length: ${reservedList.length}`);
                    if (reservedList) {
                        reservedList.forEach(target => {
                            console.log(`target: ${target}`);
                            applyAction(target, action);
                            setActionPair(target, action);
                        });
                    } else {
                        console.log("cannot access to local List");
                    }
                }
            });
            /*append to Prompt*/
            panel.appendChild(button);
        });
    };

    generateActionButton(defaultActions);


    const redoButton = document.createElement('button');
    const importButton = document.createElement('button');
    const exportButton = document.createElement('button');
    const settingButton = document.createElement('button');

    redoButton.id = "redoButton";
    redoButton.classList.add('domingo-control-button', 'domingo-dom');
    redoButton.innerText = "戻す";

    importButton.id = "importButton";
    importButton.classList.add('domingo-control-button', 'domingo-dom');
    importButton.innerText = "⇩導入";
    importButton.addEventListener('click', () => {
        /*Open Dialog*/
        /*Search ScrapBox for this site's hostname*/
        /*If style detected, render Import Button in dialog*/
        /*Button Clicked, import style to local and close dialog*/
        /*If style didnt detected, render alter message*/
    });

    exportButton.id = "exportButton";
    exportButton.classList.add('domingo-control-button', 'domingo-dom');
    exportButton.innerText = "⇧共有";
    exportButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({tag: "exportStyle", body: ""});
        /*Open Dialog*/
        /*Edit Description (this will be page title!)*/
        /*Upload Button Clicked, upload as normal CustomTheme */
        /*Secret upload button clicked, upload as anonymous CustomTheme*/
    });

    settingButton.id = "settingButton";
    settingButton.classList.add('domingo-control-button', 'domingo-dom');
    settingButton.innerText = "設定";

    subPanel.appendChild(redoButton);
    subPanel.appendChild(importButton);
    subPanel.appendChild(exportButton);
    subPanel.appendChild(settingButton);

    panel.appendChild(subPanel);

    window.document.body.appendChild(panel);
    return panel;
};