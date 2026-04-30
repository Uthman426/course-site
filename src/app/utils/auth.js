export async function getCurrentUser() {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
}

export async function signOut() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include"
  });
}
