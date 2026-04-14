async function updateStatus() {
    const display = document.getElementById('server-display');

    try {
        // Look up one folder to find the data
        const response = await fetch('../status.json');

        if (!response.ok) throw new Error("Could not find status file.");

        const rawData = await response.json();
        const instances = rawData[0].AvailableInstances;

        display.innerHTML = ''; // Clear the "Establishing connection" message

        instances.forEach(server => {
            // Hide the ADS controller
            if (server.InstanceName === 'ADS01') return;

            // Map States
            let statusText, statusClass;
            const state = server.AppState;

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

            // Description Logic
            const description = server.Description ? `<p>${server.Description}</p>` : '';

            // Metrics
            const players = server.Metrics["Active Users"] ? server.Metrics["Active Users"].RawValue : 0;
            const maxPlayers = server.Metrics["Active Users"] ? server.Metrics["Active Users"].MaxValue : 0;

            // Build the card using your new CSS classes
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
        console.error("Fetch error:", err);
        display.innerHTML = `<p style="color: var(--accent-red)">Error: Unable to load server data.</p>`;
    }
}

updateStatus();