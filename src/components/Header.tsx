// import { useEffect, useRef, useState } from "react";
// import CityDropDown, { CityOption } from "./cityDropDown";
// import { cities } from "@helper/dumyData";
// import { Image, StyleSheet, View } from "react-native";
// import { AppText, BOLD, SIXTEEN, THIRTEEN } from "./AppText";
// import TouchableOpacityView from "./TouchableOpacityView";
// import { downArrowIcon, locationIcon } from "@helper/imagesAssets";
// import { colors } from "@theme/colors";
// import { useAppDispatch, useAppSelector } from "@redux/hooks";
// import { updateUserProfile } from "@actions/auth/authAction";

// interface HeaderProps {
//   userName?: string;
//   city?: string;
//   currentCity?:boolean;
//   reloadScreen?:()=>void
// }

// const Header: React.FC<HeaderProps> = ({ userName, city, currentCity,reloadScreen}) => {
//   const dispatch = useAppDispatch()
//   const { userData, cityList } = useAppSelector((state) => state.auth)
//   const bottomSheetRef = useRef<RBSheet>(null);

//   const [selectedCity, setSelectedCity] = useState<CityOption>();
//   const [searchCityText, setSearchCityText] = useState<string>('');
//   const [filteredLocations, setFilteredLocations] = useState<CityOption[]>(cityList);

//   useEffect(() => {
//     if (userData?.current_city && userData?.current_city_name) {
//       setSelectedCity({ id: userData.current_city, label: userData.current_city_name });
//     }
//   }, [userData]);

//   const openBottomSheet = () => {
//     setSearchCityText('');
//     setFilteredLocations(cityList);
//     bottomSheetRef.current?.open();
//   };

//   const handleSearch = (text: string) => {
//     setSearchCityText(text);
//     const filtered = cityList.filter((location) =>
//       location?.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredLocations(filtered);
//   };

//   const selectLocation = (location) => {
//     setSelectedCity({ id: location?.id, label: location?.name });
//     let data = {
//       current_city: location?.id,
//       name: userData?.name,
//       mobile: userData?.mobile,
//       city: userData?.city,
//     }
//     dispatch(updateUserProfile(data, { userid: userData?.uuid }, onSucess,"header"))

//   };

//   const onSucess = () => {
//     bottomSheetRef.current?.close();
//   }
  
//   return (
//     <>
//       <View style={styles.headerContainer}>
//         <View style={styles.nameContainer} >
//           <AppText type={SIXTEEN}>{`Hello ${userData?.user_type == 2 ? "User" : userData?.user_type == 1 ? "Executive" : "Vendor"}!`}</AppText>
//           <AppText
//             numberOfLines={2}
//             type={SIXTEEN} weight={BOLD}>
//             {userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice(1).toLowerCase() || "UserName"}
//           </AppText>
//         </View>
//         {!currentCity && (
          
//           <TouchableOpacityView
//           style={styles.locationContainer}
//           onPress={openBottomSheet}
//         >
//           <Image
//             source={locationIcon}
//             style={styles.locationIcon}
//             resizeMode="contain"
//           />
//           <AppText type={selectedCity ? SIXTEEN : THIRTEEN}
//             numberOfLines={1}
//             style={styles.cityText}
//             color={!selectedCity ?? colors.placeholder}
//           >
//             {selectedCity?.label || userData?.current_city_name || "Select your city"}
//           </AppText>
//           <Image
//             source={downArrowIcon}
//             style={styles.downArrowIcon}
//             resizeMode="contain"
//           />
//         </TouchableOpacityView>)}
//       </View>
//       <CityDropDown
//         bottomSheetRef={bottomSheetRef}
//         value={searchCityText}
//         handleSearch={handleSearch}
//         data={filteredLocations}
//         handleSelectOption={selectLocation}
//       />
//     </>
//   )
// };

// export default Header;

