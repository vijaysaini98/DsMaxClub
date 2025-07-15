import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const Access_Token: string = 'accessToken';
export const Refresh_Token: string = 'refreshToken';
export const First_Time :boolean = true

export const setAccessToken = (token: string) => {
  storage.set(Access_Token, token);
};

export const getAccessToken = () => {
  return storage.getString(Access_Token);
};

export const removeAccessToken = () => {
  storage.delete(Access_Token);
};

export const setRefreshToken = (token: string) => {
  storage.set(Refresh_Token, token);
};

export const getRefreshToken = () => {
  return storage.getString(Refresh_Token);
};

export const removeRefreshToken = () => {
  storage.delete(Refresh_Token);
};
