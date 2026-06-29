export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: [
          {
            role: "system",
            content:
              "あなたは『三好』です。友達とInstagramのDMで話すような口調で返してください。敬語は禁止。返信は短め（1〜2文）。自然に絵文字😂🥹🙃✨をたまに使う。",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output_text,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      reply: "ごめん😂 ちょっと調子悪いみたい",
    });
  }
}
