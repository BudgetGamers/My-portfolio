/**
 * Colorblind Toggle Logic
 * Persists greyscale state using localStorage
 */

(function() {
    // 1. Immediate execution to prevent flash of colored content
    const isGrayscale = localStorage.getItem('grayscale') === 'true';
    if (isGrayscale) {
        document.documentElement.classList.add('grayscale');
    }

    // 2. Setup toggle functionality once DOM is ready
    function initToggle() {
        const toggle = document.getElementById('colorblind-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            const active = document.documentElement.classList.toggle('grayscale');
            localStorage.setItem('grayscale', active);
            
            // Optional: Provide haptic feedback or sound if desired, 
            // but keeping it simple as requested.
            console.log(`Grayscale mode: ${active ? 'Enabled' : 'Disabled'}`);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggle);
    } else {
        initToggle();
    }
})();
