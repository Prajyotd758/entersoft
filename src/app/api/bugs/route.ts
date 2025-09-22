import mongoose from "mongoose";
import { Bug } from "../auth/schemas/bug";

await mongoose.connect(`${process.env.databaseURL}`);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const bug = await Bug.create(body); // user id should come from auth
    return Response.json(bug, { status: 201 });
  } catch (err) {
    return Response.json({ err }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("authorization")?.split(" ")[1];
    const bugs = await Bug.find({ user: userId });
    console.log("this are bugs", bugs);

    return Response.json(bugs);
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
