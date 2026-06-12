import axios from 'axios';
import { getAccessToken, removeAccessToken } from './storage';
import { BaseUrlConfig } from '@config/config';
import config, { BASE_URL } from './config';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import Toast from 'react-native-simple-toast';
// Axios instance
const apiClient = axios.create({
  baseURL: BaseUrlConfig?.WEBSITE_URL,
  timeout: 60000,
});
let logOutref=0
console.log('API Base URL:', BASE_URL);

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
  error => Promise.reject(error),
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
logOutref=0
    return response.data;
  },
  async error => {
    // const originalRequest = error.config;
    // if(error.response?.status === 401 && logOutref==0){
    //    removeAccessToken();
    //         logOutref++
    //           NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Unauthenticated.' &&
      logOutref === 0
    ) {
      logOutref++;

      Toast.show(
        'Your session has expired. Please log in again.',
        Toast.LONG,
      );

      await removeAccessToken();

      NavigationService.reset(routes.NAVIGATION_AUTH_STACK);
    }

    


    return Promise.reject(error);
  },
);

export default apiClient;

// --- GROUPED API FUNCTIONS ---
export const API = {
  authApi: {
    login: (data: any) => apiClient.post(config.LOGIN, data),
    userLogin: (data: any) => apiClient.post(config.USER_LOGGIN, data),
    singUp: (data: any) => apiClient.post(config.SIGN_UP, data),
    logout: (data?: any) => apiClient.post(config.LOG_OUT),
    send_otp: (data: any) => apiClient.post(config.SEND_OTP, data),
    verify_otp: (data: any) => apiClient.post(config.VERIFY_OTP, data),
    reset_password: (data: any) => apiClient.post(config.REST_PASSWORD, data),
    pageApi: (data?: any) => apiClient.get(`${config.PAGE_API}/${data}`),
    customer_send_otp_verify: (data: any) =>
      apiClient.post(config.CUSTOMER_SEND_OTP_VERIFY, data),
    delete_account: (data: any) => apiClient.post(config.DELETE_ACCOUNT, data),
    getAppVersion: (data?: any) => apiClient.get(config.APP_VERSION),
    maintenance_status: () => apiClient.get(config.MAINTENANCE_STATUS),
    // refresh_token: (data: any) => apiClient.post(config.REFRESH_TOKEN, data),
  },

  userApi: {
    user_profile: (data: any) => apiClient.post(config.USER_PROFILE, data),
    update_user_profile: (data: any) =>
      apiClient.post(config.UPDATE_USER_PROFILE, data),
    city_list: (data: any) => apiClient.post(config.CITY_LIST, data),
    user_profile_image: (data: any) =>
      apiClient.post(config.USER_PROFILE_IMAGE, data),
  },

  homeApi: {
    // categori_list: (limit: number) => apiClient.get(`${config.CATEGORY_LIST}/${limit ?? limit}`, ),
    categori_list: (limit?: number) => {
      const url =
        limit !== undefined
          ? `${config.CATEGORY_LIST}/${limit}`
          : config.CATEGORY_LIST;
      return apiClient.get(url);
    },
    category_booklet: (data: any) =>
      apiClient.post(config.CATEGORY_BOOKLET, data),
    banner_api: (data: any) => apiClient.post(config.BANNER_API, data),
    booklet_list: (data: any) =>
      apiClient.get(
        `${config.BOOKLET_LIST}/${data?.id}?search=${data?.search ?? ''}`,
      ),
    booklet_detail: (data: any) => apiClient.post(config.BOOKLET_DETAIL, data),
    combo_booklet_detail: (data: any) =>
      apiClient.post(config.COMBO_BOOKLET_DETAIL, data),
    booklet_request: (data: any) =>
      apiClient.post(config.BOOKLET_REQUEST, data),
    executive_booklet_request: (data: any) =>
      apiClient.post(config.EXECUTIVE_BOOKLET_REQUEST, data),
    combo_booklet_deals: (data: any) =>
      apiClient.post(config.COMBO_BOOKLET_DEALS, data),
    create_leads: (data: any) => apiClient.post(config.CREATE_LEADS, data),
    myReport_Coupon_List: (data: any) =>
      apiClient.post(config.MY_REPORT_COUPON_LIST, data),
  },
  myRequestApi: {
    myRequest_List: (data: any) => apiClient.post(config.MY_REQUEST_LIST, data),
    myRequest_Coupon_List: (data: any) =>
      apiClient.post(config.MY_REQUEST_COUPON_LIST, data),
  },
  myCardApi: {
    myCard_List: (data: any) =>
      apiClient.post(config.MY_CARD_BOOKLET_LIST, data),
    myCard_Coupon_List: (data: any) =>
      apiClient.post(config.MY_CARD_COUPON_LIST, data),
    combo_Deals_List: (data: any) =>
      apiClient.post(config.COMBO_DEALS_LIST, data),
    myCard_Combo_Offers_List: (data: any) =>
      apiClient.post(config.MY_CARD_COMBO_OFFERS_LIST, data),

    myCard_Coupon: (data: any) => apiClient.post(config.MY_CARD_COUPON, data),
    // coupon-code-generate
    coupon_code_genrate: (data: any) =>
      apiClient.post(config.COUPON_CODE_GENRATE, data),
  },

  dealApi: {
    vendor_Booklet_List: (data: any) =>
      apiClient.get(`${config.VENDOR_BOOKLET_LIST}`, data),
    vendor_user_list: (data: any) =>
      apiClient.post(config.VENDOR_USER_LIST, data),
    vendor_coupon_list: (data: any) =>
      apiClient.post(config.VENDOR_COUPON_LIST, data),
    scan_coupon_code: (data: any) =>
      apiClient.post(config.SCAN_COUPON_CODE, data),
    enter_bar_coupon_code: (data: any) =>
      apiClient.post(config.COUPON_BAR__CODE, data),
    vendor_booklet_coupon_list: (data: any) =>
      apiClient.post(config.VENDOR_BOOKLET_COUPON_LIST, data),
  },
  historyApi: {
    vendor_history_list: (data: any) =>
      apiClient.post(config.VENDOR_HISTORY_LIST, data),
  },
  executiveRequestApi: {
    executive_Request_List: (data: any) =>
      apiClient.post(config.EXECUTIVE_REQUEST_LIST, data),
    execuitve_Request_User_Details: (data: any) =>
      apiClient.post(config.EXECUTIVE_REQUEST_USER_DETAIILS, data),
    executive_Request_Status_Change: (data: any) =>
      apiClient.post(config.EXECUTIVE_REQUEST_STATUS_CHANGE, data),
    executive_payment_image_upload: (data: any) =>
      apiClient.post(config.EXECUTIVE_PAYMENT_IMAGE_UPLOAD, data),
  },

    cartApi: {
    add_to_cart: (data: any) => apiClient.post(config.ADD_CART, data),

    cart_list: () => apiClient.get(config.CART_LIST),

    update_cart_quantity: (data: any) =>
      apiClient.post(config.UPDATE_CART_QUANTITY, data),

    remove_cart: (data: any) => apiClient.post(config.REMOVE_CART, data),
    payment_initiate :(data: any) => apiClient.post(config.PHONEPE_INITIATE, data)
  },
};
