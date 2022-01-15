import axios from "axios";

const ax = axios.create({
  baseURL: "http://note-api.mmcoder.xyz/api",
});
export default ax;
