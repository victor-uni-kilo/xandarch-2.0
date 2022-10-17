import nextConnect from "next-connect";
import multipartFormParser from "@middleware/multipartFormParser";

const middleware = nextConnect();

middleware.use(multipartFormParser);

export default middleware;
