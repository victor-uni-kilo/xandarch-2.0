import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../services/mongo-connection";

export default async function projectHandler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  const data = await db.collection("projects").find({}).limit(20).toArray();

  try {
    const dataParsed: JSON = JSON.parse(JSON.stringify(data));

    res.status(200).json(dataParsed);
  } catch (error) {
    res.status(404).send("Projects Not Found: " + error);
  }
}
