import mongoose, { ConnectOptions } from "mongoose";

import "../models/article";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
      } as ConnectOptions
    )
    .then((res) => {
      console.log("Connected to MongoDB Database");
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB Database", err);
    });
};

export default dbConnect;
