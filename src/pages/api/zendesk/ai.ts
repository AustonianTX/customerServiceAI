import { Configuration, OpenAIApi } from "openai";
import { Ticket } from "./types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const aiTicketResponse = async (ticket: Ticket) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Austin has written us a ticket.  Here is his message:\n\n${ticket.latestComment}\n\n Create a thorugh response to him.\n\n###`,
    max_tokens: 1000,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "###",
  });

  return completion?.data?.choices[0]?.text;
};
