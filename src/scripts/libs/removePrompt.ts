const removePrompt = () => {
    const prompt = window.document.getElementById("DOMinGoPrompt");
    if (prompt != null) {
        prompt.remove();
    }
};

export default removePrompt;