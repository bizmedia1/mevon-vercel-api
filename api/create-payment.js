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

    // 🔥 SAFELY HANDLE RESPONSE
    const text = await response.text();

    let parsed;

    try {
      const result = JSON.parse(text);
      parsed = result.raw ? JSON.parse(result.raw) : result;
    } catch (e) {
      return res.status(500).json({
        error: "Invalid response from Mevon",
        raw: text
      });
    }

    // 🔥 VALIDATION
    if (!parsed.account_number) {
      return res.status(400).json({
        error: "No account returned",
        raw: parsed
      });
    }

    return res.status(200).json({
      account_number: parsed.account_number,
      account_name: parsed.account_name,
      bank_name: parsed.bank_name,
      amount: 14000,
      reference: parsed.reference
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
