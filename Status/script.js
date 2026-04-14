instances.forEach(server => {
    if (server.InstanceName === 'ADS01') return;

    // 1. Mapping the states (as we discussed: 20/50 = Online)
    let statusText, statusClass;
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

    // 2. Handle the Description
    // We check if it exists and isn't just an empty string
    const descriptionHtml = server.Description
        ? `<p class="server-desc">${server.Description}</p>`
        : '';

    // 3. Get Player Metrics
    const players = server.Metrics["Active Users"] ? server.Metrics["Active Users"].RawValue : 0;
    const maxPlayers = server.Metrics["Active Users"] ? server.Metrics["Active Users"].MaxValue : 0;

    // 4. Build the Card using FriendlyName
    container.innerHTML += `
        <div class="server-card">
            <div class="card-header">
                <h3>${server.FriendlyName}</h3>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            ${descriptionHtml}
            <div class="card-details">
                <p><b>Game:</b> ${server.ModuleDisplayName || server.Module}</p>
                <p><b>Players:</b> ${players} / ${maxPlayers}</p>
            </div>
        </div>
    `;
});