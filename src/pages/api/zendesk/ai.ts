import { Configuration, OpenAIApi } from "openai";
import { Ticket } from "./types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const aiTicketResponse = async (ticket: Ticket) => {
  const prompt = buildPrompt(ticket);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
    temperature: 0.3,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "###",
  });

  return completion?.data?.choices[0]?.text;
};

const buildPrompt = (ticket: Ticket) => {
  let prompt = `We have received a customer service ticket from ${ticket.requesterFirstName} ${ticket.requesterLastName}.`;

  if (ticket?.orders?.length > 0) {
    prompt += ` They have place ${
      ticket?.orders?.length
    } Their order history is ${JSON.stringify(ticket.orders)}.\n`;
  } else {
    prompt += ` They have not placed an order with us.\n`;
  }

  prompt += ` Here is their message:\n\n${ticket.latestComment}\n\n`;

  prompt += `Create a thorough and kind response.\n\n###`;

  return prompt;
};
