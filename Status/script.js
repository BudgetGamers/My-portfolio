async function updateStatus() {
    const display = document.getElementById('server-display');
    try {
        // Resolve path relative to the current script location to avoid trailing slash issues on GitHub
        const statusPath = new URL('../status.json', window.location.href).pathname;
        const response = await fetch(statusPath + '?t=' + new Date().getTime());

        if (!response.ok) throw new Error("File not found");

        const rawData = await response.json();
        const data = Array.isArray(rawData) ? rawData[0] : rawData;
        const instances = data.AvailableInstances;

        display.innerHTML = '';

        instances.forEach(server => {
            if (server.InstanceName === 'ADS01') return;

            let statusText, statusClass;
            const state = Number(server.AppState);

            if (state === 20 || state === 50) {
                statusText = "Online";
                statusClass = "status-online";
            } else if (state === 10 || state === 30) {
                statusText = "Starting";
                statusClass = "status-starting";
            } else {
                statusText = "Offline";
                statusClass = "status-offline";
            }

            // PULLING THE PORT: Splits "0.0.0.0:PORT" and takes the end
            const endpoint = server.ApplicationEndpoints?.[0]?.Endpoint || "";
            const port = endpoint.split(':').pop() || "25565";
            const ipAddress = `25.32.195.216:${port}`;

            const players = server.Metrics?.["Active Users"]?.RawValue ?? 0;
            const maxPlayers = server.Metrics?.["Active Users"]?.MaxValue ?? 0;
            const description = server.Description ? `<p>${server.Description}</p>` : '';

            display.innerHTML += `
                <div class="server-card">
                    <div class="card-header">
                        <h3>${server.FriendlyName}</h3>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div class="server-info">
                        ${description}
                        <p><b>Game:</b> ${server.ModuleDisplayName || server.Module}</p>
                        <p><b>Players:</b> ${players} / ${maxPlayers}</p>
                        <div class="ip-container">
                            <span class="ip-text">${ipAddress}</span>
                            <button class="copy-btn" data-copy="${ipAddress}" title="Copy IP">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>`;
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        display.innerHTML = "<p>Status currently unavailable.</p>";
    }
}

// Event Delegation for Copy Buttons
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const textToCopy = btn.getAttribute('data-copy');
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span style="color: #10b981; font-size: 0.65rem; font-weight: 800; white-space: nowrap;">COPIED!</span>';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});

updateStatus();