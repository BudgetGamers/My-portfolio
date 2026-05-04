document.addEventListener('DOMContentLoaded', () => {
    // Steam Code Copy Functionality
    const copyBtn = document.getElementById('copy-btn');
    const steamCode = document.getElementById('steam-code');

    if (copyBtn && steamCode) {
        copyBtn.addEventListener('click', async () => {
            const originalIconHtml = copyBtn.innerHTML;
            const code = steamCode.innerText;

            try {
                await navigator.clipboard.writeText(code);
                
                // Visual Feedback
                copyBtn.innerHTML = '<span style="color: #10b981; font-size: 0.7rem; font-weight:800; white-space:nowrap;">COPIED!</span>';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalIconHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }

});
