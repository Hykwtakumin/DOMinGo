import chromep from 'chrome-promise';
import {ActionPair} from "./DOMinGOTypes";

/*get reservedDOM from chromeStorage*/
export function getReservedDOM(): string[] {
    let localReserevedList: string[] = [];
    chrome.storage.local.get("reservedList", (item) => {
        if (item) {
            localReserevedList = item as string[];
        }
    });
    return localReserevedList;
}

/*set reservedDOM to chromeStorage*/
export const setReservedDOM = (domList: string[]) => {
    chromep.storage.local.set({reservedList: domList});
};

/*set actionPairList to chromeStorage*/
export const setActionPairList = (pairList: ActionPair[]) => {
    chromep.storage.local.set({actionPairList: pairList});
};