export const addPanel = (): HTMLElement => {
    const panel = document.createElement('div');
    panel.id = "domingo-control-panel";
    panel.classList.add('domingo-control-panel');

    const hideButton = document.createElement('button');
    hideButton.id = "hideButton";
    hideButton.innerText = "選択した要素を非表示にする";
    panel.appendChild(hideButton);

    window.document.body.appendChild(panel);
    return panel;
};