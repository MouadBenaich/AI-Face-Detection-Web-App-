// api/clarifai.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body;

  const raw = JSON.stringify({
    user_app_id: { user_id: "clarifai", app_id: "main" },
    inputs: [{ data: { image: { url: imageUrl } } }]
  });

  try {
    const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Key " + process.env.CLARIFAI_KEY
      },
      body: raw
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
