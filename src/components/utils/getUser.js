import axios from "axios";
// import https from 'https';
// axios.defaults.baseURL = 'https://127.0.0.1:8081/';
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULT_BASE_URL;