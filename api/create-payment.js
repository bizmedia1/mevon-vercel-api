export default async function handler(req, res) {
  try {

    const response = await fetch("https://mevonpay.com.ng/V1/createtempva", {
      method: "POST",
      headers: {
        "Authorization": process.env.MEVON_SECRET_KEY, // ⚠️ no "Bearer"
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname: "John",
        lname: "Doe"
      })
    });

    const data = await response.json();

    // 🔥 LOG THIS FIRST TIME (optional but smart)
    console.log(data);

    // ✅ map response safely
    return res.status(200).json({
      account_number: data?.data?.accountNumber || data?.accountNumber,
      account_name: data?.data?.accountName || data?.accountName,
      bank_name: data?.data?.bankName || data?.bankName,
      amount: 14000
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
