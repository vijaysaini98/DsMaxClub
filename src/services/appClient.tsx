// // import axios from 'axios';
// // import config, { BASE_URL } from './config';
// // import {
// //     getAccessToken,
// //     getRefreshToken,
// //     setAccessToken,
// // } from './storage';
// // // import config, {BASE_URL} from './config';

// // const apiClient = axios.create({
// //     baseURL: BASE_URL,
// // });

// // // Interceptor
// // apiClient.interceptors.request.use(
// //     config => {
// //         const token = getAccessToken();

// //         if (token) {
// //             config.headers.Authorization = `Bearer ${token}`;
// //         }
// //         return config;
// //     },
// //     error => Promise.reject(error),
// // );


// // apiClient.interceptors.response.use(
// //     response => response,
// //     async error => {
// //         const originalRequest = error.config;

// //         // Log request details
// //         const { url: uri, method, headers, data, ...params } = originalRequest;

// //         let bodyData = null;
// //         if (data instanceof FormData) {
// //             bodyData = data;
// //             headers['Content-Type'] = 'multipart/form-data';
// //         } else {
// //             try {
// //                 bodyData = JSON.stringify(data);
// //             } catch (e) {
// //                 bodyData = data;
// //             }
// //         }

// //         console.log('🛰️ Axios Request Log →', {
// //             uri,
// //             method,
// //             headers,
// //             bodyData,
// //             ...params,
// //         });

// //         // Handle 403 - Token expired, try refresh
// //         // if (error.response?.status === 403 && !originalRequest._retry) {
// //         //     originalRequest._retry = true; // prevent infinite loop

// //         //     const refreshToken = getRefreshToken();
// //         //     if (!refreshToken) {
// //         //         console.warn('🔐 No refresh token found.');
// //         //         return Promise.reject(error);
// //         //     }

// //         //     try {
// //         //         const { data: tokenRes } = await axios.post(`${BASE_URL}/user/refresh`, {
// //         //             refreshToken,
// //         //         });

// //         //         // Save new access token
// //         //         setAccessToken(tokenRes?.accessToken);

// //         //         // Retry original request with new token
// //         //         originalRequest.headers.Authorization = `Bearer ${tokenRes?.accessToken}`;

// //         //         return axios(originalRequest);
// //         //     } catch (refreshError) {
// //         //         console.error('🔁 Token refresh failed:', refreshError);
// //         //         return Promise.reject(refreshError);
// //         //     }
// //         // }

// //         return Promise.reject(error);
// //     },
// // );

// // export default apiClient;

// // export const API = {
// //     authApi: {
// //         login: (data: any) => apiClient.post(config.LOGIN, data),
// //         singUp:(data:any)=> apiClient.post(config.SIGN_UP,data)
// //         // refresh_token : (data:any) => apiClient.post(config.REFRESH_TOKEN,data),
// //     },

// // }

// import axios from 'axios';
// import config, { BASE_URL } from './config';
// import {
//   getAccessToken,
//   getRefreshToken,
//   setAccessToken,
// } from './storage';

// const apiClient = axios.create({
//   baseURL: BASE_URL,
// });

// // REQUEST INTERCEPTOR
// apiClient.interceptors.request.use(
//   async config => {
//     const token = await getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // RESPONSE INTERCEPTOR
// apiClient.interceptors.response.use(
//   response => {
//     // Always return only response.data
//     return response.data;
//   },
//   async error => {
//     const originalRequest = error.config;

//     // Log request
//     const { url: uri, method, headers, data, ...params } = originalRequest;
//     let bodyData = null;
//     if (data instanceof FormData) {
//       bodyData = data;
//       headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       try {
//         bodyData = JSON.stringify(data);
//       } catch (e) {
//         bodyData = data;
//       }
//     }

//     console.log('🛰️ Axios Request Log →', {
//       uri,
//       method,
//       headers,
//       bodyData,
//       ...params,
//     });

//     // OPTIONAL: Token Refresh Logic (uncomment if needed)
//     // if (error.response?.status === 403 && !originalRequest._retry) {
//     //   originalRequest._retry = true;

//     //   const refreshToken = await getRefreshToken();
//     //   if (!refreshToken) {
//     //     console.warn('🔐 No refresh token found.');
//     //     return Promise.reject(error);
//     //   }

//     //   try {
//     //     const tokenRes = await axios.post(`${BASE_URL}/user/refresh`, {
//     //       refreshToken,
//     //     });

