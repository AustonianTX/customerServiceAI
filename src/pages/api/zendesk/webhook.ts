import { type NextApiRequest, type NextApiResponse } from "next";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("we testing the webhook!");

  console.log(req?.body);

  res.status(200).json({ pizza: "yummy" });
};

export default examples;
