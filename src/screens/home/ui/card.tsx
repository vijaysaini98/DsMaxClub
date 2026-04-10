// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   View,
//   ImageSourcePropType,
//   ViewStyle,
//   ImageStyle,
//   TextStyle,
// } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import {
//   AppText,
//   BOLD,
//   FOURTEEN,
//   MEDIUM,
//   TWELVE,
//   WHITE,
//   NORMAL,
//   TEN,
//   PLACEHOLDER,
// } from '@components/AppText';
// import { colors } from '@theme/colors';
// import {
//   addToCardIcon,
//   defaultBookletImage,
//   filledCartIcon,
//   helpLineIcon,
//   locationIcon,
//   nearByIcon,
//   restro2,
// } from '@helper/imagesAssets';
// import TouchableOpacityView from '@components/TouchableOpacityView';
// import { ms, s, vs } from 'react-native-size-matters/extend';
// import { openPhoneDialer } from '@utils/index';

// export interface CardItem {
//   id?: string | number;
//   name?: string;
//   booklet?: string;
//   image?: ImageSourcePropType;
//   stars?: number;
//   [key: string]: any;
// }

// export interface CardProps {
//   item: CardItem;
//   index?: number;
//   handleCardOnPress: (item: CardItem) => void;
//   cardContainerStyle?: ViewStyle | ViewStyle[];
//   imageStyle?: ImageStyle | ImageStyle[];
//   imageUrl?: ImageSourcePropType;
//   imageBaseUrl?: string;
//   name?: string;
//   price?: string | number;
//   address?: string;
//   status?: string;
//   cardDisabled?: boolean;
//   date?: string;
//   mobile?: string;
//   shortDesc?: string;
//   handleAddToCardOnPress?: () => void;
//   isAddedToCart?: boolean;
//   addtoCart?: boolean;
// }

// const Card: React.FC<CardProps> = ({
//   handleCardOnPress,
//   item,
//   index,
//   cardContainerStyle,
//   imageStyle,
//   imageUrl,
//   imageBaseUrl,
//   name,
//   price,
//   address,
//   status,
//   cardDisabled,
//   date,
//   shortDesc,
//   handleAddToCardOnPress,
//   isAddedToCart,
//   addtoCart
//   // mobile,
// }) => {
//   const source: ImageSourcePropType =
//     imageUrl ||
//     item?.image ||
//     (item?.booklet ? { uri: `${imageBaseUrl ?? ''}${item.booklet}` } : restro2) ||
//     defaultBookletImage;

//   const displayName = name ?? item?.name ?? '';
//   const displayPrice = price !== undefined && price !== null ? `Rs. ${price}` : '';

//   return (
//     <TouchableOpacityView
//       onPress={() => handleCardOnPress(item)}
//       disabled={cardDisabled}
//       style={[styles.cardInner, cardContainerStyle]}
//     >
//       <FastImage
//         source={source}
//         style={[styles.bannerImage, imageStyle]}
//         resizeMode="cover" />
//       {addtoCart && (
//         <TouchableOpacityView
//         onPress={handleAddToCardOnPress}
//         style={{position:'absolute', top:10, right:10,backgroundColor:colors.white, padding:5, borderRadius:20}}
//         >
//         <FastImage
//         style={{width:20, height:20}}
//         source={isAddedToCart ? filledCartIcon : addToCardIcon}
//         resizeMode="contain"
//         />
//         </TouchableOpacityView>
//       )}

//       <View style={styles.detailContainer}>
//         <View style={styles.priceContainer}>
//           <AppText type={FOURTEEN} weight={MEDIUM} style={styles.nameText}>
//             {displayName}
//           </AppText>

//           {displayPrice ? (
//             <AppText type={TWELVE} weight={BOLD} color={colors.buttonBg} style={styles.priceText}>
//               {displayPrice}
//             </AppText>
//           ) : null}
//         </View>

