import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Keyboard,
  Linking,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  backIcon,
  defaultBookletImage,
  downArrowIcon,
  eyeOpenIcon,
  helpLineIcon,
  locationIcon,
} from '@helper/imagesAssets';
import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  PLACEHOLDER,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
  TWENTY,
  TWENTY_FOUR,
  TWENTY_TWO,
  WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import TouchableOpacityView from '@components/TouchableOpacityView';
import All from './ui/all';
import About from './ui/about';
import Gallery from './ui/gallery';
import Terms_Condition from './ui/terms_condition';
import styles from './styles';
import {
  extractLatLngFromUrl,
  openMap,
  openPhoneDialer,
  shareToAny,
  width,
} from '@utils/index';
import { RenderTabBar } from '@components/RenderTabBar';
import { IMGE_URL } from '@services/config';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  bookletRequest,
  executiveBookletRequest,
  getBookletDetail,
  getComboBookletDetail,
} from '@actions/home/homeAction';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import MultiLocationSheet from './ui/multiLoctionSheet';
import NavigationService from '@navigations/NavigationService';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import RequestBottomSheet from './ui/requestBottomSheet';
import ExecutiveRequestBottomSheet from './ui/executiveRequestBottomSheet';
import HowToRedeem from './ui/howToRedeem';
import ViewDetailsBottomSheet from './ui/viewDetailsBottomSheet';
import { commonStyles } from '@theme/commonStyles';
import {
  CART_SCREEN,
  HOME_SCREEN,
  REQUEST_SUCCESSFUL_SCREEN,
} from '@navigations/routes';

import {
  addToCartAction,
  getCartList,
  updateCartQuantity,
} from '@actions/cart/cartActions';
import { SpinnerSecond } from '@components/Spinner';
import { setBtnLoading } from '@actions/cart/cartSlice';
const initialLayout = { width: width };

const routes = [
  { key: 'allDeals', title: 'All Deals' },
  { key: 'about', title: 'About' },
  { key: 'tc', title: 'Rules of Use' },
  { key: 'redeemHelp', title: 'How to Use' },
  { key: 'gallery', title: 'Gallery' },
];

