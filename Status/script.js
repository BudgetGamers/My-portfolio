async function updateStatus() {
    const display = document.getElementById('server-display');

    try {
        // '../' is correct because status.json is in the root
        const response = await fetch('../status.json');

        if (!response.ok) {
            throw new Error(`File not found: ${response.status}`);
        }

        const rawData = await response.json();

        // Handle the AMP array structure
        const data = rawData[0];
        const instances = data.AvailableInstances;

        // Clear the placeholder text
        display.innerHTML = '';

        instances.forEach(server => {
            // Hide the controller
            if (server.InstanceName === 'ADS01') return;

            let statusText, statusClass;
            const state = server.AppState;

            // 20 = Running, 50 = Sleeping -> Online
            if (state === 20 || state === 50) {
                statusText = "Online";
                statusClass = "status-online";
            } else if (state === 10) {
                statusText = "Starting";
                statusClass = "status-starting";
            } else {
                statusText = "Offline";
                statusClass = "status-offline";
            }

            // Metrics safely parsed
            const players = server.Metrics?.["Active Users"]?.RawValue ?? 0;
            const maxPlayers = server.Metrics?.["Active Users"]?.MaxValue ?? 0;
            const description = server.Description ? `<p>${server.Description}</p>` : '';

            // Injecting using your exact CSS classes
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
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error("Status update failed:", err);
        display.innerHTML = `<p style="color: #ef4444; font-size: 0.85rem;">Unable to load server data. Check if status.json exists in root.</p>`;
    }
}

// Fire the function
updateStatus();