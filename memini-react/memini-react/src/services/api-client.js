import axios from "axios";

// console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL); 
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  //interceptors run outside of the react render cycle, for some reason unknown to me this creates an illegal pattern if i try to get the token via   
  //useSelector of the meminiUser in redux. So i fetch from localstorage right away. Its not great, but it isnt bad either.  
  const userToken = JSON.parse(localStorage.getItem("authToken"));
  if (userToken) 
    config.headers.Authorization = `Bearer ${userToken.token}`;  
  return config;
});

api.interceptors.response.use(
    response => response,
    error =>  Promise.reject(error)
);


export default api;