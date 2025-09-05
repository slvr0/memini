import axios from "axios";
import { useSelector } from 'react-redux';


console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL); 
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  //interceptors run outside of the react render cycle, for some reason unknown to me this creates an illegal pattern if i try to get the token via   
  //useSelector of the meminiUser in redux. So i fetch from localstorage right away. Its not great, but it isnt bad either.

  if(process.env.NODE_ENV === 'development') {
    console.log("Making request to:", config.baseURL + config.url);
    console.log("Request config:", config);
  }
  
  const userToken = JSON.parse(localStorage.getItem("authToken"));
  console.log("User Token:", userToken);
  if (userToken) 
    config.headers.Authorization = `Bearer ${userToken.token}`;
  
  return config;
});


api.interceptors.request.use(config => {
    console.log("Making request to:", config.baseURL + config.url);
    console.log("Request config:", config);
    
    const userToken = JSON.parse(localStorage.getItem("authToken"));
    if (userToken) 
        config.headers.Authorization = `Bearer ${userToken.token}`;
    
    return config;
});

api.interceptors.response.use(
    response => {
        console.log("Response received:", response);
        return response;
    },
    error => {
        console.log("Request error:", error);
        console.log("Error response:", error.response);
        return Promise.reject(error);
    }
);


export default api;