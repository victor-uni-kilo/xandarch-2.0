// import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@utils/connectDB";
import mongoose from "mongoose";
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
    const file = await bucket.find({ _id: imageId });

    file.toArray((err, file) => {
      if (!file || file.length === 0) {
        console.log(file);
        return res.status(404).json({ err: "File does not exist" });
      }
      bucket.openDownloadStream(imageId).pipe(res);
    });
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
