import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';
import {
  MY_CARD_COMBO_OFFERS_LIST_SCREEN,
  MY_CARD_COUPON_LIST_SCREEN,
} from '@navigations/routes';
import { Loader, SpinnerSecond } from '@components/Spinner';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { colors } from '@theme/colors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Card from '@screens/home/ui/card';
import NavigationService from '@navigations/NavigationService';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { defaultBookletImage } from '@helper/imagesAssets';
import {
  getMyCardBookletList,
  getMyCardComboOffersList,
  getMyCardCouponList,
} from '@actions/myCard/myCardAction';
import Toast from 'react-native-simple-toast';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import moment from 'moment';
import { IMGE_URL } from '@services/config';

const MyCardList = ({ value }: any) => {
  const dispatch = useAppDispatch();
  // const { isLoading ,isBtnLoading} = useAppSelector((state) => state.myCard);
  const {
    isLoading,
    isRefresh,
    myCardAllBookletList,
    myCardActiveBookletList,
    myCardExpiredBookletList,
    isBtnLoading,
  } = useAppSelector(state => state?.myCard);
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   // setRefreshing(true);
  //   dispatch(getMyCardBookletList(value, isRefresh));
  // }, [dispatch, value, isRefresh]);

  // const handleOnPress = (item) => {
  //   dispatch(
  //     getMyCardCouponList(
  //       { user_booklet_uuid: item.user_booklet_uuid },
  //       () => onSuccess(item) // ✅ Pass callback correctly
  //     )
  //   );
  // };
  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    dispatch(getMyCardBookletList(value, isRefresh));
  }, [dispatch, value, isRefresh]);

  const handleOnPress = (item: any) => {
    // console.log(item,'item in handle on press===>');
    if (item?.booklet_type === 2) {
      // Alert.alert('combo')
      dispatch(
        getMyCardComboOffersList(
          { user_booklet_uuid: item.user_booklet_uuid },
          () => onComboSuccess(item),
        ),
      );
    } else {
      dispatch(
        getMyCardCouponList({ user_booklet_uuid: item.user_booklet_uuid }, () =>
          onSuccess(item),
        ),
      );
    }
  };

  const onComboSuccess = item => {
    NavigationService.navigate(MY_CARD_COMBO_OFFERS_LIST_SCREEN, {
      data: item,
    });
  };

  const data = useMemo(() => {
    if (value.tabname == 'all') return myCardAllBookletList;
    if (value.tabname == 'active') return myCardActiveBookletList;
    if (value.tabname == 'expire') return myCardExpiredBookletList;
    return [];
  }, [
    value.tabname,
    myCardAllBookletList,
    myCardActiveBookletList,
    myCardExpiredBookletList,
  ]);

  const onSuccess = (item:any) => {
    // console.log(item,'iteemmmm in coupon list');

    NavigationService.navigate(MY_CARD_COUPON_LIST_SCREEN, {
      title: item?.name,
      user_booklet_uuid: item?.user_booklet_uuid,
      tab_status: item?.tab_status,
      booklet_uniquecode: item?.booklet_uniquecode,
    });
  };

  const renderItem = useCallback(
    ({ item, index }: any) => {
      // booklet_type

      return (
        <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
          
          <Card
            item={item}
            index={index}
            type="booklet" // 👈 IMPORTANT
            cardContainerStyle={{ width: '100%' }}
            imageStyle={styles.imageStyle}
            imageUrl={
              item?.booklet
                ? { uri: IMGE_URL + item?.booklet }
                : defaultBookletImage
            }
            // name={`${item?.name} (${item?.booklet_uniquecode})`}
            name={`${item?.name}`}
            // price={item.price}
            address={item?.locations?.[0]?.location ?? '---'}
            handleCardOnPress={() => {
              if (item?.tab_status === 'expired') {
                Toast.show('Booklet has been Expired', Toast.LONG);
              } else {
                handleOnPress(item);
              }
            }}
            status={item?.tab_status}
            shortDesc={item?.short_desc}
            // ✅ NEW PROPS (CLEAN)
            startDate={item?.start_date}
            // validityMonths={item?.validity_months?item?.validity_months: item?.end_date}
            //   validityMonths={
            //   item?.date_type === 1
            //     ? `Upto ${item?.validity_months} months`
            //     : moment(item?.end_date).format("DD MMM YYYY")
            // }
            validityMonths={item?.end_date}
          />
        </View>
      );
    },
    [data, handleOnPress],
  );

  return (
    <View style={styles.mainContainer}>
      {/* {isBtnLoading && <SpinnerSecond/>} */}
      {isLoading && !isRefresh ? (
        // <Loader />
        <View style={{ paddingHorizontal: s(16) }}>
          <CategoriesListShimmerLoader />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          extraData={data}
          keyExtractor={(item, index) =>
            item?.user_booklet_uuid ?? index.toString()
          }
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
      )}
    </View>
  );
};

export default MyCardList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainerStyle: {
    gap: ms(26),
    paddingBottom: vs(150),
    marginTop: vs(22),
    marginHorizontal: 16,
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
  statusContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: ms(12),
  },
});
