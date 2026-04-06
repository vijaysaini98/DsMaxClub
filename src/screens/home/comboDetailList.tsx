import {
  Alert,
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Loader } from '@components/Spinner';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { AppText, BOLD, SIXTEEN, WHITE } from '@components/AppText';
import { commonStyles } from '@theme/commonStyles';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { ms, s, vs } from 'react-native-size-matters';
import { colors } from '@theme/colors';
import ListEmptyComponent from '@components/ListEmptyComponent';
import {
  getComboOffersList,
  getMyCardBookletList,
} from '@actions/myCard/myCardAction';
import Card from './ui/card';
import { defaultBookletImage } from '@helper/imagesAssets';
import Toast from 'react-native-simple-toast';
import { IMGE_URL } from '@services/config';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { DETAILS_SCREEN, REQUEST_SUCCESSFUL_SCREEN } from '@navigations/routes';
import {
  bookletRequest,
  executiveBookletRequest,
  getBookletDetail,
  getComboBookletDetail,
} from '@actions/home/homeAction';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacityView from '@components/TouchableOpacityView';
import ExecutiveRequestBottomSheet from '@screens/detail/ui/executiveRequestBottomSheet';
import RequestBottomSheet from '@screens/detail/ui/requestBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import { setBookletDetailAllDeals } from '@actions/home/homeSlice';

