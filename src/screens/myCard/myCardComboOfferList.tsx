import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '@components/Spinner';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { AppText } from '@components/AppText';
import { commonStyles } from '@theme/commonStyles';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { ms, s, vs } from 'react-native-size-matters';
import { colors } from '@theme/colors';
import ListEmptyComponent from '@components/ListEmptyComponent';
import {
  getComboOffersList,
  getMyCardBookletList,
  getMyCardComboOffersList,
  getMyCardCouponList,
} from '@actions/myCard/myCardAction';
// import Card from './ui/card';
import { defaultBookletImage } from '@helper/imagesAssets';
import Toast from 'react-native-simple-toast';
import { IMGE_URL } from '@services/config';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { DETAILS_SCREEN } from '@navigations/routes';
import { getComboBookletDetail } from '@actions/home/homeAction';
import Card from '@screens/home/ui/card';

const MyCardComboOfferList = ({ route }: any) => {
  const { isLoading, isRefresh, myCardComboOfferList } = useAppSelector(
    state => state?.myCard,
  );

  console.log(myCardComboOfferList, 'myCardOffersList==>');

  // console.log(myCardComboOfferList,'myCardComboOfferList in my card list dataaaataa===>');
  // console.log(myCardComboOfferList?.[0]?.user_booklet_uuid,'myCardComboOfferList?.user_booklet_uuid===>');

  const { data, from } = route?.params ?? '';
  // console.log(data?.uuid,'data?.uuid==>');

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (myCardComboOfferList?.[0]?.user_booklet_uuid) {
      dispatch(
        getMyCardComboOffersList({
          user_booklet_uuid: myCardComboOfferList?.[0]?.user_booklet_uuid,
        }),
      );
    }
  }, [dispatch, isRefresh, data]);

  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    dispatch(
      getMyCardComboOffersList({
        user_booklet_uuid: myCardComboOfferList?.[0]?.user_booklet_uuid,
      }),
    );
  }, [isRefresh]);

  const onHandlePress = (item: any, index: number) => {
    console.log(item, 'item in on handle press===>');

    dispatch(
      getMyCardCouponList(
        { user_booklet_uuid: item.user_booklet_uuid, vendor_id: item?.id },
        () => onSuccess(item),
      ),
    );
  };

  const onSuccess = item => {
    // console.log(item,'item on success===>');

    NavigationService.navigate(routes.MY_CARD_COUPON_LIST_SCREEN, {
      title: item?.name,
      user_booklet_uuid: item?.user_booklet_uuid,
      tab_status: item?.tab_status,
      booklet_uniquecode: item?.booklet_uniquecode,
    });
  };

  const getVendorImage = (vendor: any) => {
    if (vendor?.gallery) {
      const firstGallery = vendor.gallery.split(',')[0];
      if (firstGallery) {
        return { uri: IMGE_URL + firstGallery };
      }
    }

    if (vendor?.profile_image) {
      return { uri: IMGE_URL + vendor.profile_image };
    }

    return defaultBookletImage; // ✅ use imported local image
  };
  const renderItem = ({ item, index }: any) => {
    console.log(item, 'item in render===>');

    return (
      <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
        <Card
          item={item}
          type="combo"
          // isCompleteLocation={true}
          showArrow
          cardContainerStyle={{ width: '100%' }}
          imageStyle={styles.imageStyle}
          imageUrl={getVendorImage(item)}
          //   price={item.price}
          address={item?.locations?.[0]?.location ?? '---'}
          status={item?.tab_status}
          shortDesc={item?.short_desc}
          handleCardOnPress={() => onHandlePress(item, index)}
          // ✅ NEW PROPS (CLEAN)
          startDate={item?.start_date}
          validityMonths={item?.validity_months}
          location={item?.locations}
          showDateSection={true}
          cardDisabled={item?.tab_status === 'Expired'}
          // mobile={item?.mobile}
          
        />
      </View>
    );
  };
  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title={data?.name} />
      <View style={styles.containerStyle}>
        <FlatList
          data={myCardComboOfferList}
          renderItem={renderItem}
          //   extraData={data}
          //   keyExtractor={(item, index) => item?.user_booklet_uuid ?? index.toString()}
          contentContainerStyle={styles.listContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent title={'No Card Available'} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        />
      </View>
    </AppSafeAreaView>
  );
};

export default MyCardComboOfferList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: s(16),
  },
  containerStyle: {
    flex: 1,
    paddingTop: vs(25),
  },
  listContainerStyle: {
    gap: ms(26),
    paddingBottom: vs(150),
    marginTop: vs(22),
    // marginHorizontal: 16,
  },
  shadowContainer: {
    borderRadius: ms(15),
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2, // Android shadow
  },
  imageStyle: {
    width: '100%',
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
});
