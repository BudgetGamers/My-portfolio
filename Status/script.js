async function updateStatus() {
    const display = document.getElementById('server-display');
    try {
        const response = await fetch('../status.json');
        const rawData = await response.json();
        const instances = rawData[0].AvailableInstances;

        display.innerHTML = '';

        instances.forEach(server => {
            if (server.InstanceName === 'ADS01') return;

            let statusText, statusClass;
            // 20 and 50 both count as Online
            if (server.AppState === 20 || server.AppState === 50) {
                statusText = "Online";
                statusClass = "status-online";
            } else if (server.AppState === 10) {
                statusText = "Starting";
                statusClass = "status-starting";
            } else {
                statusText = "Offline";
                statusClass = "status-offline";
            }

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
                    </div>
                </div>`;
        });
    } catch (err) {
        display.innerHTML = "<p>Status currently unavailable.</p>";
    }
}
updateStatus();