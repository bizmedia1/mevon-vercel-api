export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ message: "API working" });
  }

  try {
    const response = await fetch("https://api.mevonpay.com.ng/V1/createdynamic", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MEVON_SECRET_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify({
        amount: 14000,
        currency: "NGN"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      account_number: data?.data?.accountNumber,
      bank_name: data?.data?.bankName,
      amount: data?.data?.amount || 14000,
      raw: data
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
