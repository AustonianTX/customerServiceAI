import { Configuration, OpenAIApi } from "openai";
import { Ticket } from "./types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const aiTicketResponse = async (ticket: Ticket) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${ticket.requesterFirstName} has created a customer service ticket.  Here is the message:\n\n${ticket.latestComment}\n\n Create a thorough and kind response.\n\n###`,
    max_tokens: 4096,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "###",
  });

  return completion?.data?.choices[0]?.text;
};
