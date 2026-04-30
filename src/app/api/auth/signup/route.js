import { NextResponse } from "next/server";
import { getUsersCollection } from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/password";
import { setSessionCookie } from "../../../lib/session";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (cleanName.length < 2) {
      return NextResponse.json({ message: "Name must be at least 2 characters." }, { status: 400 });
    }

    if (!cleanEmail.includes("@")) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
    }

    const users = await getUsersCollection();
    const existingUser = await users.findOne({ email: cleanEmail });

    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    const now = new Date();
    const result = await users.insertOne({
      name: cleanName,
      email: cleanEmail,
      passwordHash: await hashPassword(password),
      enrolledCourses: [],
      createdAt: now,
      updatedAt: now
    });

    const user = {
      _id: result.insertedId,
      name: cleanName,
      email: cleanEmail
    };

    
    await setSessionCookie(user);

    return NextResponse.json({ user: { name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to create account. Check your MongoDB connection." }, { status: 500 });
  }
}
