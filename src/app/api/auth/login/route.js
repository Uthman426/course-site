import { NextResponse } from "next/server";
import { getUsersCollection } from "../../../lib/mongodb";
import { verifyPassword } from "../../../lib/password";
import { setSessionCookie } from "../../../lib/session";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: cleanEmail });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    
     await setSessionCookie(user);

    return NextResponse.json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to login. Check your MongoDB connection." }, { status: 500 });
  }
}
