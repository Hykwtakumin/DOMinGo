import * as React from "react";
import * as ReactDOM from "react-dom";
import DOMinGoDOM from "./DOMinGoDOM";
import {Prompt} from "./Prompt";

const addPrompt = () => {
    //プロンプトを追加する
    if (window.document.getElementById("DOMinGoPrompt") === null) {
        const prompt = document.createElement('DOMinGoPrompt');
        prompt.id = "DOMinGoPrompt";
        prompt.className = "DOMinGoPrompt";
        window.document.body.appendChild(prompt);
        ReactDOM.render(<Prompt/>, prompt);
    } else {
        console.log("DOMinGoPrompt is already add!");
    }
};

export default addPrompt;