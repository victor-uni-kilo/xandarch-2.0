import mongoose from "mongoose";

const connectToMongo = async () => {
  const uri = encodeURI(process.env.MONGODB_URI!);

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log("DBerror", error);
  }
};

export default connectToMongo;
