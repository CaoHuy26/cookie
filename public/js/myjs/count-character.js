window.onload = () => {
    const textArea = document.getElementById('content');
    textArea.addEventListener('input', (event) => {
        const contentLength = textArea.value.length;
        const remainCharacters = document.getElementById('remain-characters');
        remainCharacters.innerText = `Còn ${80 - contentLength} ký tự`;
        
        if (contentLength <= 0) {
           // Doing
        }
    });
};