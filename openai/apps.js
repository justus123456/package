const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "sk-proj-61MBVs4RKJbAaDXOhtH0T3BlbkFJTbXI6cwjQaEvBhs1WQfc",
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
