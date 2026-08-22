require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

// 1. الاعدادات الاساسية
app.use(cors()); // باش Flutter يقدر يتصل
app.use(express.json()); // باش يقرا JSON

// 2. ربط OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 3. صفحة تجربة
app.get('/', (req, res) => {
  res.json({ message: 'Server is running. Use POST /ai' });
});

// 4. API الاساسي ديال ChatGPT
app.post('/ai', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Answer in Arabic." },
        { role
