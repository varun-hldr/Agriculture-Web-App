import { publicFetch } from "./fetch";

export async function login(user) {
  let data = await publicFetch
    .post("auth/login", user)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function checkLogin() {
  let data = await publicFetch
    .get("auth/login/success", {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
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
export async function getUserById(id) {
  let data = await publicFetch
    .get(`users/${id}`)
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

// Product Api Calls
export async function addProduct(product) {
  let data = await publicFetch
    .post("product/add", product)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function getProductById(id) {
  let data = await publicFetch
    .get(`product/${id}`)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function getProductByCategory(category) {
  let data = await publicFetch
    .get(`product/cat/${category}`)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function findProductByCategoryAndName(name) {
  let data = await publicFetch
    .get(`product/find/${name}`)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

// Shopping Cart
export async function addProductOnCart(product) {
  let data = await publicFetch
    .post(`cart/add/${product.cartId}`, product)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

export async function findCartByID(id) {
  let data = await publicFetch
    .get(`cart/${id}`)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}
export async function deleteProductFromCart(id) {
  let data = await publicFetch
    .delete(`cart/${id}`)
    .then((response) => response.data)
    .catch(() => false);

  return data;
}

// Setup Payment (Make Order Request)
export async function createOrder(amount) {
  let data = await publicFetch
    .get(`cart/order/${amount}`)
    .then((response) => response.data)
    .catch(() => false);
  return data;
}
