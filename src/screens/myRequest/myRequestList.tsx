// import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
// import React, { useCallback, useState } from 'react'
// import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, WHITE } from '@components/AppText'
// import { REQUEST_COUPON_LIST_SCREEN } from '@navigations/routes'
// import { SpinnerSecond } from '@components/Spinner'
// import { ms, s, vs } from 'react-native-size-matters/extend'
// import { colors } from '@theme/colors'
// import { useAppDispatch, useAppSelector } from '@redux/hooks'
// import Card from '@screens/home/ui/card'
// import NavigationService from '@navigations/NavigationService'
// import { IMGE_URL } from '@services/config'
// import { defaultBookletImage } from '@helper/imagesAssets'
// import moment from 'moment'
// import { getMyRequestList } from '@actions/myRequest/myRequestAction'
// import ListEmptyComponent from '@components/ListEmptyComponent'
// import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader'

// const MyRequestList = ({ data, tabname,order_uuid}: { data: any, tabname: string, order_uuid: string }) => {
//     const dispatch = useAppDispatch()
//     const { isLoading } = useAppSelector((state) => state.myRequest)
//     const [refreshing, setRefreshing] = useState(false);
// console.log(order_uuid,'order_uuid in myRequestList');

// const onRefresh = useCallback(() => {
//   setRefreshing(true);

//   const payload: any = {
//     tabname,
//   };

//   if (order_uuid) {
//     payload.order_uuid = order_uuid;
//   }

//   console.log('Refresh Payload =>', payload);

//   dispatch(getMyRequestList(payload)).finally(() => {
//     setRefreshing(false);
//   });
// }, [dispatch, tabname, order_uuid]);

//     const renderItem = ({ item, index }: any) => {
//         console.log(item,'item in order details');
        
//         return (
//             <View 
//             key={index}
//             style={styles.shadowContainer}>
//                 {/* <Card item={item} index={index}
//                     cardContainerStyle={{ width: "100%" }}
//                     imageStyle={styles.imageStyle}
//                     imageUrl={item?.booklet ? { uri: IMGE_URL + item?.booklet } : defaultBookletImage}
//                     name={`${item?.name} (${item?.unique_code})`}
//                     price={item.price}
//                     address={item?.locations ? item?.locations[0]?.location : "---"}
//                     handleCardOnPress={() => {
//                         // NavigationService.navigate(REQUEST_COUPON_LIST_SCREEN, { booklet_id: item?.uuid })
//                     }}
//                     status={item?.status}
//                     date={`Request: ${moment(item?.created_at, "YYYY-MM-DD ").format("D MMM YYYY ")}`}
//                     shortDesc={item?.short_desc}
//                 /> */}
//                 <Card
//   item={item}
//   index={index}
//   type="request" // 👈 IMPORTANT
//   cardContainerStyle={{ width: "100%" }}
//   imageStyle={styles.imageStyle}
//   imageUrl={
//     item?.booklet
//       ? { uri: IMGE_URL + item?.booklet }
//       : defaultBookletImage
//   }
// //   name={`${item?.name} (${item?.unique_code})`}
//  name={item?.name}
//   uniqueCode={item?.unique_code}
// //   price={item.price}
//   address={item?.locations ? item?.locations[0]?.location : "---"}
//   handleCardOnPress={() => {
//     // NavigationService.navigate(REQUEST_COUPON_LIST_SCREEN, { booklet_id: item?.uuid })
//   }}
//   status={item?.status}
//   shortDesc={item?.short_desc}

//   // ✅ NEW CLEAN PROP
//   purchaseDate={item?.requested_date}
// />
//             </View>
//         )
//     }

//     return (
//         <View style={styles.mainContainer}>
//             {
//                 isLoading && !refreshing ?
//                     // <SpinnerSecond />
//                     <CategoriesListShimmerLoader/>
//                      :
//                     <FlatList
//                         data={data}
//                         renderItem={renderItem}
//                         contentContainerStyle={styles.listContainerStyle}
//                         showsVerticalScrollIndicator={false}
//                         keyExtractor={(item, index) => index.toString()}
//                         refreshControl={
//                             <RefreshControl
//                                 refreshing={refreshing}
//                                 onRefresh={onRefresh}
//                                 colors={[colors.buttonBg]}
//                                 tintColor={colors.buttonBg}
//                             />
//                         }
//                         ListEmptyComponent={() => (
//                             <ListEmptyComponent title={"No Request Available"} />
//                         )}
//                     />
//             }
//         </View>
//     )
// }

