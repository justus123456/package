import OpenAI from "openai";


require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}

getCompletion();