//         {/* {mobile ? (
//           <TouchableOpacityView onPress={() => openPhoneDialer(mobile)} style={styles.phoneContainerStyle}>
//             <Image source={helpLineIcon} style={styles.phoneIconStyle} resizeMode="contain" />
//             <AppText type={TWELVE} weight={NORMAL} style={styles.phoneText}>
//               {mobile}
//             </AppText>
//           </TouchableOpacityView>
//         ) : null} */}
//         {
//           shortDesc && (
//             <AppText type={TEN} weight={MEDIUM} color={PLACEHOLDER}>{shortDesc}</AppText>
//           )
//         }
//         {date ? (
//           <AppText type={TWELVE} weight={MEDIUM} style={styles.dateText}>
//             {date}
//           </AppText>
//         ) : null}
//         <View style={styles.locationContainer}>
//           <FastImage source={nearByIcon} style={styles.locationIconStyle} resizeMode="contain" />
//           <AppText numberOfLines={2} type={TWELVE} weight={BOLD} style={styles.locationText}>
//             {address}
//           </AppText>
//         </View>

//       </View>

//       {status ? (
//         <View style={styles.statusContainer}>
//           <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE} style={styles.statusText}>
//             {status}
//           </AppText>
//         </View>
//       ) : null}
//     </TouchableOpacityView>
//   );
// };

// export default React.memo(Card);

// const styles = StyleSheet.create({
//   bannerImage: {
//     height: vs(150),
//     width: s(280),
//   },
//   cardInner: {
//     borderRadius: ms(10),
//     backgroundColor: colors.white,
//     overflow: 'hidden',
//     width: s(280),
//   },
//   detailContainer: {
//     paddingHorizontal: s(12),
//     paddingVertical: vs(10),
//     backgroundColor: colors.white,
//     width: '100%',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: vs(5),
//     gap: s(10),
//   },
//   nameText: {
//     width: '70%',
//   } as TextStyle,
//   priceText: {
//     textAlign: 'right',
//   } as TextStyle,
//   phoneContainerStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: vs(4),
//     gap: s(5),
//   },
//   phoneIconStyle: {
//     width: s(12),
//     height: s(12),
//     tintColor: colors.buttonBg,
//     marginRight: s(6),
//   },
//   phoneText: {
//     color: colors.disTextColor,
//   } as TextStyle,
//   locationContainer: {
//     flexDirection: 'row',
//     gap: s(5),
//     marginTop: vs(5),
//   },
//   locationIconStyle: {
//     marginTop: vs(2),
//     width: s(15),
//     height: s(15),
//     tintColor: colors.disTextColor,
//   },
//   locationText: {
//     color: colors.buttonBg,
//     // color: colors.disTextColor,
//     marginRight: s(5),
//     flex: 1,
//   },
//   dateText: {
//     marginTop: vs(5),
//     color: colors.first,
//   },
//   statusContainer: {
//     position: 'absolute',
//     top: vs(10),
//     right: s(10),
//     alignItems: 'center',
//     backgroundColor: colors.buttonBg,
//     paddingVertical: vs(5),
//     paddingHorizontal: s(8),
//     borderRadius: ms(12),
//   },
//   statusText: {
//     textTransform: 'capitalize',
//   } as TextStyle,
// });

// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   ImageSourcePropType,
//   ViewStyle,
//   ImageStyle,
//   TextStyle,
// } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import {
//   AppText,
//   BOLD,
//   FOURTEEN,
//   MEDIUM,
//   TWELVE,
//   WHITE,
// } from '@components/AppText';
// import { colors } from '@theme/colors';
// import {
//   addToCardIcon,
//   defaultBookletImage,
//   filledCartIcon,
//   locationIcon,
//   contactIcon,
//   restro2,
//   helpLineIcon,
//   nearByIcon,
// } from '@helper/imagesAssets';
// import TouchableOpacityView from '@components/TouchableOpacityView';
// import { ms, s, vs } from 'react-native-size-matters/extend';
// import { openPhoneDialer } from '@utils/index';
// import moment from 'moment';

