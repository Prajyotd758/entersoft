import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../auth/schemas/user";

await mongoose.connect(`${process.env.databaseURL}`);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, userType } = body;

    const existingUser = await User.findOne({
      email: `${body?.email as string}`,
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "User already exists!",
      });
    }

    const user = await User.create({
      email,
      password,
      userType,
    });

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Registration success",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Registration failed",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Registration failed",
    });
  }
}
