import { BaseUrlConfig } from '@config/config';

export const BASE_URL = BaseUrlConfig?.WEBSITE_URL;
export const IMGE_URL = BaseUrlConfig?.IMAGE_URL;

// authApi
const LOGIN: string = `${BASE_URL}login`;
const USER_LOGGIN: string = `${BASE_URL}login-register`;
const SIGN_UP: string = `${BASE_URL}customer-register`;
const LOG_OUT: string = `${BASE_URL}customer-logout`;
const SEND_OTP: string = `${BASE_URL}send-otp-to-email`;
const VERIFY_OTP: string = `${BASE_URL}verify-otp`;
const REST_PASSWORD: string = `${BASE_URL}reset-password`;
const CUSTOMER_SEND_OTP_VERIFY: string = `${BASE_URL}send-customer-email-otp`;
const DELETE_ACCOUNT: string = `${BASE_URL}delete-customer-account`;
const APP_VERSION: string = `${BASE_URL}get-userapp-version`;
// const MAINTENANCE_STATUS: string = `${BASE_URL}maintenance/status`;
const MAINTENANCE_STATUS: string = `${BASE_URL}app-settings`;

// userApi
const USER_PROFILE: string = `${BASE_URL}edit-profile`;
const UPDATE_USER_PROFILE: string = `${BASE_URL}update-profile`;
const CITY_LIST: string = `${BASE_URL}cities`;
const USER_PROFILE_IMAGE: string = `${BASE_URL}update-profile-image`;
const BANNER_API: string = `${BASE_URL}banner-list`;

//categories Api
const CATEGORY_LIST: string = `${BASE_URL}category-list`;
const CATEGORY_BOOKLET: string = `${BASE_URL}category-booklet`;
const BOOKLET_LIST: string = `${BASE_URL}booklet-list`;
const BOOKLET_DETAIL: string = `${BASE_URL}booklet-details`;
const COMBO_BOOKLET_DETAIL: string = `${BASE_URL}combo-booklet-details`;
const BOOKLET_REQUEST: string = `${BASE_URL}my-request`;
const PAGE_API: string = `${BASE_URL}page`;
const MY_REQUEST_LIST: string = `${BASE_URL}myrequest-list`;
const MY_REQUEST_COUPON_LIST = `${BASE_URL}myrequest-coupon-list`;
const MY_CARD_BOOKLET_LIST: string = `${BASE_URL}mycard-list`;
const MY_CARD_COUPON_LIST: string = `${BASE_URL}mycard-coupon-list`;
const MY_CARD_COUPON: string = `${BASE_URL}mycard-coupons`;
const MY_CARD_COMBO_OFFERS_LIST: string = `${BASE_URL}mycard-vendor-list`;
const COUPON_CODE_GENRATE: string = `${BASE_URL}coupon-code-generate`;
const COMBO_BOOKLET_DEALS: string = `${BASE_URL}combo-booklet`;

const COMBO_DEALS_LIST: string = `${BASE_URL}combo-booklet-vendor-list`;
const CREATE_LEADS: string = `${BASE_URL}create-leads`;

//vendor Api's
const VENDOR_BOOKLET_LIST: string = `${BASE_URL}vendor-booklet-deals`;
const VENDOR_COUPON_LIST: string = `${BASE_URL}vendor-coupon-list`;
const SCAN_COUPON_CODE: string = `${BASE_URL}vendor-coupon-scan`;
const COUPON_BAR__CODE: string = `${BASE_URL}vendor-coupon-scan-by-code`;
const VENDOR_USER_LIST: string = `${BASE_URL}vendor-user-list`;
const VENDOR_BOOKLET_COUPON_LIST: string = `${BASE_URL}vendor-booklet-coupons`;
const VENDOR_HISTORY_LIST: string = `${BASE_URL}vendor-coupon-history`;
const MY_REPORT_COUPON_LIST: string = `${BASE_URL}vendor-report-list`;

//executive api's
const EXECUTIVE_BOOKLET_REQUEST: string = `${BASE_URL}executive-request-send`;
const EXECUTIVE_REQUEST_LIST: string = `${BASE_URL}executive-request-list`;
const EXECUTIVE_REQUEST_USER_DETAIILS: string = `${BASE_URL}executive-request-userdetail`;
const EXECUTIVE_REQUEST_STATUS_CHANGE: string = `${BASE_URL}executive-request-status-change`;
const EXECUTIVE_PAYMENT_IMAGE_UPLOAD: string = `${BASE_URL}update-payment-image`;

const ADD_CART: string = `${BASE_URL}cart/add`;
const CART_LIST: string = `${BASE_URL}cart`;
const UPDATE_CART_QUANTITY: string = `${BASE_URL}cart/update-quantity`;
const REMOVE_CART: string = `${BASE_URL}cart/remove`;
const PHONEPE_INITIATE: string = `${BASE_URL}payment/initiate`;
const PAYMENT_STATUS: string = `${BASE_URL}payment/status`;
const EXECUTIVE_CART_REQUEST_SEND: string = `${BASE_URL}executive-cart-request-send`;


const config = {
  BASE_URL,
  LOGIN,
  USER_LOGGIN,
  SIGN_UP,
  LOG_OUT,
  SEND_OTP,
  VERIFY_OTP,
  REST_PASSWORD,
  CITY_LIST,
  CUSTOMER_SEND_OTP_VERIFY,
  DELETE_ACCOUNT,

  APP_VERSION,
  MAINTENANCE_STATUS,

  USER_PROFILE,
  UPDATE_USER_PROFILE,
  USER_PROFILE_IMAGE,

  CATEGORY_LIST,
  CATEGORY_BOOKLET,
  BANNER_API,
  PAGE_API,

  BOOKLET_LIST,
  BOOKLET_DETAIL,
  COMBO_BOOKLET_DETAIL,
  BOOKLET_REQUEST,
  COMBO_BOOKLET_DEALS,
  CREATE_LEADS,

  MY_REQUEST_LIST,
  MY_REQUEST_COUPON_LIST,

  MY_CARD_BOOKLET_LIST,
  MY_CARD_COUPON_LIST,
  MY_CARD_COUPON,
  COUPON_CODE_GENRATE,
  COMBO_DEALS_LIST,
  MY_CARD_COMBO_OFFERS_LIST,

  VENDOR_BOOKLET_LIST,
  VENDOR_COUPON_LIST,
  VENDOR_BOOKLET_COUPON_LIST,
  SCAN_COUPON_CODE,
  COUPON_BAR__CODE,
  VENDOR_USER_LIST,

  VENDOR_HISTORY_LIST,

  EXECUTIVE_BOOKLET_REQUEST,
  EXECUTIVE_REQUEST_LIST,
  EXECUTIVE_REQUEST_USER_DETAIILS,
  EXECUTIVE_REQUEST_STATUS_CHANGE,
  EXECUTIVE_PAYMENT_IMAGE_UPLOAD,

  MY_REPORT_COUPON_LIST,

  ADD_CART,
  CART_LIST,
  UPDATE_CART_QUANTITY,
  REMOVE_CART,
  PHONEPE_INITIATE,
  PAYMENT_STATUS,
  EXECUTIVE_CART_REQUEST_SEND,

};

export default config;
