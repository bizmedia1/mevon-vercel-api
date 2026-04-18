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

    const text = await response.text(); // 👈 IMPORTANT

    return res.status(200).json({
      raw: text
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