// export interface CardProps {
//   item: any;
//   handleCardOnPress: (item: any) => void;
//   cardContainerStyle?: ViewStyle | ViewStyle[];
//   imageStyle?: ImageStyle | ImageStyle[];
//   imageUrl?: ImageSourcePropType;
//   name?: string;
//   price?: string | number;
//   address?: string;
//   status?: string;
//   cardDisabled?: boolean;
//   isCompleteLocation?: boolean;

//   // ✅ NEW CLEAN PROPS
//   type?: 'booklet' | 'request';
//   startDate?: string;
//   purchaseDate?: string;
//   validityMonths?: number;

//   handleAddToCardOnPress?: () => void;
//   isAddedToCart?: boolean;
//   addtoCart?: boolean;
// }

// const Card: React.FC<CardProps> = ({
//   handleCardOnPress,
//   item,
//   cardContainerStyle,
//   imageStyle,
//   imageUrl,
//   name,
//   price,
//   address,
//   status,
//   cardDisabled,
//   type = 'booklet',
//   startDate,
//   purchaseDate,
//   validityMonths,
//   handleAddToCardOnPress,
//   isAddedToCart,
//   addtoCart,
//   isCompleteLocation,
// }) => {
//   const source: ImageSourcePropType =
//     imageUrl || item?.image || restro2 || defaultBookletImage;

//   const displayName = name ?? item?.name ?? '';
//   const displayPrice =
//     price !== undefined && price !== null ? `Rs. ${price}` : '';

//   return (
//     <TouchableOpacityView
//       onPress={() => handleCardOnPress(item)}
//       disabled={cardDisabled}
//       style={[styles.cardInner, cardContainerStyle]}
//     >
//       {/* IMAGE */}
//       <FastImage
//         source={source}
//         style={[styles.bannerImage, imageStyle]}
//         resizeMode="cover"
//       />

//       {/* CART */}
//       {addtoCart && (
//         <TouchableOpacityView
//           onPress={handleAddToCardOnPress}
//           style={styles.cartBtn}
//         >
//           <FastImage
//             style={styles.cartIcon}
//             source={isAddedToCart ? filledCartIcon : addToCardIcon}
//           />
//         </TouchableOpacityView>
//       )}

//       {/* STATUS */}
//       {status && (
//         <View style={styles.statusContainer}>
//           <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>
//             {status}
//           </AppText>
//         </View>
//       )}

//       {/* CONTENT */}
//       <View style={styles.detailContainer}>
//         {/* NAME + PRICE */}
//         <View style={styles.priceContainer}>
//           <AppText type={FOURTEEN} weight={MEDIUM} style={styles.nameText}>
//             {displayName}
//           </AppText>

//           {displayPrice ? (
//             <AppText type={TWELVE} weight={BOLD} color={colors.buttonBg}>
//               {displayPrice}
//             </AppText>
//           ) : null}
//         </View>

//         {/* ================= BOOKLET UI ================= */}
//         {/* ================= COMPLETE LOCATION UI ================= */}
//         {isCompleteLocation ? (

//           <View style={styles.locationContainer}>
//             <FastImage source={nearByIcon} style={styles.locationIconStyle} resizeMode="contain" />
//     <AppText
//       type={TWELVE}
//       weight={MEDIUM}
//       style={styles.locationText}
//       numberOfLines={2}
//     >
//       {address}
//     </AppText>
//   </View>
//         ) : (
//           <>
//             {/* ================= BOOKLET UI ================= */}
//             {type === 'booklet' && (
//               <>
//                 <View style={styles.rowBetween}>
//                   <View>
//                     <AppText type={TWELVE} weight={BOLD}>
//                       Start Date
//                     </AppText>
//                     <AppText type={TWELVE}>
//                       {startDate
//                         ? moment(startDate).format('D MMM YYYY')
//                         : '--'}
//                     </AppText>
//                   </View>

