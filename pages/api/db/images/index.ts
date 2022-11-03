// import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import mongoose, { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "@middleware/index";
import nextConnect from "next-connect";

const imageHandler = nextConnect<NextApiRequest, NextApiResponse>();
imageHandler.use(middleware);

imageHandler.get(async (req: any, res: any) => {
  const imageId = new mongoose.Types.ObjectId(req.query.imageId);

  console.log("CONNECTING TO MONGO");
  await connectToMongo();
  console.log("CONNECTED TO MONGO");

  const db = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(db);

  try {
    const imageIds = await bucket.find().toArray();
    res.status(200).json(imageIds);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default imageHandler;
