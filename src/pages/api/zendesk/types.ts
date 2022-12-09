export type Ticket = {
  ticket: string;
  brand: string;
  status: string;
  subject: string;
  description: string;
  latestComment: string;
  requester: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterField: string;
  requesterPhone: string;
  requesterEmail: string;
  content?: string;
};
