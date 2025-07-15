export const BASE_URL = 'https://dsmax.webplanetsoft.com/api/' ;

const LOGIN: string = `${BASE_URL}login`;
const SIGN_UP:string= `${BASE_URL}customer-register`;
const LOG_OUT:string =`${BASE_URL}customer-logout`;
const CATEGORY_LIST :string = `${BASE_URL}category-list`;
const CATEGORY_BOOKLET:string = `${BASE_URL}category-booklet`

const config = {
  BASE_URL,
  LOGIN,
  SIGN_UP,
  LOG_OUT,
  CATEGORY_LIST,
  CATEGORY_BOOKLET
};

export default config;
