//拡張機能自体をリロードするスクリプト
function reloadExtension() {
    console.log(`Extension will be reload`);
    chrome.runtime.reload();
}

export default reloadExtension