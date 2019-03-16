/*defaultActionList*/

import {DOMinGoAction} from "./DOMinGOTypes";

export const domingoHide: DOMinGoAction = {
    name: "domingoHide",
    desc: "非表示にする",
    class: "domingo-hidden",
    style: ".domingo-hidden { display: none !important; }"
};

export const domingoEnlarge: DOMinGoAction = {
    name: "domingoEnlarge",
    desc: "文字を大きくする",
    class: "domingo-enlarge",
    style: ".domingo-bold { font-weight: bold !important; }"
};

export const domingoBold: DOMinGoAction = {
    name: "domingoBold",
    desc: "文字を太くする",
    class: "domingo-bold",
    style: ".domingo-bold { font-weight: bold !important; }"
};

export const domingoWidenLine: DOMinGoAction = {
    name: "domingoWidenLine",
    desc: "行間を広げる",
    class: "domingo-widen-line",
    style: ".domingo-widen-line { line-height: 120% !important; }"
};

export const domingoChangeBGColor: DOMinGoAction = {
    name: "domingoChangeBGColor",
    desc: "背景色を変更する",
    class: "domingo-change-bg-color",
    style: ".domingo-change-bg-color { background-color: #FFFFFF !important; }"
};
