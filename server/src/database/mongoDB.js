import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/crud_db`
    );
    console.log("Mongodb connected successfully :", connectInstance.connection.host);
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};

export default connectDb;