//                   <View>
//                     <AppText type={TWELVE} weight={BOLD}>
//                       Expiry Date
//                     </AppText>
//                     <AppText type={TWELVE}>
//                       {validityMonths ? `Upto ${validityMonths} months` : '--'}
//                     </AppText>
//                   </View>
//                 </View>

//                 <View style={styles.rowBetween}>
//                   <View>
//                     <AppText type={TWELVE} weight={BOLD}>
//                       Booklet Code
//                     </AppText>
//                     <AppText type={FOURTEEN}>
//                       {item?.booklet_uniquecode}
//                     </AppText>
//                   </View>

//                   <View style={styles.iconRow}>
//                     <TouchableOpacityView style={styles.circleBtn}>
//                       <FastImage
//                         source={locationIcon}
//                         style={styles.circleIcon}
//                         tintColor={colors.white}
//                       />
//                     </TouchableOpacityView>

//                     <TouchableOpacityView
//                       style={styles.circleBtn}
//                       onPress={() =>
//                         item?.mobile && openPhoneDialer(item.mobile)
//                       }
//                     >
//                       <FastImage
//                         source={helpLineIcon}
//                         style={styles.circleIcon}
//                         tintColor={colors.white}
//                       />
//                     </TouchableOpacityView>
//                   </View>
//                 </View>
//               </>
//             )}

//             {/* ================= REQUEST UI ================= */}
//             {type === 'request' && (
//               <>
//                 <View style={{ marginTop: vs(5) }}>
//                   <AppText type={TWELVE} weight={BOLD}>
//                     Requested Date
//                   </AppText>
//                   <AppText type={TWELVE}>
//                     {purchaseDate
//                       ? moment(purchaseDate).format('D MMM YYYY, hh:mm A')
//                       : '--'}
//                   </AppText>
//                 </View>

//                 <View style={styles.rowBetween}>
//                   <View>
//                     <AppText type={TWELVE} weight={BOLD}>
//                       Booklet Code
//                     </AppText>
//                     <AppText type={FOURTEEN}>{item?.unique_code}</AppText>
//                   </View>

//                   <TouchableOpacityView style={styles.circleBtn}>
//                     <FastImage
//                       source={locationIcon}
//                       style={styles.circleIcon}
//                       tintColor={colors.white}
//                     />
//                   </TouchableOpacityView>
//                 </View>
//               </>
//             )}
//           </>
//         )}
//       </View>
//     </TouchableOpacityView>
//   );
// };

// export default React.memo(Card);

