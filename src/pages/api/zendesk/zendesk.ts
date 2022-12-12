import type { Ticket } from "./types";

// TODO: ENSURE THAT I CAN MAKE BASIC ZENDESK API CALLS

export const updateTicket = async (ticket: Ticket, aiResponse: string) => {
  return await fetch(
    `https://cackle.zendesk.com/api/v2/tickets/${ticket.ticket}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${process.env.ZENDESK_API_BASIC_AUTH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket: {
          comment: {
            body: aiResponse,
            public: false,
          },
        },
      }),
    }
  ).then((res) => res.json());
};
