import axios from 'axios';

const api = axios.create({
  url: "https://economia.awesomeapi.com.br/json",
  
});

export default api;