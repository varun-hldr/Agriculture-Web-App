import { publicFetch } from "./fetch";

export async function login(user) {
  let data = await publicFetch
    .post("auth/login", user)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function googleLogin() {
  let data = await publicFetch
    .get("auth/google")
    .then((response) => response.data)
    .catch(() => false);

  return data;
}
export async function logout() {
  let data = await publicFetch
    .get("auth/logout")
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function facebookLogin() {
  let data = await publicFetch
    .get("auth/facebook")
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function register(user) {
  let data = await publicFetch
    .post("auth/register", user)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function allUser(token) {
  let data = await publicFetch
    .get("users", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function updateUser({ id, user, token }) {
  let data = await publicFetch
    .put(`users/${id}`, user, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => false);

  return data;
}

export async function deleteUser({ id, token }) {
  let data = await publicFetch
    .delete(`users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => false);

  return data;
}