// const styles = StyleSheet.create({
//   headerContainer: {
//     width: "100%",
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   nameContainer: {
//     width: "50%"
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     width: "50%",
//   },
//   locationIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 5,
//   },
//   cityText: {
//     marginRight: 6,
//     maxWidth: "60%"
//   },
//   downArrowIcon: {
//     width: 20,
//     height: 8,
//     tintColor: colors.placeholder,
//   },
// })


import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import CityDropDown, { CityOption } from './cityDropDown';
import { AppText, BOLD, SIXTEEN, THIRTEEN } from './AppText';
import TouchableOpacityView from './TouchableOpacityView';

import {
  downArrowIcon,
  locationIcon,
  addToCardIcon,
} from '@helper/imagesAssets';

import { colors } from '@theme/colors';

import {
  useAppDispatch,
  useAppSelector,
} from '@redux/hooks';

import { updateUserProfile } from '@actions/auth/authAction';

import { CART_SCREEN } from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';

interface HeaderProps {
  userName?: string;
  city?: string;
  currentCity?: boolean;
  reloadScreen?: () => void;
  showCart?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentCity,
  reloadScreen,
  showCart = false,
}) => {
  const dispatch = useAppDispatch();

  const { userData, cityList } = useAppSelector(
    state => state.auth,
  );

  const { cartList } = useAppSelector(
    state => state.cart,
  );

  const bottomSheetRef = useRef<RBSheet>(null);

  const [selectedCity, setSelectedCity] =
    useState<CityOption>();

  const [searchCityText, setSearchCityText] =
    useState('');

  const [filteredLocations, setFilteredLocations] =
    useState<CityOption[]>(cityList);

  useEffect(() => {
    if (
      userData?.current_city &&
      userData?.current_city_name
    ) {
      setSelectedCity({
        id: userData.current_city,
        label: userData.current_city_name,
      });
    }
  }, [userData]);

  useEffect(() => {
    setFilteredLocations(cityList);
  }, [cityList]);

  const openBottomSheet = () => {
    setSearchCityText('');
    setFilteredLocations(cityList);
    bottomSheetRef.current?.open();
  };

  const handleSearch = (text: string) => {
    setSearchCityText(text);

    const filtered = cityList.filter(location =>
      location?.name
        ?.toLowerCase()
        .includes(text.toLowerCase()),
    );

    setFilteredLocations(filtered);
  };

  const onSuccess = () => {
    bottomSheetRef.current?.close();
    reloadScreen?.();
  };

  const selectLocation = (location: any) => {
    setSelectedCity({
      id: location?.id,
      label: location?.name,
    });

    const data = {
      current_city: location?.id,
      name: userData?.name,
      mobile: userData?.mobile,
      city: userData?.city,
    };

    dispatch(
      updateUserProfile(
        data,
        { userid: userData?.uuid },
        onSuccess,
        'header',
      ),
    );
  };

  const userType =
    userData?.user_type === 2
      ? 'User'
      : userData?.user_type === 1
      ? 'Executive'
      : 'Vendor';

  return (
    <>
      <View style={styles.headerContainer}>
        {/* Left Side */}
        <View style={styles.nameContainer}>
          <AppText type={SIXTEEN}>
            {`Hello ${userType}!`}
          </AppText>

          <AppText
            type={SIXTEEN}
            weight={BOLD}
            numberOfLines={1}>
            {userData?.name
              ? userData.name.charAt(0).toUpperCase() +
                userData.name
                  .slice(1)
                  .toLowerCase()
              : 'User'}
          </AppText>
        </View>

        {/* Right Side */}
        <View style={styles.rightContainer}>
          {!currentCity && (
            <TouchableOpacityView
              style={styles.locationContainer}
              onPress={openBottomSheet}>
              <Image
                source={locationIcon}
                style={styles.locationIcon}
                resizeMode="contain"
              />

              <AppText
                type={
                  selectedCity
                    ? SIXTEEN
                    : THIRTEEN
                }
                numberOfLines={1}
                style={styles.cityText}>
                {selectedCity?.label ||
                  userData?.current_city_name ||
                  'Select City'}
              </AppText>

              <Image
                source={downArrowIcon}
                style={styles.downArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacityView>
          )}

        {showCart && (
  <TouchableOpacityView
    style={styles.cartContainer}
    onPress={() =>
      NavigationService.navigate(CART_SCREEN)
    }>
    <Image
      source={addToCardIcon}
      style={styles.cartIcon}
      resizeMode="contain"
    />

{cartList?.items?.length > 0 && (
  <View style={styles.badge}>
    <AppText style={styles.badgeText}>
      {cartList?.total_qty || cartList?.items?.length}
    </AppText>
  </View>
)}
  </TouchableOpacityView>
)}
        </View>
      </View>

      <CityDropDown
        bottomSheetRef={bottomSheetRef}
        value={searchCityText}
        handleSearch={handleSearch}
        data={filteredLocations}
        handleSelectOption={selectLocation}
      />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nameContainer: {
    flex: 1,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 140,
  },

  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  cityText: {
    marginRight: 6,
    maxWidth: 90,
  },

  downArrowIcon: {
    width: 20,
    height: 8,
    tintColor: colors.placeholder,
  },

  cartContainer: {
    marginLeft: 12,
    position: 'relative',
  },

  cartIcon: {
    width: 22,
    height: 22,
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,

    minWidth: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: colors.buttonBg,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
