import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
axios.defaults.baseURL = 'http://47.112.141.200:8080';
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"
axios.defaults.timeout = 10000;

createApp(App).mount('#app')
