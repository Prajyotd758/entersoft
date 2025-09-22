import mongoose from "mongoose";
import { Bug } from "@/app/api/auth/schemas/bug";

await mongoose.connect(`${process.env.databaseURL}`);

export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    const { status } = await req.json();
    const valid = ["Open", "In Progress", "Closed"];
    if (!valid.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const bug = await Bug.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!bug) return Response.json({ error: "Bug not found" }, { status: 404 });
    return Response.json(bug);
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
