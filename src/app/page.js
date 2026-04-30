"use client";

import Link from "next/link";
import { BookOpen, Clock, LogOut, PlayCircle, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "./data/courses";
import { getCurrentUser, signOut } from "./utils/auth";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  async function handleSignOut() {
    await signOut();
    setUser(null);
    router.push("/login");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <BookOpen size={19} />
          </span>
          <span>CourseFlow Academy</span>
        </Link>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-pill">
                <UserRound size={15} /> {user.name}
              </span>
              <button className="ghost-button" onClick={handleSignOut} type="button">
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" href="/login">
                Sign in
              </Link>
              <Link className="primary-button" href="/signup">
                Create account
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="hero-band">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>CourseFlow Academy</h1>
            <p>
              Choose a course, open its module path, and study each lecture through clean slide notes from
              introduction to advanced practice.
            </p>
          </div>
          <div className="stats-panel" aria-label="Platform highlights">
            <div className="stat-row">
              <PlayCircle size={34} />
              <span>
                <strong>21</strong>
                slide lectures across courses
              </span>
            </div>
            <div className="stat-row">
              <Clock size={34} />
              <span>
                <strong>7</strong>
                guided modules in every course
              </span>
            </div>
            <div className="stat-row">
              <ShieldCheck size={34} />
              <span>
                <strong>Real login</strong>
                backed by MongoDB and secure cookies
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="section-heading">
          <div>
            <h2>Available courses</h2>
            <p>Start with styling, programming, or authentication and move module by module.</p>
          </div>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.slug}>
              <div className="course-art" style={{ background: course.accent }}>
                {course.shortTitle}
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
                <Link className="primary-button" href={`/courses/${course.slug}`}>
                  Open course
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
