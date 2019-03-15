export const addPanel = (): HTMLElement => {
    const panel = document.createElement('div');
    panel.id = "domingo-control-panel";
    panel.classList.add('domingo-control-panel');

    const subPanel = document.createElement('div');
    subPanel.id = "domingo-sub-control-panel";
    subPanel.classList.add('domingo-sub-control-panel');

    const hideButton = document.createElement('button');
    const enlargeButton = document.createElement('button');
    const boldButton = document.createElement('button');
    const widerButton = document.createElement('button');
    const colorButton = document.createElement("button");

    hideButton.id = "hideButton";
    hideButton.classList.add('domingo-action-button');
    hideButton.innerText = "非表示にする";

    enlargeButton.id = "enlargeButton";
    enlargeButton.classList.add('domingo-action-button');
    enlargeButton.innerText = "文字を大きくする";

    boldButton.id = "boldButton";
    boldButton.classList.add('domingo-action-button');
    boldButton.innerText = "文字を太くする";

    widerButton.id = "widerButton";
    widerButton.classList.add('domingo-action-button');
    widerButton.innerText = "行間を広げる";

    colorButton.id = "colorButton";
    colorButton.classList.add('domingo-action-button');
    colorButton.innerText = "背景色を変更する";


    const redoButton = document.createElement('button');
    const importButton = document.createElement('button');
    const exportButton = document.createElement('button');
    const settingButton = document.createElement('button');

    redoButton.id = "redoButton";
    redoButton.classList.add('domingo-control-button');
    redoButton.innerText = "戻す";

    importButton.id = "importButton";
    importButton.classList.add('domingo-control-button');
    importButton.innerText = "⇩導入";

    exportButton.id = "exportButton";
    exportButton.classList.add('domingo-control-button');
    exportButton.innerText = " ⇧共有";

    settingButton.id = "settingButton";
    settingButton.classList.add('domingo-control-button');
    settingButton.innerText = "設定";

    subPanel.appendChild(redoButton);
    subPanel.appendChild(importButton);
    subPanel.appendChild(exportButton);
    subPanel.appendChild(settingButton);


    
    panel.appendChild(hideButton);
    panel.appendChild(enlargeButton);
    panel.appendChild(boldButton);
    panel.appendChild(widerButton);
    panel.appendChild(colorButton);
    panel.appendChild(subPanel);

    window.document.body.appendChild(panel);
    return panel;
};