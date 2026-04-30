# CourseFlow Academy

A Coursera-style Next.js learning website with real signup/login, MongoDB user storage, protected learning actions, and slideable lecture notes.

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```txt
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/courseflow?retryWrites=true&w=majority
MONGODB_DB=courseflow
AUTH_SECRET=replace-this-with-a-long-random-secret
```

Then run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## What is included

- Signup stores users in MongoDB.
- Passwords are hashed with PBKDF2 before saving.
- Login creates an HTTP-only session cookie.
- Courses include CSS/component styling, JavaScript, and OAuth.
- Each course has 7 modules with slideable lecture notes.