// const styles = StyleSheet.create({
//   cardInner: {
//     borderRadius: ms(10),
//     backgroundColor: colors.white,
//     overflow: 'hidden',
//     width: s(280),
//   },
//   bannerImage: {
//     height: vs(150),
//     width: '100%',
//   },
//   detailContainer: {
//     padding: s(12),
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   nameText: {
//     width: '70%',
//   } as TextStyle,

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: vs(10),
//     // backgroundColor:'red'
//   },

//   iconRow: {
//     flexDirection: 'row',
//     gap: s(10),
//   },

//   circleBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.buttonBg,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   circleIcon: {
//     width: 18,
//     height: 18,
//     // tintColor: colors.white,
//   },

//   statusContainer: {
//     position: 'absolute',
//     top: vs(10),
//     right: s(10),
//     backgroundColor: colors.buttonBg,
//     paddingVertical: vs(5),
//     paddingHorizontal: s(8),
//     borderRadius: ms(12),
//   },

//   cartBtn: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: colors.white,
//     padding: 5,
//     borderRadius: 20,
//   },

//   cartIcon: {
//     width: 20,
//     height: 20,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     gap: s(5),
//     marginTop: vs(5),
//   },
//   locationIconStyle: {
//     marginTop: vs(2),
//     width: s(15),
//     height: s(15),
//     tintColor: colors.disTextColor,
//   },
//   locationText: {
//     color: colors.buttonBg,
//     // color: colors.disTextColor,
//     marginRight: s(5),
//     flex: 1,
//   },
// });

import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Modal,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BOLD,
  FOURTEEN,
  MEDIUM,
  TWELVE,
  WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import {
  addToCardIcon,
  defaultBookletImage,
  filledCartIcon,
  locationIcon,
  restro2,
  helpLineIcon,
  nearByIcon,
  downArrowIcon,
} from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { openPhoneDialer } from '@utils/index';
import moment from 'moment';
import MultiLocationSheet from '@screens/detail/ui/multiLoctionSheet';

export interface CardProps {
  item: any;
  handleCardOnPress: (item: any) => void;
  cardContainerStyle?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle | ImageStyle[];
  imageUrl?: ImageSourcePropType;
  name?: string;
  price?: string | number;
  address?: string;
  status?: string;
  cardDisabled?: boolean;
  isCompleteLocation?: boolean;

  type?: 'booklet' | 'request'| 'combo';
  startDate?: string;
  purchaseDate?: string;
  validityMonths?: number;

  handleAddToCardOnPress?: () => void;
  isAddedToCart?: boolean;
  addtoCart?: boolean;
  location?: Array<{ location: string; location_url: string }> | any;
  showArrow?: boolean;
  data?: any;
  showDateSection?: boolean;
}

const Card: React.FC<CardProps> = ({
  handleCardOnPress,
  item,
  cardContainerStyle,
  imageStyle,
  imageUrl,
  name,
  price,
  address,
  status,
  cardDisabled,
  type = 'booklet',
  startDate,
  purchaseDate,
  validityMonths,
  handleAddToCardOnPress,
  isAddedToCart,
  addtoCart,
  isCompleteLocation,
  location,
  showArrow,
  data,
  showDateSection,
}) => {
  const [activeDropdown, setActiveDropdown] = React.useState<
    'location' | 'contact' | null
  >(null);

  const sheetRef = useRef<any>(null);
  const openDropdown = (type: 'location' | 'contact') => {
    setActiveDropdown(type);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const source: ImageSourcePropType =
    imageUrl || item?.image || restro2 || defaultBookletImage;

  const displayName = name ?? item?.name ?? '';
  const displayPrice =
    price !== undefined && price !== null ? `Rs. ${price}` : '';


    const openMap = () => {
  if (address) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  }
};

  return (
    <>
      <TouchableOpacityView
        onPress={() => {
          if (cardDisabled) return;
          handleCardOnPress(item);
        }}
        disabled={cardDisabled}
        style={[
          styles.cardInner,
          cardContainerStyle,
          // cardDisabled && type === 'booklet' && { opacity: 0.6 }, // 👈 faded UI
          cardDisabled && (type === 'booklet' || type === 'combo') && { opacity: 0.7 }
        ]}
      >
        {/* IMAGE */}
        <FastImage
          source={source}
          style={[styles.bannerImage, imageStyle]}
          resizeMode="cover"
        />

        {/* CART */}
        {addtoCart && (
          <TouchableOpacityView
            onPress={handleAddToCardOnPress}
            style={styles.cartBtn}
          >
            <FastImage
              style={styles.cartIcon}
              source={isAddedToCart ? filledCartIcon : addToCardIcon}
            />
          </TouchableOpacityView>
        )}

        {/* STATUS */}
        {/* {status && (
          <View style={styles.statusContainer}>
            <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>
  {status?.charAt(0).toUpperCase() + status?.slice(1)}
</AppText>
          </View>
        )} */}

        {status && (
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  status?.toLowerCase() === 'active'
                    ? colors.lightGreen
                    : colors.buttonBg,
              },
            ]}
          >
            <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>
              {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </AppText>
          </View>
        )}

        {/* CONTENT */}
        <View style={styles.detailContainer}>
          {/* NAME + PRICE */}
          <View style={styles.priceContainer}>
            <AppText type={FOURTEEN} weight={MEDIUM} style={styles.nameText}>
              {displayName}
            </AppText>

            {displayPrice ? (
              <AppText type={TWELVE} weight={BOLD} color={colors.buttonBg}>
                {displayPrice}
              </AppText>
            ) : null}
          </View>

          {/* ================= COMPLETE LOCATION ================= */}
          {isCompleteLocation ? (
            <>
              {showDateSection &&
                (startDate || item?.end_date || validityMonths) && (
                  <View style={styles.rowBetween}>
                    {/* START DATE */}
                    {startDate && (
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Start Date
                        </AppText>
                        <AppText type={TWELVE}>
                          {moment(startDate).format('DD-MMM-YYYY')}
                        </AppText>
                      </View>
                    )}

                    {/* EXPIRY DATE */}
                    {(item?.end_date || validityMonths) && (
                      <View>
                        <AppText type={TWELVE} weight={BOLD}>
                          Expiry Date
                        </AppText>

                        <AppText type={TWELVE}>
                          {item?.end_date
                            ? moment(item.end_date).format('DD-MMM-YYYY')
                            : `Upto ${validityMonths} months`}
                        </AppText>
                      </View>
                    )}
                  </View>
                )}

              {/* ✅ ALWAYS SHOW LOCATION */}
              <TouchableOpacityView style={styles.locationContainer} onPress={openMap}>
                <FastImage
                  source={nearByIcon}
                  style={styles.locationIconStyle}
                />
                <AppText
                  type={TWELVE}
                  weight={MEDIUM}
                  style={styles.locationText}
                  numberOfLines={2}
                >
                  {address}
                </AppText>

                {showArrow && (
                  <TouchableOpacityView
                    onPress={() => sheetRef.current?.present()}
                  >
                    <FastImage
                      source={downArrowIcon}
                      style={styles.arrowIcon}
                      resizeMode='contain'
                    />
                  </TouchableOpacityView>
                )}
              </TouchableOpacityView>
            </>
          ) : (
            <>
              {/* ================= BOOKLET ================= */}
              {type === 'booklet' && (
                <>
                  <View style={styles.rowBetween}>
                    <View>
                      <AppText type={TWELVE} weight={BOLD}>
                        Start Date
                      </AppText>
                      <AppText type={TWELVE}>
                        {startDate
                          ? moment(startDate).format('D MMM YYYY')
                          : '--'}
                      </AppText>
                    </View>

                    <View>
                      <AppText type={TWELVE} weight={BOLD}>
                        Expiry Date
                      </AppText>
                      <AppText type={TWELVE}>
                        {validityMonths
                          ? `Upto ${validityMonths} months`
                          : '--'}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.rowBetween}>
                    <View>
                      <AppText type={TWELVE} weight={BOLD}>
                        Booklet Code
                      </AppText>
                      <AppText type={FOURTEEN}>
                        {item?.booklet_uniquecode}
                      </AppText>
                    </View>

                    <View style={styles.iconRow}>
                      {/* LOCATION */}
                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={() => openDropdown('location')}
                      >
                        <FastImage
                          source={locationIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                        />
                      </TouchableOpacityView>

                      {/* CONTACT */}
                      <TouchableOpacityView
                        style={styles.circleBtn}
                        onPress={() => openDropdown('contact')}
                      >
                        <FastImage
                          source={helpLineIcon}
                          style={styles.circleIcon}
                          tintColor={colors.white}
                        />
                      </TouchableOpacityView>
                    </View>
                  </View>
                </>
              )}

              {/* ================= REQUEST ================= */}
              {type === 'request' && (
                <>
                  <View style={{ marginTop: vs(20) }}>
                    <AppText type={TWELVE} weight={BOLD}>
                      Requested Date
                    </AppText>
                    {/* <AppText type={TWELVE}>
                      {purchaseDate
                        ? moment(purchaseDate).format('DD MMMM YYYY, HH:mm ')
                        : '--'}
                    </AppText> */}
                    <AppText type={TWELVE}>
                      {purchaseDate
                        ? moment(
                            purchaseDate,
                            'DD MMMM YYYY, HH:mm',
                            true,
                          ).format('DD MMM YYYY, hh:mm ')
                        : '--'}
                    </AppText>
                  </View>

                  <View style={styles.rowBetween}>
                    <View>
                      <AppText type={TWELVE} weight={BOLD}>
                        Booklet Code
                      </AppText>
                      <AppText type={FOURTEEN}>{item?.unique_code}</AppText>
                    </View>

                    <TouchableOpacityView
                      style={styles.circleBtn}
                      onPress={() => openDropdown('location')}
                    >
                      <FastImage
                        source={locationIcon}
                        style={styles.circleIcon}
                        tintColor={colors.white}
                      />
                    </TouchableOpacityView>
                  </View>
                </>
              )}
{type === 'combo' && (
  <>
    {/* ✅ DATE ROW */}
    {showDateSection &&
      (startDate || item?.end_date || validityMonths) && (
        <View style={styles.rowBetween}>
          
          {/* START DATE */}
          {startDate && (
            <View>
              <AppText type={TWELVE} weight={BOLD}>
                Start Date
              </AppText>
              <AppText type={TWELVE}>
                {moment(startDate).format('DD-MMM-YYYY')}
              </AppText>
            </View>
          )}

          {/* EXPIRY DATE */}
          {(item?.end_date || validityMonths) && (
            <View>
              <AppText type={TWELVE} weight={BOLD}>
                Expiry Date
              </AppText>

              <AppText type={TWELVE}>
                {item?.end_date
                  ? moment(item.end_date).format('DD-MMM-YYYY')
                  : `Upto ${validityMonths} months`}
              </AppText>
            </View>
          )}
        </View>
      )}

    {/* ✅ ICON ROW (RIGHT SIDE) */}
    <View style={styles.iconRowRight}>
      
      {/* 📍 LOCATION ICON */}
      <TouchableOpacityView
        style={styles.circleBtn}
        onPress={() => sheetRef.current?.present()}
      >
        <FastImage
          source={locationIcon}
          style={styles.circleIcon}
          tintColor={colors.white}
        />
      </TouchableOpacityView>

      {/* 📞 CONTACT ICON */}
      <TouchableOpacityView
        style={styles.circleBtn}
        // onPress={openDropdown('contact')}
        onPress={() => {
  if (
    item?.mobile ||
    item?.short_desc ||
    item?.short_description
  ) {
    openDropdown('contact');
  } else {
    console.log('No contact available');
  }
}}
      >
        <FastImage
          source={helpLineIcon}
          style={styles.circleIcon}
          tintColor={colors.white}
        />
      </TouchableOpacityView>

    </View>
  </>
)}
            </>
          )}
        </View>
      </TouchableOpacityView>

      {/* ================= DROPDOWN ================= */}
      <Modal transparent visible={!!activeDropdown} animationType="slide">
        <View style={styles.overlay1}>
          {/* CLICK OUTSIDE CLOSE */}
          <TouchableOpacityView style={{ flex: 1 }} onPress={closeDropdown} />

          {/* BOTTOM SHEET */}
          <View style={styles.bottomSheet}>
            {/* HEADER */}
            <View style={styles.sheetHeader}>
              <View style={styles.dragHandle} />
              <AppText type={FOURTEEN} weight={BOLD}>
                {activeDropdown === 'location' ? 'Select Location' : 'Contact'}
              </AppText>
            </View>

            {/* LIST */}
            <View style={{ marginTop: vs(10) }}>
              {/* LOCATION */}
              {activeDropdown === 'location' &&
                item?.locations?.map((loc: any, index: number) => (
                  <TouchableOpacityView
                    key={index}
                    style={styles.sheetItem}
                    onPress={() => {
                      closeDropdown();
                      loc?.location_url && Linking.openURL(loc.location_url);
                    }}
                  >
                    <FastImage
                      source={locationIcon}
                      style={styles.sheetIcon}
                      resizeMode="contain"
                    />
                    <AppText style={styles.sheetText}>{loc?.location}</AppText>
                  </TouchableOpacityView>
                ))}

              {/* CONTACT */}
              {/* {activeDropdown === 'contact' &&
                item?.short_description?.map((num: string, index: number) => (
                  <TouchableOpacityView
                    key={index}
                    style={styles.sheetItem}
                    onPress={() => {
                      closeDropdown();
                      openPhoneDialer(num);
                    }}
                  >
                    <FastImage source={helpLineIcon} style={styles.sheetIcon} />
                    <AppText style={styles.sheetText}>{num}</AppText>
                  </TouchableOpacityView>
                ))} */}
                {/* CONTACT */}
{activeDropdown === 'contact' && (() => {
  let contactList: string[] = [];

  // ✅ Case 1: array (short_description)
  if (Array.isArray(item?.short_description)) {
    contactList = item.short_description;
  }

  // ✅ Case 2: string (short_desc)
  else if (typeof item?.short_desc === 'string') {
    contactList = [item.short_desc];
  }

  // ✅ Case 3: mobile field
  else if (item?.mobile) {
    contactList = [item.mobile];
  }

  return contactList.map((num: string, index: number) => {
    const cleanNumber = num?.split('-')[0]?.trim();

    return (
      <TouchableOpacityView
        key={index}
        style={styles.sheetItem}
        onPress={() => {
          closeDropdown();
          openPhoneDialer(cleanNumber);
        }}
      >
        <FastImage source={helpLineIcon} style={styles.sheetIcon} />
        <AppText style={styles.sheetText}>
          {cleanNumber}
        </AppText>
      </TouchableOpacityView>
    );
  });
})()}


            </View>
          </View>
        </View>
      </Modal>

      <MultiLocationSheet
        sheetRef={sheetRef}
        data={location}
        title={data?.vendor?.name || data?.client_name}
      />
    </>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  cardInner: {
    borderRadius: ms(10),
    backgroundColor: colors.white,
    overflow: 'hidden',
    width: s(280),
  },
  bannerImage: {
    height: vs(150),
    width: '100%',
  },
  detailContainer: {
    padding: s(12),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    width: '70%',
  } as TextStyle,

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(20),
  },

  iconRow: {
    flexDirection: 'row',
    gap: s(10),
  },

  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonBg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleIcon: {
    width: 18,
    height: 18,
  },

  statusContainer: {
    position: 'absolute',
    top: vs(10),
    right: s(10),
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(5),
    paddingHorizontal: s(8),
    borderRadius: ms(12),
  },

  cartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 20,
  },

  cartIcon: {
    width: 20,
    height: 20,
  },

  locationContainer: {
    flexDirection: 'row',
    gap: s(5),
    marginTop: vs(20),
    // backgroundColor:colors.red
  },
  locationIconStyle: {
    marginTop: vs(2),
    width: s(15),
    height: s(15),
    tintColor: colors.disTextColor,
  },
  locationText: {
    color: colors.buttonBg,
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  overlay1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: vs(20),
    paddingHorizontal: s(15),
    paddingTop: vs(10),
  },

  sheetHeader: {
    alignItems: 'center',
    marginBottom: vs(10),
  },

  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: vs(8),
  },

  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(12),
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },

  sheetIcon: {
    width: 20,
    height: 20,
    marginRight: s(10),
    tintColor: colors.buttonBg,
  },

  sheetText: {
    flex: 1,
  },
  arrowIcon: {
    height: vs(15),
    width: s(15),
    marginTop: vs(3),
  },
  iconRowRight: {
  flexDirection: 'row',
  justifyContent: 'flex-end', // 👉 right align
  gap: s(10),
  marginTop: vs(12),
},
});
