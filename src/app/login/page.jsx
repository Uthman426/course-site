"use client";

import Link from "next/link";
import { BookOpen, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Unable to login.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <BookOpen size={19} />
          </span>
          <span>CourseFlow Academy</span>
        </Link>
        <h1>Sign in to continue learning</h1>
        <p>Login with the account you created. Your account is checked against MongoDB.</p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@example.com"
              type="email"
              value={email}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              type="password"
              value={password}
            />
          </div>
          {error ? <p className="error">{error}</p> : null}
          <button className="primary-button" type="submit">
            <LogIn size={17} /> Sign in
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
