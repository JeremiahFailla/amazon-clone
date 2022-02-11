import axios from "axios";

const instance = axios.create({
  // API (cloud function) URL
  baseURL: "http://localhost:5001/clone-a3b0c/us-central1/api",
  // baseURL: "https://us-central1-clone-a3b0c.cloudfunctions.net/api",
});

export default instance;
