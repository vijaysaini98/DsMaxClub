import { automobile, cinemahall, gameZone, healthCare, hotelsDeals, resort, restaurant, salon, waterPark } from "@helper/imagesAssets";
import { Dimensions } from "react-native";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one letter and one number

export const { width,height } = Dimensions.get('window');

export const getCategoryDetails = (title:string) => {
    console.log("title",title);
    
  switch (title) {
    case 'Restro BAR':
      return { icon: restaurant, borderColor: '#FFA07A' };
    case 'Hotels & Resorts':
      return { icon: resort, borderColor: '#DA70D6' };
    case 'Waterpark':
      return { icon: waterPark, borderColor: '#87CEFA' };
    case 'Salon':
      return { icon: salon, borderColor: '#FFB6C1' };
    case 'Game Zone':
      return { icon: gameZone, borderColor: '#FFD700' };
    case 'Cinema Hall':
      return { icon: cinemahall, borderColor: '#CD5C5C' };
    case 'Healthcare':
      return { icon: healthCare, borderColor: '#20B2AA' };
    case 'Hotels Deals':
      return { icon: hotelsDeals, borderColor: '#F0E68C' };
    case 'Automobiles':
      return { icon: automobile, borderColor: '#1E90FF' };
    default:
      return { icon: null, borderColor: '#000000' }; // fallback
  }
};