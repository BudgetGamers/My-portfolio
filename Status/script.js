async function updateStatus() {
    const display = document.getElementById('server-display');
    try {
        // Cache Buster: Adds a unique timestamp to force the browser to get the freshest data
        const response = await fetch('../status.json?t=' + new Date().getTime());

        if (!response.ok) throw new Error("File not found");

        const rawData = await response.json();

        // Handle array wrapping
        const data = Array.isArray(rawData) ? rawData[0] : rawData;
        const instances = data.AvailableInstances;

        display.innerHTML = '';

        instances.forEach(server => {
            if (server.InstanceName === 'ADS01') return;

            let statusText, statusClass;
            // Ensure state is treated as a number
            const state = Number(server.AppState);

            // 20 = Running, 50 = Sleeping (Universal Sleep)
            if (state === 20 || state === 50) {
                statusText = "Online";
                statusClass = "status-online";
            }
            // 10 = Starting, 30 = Installing/Updating
            else if (state === 10 || state === 30) {
                statusText = "Starting";
                statusClass = "status-starting";
            }
            else {
                statusText = "Offline";
                statusClass = "status-offline";
            }

            const players = server.Metrics?.["Active Users"]?.RawValue ?? 0;
            const maxPlayers = server.Metrics?.["Active Users"]?.MaxValue ?? 0;

            // Using your server-info class for the description
            const description = server.Description ? `<p class="server-desc">${server.Description}</p>` : '';

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
        console.error("Fetch Error:", err);
        display.innerHTML = "<p>Status currently unavailable. Check back in a few minutes.</p>";
    }
}

// Initial call
updateStatus();