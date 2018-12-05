import * as React from "react";
import * as ReactDOM from "react-dom";
import DOMinGoDOM from "../components/DOMinGoDOM";

const addPrompt = () => {
    //プロンプトを追加する
    if (window.document.getElementById("DOMinGoPrompt") === null) {
        const prompt = document.createElement('DOMinGoPrompt');
        prompt.id = "DOMinGoPrompt";
        prompt.className = "DOMinGoPrompt";
        window.document.body.appendChild(prompt);
        ReactDOM.render(<DOMinGoDOM defaultState={{count: 114514}}/>, prompt);
    } else {
        console.log("DOMinGoPrompt is already add!");
    }
    //次にカーソル当てたときのアレを追加する
    if (window.document.getElementsByClassName("DOMinGoDOM") === null) {
        //
    } else {
        console.log("DOMinGoDOM is already add!");
    }
};

export default addPrompt;