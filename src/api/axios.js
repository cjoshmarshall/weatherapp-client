import axios from "axios";

const BASE_URL = "http://localhost:3006/api";
// const BASE_URL =
//   "https://0b2f4o7an1.execute-api.ap-south-1.amazonaws.com/dev/api";

export const bodyRequest = axios.create({
  baseURL: BASE_URL,
});
