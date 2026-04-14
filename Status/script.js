async function updateStatus() {
    try {
        // Look up one directory to find the json file
        const response = await fetch('../status.json');
        const rawData = await response.json();
        const instances = rawData[0].AvailableInstances;
        const container = document.getElementById('server-display');
        container.innerHTML = '';

        instances.forEach(server => {
            if (server.InstanceName === 'ADS01') return;

            // Map the states as requested
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

            const players = server.Metrics["Active Users"] ? server.Metrics["Active Users"].RawValue : 0;
            const maxPlayers = server.Metrics["Active Users"] ? server.Metrics["Active Users"].MaxValue : 0;

            container.innerHTML += `
                <div class="server-card">
                    <div class="card-header">
                        <h3>${server.FriendlyName}</h3>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <p><b>Game:</b> ${server.ModuleDisplayName || server.Module}</p>
                    <p><b>Players:</b> ${players} / ${maxPlayers}</p>
                </div>
            `;
        });
    } catch (err) {
        document.getElementById('server-display').innerHTML = "<p>Status currently unavailable.</p>";
        console.error("Error:", err);
    }
}

updateStatus();