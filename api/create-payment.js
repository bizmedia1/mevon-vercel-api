export default async function handler(req, res) {
  try {

    const response = await fetch("https://mevonpay.com.ng/V1/createtempva", {
      method: "POST",
      headers: {
        "Authorization": process.env.MEVON_SECRET_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname: "John",
        lname: "Doe"
      })
    });

    const data = await response.json();

    // ✅ return correct structure
    return res.status(200).json({
      account_number: data?.account_number,
      account_name: data?.account_name,
      bank_name: data?.bank_name,
      amount: 14000,
      reference: data?.reference // 🔥 optional (useful for Telegram proof)
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