const ComboDetailList = ({ route }: any) => {
  const { isLoading, isRefresh, isBtnLoading, comboOfferList } = useAppSelector(
    state => state?.myCard,
  );

  // console.log(comboOfferList, 'comboOfferList====>');
  const { userData } = useAppSelector(state => state?.auth);
  const [acceptContent, setAcceptContent] = useState(false);

  const { bookletDetailAllDeals } = useAppSelector(state => state?.home);
    // console.log(bookletDetailAllDeals, 'bookletDetailAllDeals===>');
  const [refreshing, setRefreshing] = useState(false);
  const { data, from } = route?.params ?? '';
  //   console.log(data, 'data in combo detail list===>');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const executiveBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '50%', '80%'], []);
  const executiveSnapPoints = useMemo(() => ['50%', '80%'], []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    //  dispatch(getComboOffersList(data?.client?.[0]?.uuid));
    if (data?.uuid) {
      dispatch(getComboOffersList({ booklet_uuid: data?.uuid }));
    }
  }, [dispatch, isRefresh, data]);

  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    dispatch(getComboOffersList({ booklet_uuid: data?.uuid }));
  }, [isRefresh]);

  const onHandlePress = (item: any, index: number) => {
    let value = {
      booklet_id: data?.uuid,
      tabname: 'All Deals',
      vendor_id: String(item?.id),
    };

    // switch (index) {
    //   case 0:
    //     value.tabname = 'All Deals';
    //     break;
    //   case 1:
    //     value.tabname = 'About';
    //     break;
    //   case 2:
    //     value.tabname = 'Termscondition';
    //     break;
    //   case 3:
    //     value.tabname = 'Gallery';
    //     break;
    //   default:
    //     value.tabname = 'All Deals';
    // }

    console.log(value, 'value from combo booklet details api call');

    dispatch(getComboBookletDetail(value, () => handleComboSuccess(item)));
  };

  const handleComboSuccess = (item: any) => {
    console.log(item, 'item on combo success');
          // dispatch(setBookletDetailAllDeals({}))

    NavigationService.navigate(routes.DETAILS_SCREEN, {
      data: item,
      from: 'ComboBooklet',
      noApiCall: true, // ✅ NEW FLAG TO AVOID API CALL IN DETAILS SCREEN
    });
  };

  const handleOnPress = () => {
    let apidata = {
      booklet_id: data.uuid,
    };
    // if (!acceptContent) {
    //   setIndex(2)
    //   Toast.show("Accept the booklet Terms and Condition", Toast.LONG);
    // }
    if (userData?.user_type == '1') {
      executiveBottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef.current?.expand();
      // executiveBottomSheetRef?.current?.expand()
      // dispatch(bookletRequest(apidata, handleSucess))
    }
  };
  const handleSubmit = (_data: any) => {
    console.log(data, 'data on handle submit===>');

    Keyboard?.dismiss();
    let apidata = {
      booklet_id: data.uuid,
      executive_code: _data?.executiveCode,
      quantity: _data?.bookletQty,
    };
    if (!acceptContent) {
      // setIndex(2)
      Toast.show('Accept the booklet Terms and Condition', Toast.LONG);
    } else {
      dispatch(bookletRequest(apidata, handleSucess));
    }
  };

  const handleExecutiveSubmit = _data => {
    Keyboard?.dismiss();
    let apiData = {
      name: _data?.customerName,
      email: _data?.customerEmail,
      mobile: _data?.customerMobile,
      quantity: _data?.bookletQty,
      booklet_id: data.uuid,
    };
    if (!acceptContent) {
      // setIndex(2)
      Toast.show('Accept the booklet Terms and Condition', Toast.LONG);
    } else {
      dispatch(executiveBookletRequest(apiData, handleSucess));
    }
  };

  const handleSucess = () => {
    let value = {
      booklet_id: data?.uuid,
      tabname: 'All Deals',
    };
    if (from == 'ComboBooklet') {
      dispatch(getComboBookletDetail(value));
    } else {
      dispatch(getBookletDetail(value));
    }
    if (userData?.user_type == '1') {
      setAcceptContent(!acceptContent);
      executiveBottomSheetRef?.current?.close();
    } else {
      setAcceptContent(!acceptContent);
      bottomSheetRef.current?.close();
      // NavigationService.navigate(MY_REQUEST_SCREEN,{tabIndex:1})
      NavigationService.navigate(REQUEST_SUCCESSFUL_SCREEN);
    }
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

  const isExpired = moment(data?.end_date, 'YYYY-MM-DD').isBefore(moment());
  const renderItem = ({ item, index }: any) => {
    // console.log(item, 'item in render===>');

    return (
      <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
        <Card
          item={item}
          isCompleteLocation={true}
          showArrow={true}
          cardContainerStyle={{ width: '100%' }}
          imageStyle={styles.imageStyle}
          //   imageUrl={
          //     item?.profile_image
          //       ? { uri: IMGE_URL + item?.profile_image }
          //       : defaultBookletImage
          //   }
          imageUrl={getVendorImage(item)}
          price={item.price}
          address={item?.locations?.[0]?.location ?? '---'}
          status={item?.tab_status}
          shortDesc={item?.short_desc}
          handleCardOnPress={() => onHandlePress(item, index)}
          // ✅ NEW PROPS (CLEAN)
          startDate={item?.start_date}
          validityMonths={item?.validity_months}
          location={item?.locations}
        />
      </View>
    );
  };
  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title={data?.name} />
      <View style={styles.containerStyle}>
        <FlatList
          data={comboOfferList}
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
        <View style={styles.bottomBtnContainer}>
          {isLoading ? (
            <View style={{ width: '100%' }}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.shimmerBtnStyle}
              />
            </View>
          ) : (
            <>
              {/* {
              index == 2 && (
                <View style={styles.acceptTermsConditionContainer}>
                  <TouchableOpacityView
                    onPress={() => setAcceptContent(!acceptContent)}
                    style={styles.acceptTermsConditionBtn}>
                    {acceptContent ?
                      <Image
                        source={checkIcon}
                        style={{ height: s(24), width: s(24) }}
                        resizeMode={"contain"}
                        tintColor={colors.buttonBg}
                      />
                      : <Image
                        source={unCheckIcon}
                        style={{ height: s(20), width: s(20) }}
                        resizeMode={"contain"}
                        tintColor={colors.buttonBg}
                      />
                    }
                    <AppText type={TWELVE} weight={MEDIUM} >{"Accept the Term&Conditions"}</AppText>
                  </TouchableOpacityView>
                </View>
              )
            } */}

              {/* <TouchableOpacityView
                onPress={handleOnPress}
                style={styles.buyBtnStyle(
                  bookletDetailAllDeals?.request_status === 'Pending' ||
                    bookletDetailAllDeals?.request_status === 'Out of Stock' ||
                    !bookletDetailAllDeals?.request_status ||
                    isExpired,
                )}
                loader={isBtnLoading}
                disabled={
                  bookletDetailAllDeals?.request_status === 'Pending' ||
                  bookletDetailAllDeals?.request_status === 'Out of Stock' ||
                   !bookletDetailAllDeals?.request_status ||
                  isExpired
                }
              >
                <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
                      {bookletDetailAllDeals?.request_status === 'Out of Stock'
                        ? 'Out Of Stock'
                        : bookletDetailAllDeals?.request_status === 'Pending'
                        ? 'REQUEST IN PENDING'
                        : isExpired
                        ? 'EXPIRED'
                        :
                         !bookletDetailAllDeals?.request_status? 'Out of Stock' :
                        'REQUEST'}
                    </AppText>
              </TouchableOpacityView> */}
              {bookletDetailAllDeals !== null &&
 
    <TouchableOpacityView
      onPress={handleOnPress}
      style={styles.buyBtnStyle(
        bookletDetailAllDeals?.request_status === 'Pending' ||
        bookletDetailAllDeals?.request_status === 'Out of Stock' ||
        isExpired
      )}
      loader={isBtnLoading}
      disabled={
        bookletDetailAllDeals?.request_status === 'Pending' ||
        bookletDetailAllDeals?.request_status === 'Out of Stock' ||
        isExpired
      }
    >
      <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
        {bookletDetailAllDeals?.request_status === 'Out of Stock'
          ? 'Out Of Stock'
          : bookletDetailAllDeals?.request_status === 'Pending'
          ? 'REQUEST IN PENDING'
          : isExpired
          ? 'EXPIRED'
          : 'REQUEST'}
      </AppText>
    </TouchableOpacityView>
}
            </>
          )}
        </View>

        <RequestBottomSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          onSubmit={_data => handleSubmit(_data)}
          acceptContent={acceptContent}
          setAcceptContent={setAcceptContent}
          onDismiss={() => {
            Keyboard?.dismiss();
            bottomSheetRef.current?.close();
          }}
        />
        <ExecutiveRequestBottomSheet
          bottomSheetRef={executiveBottomSheetRef}
          snapPoints={executiveSnapPoints}
          onSubmit={_data => handleExecutiveSubmit(_data)}
          setAcceptContent={setAcceptContent}
          acceptContent={acceptContent}
          handleDismiss={() => {
            Keyboard?.dismiss();
            executiveBottomSheetRef.current?.close();
          }}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default ComboDetailList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: s(16),
  },
  containerStyle: {
    flex: 1,
    paddingTop: vs(25),
    paddingBottom: vs(80),
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
  shimmerBtnStyle: {
    height: vs(50),
    width: '100%',
    borderRadius: ms(100),
  },
  buyBtnStyle: (disable: boolean) => ({
    backgroundColor: disable ? colors.disabledBtn : colors.buttonBg,
    paddingVertical: vs(15),
    width: '100%',
    alignItems: 'center',
    borderRadius: ms(100),
  }),
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: colors.white,
    backgroundColor: colors.white,
    paddingVertical: vs(10),
    // paddingHorizontal: s(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
