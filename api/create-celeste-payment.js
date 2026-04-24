export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    // ✅ GET AMOUNT FROM FRONTEND
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const response = await fetch("https://mevonpay.com.ng/V1/createtempva", {
      method: "POST",
      headers: {
        "Authorization": process.env.MEVON_SECRET_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname: "Celeste",
        lname: "User"
      })
    });

    const text = await response.text();

    let parsed;
    try {
      const result = JSON.parse(text);
      parsed = result.raw ? JSON.parse(result.raw) : result;
    } catch {
      return res.status(500).json({ error: text });
    }

    // ✅ RETURN DYNAMIC AMOUNT (NO HARDCODE)
    return res.status(200).json({
      account_number: parsed.account_number,
      account_name: parsed.account_name,
      bank_name: parsed.bank_name,
      amount: amount, // 🔥 THIS FIXES EVERYTHING
      reference: parsed.reference
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
