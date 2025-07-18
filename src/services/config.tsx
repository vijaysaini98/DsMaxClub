export const BASE_URL = 'https://dsmax.webplanetsoft.com/api/' ;
export const IMGE_URL = 'https://dsmax.webplanetsoft.com/storage/';

// authApi
const LOGIN: string = `${BASE_URL}login`;
const SIGN_UP:string= `${BASE_URL}customer-register`;
const LOG_OUT:string =`${BASE_URL}customer-logout`;
const SEND_OTP:string=`${BASE_URL}send-otp-to-email`;
const VERIFY_OTP:string=`${BASE_URL}verify-otp`;
const REST_PASSWORD:string = `${BASE_URL}reset-password`;


 // userApi
 const USER_PROFILE:string=`${BASE_URL}edit-profile`;
 const UPDATE_USER_PROFILE:string = `${BASE_URL}update-profile`;
 const CITY_LIST:string=`${BASE_URL}cities`;
 const USER_PROFILE_IMAGE :string = `${BASE_URL}update-profile-image`

 //categories Api
 const CATEGORY_LIST :string = `${BASE_URL}category-list`;
const CATEGORY_BOOKLET:string = `${BASE_URL}category-booklet`;

const config = {
  BASE_URL,
  LOGIN,
  SIGN_UP,
  LOG_OUT,
  SEND_OTP,
  VERIFY_OTP,
  REST_PASSWORD,
  CITY_LIST,

  USER_PROFILE,
  UPDATE_USER_PROFILE,
  USER_PROFILE_IMAGE,

  CATEGORY_LIST,
  CATEGORY_BOOKLET,
};

export default config;
