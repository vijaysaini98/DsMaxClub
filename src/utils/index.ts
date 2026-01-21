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
import { OpenMapArgs } from 'src/types/common';
import DeviceInfo from 'react-native-device-info';

export let version = DeviceInfo.getVersion();
export let buildVersion = DeviceInfo.getBuildNumber();

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

// export const openPhoneDialer = (phoneNumber: string) => {
//   // const url = `tel:${phoneNumber}`;
//    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, '');
//    const url =`tel:${formattedNumber}`
//   Linking.canOpenURL(url)
//     .then(supported => {
//       if (supported) {
//         Linking.openURL(url);
//       } else {
//         Alert.alert('Error', 'Phone dialer is not supported on this device.');
//       }
//     })
//     .catch(err => console.error('Dialer Error', err));
// };



export const openPhoneDialer = async (phoneNumber: string) => {
  try {
    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, '');
    const url = Platform.OS === 'android'
      ? `tel:${formattedNumber}`
      : `telprompt:${formattedNumber}`;

    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Error', 'Unable to open phone dialer');
    console.error('Dialer Error:', error);
  }
};


export const openEmail = async (email: string) => {
  try {
    const url = `mailto:${email}`;
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Error', 'No email app found on this device');
    console.error('Email Error:', error);
  }
};

// export const openEmail = (email: string) => {
//   const url = `mailto:${email}`;
//   Linking.canOpenURL(url)
//     .then(supported => {
//       if (supported) {
//         Linking.openURL(url);
//       } else {
//         Alert.alert('Error', 'Email client is not available.');
//       }
//     })
//     .catch(err => console.error('Email Error', err));
// };
// 26.840505849413052, 75.68784130442054

export const openMap = ({ lat, lng, label }: OpenMapArgs) => {
  const scheme = Platform.select({
    ios: `maps://?q=${label}&ll=${lat},${lng}`,
    android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
  });

  if (scheme) {
    Linking.openURL(scheme).catch(err => {
      Alert.alert('Location No found');
      console.error('Error opening map: ', err);
    });
  }
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

// export const extractLatLngFromUrl = (url: string): { lat: string; lng: string } | null => {
//   const regex = /@([-.\d]+),([-.\d]+)/;
//   const match = url.match(regex);
//   if (match && match.length >= 3) {
//     return {
//       lat: match[1],
//       lng: match[2],
//     };
//   }
//   return null;
// };

export const extractLatLngFromUrl = (
  url: string,
): { lat: string; lng: string } | null => {
  if (!url) return null;

  try {
    // 1. Direct match like /@lat,lng
    let regex = /@([-.\d]+),([-.\d]+)/;
    let match = url.match(regex);
    if (match && match.length >= 3) {
      return { lat: match[1], lng: match[2] };
    }

    // 2. Query params ?q=lat,lng OR ?daddr=lat,lng
    const parsedUrl = new URL(url);
    const q =
      parsedUrl.searchParams.get('q') || parsedUrl.searchParams.get('daddr');

    if (q) {
      const coords = q.split(',');
      if (coords.length >= 2) {
        return { lat: coords[0], lng: coords[1] };
      }
    }

    // 3. Sometimes lat/lng comes inside "ll" param
    const ll = parsedUrl.searchParams.get('ll');
    if (ll) {
      const coords = ll.split(',');
      if (coords.length >= 2) {
        return { lat: coords[0], lng: coords[1] };
      }
    }
  } catch (error) {
    console.warn('extractLatLngFromUrl error:', error);
  }

  return null; // ❌ No coords found
};


export function isNewerVersion(oldVer, newVer) {
  const oldParts = oldVer?.split('.');
  const newParts = newVer?.split('.');
  for (var i = 0; i < newParts?.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
}
