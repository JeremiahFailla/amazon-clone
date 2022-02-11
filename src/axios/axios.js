import axios from "axios";

const instance = axios.create({
  // API (cloud function) URL
  baseURL: "http://localhost:5001/clone-a3b0c/us-central1/api",
});

export default instance;