const Details = ({ route }: any) => {
  const { data, from, noApiCall, booklet_id } = route?.params ?? '';
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();

  const { bookletDetailAllDeals } = useAppSelector(state => state.home);
  const { isLoading, isBtnLoading } = useAppSelector(state => state.cart);

  const { userData } = useAppSelector(state => state?.auth);

  const [index, setIndex] = React.useState(0);
  const [acceptContent, setAcceptContent] = useState(false);
  const [couponDetail, setCouponDetail] = useState<any>();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [addTocarBookletId, setAddToCartBookletId] = useState<number | string>(
    '',
  );

  const [qtyLoading, setQtyLoading] = useState(false);
  const sheetRef = useRef<BottomSheetModal>(null);

  const scrollY = useRef(new Animated.Value(0)).current; // ✅

  const bottomSheetRef = useRef<BottomSheet>(null);
  const executiveBottomSheetRef = useRef<BottomSheet>(null);
  const viewDetailsBottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%', '50%', '80%'], []);
  const executiveSnapPoints = useMemo(() => ['50%', '80%'], []);
  const { cartList } = useAppSelector(state => state.cart);
  const [viewCartLoading, setViewCartLoading] = useState(false);

  const cartItem = cartList?.items?.find(
    item => item?.booklet_uuid === data?.uuid,
  );

  const isInCart = !!cartItem;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [250, 100, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const collapsedHeaderOpacity = scrollY.interpolate({
    inputRange: [100, 180, 250],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (bookletDetailAllDeals?.booklet_vendor_status === 0) {
      Toast.show('This booklet is not available', Toast.LONG);

      const timer = setTimeout(() => {
        NavigationService.navigate(HOME_SCREEN);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [bookletDetailAllDeals?.booklet_vendor_status]);

  useEffect(() => {
    if (!data?.uuid) return;

    let value = {
      booklet_id: data.uuid,
      tabname: '',
    };

    switch (index) {
      case 0:
        value.tabname = 'All Deals';
        break;
      case 1:
        value.tabname = 'About';
        break;
      case 2:
        value.tabname = 'Termscondition';
        break;
      case 4:
        value.tabname = 'Gallery';
        break;
      default:
        value.tabname = '';
    }
    if (noApiCall) {
      return;
    }
    if (from === 'ComboBooklet') {
      dispatch(getComboBookletDetail(value));
    } else {
      dispatch(getBookletDetail(value));
    }
  }, [index, data?.uuid, from, dispatch, noApiCall]);

  useEffect(() => {
    if (!data?.uuid) return;

    let value = {
      booklet_id: data?.booklet_uuid,
      tabname: '',
      vendor_id: String(data?.id),
    };

    switch (index) {
      // case 0:
      //   value.tabname = 'All Deals';
      //   break;
      case 1:
        value.tabname = 'About';
        break;
      case 2:
        value.tabname = 'Termscondition';
        break;
      case 4:
        value.tabname = 'Gallery';
        break;
      default:
        value.tabname = '';
    }
    if (
      noApiCall &&
      from === 'ComboBooklet' &&
      value.tabname !== 'All Deals' &&
      value.tabname
    ) {
      dispatch(getComboBookletDetail(value));

      return;
    }
  }, [index, data?.uuid, from, noApiCall]);

  const handleViewPress = (item: any) => {
    setCouponDetail(item);
    setTimeout(() => {
      // viewDetailSheet?.current?.open();
      viewDetailsBottomSheetRef?.current?.expand();
    }, 200);
  };

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const renderScene = useMemo(
    () =>
      SceneMap({
        allDeals: () => (
          <All
            id={data.uuid}
            from={from}
            scrollY={scrollY}
            handleViewPress={handleViewPress}
            booklet_id={booklet_id}
            venderId={data?.id}
          />
        ),

        about: () => <About from={from} scrollY={scrollY} />,
        tc: () => <Terms_Condition from={from} scrollY={scrollY} />,
        redeemHelp: () => (
          <HowToRedeem from={from} scrollY={scrollY} index={index} />
        ),
        gallery: () => <Gallery id={data.uuid} from={from} scrollY={scrollY} />,
      }),
    [data?.uuid, from, scrollY, index], // dependencies
  );

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
      NavigationService.navigate(REQUEST_SUCCESSFUL_SCREEN);
    }
  };

  const handleRedirection = (location_url: string) => {
    const coords = extractLatLngFromUrl(location_url);

    if (coords) {
      openMap({
        lat: coords.lat,
        lng: coords.lng,
        label: data?.client?.name || 'Location',
      });
    } else {
      Linking.openURL(location_url).catch(() => {
        Toast.show("Can't open this location", Toast.LONG);
      });
    }
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
  const handleViewCart = () => {
    setViewCartLoading(true);

    setTimeout(() => {
      NavigationService.navigate(CART_SCREEN, {
        from: 'Home',
      });

      setViewCartLoading(false);
    }, 300);
  };

  const isExpired = moment(data?.end_date, 'YYYY-MM-DD').isBefore(moment());

  const isCombo = bookletDetailAllDeals?.booklet_type === 'Combo';

  const locationList = isCombo
    ? Array.isArray(data?.locations)
      ? data.locations
      : []
    : Array.isArray(data?.location)
    ? data.location
    : data?.location
    ? [data.location]
    : [];
  const galleryImages = data?.gallery
    ? data.gallery.split(',').map(img => IMGE_URL + img.trim())
    : [];

  const headerImage = hasError
    ? defaultBookletImage
    : bookletDetailAllDeals?.booklet_type === 'Combo'
    ? galleryImages.length > 0
      ? { uri: galleryImages[0] }
      : defaultBookletImage
    : data?.booklet
    ? { uri: IMGE_URL + data?.booklet }
    : defaultBookletImage;

  const status = bookletDetailAllDeals?.request_status;

  let buttonText = 'REQUEST';
  let isDisabled = false;

  // ❌ Disabled cases
  if (status === 'Out of Stock') {
    buttonText = 'Out Of Stock';
    isDisabled = true;
  } else if (status === 'Pending') {
    buttonText = 'REQUEST IN PENDING';
    isDisabled = true;
  } else if (!status && isExpired) {
    buttonText = 'EXPIRED';
    isDisabled = true;
  }

  const phoneNumber =
    bookletDetailAllDeals?.booklet_type === 'Combo'
      ? data?.short_desc
      : data?.client?.short_desc || data?.clients?.[0]?.short_desc;

  const validityText = useMemo(() => {
    // ✅ SINGLE VENDOR
    if (
      bookletDetailAllDeals?.booklet_type === 'Single' &&
      bookletDetailAllDeals
    ) {
      if (bookletDetailAllDeals?.date_type === 1) {
        return `${moment(bookletDetailAllDeals?.start_date).format(
          'D MMM YYYY',
        )} - Upto ${bookletDetailAllDeals?.validity_months || 'N/A'} months`;
      }

      if (
        bookletDetailAllDeals.date_type === 2 &&
        bookletDetailAllDeals?.end_date
      ) {
        return `${moment(bookletDetailAllDeals?.start_date).format(
          'D MMM YYYY',
        )} - ${moment(bookletDetailAllDeals?.end_date).format('D MMM YYYY')}`;
      }

      return 'N/A';
    }

    if (bookletDetailAllDeals?.date_type === 1) {
      const formattedStart = bookletDetailAllDeals?.start_date
        ? moment(bookletDetailAllDeals.start_date).format('D MMM YYYY')
        : 'N/A';

      return `${formattedStart} - Upto ${
        bookletDetailAllDeals?.validity_months || 'N/A'
      } months`;
    }

    if (bookletDetailAllDeals?.date_type === 2) {
      return `${moment(bookletDetailAllDeals?.start_date).format(
        'D MMM YYYY',
      )} - ${moment(bookletDetailAllDeals?.end_date).format('D MMM YYYY')} ${
        isExpired ? '(Expired)' : ''
      }`;
    }

    return 'N/A';
  }, [bookletDetailAllDeals, data, isExpired]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    const maxQty = Number(cartList?.max_quantity);

    if (Number(cartItem?.quantity) >= maxQty) {
      return;
    }
    const payload = {
      cart_id: cartItem.cart_id,
      quantity: cartItem.quantity + 1,
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
      cart_id: cartItem.cart_id,
      quantity: cartItem.quantity - 1,
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

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={colors.transparent}
        animated={true}
        barStyle={'light-content'}
      />
      <Animated.View style={{ height: headerHeight, opacity: headerOpacity }}>
        <FastImage
          source={headerImage}
          style={styles.coverImageStyle}
          resizeMode="stretch"
          onError={() => setHasError(true)}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacityView
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              style={styles.backBtnStyle}
              onPress={() => NavigationService.goBack()}
            >
              <FastImage
                source={backIcon}
                style={styles.backIconStyle}
                resizeMode="contain"
                tintColor={'black'}
              />
            </TouchableOpacityView>
          </View>
        </FastImage>
      </Animated.View>

      <Animated.View
        style={[
          styles.secondHeaderContainer,
          { opacity: collapsedHeaderOpacity },
        ]}
      >
        <View style={commonStyles.rowAlignCenter}>
          <TouchableOpacityView
            style={styles.backBtnStyle}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => NavigationService.goBack()}
          >
            <FastImage
              source={backIcon}
              style={styles.backIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          <AppText
            type={SIXTEEN}
            weight={BOLD}
            color={PLACEHOLDER}
            numberOfLines={1}
            style={styles.nameTextStyle}
          >
            {data?.client?.name ? data?.client?.name : data?.name}
          </AppText>
        </View>
      </Animated.View>
      <View style={styles.secondContainer}>
        <Animated.View
          style={[
            styles.secondAnimatedContainer,
            {
              opacity: collapsedHeaderOpacity.interpolate({
                inputRange: [0, 0, 0.5],
                outputRange: [1, 0.5, 0],
              }),
            },
          ]}
        >
          <AppText
            type={TWENTY_TWO}
            weight={BOLD}
            color={PLACEHOLDER}
            numberOfLines={2}
            style={{ width: '90%' }}
          >
            {/* {data?.client?.name ? data?.client?.name : data?.name} */}
            {data?.name}
          </AppText>
        </Animated.View>

        {phoneNumber && (
          <TouchableOpacityView onPress={() => openPhoneDialer(phoneNumber)}>
            <AppText
              type={SIXTEEN}
              color={PLACEHOLDER}
              weight={BOLD}
              style={styles.disTextStyle}
            >
              {phoneNumber}
            </AppText>
          </TouchableOpacityView>
        )}

        {validityText && (
          <AppText
            type={THIRTEEN}
            color={isExpired ? BUTTON_TEXT : PLACEHOLDER}
            style={styles.disTextStyle}
          >
            {`Validity:  ${validityText}`}
          </AppText>
        )}

        <AppText type={THIRTEEN} style={styles.disTextStyle}>
          {`Free Gift Coupons Maximum Redeem: ${
            bookletDetailAllDeals?.booklet_type === 'Combo'
              ? bookletDetailAllDeals?.maximum_redeem
              : data?.maximum_redeem
          }`}
        </AppText>

        {locationList?.length > 0 && (
          <View style={styles.locationContainer}>
            <TouchableOpacityView
              onPress={() => handleRedirection(locationList[0]?.location_url)}
              style={styles.locationBtn}
            >
              <Image
                source={locationIcon}
                style={styles.locationIcon}
                tintColor={colors.borderColor}
                resizeMode="contain"
              />

              <AppText numberOfLines={2} type={THIRTEEN} color={BUTTON_TEXT}>
                {locationList[0]?.location}
              </AppText>
            </TouchableOpacityView>

            {locationList?.length > 1 && (
              <TouchableOpacityView
                onPress={() => sheetRef.current?.present()}
                style={styles.downArrowBtnIcon}
              >
                <Image
                  source={downArrowIcon}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
              </TouchableOpacityView>
            )}
          </View>
        )}

        <View style={styles.thridContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={props => (
              <RenderTabBar
                {...props}
                scrollEnabled={true}
                index={index}
                tabTextType={TEN}
              />
            )}
            onIndexChange={setIndex}
            animationEnabled={true}
            layout={initialLayout}
          />
        </View>
      </View>

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
            {bookletDetailAllDeals?.booklet_type !== 'Combo' && (
              <>
                {/* {userData?.user_type !== '1' && isInCart ? ( */}
                {isInCart ? (
                  <View style={styles.cartActionContainer}>
                    <View style={styles.qtyContainer}>
                      <TouchableOpacityView
                        style={styles.qtyBtn}
                        onPress={handleDecrement}
                        // onPress={()=>Alert.alert('hsgg')}
                      >
                        <AppText weight={BOLD} type={TWENTY_FOUR}>
                          -
                        </AppText>
                      </TouchableOpacityView>

                      <AppText
                        style={styles.qtyText}
                        weight={BOLD}
                        type={EIGHTEEN}
                      >
                        {cartItem?.quantity ?? quantity}
                      </AppText>

                      <TouchableOpacityView
                        style={[
                          styles.qtyBtn,
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
                      style={styles.viewCartBtn}
                      onPress={handleViewCart}
                      disabled={viewCartLoading}
                    >
                      {/* {viewCartLoading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : ( */}
                      <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
                        VIEW CART
                      </AppText>
                      {/* )} */}
                    </TouchableOpacityView>
                  </View>
                ) : (
                  <TouchableOpacityView
                    onPress={handleOnPress}
                    disabled={isDisabled}
                    style={styles.buyBtnStyle(isDisabled)}
                  >
                    {/* {isBtnLoading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : ( */}
                    <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
                      {isDisabled ? buttonText : 'ADD TO CART'}
                    </AppText>
                    {/* )} */}
                  </TouchableOpacityView>
                  //                   <TouchableOpacityView
                  //                     onPress={handleOnPress}
                  //                     style={styles.buyBtnStyle(isDisabled)}
                  //                     loader={isBtnLoading}
                  //                     disabled={isDisabled}
                  //                   >
                  //                     <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
                  //                       {/* {userData?.user_type === '1' ? buttonText : 'ADD TO CART'} */}
                  //                       <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>
                  //   {isDisabled
                  //     ? buttonText
                  //     // : userData?.user_type === '1'
                  //     // ? buttonText
                  //     : 'ADD TO CART'}
                  // </AppText>
                  //                     </AppText>
                  //                   </TouchableOpacityView>
                )}
              </>
            )}
          </>
        )}
      </View>
      <MultiLocationSheet
        sheetRef={sheetRef}
        data={locationList} // ✅ always array
        title={data?.name || data?.client_name}
      />
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
      <ViewDetailsBottomSheet
        bottomSheetRef={viewDetailsBottomSheetRef}
        snapPoints={executiveSnapPoints}
        data={couponDetail}
        // onSubmit={(_data) => handleExecutiveSubmit(_data)}
        onDismiss={() => {
          Keyboard?.dismiss();
          viewDetailsBottomSheetRef.current?.close();
        }}
      />
    {(qtyLoading || isBtnLoading || viewCartLoading) && <SpinnerSecond />}
    </View>
  );
};

export default Details;
