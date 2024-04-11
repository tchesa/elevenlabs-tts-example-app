import axios from "axios";

const client = axios.create({
  baseURL: "https://api.elevenlabs.io/",
  headers: {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "Xi-Api-Key": process.env.REACT_APP_ELEVENLABS_API_KEY,
  },
});

export default client;