// export default MyRequestList

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1
//     },
//     containerStyle: {
//         gap: s(15),
//         paddingBottom: vs(50),
//         marginTop: vs(15),
//     },
//     rejectText: {
//         textAlign: 'center',
//         marginTop: vs(10)
//     },

//     listContainerStyle: {
//         gap: ms(26),
//         paddingBottom: vs(150),
//         marginTop: vs(22),
//         // marginHorizontal: 16,
//     },
//     shadowContainer: {
//         borderRadius: ms(15),
//         backgroundColor: colors.white,
//         // iOS shadow
//         shadowColor: 'rgba(0, 0, 0, 0.3)',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.18,
//         shadowRadius: 8,
//         // Android shadow
//         elevation: 2,
//         // marginBottom: 15,
//     },
//     imageStyle: {
//         width: "100%",
//         borderTopLeftRadius: ms(10),
//         borderTopRightRadius: ms(10)
//     },
// })

import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  MEDIUM,
  TWELVE,
} from '@components/AppText';

import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters/extend';

import { IMGE_URL } from '@services/config';
import { defaultBookletImage } from '@helper/imagesAssets';
import moment from 'moment';

const BookletList = ({ data }: { data: any[] }) => {

    const [imageError, setImageError] = useState(false);
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approve':
      case 'completed':
        return {
          bg: '#E8F7EE',
          color: '#1AA053',
          label: 'Payment Success',
        };

      case 'pending':
        return {
          bg: '#FFF4DD',
          color: '#F59E0B',
          label: 'Payment Pending',
        };

      default:
        return {
          bg: '#FDECEC',
          color: '#DC2626',
          label: 'Payment Failed',
        };
    }
  };

  const renderItem = ({ item }: any) => {
    console.log(item,'item in booklet list');
    console.log(item?.booklet,'item?.booklet in booklet list');
    
    
    const status = getStatusStyle(item?.status);

    return (

<View style={styles.card}>
  <Image
    source={
      !imageError && item?.booklet
        ? { uri: IMGE_URL + item.booklet }
        : defaultBookletImage
    }
    style={styles.image}
    onError={() => setImageError(true)}
  />

  <View style={styles.center}>
    <AppText
      weight={BOLD}
      style={styles.title}>
      {item?.name}
    </AppText>

    <AppText color={BUTTON_TEXT} style={styles.date}>
      Valid {moment(item?.start_date).format('D MMMM YYYY')} -{' '}
      {moment(item?.end_date).format('D MMMM YYYY')}
    </AppText>

    {/* Code & Status Row */}
    <View style={styles.bottomRow}>
      <View style={styles.codeRow}>
        <AppText type={TWELVE} weight={BOLD}>
          Code:
        </AppText>

        <AppText type={TWELVE}>
          {' '}
          {item?.unique_code}
        </AppText>
      </View>

      <View
        style={[
          styles.status,
          {
            backgroundColor: status.bg,
          },
        ]}>
        <AppText
          style={{
            color: status.color,
            fontSize: 11,
          }}>
          {item?.status
            ? item.status.charAt(0).toUpperCase() +
              item.status.slice(1).toLowerCase()
            : '--'}
        </AppText>
      </View>
    </View>
  </View>
</View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        item?.uuid ?? index.toString()
      }
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 16 }} />
      )}
    />
  );
};

export default BookletList;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: colors.white,
//     borderRadius: ms(18),
//     padding: s(14),
//     flexDirection: 'row',
//     alignItems: 'center',

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 3,
//   },

//   image: {
//     width: 72,
//     height: 72,
//     borderRadius: 14,
//     resizeMode: 'cover',
//   },

//   center: {
//     flex: 1,
//     marginLeft: s(14),
//   },

//   title: {
//     fontSize: 16,
//     color: colors.buttonBg,
//   },

//   date: {
//     marginTop: 4,
//     fontSize: 12,
//   },

//   status: {
//     marginTop: 10,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     borderRadius: 8,
//   },

//   right: {
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginLeft: s(10),
//   },

//   price: {
//     // fontSize: 18,
//     color: colors.buttonBg,
//   },
// });

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: ms(18),
    padding: s(14),
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed from center
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  image: {
   width: 72,
  height: 72,
  borderRadius: 14,
  backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    marginLeft: s(14),
    minWidth: 0, // Important for text wrapping
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 16,
    color: colors.buttonBg,
    flexShrink: 1,
    flexWrap: 'wrap',
    lineHeight: 22,
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    flexWrap: 'wrap',
  },

  status: {
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 8,
  marginLeft: 10,
  },

  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: s(10),
  },

  price: {
    color: colors.buttonBg,
  },

  codeRow: {
     flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  },
  bottomRow: {
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});