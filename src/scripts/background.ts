import chromep from 'chrome-promise';
import reloadExtension from './libs/reloadExtension';
import notifiCate from "./libs/notifiCate";

let isEliminationMode: boolean = false;

chrome.runtime.onInstalled.addListener(async (details) => {
    //await notifiCate("拡張機能がインストールされました!").catch((error) => {console.log(error)});
    chrome.browserAction.enable();
    //モードの初期値を設定
    await chromep.storage.local.set({mode: false}).catch(e => console.log(e));
    await stopElimination();
});

chrome.runtime.onUpdateAvailable.addListener(async (details) => {
    reloadExtension();
});

const startElimination = async () => {
    await chromep.storage.local.set({mode: true}).catch(e => console.log(e));
    chrome.browserAction.setBadgeText({text: "ON"});
};

const stopElimination = async () => {
    await chromep.storage.local.set({mode: false}).catch(e => console.log(e));
    chrome.browserAction.setBadgeText({text: "OFF"});
};

//拡張機能のボタンを押すとDOM削除モードに移行する
chrome.browserAction.onClicked.addListener(tab => {
    if (chrome.runtime.lastError && chrome.runtime.lastError.message.match(/cannot be scripted/)) {
        window.alert('It is not allowed to use Gyaon extension in this page.');
        chrome.browserAction.disable();
        reloadExtension();
    }

    if (isEliminationMode != true) {
        startElimination();
    } else {
        stopElimination();
    }
    //真偽値を入れ替える
    isEliminationMode = !isEliminationMode;
});