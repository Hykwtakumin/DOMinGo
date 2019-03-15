export const removePanel = () => {
    const controlPanel = document.getElementById("domingo-control-panel");
    if (controlPanel) {
        controlPanel.remove();
    }

    // const overLay = Array.of(document.querySelectorAll("domingo-overlay"));
    // overLay.forEach(item => {
    //     item.remove();
    // });
    //
    // const hideBook = Array.of(document.querySelectorAll("domingo-hide-book"));
    // hideBook.forEach(item => {
    //     item.remove();
    // })

};