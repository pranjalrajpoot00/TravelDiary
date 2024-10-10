import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongodb Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
