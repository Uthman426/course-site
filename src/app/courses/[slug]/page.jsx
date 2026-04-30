"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, LogIn } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourse } from "../../data/courses";
import { getCurrentUser } from "../../utils/auth";

export default function CourseDetailPage() {
  const params = useParams();
  const course = getCourse(params.slug);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
        setCheckingSession(false);
      })
      .catch(() => setCheckingSession(false));
  }, []);

  if (!course) {
    return (
      <main className="not-found">
        <section>
          <h1>Course not found</h1>
          <p>The course you are looking for is not available.</p>
          <Link className="primary-button" href="/">
            Back to courses
          </Link>
        </section>
      </main>
    );
  }

  const activeModule = course.modules[moduleIndex];
  const activeSlide = activeModule.slides[slideIndex];
  const progress = `${((slideIndex + 1) / activeModule.slides.length) * 100}%`;

  function selectModule(index) {
    setModuleIndex(index);
    setSlideIndex(0);
  }

  function nextSlide() {
    setSlideIndex((current) => Math.min(current + 1, activeModule.slides.length - 1));
  }

  function previousSlide() {
    setSlideIndex((current) => Math.max(current - 1, 0));
  }

  async function enroll() {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ courseSlug: course.slug })
    });

    if (response.ok) {
      setEnrolled(true);
    }
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
          {user ? <span className="user-pill">{user.name}</span> : null}
          <Link className="ghost-button" href={user ? "/" : "/login"}>
            {user ? <ArrowLeft size={16} /> : <LogIn size={16} />}
            {user ? "Courses" : "Sign in"}
          </Link>
        </div>
      </header>

      <section className="page course-detail">
        <div className="detail-header">
          <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="badge-row">
              <span className="badge">{course.level}</span>
              <span className="badge">{course.duration}</span>
              {course.outcomes.map((outcome) => (
                <span className="badge" key={outcome}>
                  {outcome}
                </span>
              ))}
            </div>
          </div>
          <button className="primary-button" disabled={checkingSession} onClick={enroll} type="button">
            {enrolled ? "Enrolled" : user ? "Enroll and continue" : "Login to learn"} <ArrowRight size={17} />
          </button>
        </div>

        {!checkingSession && !user ? (
          <section className="locked-panel">
            <h2>Login required</h2>
            <p>Create an account or sign in to unlock the full seven-module course and slideable lecture notes.</p>
            <div className="nav-actions">
              <Link className="primary-button" href="/signup">
                Create account
              </Link>
              <Link className="ghost-button" href="/login">
                Sign in
              </Link>
            </div>
          </section>
        ) : (
          <div className="module-layout">
            <aside className="module-list" aria-label="Course modules">
              {course.modules.map((module, index) => (
                <button
                  className={`module-card ${moduleIndex === index ? "active" : ""}`}
                  id={`module-${index + 1}`}
                  key={module.title}
                  onClick={() => selectModule(index)}
                  type="button"
                >
                  <span className="module-number">Module {index + 1}</span>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                </button>
              ))}
            </aside>

            <section className="slides-panel" aria-label="Lecture slides">
              <div className="slide-toolbar">
                <strong>
                  Module {moduleIndex + 1}: {activeModule.title}
                </strong>
                <span className="slide-count">
                  Slide {slideIndex + 1} of {activeModule.slides.length}
                </span>
              </div>

              <article className="slide">
                <h2>{activeSlide.title}</h2>
                <p>{activeSlide.body}</p>
                {activeSlide.example ? (
                  <pre className="lecture-example">
                    <code>{activeSlide.example}</code>
                  </pre>
                ) : null}
                <ul>
                  {activeSlide.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={16} /> {point}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="slide-actions">
                <button className="icon-button" disabled={slideIndex === 0} onClick={previousSlide} type="button">
                  <ChevronLeft size={18} /> Previous
                </button>
                <div className="progress-track" aria-hidden="true">
                  <div className="progress-fill" style={{ width: progress }} />
                </div>
                <button
                  className="icon-button"
                  disabled={slideIndex === activeModule.slides.length - 1}
                  onClick={nextSlide}
                  type="button"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
