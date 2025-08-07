export const BASE_URL = 'https://dsmax.webplanetsoft.com/api/';
export const IMGE_URL = 'https://dsmax.webplanetsoft.com/storage/';

// authApi
const LOGIN: string = `${BASE_URL}login`;
const SIGN_UP: string = `${BASE_URL}customer-register`;
const LOG_OUT: string = `${BASE_URL}customer-logout`;
const SEND_OTP: string = `${BASE_URL}send-otp-to-email`;
const VERIFY_OTP: string = `${BASE_URL}verify-otp`;
const REST_PASSWORD: string = `${BASE_URL}reset-password`;
const CUSTOMER_SEND_OTP_VERIFY:string=`${BASE_URL}send-customer-email-otp`


// userApi
const USER_PROFILE: string = `${BASE_URL}edit-profile`;
const UPDATE_USER_PROFILE: string = `${BASE_URL}update-profile`;
const CITY_LIST: string = `${BASE_URL}cities`;
const USER_PROFILE_IMAGE: string = `${BASE_URL}update-profile-image`
const BANNER_API: string = `${BASE_URL}banner-list`;

//categories Api
const CATEGORY_LIST: string = `${BASE_URL}category-list`;
const CATEGORY_BOOKLET: string = `${BASE_URL}category-booklet`;
const BOOKLET_LIST: string = `${BASE_URL}booklet-list`;
const BOOKLET_DETAIL: string = `${BASE_URL}booklet-details`;
const BOOKLET_REQUEST: string = `${BASE_URL}my-request`
const PAGE_API: string = `${BASE_URL}page`;
const MY_REQUEST_LIST: string = `${BASE_URL}myrequest-list`;
const MY_REQUEST_COUPON_LIST = `${BASE_URL}myrequest-coupon-list`;
const MY_CARD_BOOKLET_LIST: string = `${BASE_URL}mycard-list`;
const MY_CARD_COUPON_LIST: string = `${BASE_URL}mycard-coupon-list`;
const MY_CARD_COUPON: string = `${BASE_URL}mycard-coupons`;
const COUPON_CODE_GENRATE: string = `${BASE_URL}coupon-code-generate`;

const VENDOR_BOOKLET_LIST: string = `${BASE_URL}vendor-booklet-deals`;
const VENDOR_COUPON_LIST: string = `${BASE_URL}vendor-coupon-list`;
const SCAN_COUPON_CODE: string = `${BASE_URL}vendor-coupon-scan`;
const  VENDOR_USER_LIST:string= `${BASE_URL}vendor-user-list`

const VENDOR_HISTORY_LIST:string = `${BASE_URL}vendor-coupon-history`


const config = {
  BASE_URL,
  LOGIN,
  SIGN_UP,
  LOG_OUT,
  SEND_OTP,
  VERIFY_OTP,
  REST_PASSWORD,
  CITY_LIST,
  CUSTOMER_SEND_OTP_VERIFY,

  USER_PROFILE,
  UPDATE_USER_PROFILE,
  USER_PROFILE_IMAGE,

  CATEGORY_LIST,
  CATEGORY_BOOKLET,
  BANNER_API,
  PAGE_API,

  BOOKLET_LIST,
  BOOKLET_DETAIL,
  BOOKLET_REQUEST,

  MY_REQUEST_LIST,
  MY_REQUEST_COUPON_LIST,

  MY_CARD_BOOKLET_LIST,
  MY_CARD_COUPON_LIST,
  MY_CARD_COUPON,
  COUPON_CODE_GENRATE,

  VENDOR_BOOKLET_LIST,
  VENDOR_COUPON_LIST,
  SCAN_COUPON_CODE,
  VENDOR_USER_LIST,

  VENDOR_HISTORY_LIST

};

export default config;
