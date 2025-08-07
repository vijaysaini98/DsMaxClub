import {
  automobile,
  cinemahall,
  gameZone,
  healthCare,
  hotelsDeals,
  resort,
  restaurant,
  salon,
  waterPark,
} from '@helper/imagesAssets';
import moment from 'moment';
import { Alert, Dimensions, Linking, Platform, Share } from 'react-native';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/; // At least 8 characters, one letter and one number
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8}$/

export const { width, height } = Dimensions.get('window');

export const getCategoryDetails = (title: string) => {
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

export const openPhoneDialer = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone dialer is not supported on this device.');
      }
    })
    .catch(err => console.error('Dialer Error', err));
};

export const openEmail = (email: string) => {
  const url = `mailto:${email}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Email client is not available.');
      }
    })
    .catch(err => console.error('Email Error', err));
};

export const openMap = (
  latitude: number,
  longitude: number,
  label = 'Location',
) => {
  const url = Platform.select({
    ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
    android: `geo:0,0?q=${latitude},${longitude}(${label})`,
  });

  Linking.canOpenURL(url!)
    .then(supported => {
      if (supported) {
        Linking.openURL(url!);
      } else {
        Alert.alert('Error', 'Map application is not available.');
      }
    })
    .catch(err => console.error('Map Error', err));
};

export const shareToAny = (message: string) => {
  const shareOptions = {
    message: message,
  };

  Share.share(shareOptions);
};

export const vendorViewdetails = (value: any) => {
  let data = [
    {
      id: 1,
      title: 'Price : ',
      value: 'Rs. 400/-',
    },
    {
      id: 2,
      title: 'Valid Till : ',
      value: moment(value?.valid_till).format('D MMMM YYYY'),
    },
    {
      id: 3,
      title: 'Redeem Date : ',
      // value:value?.redeem_date
      value: moment(value?.redeem_date).format('D MMMM YYYY'),
    },
    {
      id: 4,
      title: 'Location :  ',
      value: '25 A Tonk Road Jaipur',
    },
    {
      id: 5,
      title: 'Customer : ',
      value: value?.customer?.name ?? '---',
    },
    {
      id: 6,
      title: 'Customer Number :',
      value: value?.customer?.mobile ?? '--',
    },
  ];
  return data;
};
