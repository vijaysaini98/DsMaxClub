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
    pageApi: (data?: any) => apiClient.get(`${config.PAGE_API}/${data}`),
    customer_send_otp_verify:(data: any) => apiClient.post(config.CUSTOMER_SEND_OTP_VERIFY, data)

    // refresh_token: (data: any) => apiClient.post(config.REFRESH_TOKEN, data),
  },

  userApi: {
    user_profile: (data: any) => apiClient.post(config.USER_PROFILE, data),
    update_user_profile: (data: any) => apiClient.post(config.UPDATE_USER_PROFILE, data),
    city_list: (data: any) => apiClient.post(config.CITY_LIST, data),
    user_profile_image: (data: any) => apiClient.post(config.USER_PROFILE_IMAGE, data)
  },

  homeApi: {
    // categori_list: (limit: number) => apiClient.get(`${config.CATEGORY_LIST}/${limit ?? limit}`, ),
    categori_list: (limit?: number) => {
      const url = limit !== undefined ? `${config.CATEGORY_LIST}/${limit}` : config.CATEGORY_LIST;
      return apiClient.get(url);
    },
    category_booklet: (data: any) => apiClient.post(config.CATEGORY_BOOKLET, data),
    banner_api: (data: any) => apiClient.post(config.BANNER_API, data),
    booklet_list: (data: any) => apiClient.get(`${config.BOOKLET_LIST}/${data?.id}?search=${data?.search ?? ""}`,),
    booklet_detail: (data: any) => apiClient.post(config.BOOKLET_DETAIL, data),
    booklet_request: (data: any) => apiClient.post(config.BOOKLET_REQUEST, data)
  },
  myRequestApi: {
    myRequest_List: (data: any) => apiClient.post(config.MY_REQUEST_LIST, data),
    myRequest_Coupon_List: (data: any) => apiClient.post(config.MY_REQUEST_COUPON_LIST, data),
  },
  myCardApi: {
    myCard_List: (data: any) => apiClient.post(config.MY_CARD_BOOKLET_LIST, data),
    myCard_Coupon_List: (data: any) => apiClient.post(config.MY_CARD_COUPON_LIST, data),
    myCard_Coupon: (data: any) => apiClient.post(config.MY_CARD_COUPON, data),
    // coupon-code-generate
    coupon_code_genrate: (data: any) => apiClient.post(config.COUPON_CODE_GENRATE, data)
  },

  dealApi: {
    vendor_Booklet_List: (data: any) => apiClient.get(`${config.VENDOR_BOOKLET_LIST}`, data),
    vendor_user_list:(data: any) => apiClient.post(config.VENDOR_USER_LIST, data),
    vendor_coupon_list:(data: any) => apiClient.post(config.VENDOR_COUPON_LIST, data),
    scan_coupon_code:(data: any) => apiClient.post(config.SCAN_COUPON_CODE, data)
  },
  historyApi:{
    vendor_history_list:(data: any) => apiClient.post(config.VENDOR_HISTORY_LIST, data)
  }

};
