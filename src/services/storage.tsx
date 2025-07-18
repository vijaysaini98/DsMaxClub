import AsyncStorage from "@react-native-async-storage/async-storage";

export const Access_Token: string = 'accessToken';
export const Refresh_Token: string = 'refreshToken';
export const First_Time: boolean = true;
export const USER_TYPE:string = 'userType';
export const USER_ID:string ='user_id'

// Save access token
export const setAccessToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(Access_Token, token);
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

export const setItem = async (KeyName:string,token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KeyName, token);
  } catch (error) {
    console.error(`Error setting ${KeyName} token:`, error);
  }
};

export const getItem = async (KeyName:string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KeyName);
  } catch (error) {
    console.error(`Error setting ${KeyName} token:`, error);
    return null;
  }
};

export const removeItem = async (KeyName:string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KeyName);
  } catch (error) {
    console.error(`Error setting ${KeyName} token:`, error);
  }
};
// Get access token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(Access_Token);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Remove access token
export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(Access_Token);
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

// Save refresh token
export const setRefreshToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(Refresh_Token, token);
  } catch (error) {
    console.error('Error setting refresh token:', error);
  }
};

// Get refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(Refresh_Token);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

// Remove refresh token
export const removeRefreshToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(Refresh_Token);
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};
