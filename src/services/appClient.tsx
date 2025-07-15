import axios from 'axios';
import config, { BASE_URL } from './config';
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
} from './storage';
// import config, {BASE_URL} from './config';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Interceptor
apiClient.interceptors.request.use(
    config => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);


apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Log request details
        const { url: uri, method, headers, data, ...params } = originalRequest;

        let bodyData = null;
        if (data instanceof FormData) {
            bodyData = data;
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            try {
                bodyData = JSON.stringify(data);
            } catch (e) {
                bodyData = data;
            }
        }

        console.log('🛰️ Axios Request Log →', {
            uri,
            method,
            headers,
            bodyData,
            ...params,
        });

        // Handle 403 - Token expired, try refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // prevent infinite loop

            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                console.warn('🔐 No refresh token found.');
                return Promise.reject(error);
            }

            try {
                const { data: tokenRes } = await axios.post(`${BASE_URL}/user/refresh`, {
                    refreshToken,
                });

                // Save new access token
                setAccessToken(tokenRes?.accessToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${tokenRes?.accessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.error('🔁 Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;

export const API = {
    authApi: {
        login: (data: any) => apiClient.post(config.LOGIN, data),
        singUp:(data:any)=> apiClient.post(config.SIGN_UP,data)
        // refresh_token : (data:any) => apiClient.post(config.REFRESH_TOKEN,data),
    },

}