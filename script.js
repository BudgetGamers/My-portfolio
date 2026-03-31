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
                copyBtn.innerHTML = '<span style="color: #10b981; font-size: 0.7rem; font-weight:800;">COPIED!</span>';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalIconHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }

    // Add a subtle entrance animation delay for children
    const links = document.querySelectorAll('.link-item');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        link.style.transition = 'all 0.4s ease-out';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});
