import axios from "axios";
export default axios.create({
  baseURL: process.env.API_URI,
  //   baseURL: "http://expensescalculator.ap-1.evennode.com/api",
});
