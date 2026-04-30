import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { courses } from "../../data/courses";
import { getUsersCollection } from "../../lib/mongodb";
import { getSession } from "../../lib/session";

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "You must be logged in to enroll." }, { status: 401 });
  }

  const { courseSlug } = await request.json();
  const courseExists = courses.some((course) => course.slug === courseSlug);

  if (!courseExists) {
    return NextResponse.json({ message: "Course not found." }, { status: 404 });
  }

  const users = await getUsersCollection();

  await users.updateOne(
    { _id: new ObjectId(session.id) },
    {
      $addToSet: { enrolledCourses: courseSlug },
      $set: { updatedAt: new Date() }
    }
  );

  return NextResponse.json({ message: "Enrollment saved.", courseSlug });
}
