import chromep from 'chrome-promise';
import reloadExtension from './libs/reloadExtension';

chrome.runtime.onInstalled.addListener(async (details) => {
    chrome.browserAction.enable();
});

chrome.runtime.onUpdateAvailable.addListener(async (details) => {
    reloadExtension();
});