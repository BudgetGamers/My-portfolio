async function updateStatus() {
    const display = document.getElementById('server-display');
    try {
        // Cache Buster to ensure the page updates immediately on commit
        const response = await fetch('../status.json?t=' + new Date().getTime());

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
            const port = endpoint.split(':').pop() || "PORT";

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
                        <p style="margin-top: 8px; font-family: monospace; color: var(--accent-blue);">
                            <b>IP:</b> 25.32.195.216:${port}
                        </p>
                    </div>
                </div>`;
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        display.innerHTML = "<p>Status currently unavailable.</p>";
    }
}

updateStatus();