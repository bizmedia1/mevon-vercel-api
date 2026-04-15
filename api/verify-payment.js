export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { account_number } = req.body;

    if (!account_number) {
      return res.status(400).json({ error: "No account number" });
    }

    // 🔴 THIS PART DEPENDS ON MEVONPAY
    // Replace with their verify endpoint

    const response = await fetch("https://mevonpay.com.ng/V1/verify-payment", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MEVON_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accountNumber: account_number
      })
    });

    const data = await response.json();

    // 🔥 Adjust this based on their response
    if (data?.status === true && data?.data?.paid === true) {
      return res.json({ paid: true });
    }

    return res.json({ paid: false });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
