import express from "express";
import OpenAI from "openai";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/ai", async (req, res) => {
  const { message } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are Morassala AI. Answer in Arabic and be helpful." },
      { role: "user", content: message }
    ],
  });
  res.json({ reply: completion.choices[0].message.content });
});

app.post("/sos", (req, res) => {
  console.log("🚨 SOS:", req.body);
  res.json({ success: true });
});

app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`)
}); 
