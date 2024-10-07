import { mongoose, ResponseMessage } from "../Index.ts";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log(ResponseMessage.DATABASE_CONNECTED);
  } catch (error: unknown) {
    console.log("Database error", error as Error);
  }
};

export { dbConnection };
