import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Platform,
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
import { Loader, SpinnerSecond } from '@components/Spinner';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  AppText,
  BOLD,
  EIGHTEEN,
  SIXTEEN,
  TWENTY,
  TWENTY_FOUR,
  TWENTY_TWO,
  WHITE,
} from '@components/AppText';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setLoading } from '@actions/myCard/myCardSlice';
import {
  addToCartAction,
  getCartList,
  updateCartQuantity,
} from '@actions/cart/cartActions';
import CategoriesShimmer from '@components/ShimerLoader/categoriesShimerLoader';

const ComboDetailList = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const { isLoading, isRefresh, isBtnLoading, comboOfferList } = useAppSelector(
    state => state?.myCard,
  );

  const { userData } = useAppSelector(state => state?.auth);
  const [acceptContent, setAcceptContent] = useState(false);

  const { bookletDetailAllDeals } = useAppSelector(state => state?.home);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [addTocarBookletId, setAddToCartBookletId] = useState<number | string>(
    '',
  );
  const [qtyLoading, setQtyLoading] = useState(false);
  const { data, from } = route?.params ?? '';

  const bottomSheetRef = useRef<BottomSheet>(null);
  const executiveBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '50%', '80%'], []);
  const executiveSnapPoints = useMemo(() => ['50%', '80%'], []);
  const [quantity, setQuantity] = useState(1);
  const { cartList } = useAppSelector(state => state.cart);

  const cartItem = cartList?.items?.find(
    item => item?.booklet_uuid === data?.uuid,
  );

  const isInCart = !!cartItem;

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const handleIncrement = () => {
    const maxQty = Number(cartList?.max_quantity);

    if (Number(cartItem?.quantity) >= maxQty) {
      return;
    }

    const payload = {
      cart_id: cartItem?.cart_id,
      quantity: Number(cartItem?.quantity) + 1,
      action: 'increment',
    };
    setQtyLoading(true);
    dispatch(
      updateCartQuantity(payload, () => {
        setQtyLoading(false);
        setQuantity(prev => prev + 1);
      }),
    );
  };

  const handleDecrement = () => {
    if (Number(cartItem?.quantity) <= 1) {
      return;
    }

    const payload = {
      cart_id: cartItem?.cart_id,
      quantity: Number(cartItem?.quantity) - 1,
      action: 'decrement',
    };
    setQtyLoading(true);
    dispatch(
      updateCartQuantity(payload, () => {
        setQtyLoading(false);
        setQuantity(prev => prev - 1);
      }),
    );
  };

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
    dispatch(setLoading(true));

    setTimeout(() => {
      let value = {
        booklet_id: data?.uuid,
        tabname: 'All Deals',
        vendor_id: String(item?.id),
      };

      dispatch(
        getComboBookletDetail(value, (success?: boolean) => {
          dispatch(setLoading(false));

          if (success) {
            handleComboSuccess(item);
          }
        }),
      );
    }, 100); 
  };

  const handleComboSuccess = (item: any) => {
    // dispatch(setBookletDetailAllDeals({}))

    NavigationService.navigate(routes.DETAILS_SCREEN, {
      data: item,
      from: 'ComboBooklet',
      noApiCall: true, 
      booklet_id: data?.uuid,
    });
  };

  const handleOnPress = () => {


    // if (userData?.user_type == '1') {
    //   executiveBottomSheetRef?.current?.expand();
    // } else {
      const payload = {
        booklet_id: data?.uuid,
        quantity: 1,
      };

      dispatch(
        addToCartAction(payload, data, () => {
          setAddToCartBookletId(data?.uuid);
          setIsAddToCart(true);
          setQuantity(1);

          dispatch(getCartList());
        }),
      );
    // }
  };
  const handleSubmit = (_data: any) => {
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

    return defaultBookletImage; 
  };

  const isExpired = moment(data?.end_date, 'YYYY-MM-DD').isBefore(moment());

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
        <Card
          item={item}
          isCompleteLocation={true}
          showArrow={true}
          cardContainerStyle={{ width: '100%' }}
          imageStyle={styles.imageStyle}
          imageUrl={getVendorImage(item)}
          price={item.price}
          address={item?.locations?.[0]?.location}
          status={item?.tab_status}
          shortDesc={item?.short_desc}
          handleCardOnPress={() => onHandlePress(item, index)}
          startDate={item?.start_date}
          validityMonths={item?.validity_months}
          location={item?.locations}
          cardDisabled={item?.tab_status === 'Expired'}
        />
      </View>
    );
  };

  const status = comboOfferList?.[0]?.request_status;

