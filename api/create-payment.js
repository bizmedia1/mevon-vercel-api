export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch("https://mevon-vercel-api.vercel.app/api/create-payment", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({})
})
.then(res => res.json())
.then(data => {

if (!data.account_number) {
throw new Error("No account returned");
}

// 🔻 HIDE LOADER
document.getElementById("popupLoader").style.display = "none";

// 🔻 SHOW ACCOUNT DETAILS
document.getElementById("popupText").innerHTML = `
Send <b>₦${data.amount}</b> to:<br><br>
<b>${data.bank_name}</b><br>
<b style="font-size:18px">${data.account_number}</b><br><br>
Payment will be confirmed automatically.
`;

// 🔻 CHANGE BUTTON
document.getElementById("activateBtn").innerText = "I have paid";

})
.catch((err) => {
document.getElementById("popupLoader").style.display = "none";
alert("Error: " + err.message);
});
  }
}
