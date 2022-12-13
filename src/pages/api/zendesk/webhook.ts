import { type NextApiRequest, type NextApiResponse } from "next";
import { aiTicketResponse } from "./ai";
import { getShipStationOrders } from "./shipstation";

import type { Ticket } from "./types";
import { updateTicket } from "./zendesk";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ticket = req.body as Ticket;

  ticket.content = parseTicketContent(ticket.latestComment);

  // const ticket = TEST_TICKET;

  const ssOrders = await getShipStationOrders(ticket);

  if (ssOrders.length > 0) {
    ticket.orders = ssOrders;
  }

  const aiResponse = await aiTicketResponse(ticket);

  // if (aiResponse) {
  //   await updateTicket(ticket, aiResponse);
  // }

  res.status(200).json({
    aiResponse,
  });
};

const parseTicketContent = (ticketContent: string) => {
  return ticketContent
    ?.replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/<[^>]*>\s/g, "");
};

// const TEST_TICKET: Ticket = {
//   ticket: "123",
//   brand: "Cackle Hatchery",
//   status: "Open",
//   subject: "Test Ticket",
//   description: "This is a test ticket",
//   latestComment:
//     "What are the best breeds for me to raise in my backyard in a very cold climate?  I live in Minnesota.",
//   requester: "Austin Johnson",
//   requesterFirstName: "Austin",
//   requesterLastName: "Johnson",
//   requesterEmail: "austin.johnson.99@gmail.com",
// };

export default handler;