const isDisabled =
  status === 'Pending' ||
  status === 'Out of Stock' ||
  isExpired;

const buttonText =
  status === 'Out of Stock'
    ? 'OUT OF STOCK'
    : status === 'Pending'
    ? 'REQUEST IN PENDING'
    : isExpired
    ? 'EXPIRED'
    : 'REQUEST';

const displayButtonText = isDisabled
  ? buttonText
  // : userData?.user_type === '1'
  // ? 'REQUEST'
  : 'ADD TO CART';
  return (
    <View style={styles.mainContainer}>
      <ToolBar
        isLeftIcon
        title={data?.name}
        mainContainerStyle={{ marginTop: 30 }}
      />

      <View style={styles.containerStyle}>
        {/* LIST */}

        <FlatList
          data={comboOfferList}
          renderItem={renderItem}
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

        {/* FIXED BOTTOM BUTTON */}
        <View style={styles.bottomBtnContainer}>
          {isLoading ? (
            <View style={{ width: '100%' }}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.shimmerBtnStyle}
              />
            </View>
          ) : (
    //         <>
    //           {bookletDetailAllDeals !== null && (
    //             <>
    //               {/* {userData?.user_type !== '1' &&
    // isInCart &&
    // addTocarBookletId === data?.uuid ? ( */}
    //               {userData?.user_type !== '1' && isInCart ? (
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     justifyContent: 'space-between',
    //                     width: '100%',
    //                   }}
    //                 >
    //                   <View
    //                     style={{
    //                       flexDirection: 'row',
    //                       alignItems: 'center',
    //                       borderWidth: 1,
    //                       borderColor: '#D9D9D9',
    //                       borderRadius: 22,
    //                       overflow: 'hidden',
    //                       height: 42,
    //                       width: 120,
    //                     }}
    //                   >
    //                     <TouchableOpacityView
    //                       style={{
    //                         width: 40,
    //                         height: 42,
    //                         justifyContent: 'center',
    //                         alignItems: 'center',
    //                       }}
    //                       onPress={handleDecrement}
    //                     >
    //                       <AppText weight={BOLD} type={TWENTY_FOUR}>
    //                         -
    //                       </AppText>
    //                     </TouchableOpacityView>

    //                     <View
    //                       style={{
    //                         width: 40,
    //                         alignItems: 'center',
    //                       }}
    //                     >
    //                       <AppText weight={BOLD} type={EIGHTEEN}>
    //                         {cartItem?.quantity ?? quantity}
    //                       </AppText>
    //                     </View>

    //                     <TouchableOpacityView
    //                       style={[
    //                         styles.qtyButton,
    //                         Number(cartItem?.quantity) >=
    //                           Number(cartList?.max_quantity) && {
    //                           opacity: 0.2,
    //                         },
    //                       ]}
    //                       onPress={handleIncrement}
    //                       disabled={
    //                         Number(cartItem?.quantity) >=
    //                         Number(cartList?.max_quantity)
    //                       }
    //                     >
    //                       <AppText weight={BOLD} type={TWENTY_FOUR}>
    //                         +
    //                       </AppText>
    //                     </TouchableOpacityView>
    //                   </View>

    //                   <TouchableOpacityView
    //                     style={{
    //                       flex: 1,
    //                       marginLeft: 15,
    //                       height: 48,
    //                       borderRadius: 24,
    //                       backgroundColor: colors.buttonBg,
    //                       justifyContent: 'center',
    //                       alignItems: 'center',
    //                     }}
    //                     onPress={() =>
    //                       NavigationService.navigate(routes.CART_SCREEN)
    //                     }
    //                   >
    //                     <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
    //                       VIEW CART
    //                     </AppText>
    //                   </TouchableOpacityView>
    //                 </View>
    //               ) : (
    //                 <TouchableOpacityView
    //                   onPress={handleOnPress}
    //                   style={styles.buyBtnStyle(
    //                     comboOfferList?.[0]?.request_status === 'Pending' ||
    //                       comboOfferList?.[0]?.request_status ===
    //                         'Out of Stock' ||
    //                       isExpired,
    //                   )}
    //                   loader={isBtnLoading}
    //                   disabled={
    //                     comboOfferList?.[0]?.request_status === 'Pending' ||
    //                     comboOfferList?.[0]?.request_status ===
    //                       'Out of Stock' ||
    //                     isExpired
    //                   }
    //                 >
    //                   <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
    //                     {userData?.user_type == '1'
    //                       ? comboOfferList?.[0]?.request_status ===
    //                         'Out of Stock'
    //                         ? 'OUT OF STOCK'
    //                         : comboOfferList?.[0]?.request_status === 'Pending'
    //                         ? 'REQUEST IN PENDING'
    //                         : isExpired
    //                         ? 'EXPIRED'
    //                         : 'REQUEST'
    //                       : 'ADD TO CART'}
    //                   </AppText>
    //                 </TouchableOpacityView>
    //               )}
    //             </>
    //           )}
    //         </>
    <>

    {bookletDetailAllDeals !== null && (
  <>
    {/* {userData?.user_type !== '1' && isInCart && !isDisabled ? ( */}
    { isInCart && !isDisabled ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#D9D9D9',
            borderRadius: 22,
            overflow: 'hidden',
            height: 42,
            width: 120,
          }}
        >
          <TouchableOpacityView
            style={{
              width: 40,
              height: 42,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleDecrement}
          >
            <AppText weight={BOLD} type={TWENTY_FOUR}>
              -
            </AppText>
          </TouchableOpacityView>

          <View
            style={{
              width: 40,
              alignItems: 'center',
            }}
          >
            <AppText weight={BOLD} type={EIGHTEEN}>
              {cartItem?.quantity ?? quantity}
            </AppText>
          </View>

          <TouchableOpacityView
            style={[
              styles.qtyButton,
              Number(cartItem?.quantity) >=
                Number(cartList?.max_quantity) && {
                opacity: 0.2,
              },
            ]}
            onPress={handleIncrement}
            disabled={
              Number(cartItem?.quantity) >=
              Number(cartList?.max_quantity)
            }
          >
            <AppText weight={BOLD} type={TWENTY_FOUR}>
              +
            </AppText>
          </TouchableOpacityView>
        </View>

        <TouchableOpacityView
          style={{
            flex: 1,
            marginLeft: 15,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.buttonBg,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() =>
            NavigationService.navigate(routes.CART_SCREEN)
          }
        >
          <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
            VIEW CART
          </AppText>
        </TouchableOpacityView>
      </View>
    ) : (
      <TouchableOpacityView
        onPress={handleOnPress}
        style={styles.buyBtnStyle(isDisabled)}
        loader={isBtnLoading}
        disabled={isDisabled}
      >
        <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
          {displayButtonText}
        </AppText>
      </TouchableOpacityView>
    )}
  </>
)}
    </>
          )}
        </View>
      </View>

      {/* BOTTOM SHEETS */}
      <RequestBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        onSubmit={_data => handleSubmit(_data)}
        acceptContent={acceptContent}
        setAcceptContent={setAcceptContent}
        onDismiss={() => {
          Keyboard.dismiss();
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
          Keyboard.dismiss();
          executiveBottomSheetRef.current?.close();
        }}
      />
      {(isLoading || qtyLoading) && <SpinnerSecond />}
    </View>
  );
};

export default ComboDetailList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: s(16),
    backgroundColor: colors.white,
  },
  containerStyle: {
    flex: 1,
    paddingTop: vs(25),
    // paddingBottom: vs(80),
  },
  listContainerStyle: {
    gap: ms(26),
    paddingBottom: vs(120),
    // paddingBottom: vs(80),
    // marginTop: vs(22),
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
    // paddingTop: vs(20),
  },
  loaderBox: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)', // 👈 IMPORTANT
  },
  qtyButton: {
    width: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
