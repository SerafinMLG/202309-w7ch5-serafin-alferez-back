import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.rzu2qav.mongodb.net/W7WEEKEND?retryWrites=true&w=majority`;
  return mongoose.connect(uri)
};
