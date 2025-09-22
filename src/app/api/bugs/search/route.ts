import mongoose from "mongoose";
import { Bug } from "../../auth/schemas/bug";
import { User } from "../../auth/schemas/user";

await mongoose.connect(`${process.env.databaseURL}`);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");
    const userId = req.headers.get("authorization")?.split(" ")[1];

    let filter: any = {};

    const user = await User.findById(userId);

    if (user) {
      console.log("use found", user.userType);
      if (user.userType !== "Admin") {
        console.log("reporter user");
        if (userId) filter.user = userId;
      }
    }

    if (title) filter.title = new RegExp(title, "i");
    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const bugs = await Bug.find(filter);
    return Response.json(bugs);
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
