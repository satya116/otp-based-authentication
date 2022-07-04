import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,   //need to check
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }

})

export const sendOtp = (data:any) => api.post('/login-mobile', data);
export const verifyOtp = (data:any) => api.post('/login-otp', data);

export const logout = () => api.post('/logout');


///lol




//interceptors

api.interceptors.response.use((config) => {
    return config
},
async (error) => {
    const originalRequest = error.config;
    console.log("api.tsx G29", originalRequest);


    if(error.response.status === 401 && originalRequest && !originalRequest._isRetry){
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})

            return api.request(originalRequest)

        } catch (err:any) {
            console.log(err.message);
        }
    }
    throw error;


})



export default api;