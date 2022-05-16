import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://nospame-capstone-api.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}


createApp(App).use(router).mount('#app')
