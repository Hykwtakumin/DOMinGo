import * as shortid from "shortid";

export const isDiv = (elem: Element): boolean => {
    return elem.tagName == "DIV"
};

export const isIframe = (elem: Element): boolean => {
    return elem.tagName == "IFRAME"
};

// export function* traverse(elem : HTMLElement) {
//     if (elem.parentElement != undefined) {
//         if (isDiv(elem.parentElement) || isIframe(elem.parentElement)) {
//             yield elem.parentElement
//         } else {
//
//         }
//     } else {
//         yield elem
//     }
// }

//再帰呼び出しで親DOMを辿っていく
export const getParent = async (elem: Element): Promise<Element> => {
    return new Promise<Element>(async (resolve, reject) => {
        if (elem.parentElement != undefined) {
            const parent = elem.parentElement;
            if (isDiv(parent) || isIframe(parent)) {
                resolve(parent);
            } else {
                const grandParent = await getParent(parent);
                resolve(grandParent);
            }
        } else {
            resolve(elem);
        }
    });
};

const storeElmMetaDate = (elem: Element) => {
    //長押ししたDOMのidやclassNameや親DOMを取得して保存する
    const key = shortid.generate();
    const value = JSON.stringify(elem);
    window.localStorage.setItem(key, value);
};

window.onload = () => {
    console.log("This is content scripts");

    let lastExecTime = 0;

    document.addEventListener("mousedown", () => {
        lastExecTime = performance.now();
        // const showAlert = () => {
        //   let elapsedTime = performance.now() - startTime;
        //   alert(`300msec elapsed! : ${elapsedTime}`);
        // };
        // setTimeout(showAlert, 300);
    });

    document.addEventListener("mouseup", async (event) => {
        event.preventDefault();
        const elapsedTime = performance.now() - lastExecTime;
        const mouseElm = document.elementFromPoint(event.clientX, event.clientY);
        if (elapsedTime >= 300) {
            // alert(`elapsedTime : ${elapsedTime}`);
            const parent = await getParent(mouseElm as Element) as HTMLElement;
            console.dir(parent);
            parent.style.backgroundColor = "#ff8e29"
            // storeElmMetaDate(mouseElm as Element);
            // mouseElm.remove();
        }
    });
};