import axios from "axios";

const api = axios.create({
 /*  baseURL: "https://glamurama-wauykig2.b4a.run", */
 baseURL: "http://186.233.225.227:8080",
});

export default api;