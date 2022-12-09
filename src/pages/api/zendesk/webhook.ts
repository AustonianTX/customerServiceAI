import { type NextApiRequest, type NextApiResponse } from "next";
import { aiTicketResponse } from "./ai";
import { Ticket } from "./types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ticket = req.body as Ticket;

  console.log(ticket);

  ticket.content = parseTicketContent(ticket.latestComment);

  const aiResponse = await aiTicketResponse(ticket);

  // console.log(aiResponse);

  res.status(200).json({ pizza: "🍕", aiResponse });
};

const parseTicketContent = (ticketContent: string) => {
  return ticketContent.replace(/[^a-zA-Z0-9\s]/g, "").replace(/<[^>]*>\s/g, "");
};

export default handler;
