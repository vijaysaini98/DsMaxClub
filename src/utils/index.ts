import { Dimensions } from "react-native";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number

export const { width,height } = Dimensions.get('window');
