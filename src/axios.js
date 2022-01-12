import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/my-clone-project-3f0f9/us-central1/api",
});

export default instance;