//     //     const newAccessToken = tokenRes?.data?.accessToken;
//     //     setAccessToken(newAccessToken);
//     //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//     //     return axios(originalRequest);
//     //   } catch (refreshError) {
//     //     console.error('🔁 Token refresh failed:', refreshError);
//     //     return Promise.reject(refreshError);
//     //   }
//     // }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;

// export const API = {
//     authApi: {
//         login: (data: any) => apiClient.post(config.LOGIN, data),
//         singUp:(data:any)=> apiClient.post(config.SIGN_UP,data),
//         logout:(data?:any)=>apiClient.post(config.LOG_OUT),
//         send_otp:(data:any)=>apiClient.post(config.SEND_OTP,data),
//         verify_otp:(data:any)=>apiClient.post(config.VERIFY_OTP,data),
//         reset_password:(data:any)=>apiClient.post(config.REST_PASSWORD,data),
//         // refresh_token : (data:any) => apiClient.post(config.REFRESH_TOKEN,data),
//     },
//     userApi:{
//       user_profile:(data:any)=>apiClient.post(config.USER_PROFILE,data)
//     },
//     homeApi:{
//       categori_list:(data:any)=>apiClient.get(config.CATEGORY_LIST,data),
//       category_booklet:(data:any)=>apiClient.post(config.CATEGORY_LIST,data)
//     }
      
// }


import axios from 'axios';
import config, { BASE_URL } from './config';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from './storage';

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Request Interceptor (adds token + logs)
apiClient.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }


    // Log every API request
    const isFormData = config.data instanceof FormData;
    console.log('📡 API Request →', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: isFormData ? FormData : config.data,
      params: config.params,
    });

    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor (logs + handle error + optional refresh)
apiClient.interceptors.response.use(
  response => {
    // ✅ Log success response (optional)
    // console.log('✅ API Response →', {
    //   url: response.config?.url,
    //   status: response.status,
    //   data: response.data,
    // });

    return response.data;
  },
  async error => {
    const originalRequest = error.config;

    // console.log('❌ API Error →', {
    //   url: originalRequest?.url,
    //   method: originalRequest?.method,
    //   status: error?.response?.status,
    //   message: error?.message,
    //   data: error?.response?.data,
    // });

    // Optional: Token refresh logic
    // if (error.response?.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const refreshToken = await getRefreshToken();

    //   if (!refreshToken) {
    //     console.warn('🔐 No refresh token found.');
    //     return Promise.reject(error);
    //   }

    //   try {
    //     const tokenRes = await axios.post(`${BASE_URL}/user/refresh`, {
    //       refreshToken,
    //     });

    //     const newAccessToken = tokenRes?.data?.accessToken;
    //     setAccessToken(newAccessToken);
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return axios(originalRequest);
    //   } catch (refreshError) {
    //     console.error('🔁 Token refresh failed:', refreshError);
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

export default apiClient;

// --- GROUPED API FUNCTIONS ---
export const API = {
  authApi: {
    login: (data: any) => apiClient.post(config.LOGIN, data),
    singUp: (data: any) => apiClient.post(config.SIGN_UP, data),
    logout: (data?: any) => apiClient.post(config.LOG_OUT),
    send_otp: (data: any) => apiClient.post(config.SEND_OTP, data),
    verify_otp: (data: any) => apiClient.post(config.VERIFY_OTP, data),
    reset_password: (data: any) => apiClient.post(config.REST_PASSWORD, data),
    
    // refresh_token: (data: any) => apiClient.post(config.REFRESH_TOKEN, data),
  },

  userApi: {
    user_profile: (data: any) => apiClient.post(config.USER_PROFILE, data),
    update_user_profile : (data:any)=>apiClient.post(config.UPDATE_USER_PROFILE, data),
    city_list: (data:any)=>apiClient.post(config.CITY_LIST, data),
    user_profile_image:(data:any)=>apiClient.post(config.USER_PROFILE_IMAGE, data)
  },

  homeApi: {
    // categori_list: (limit: number) => apiClient.get(`${config.CATEGORY_LIST}/${limit ?? limit}`, ),
    categori_list: (limit?: number) => {
  const url = limit !== undefined ? `${config.CATEGORY_LIST}/${limit}`: config.CATEGORY_LIST;
  return apiClient.get(url);
},
    category_booklet: (data: any) => apiClient.post(config.CATEGORY_BOOKLET, data),
  },
};
