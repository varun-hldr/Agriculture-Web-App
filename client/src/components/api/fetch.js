import axios from "axios";

const publicFetch = axios.create({
  // baseURL: "http://localhost:3100/",
  baseURL: "/",
});

export { publicFetch };
