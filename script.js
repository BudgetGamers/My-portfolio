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

    // Subtle entrance animation for Nav and Buttons
    const animatedElements = document.querySelectorAll('.nav-link, .btn, .stat-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
});
