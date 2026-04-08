import {
  Animated,
  Image,
  Keyboard,
  Linking,
  StatusBar,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  backIcon,
  defaultBookletImage,
  downArrowIcon,
  helpLineIcon,
  locationIcon,
} from '@helper/imagesAssets';
import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  MEDIUM,
  PLACEHOLDER,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
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
  MY_REQUEST_SCREEN,
  REDEEM_SUCCESSFULL_SCREEN,
  REQUEST_SUCCESSFUL_SCREEN,
} from '@navigations/routes';
import { s, vs } from 'react-native-size-matters';
import { logger } from 'react-native-reanimated/lib/typescript/logger';
const initialLayout = { width: width };

// ✅ Make sure route keys match those in renderScene
const routes = [
  { key: 'allDeals', title: 'All Deals' },
  { key: 'about', title: 'About' },
  { key: 'tc', title: 'Rules of Use' },
  { key: 'redeemHelp', title: 'How to Use' },
  { key: 'gallery', title: 'Gallery' },
];

const Details = ({ route }: any) => {
  console.log(route, 'route in details');

  const { data, from, noApiCall } = route?.params ?? '';
  console.log(data, 'data in details screen ======>');

  // console.log(data?.gallery, 'data?.gallery');

  const dispatch = useAppDispatch();

  const { isLoading, isBtnLoading, bookletDetailAllDeals } = useAppSelector(
    state => state.home,
  );

  // console.log(
  //   bookletDetailAllDeals,
  //   'bookletDetailAllDeals=================>>>>>>>>>>>>>>',
  // );

  const { userData } = useAppSelector(state => state?.auth);

  const [index, setIndex] = React.useState(0);
  const [acceptContent, setAcceptContent] = useState(false);
  const [couponDetail, setCouponDetail] = useState<any>();

  const sheetRef = useRef<BottomSheetModal>(null);

  const scrollY = useRef(new Animated.Value(0)).current; // ✅

  const bottomSheetRef = useRef<BottomSheet>(null);
  const executiveBottomSheetRef = useRef<BottomSheet>(null);
  const viewDetailsBottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%', '50%', '80%'], []);
  const executiveSnapPoints = useMemo(() => ['50%', '80%'], []);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200, 400], // scroll range
    outputRange: [250, 100, 0], // image height collapses
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150, 200], // scroll position in px
    outputRange: [1, 0.5, 0], // opacity values
    extrapolate: 'clamp',
  });

  const collapsedHeaderOpacity = scrollY.interpolate({
    inputRange: [100, 180, 250], // adjust thresholds to your liking
    outputRange: [0, 0.5, 1], // fade in
    extrapolate: 'clamp',
  });

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
      console.log(value, 'value from combo booklet details api call');
      dispatch(getComboBookletDetail(value));
    } else {
      console.log(value, 'value from booklet details');

      dispatch(getBookletDetail(value));
    }
  }, [index, data?.uuid, from, dispatch]);

  const handleViewPress = (item: any) => {
    setCouponDetail(item);
    setTimeout(() => {
      // viewDetailSheet?.current?.open();
      viewDetailsBottomSheetRef?.current?.expand();
    }, 200);
  };

  const renderScene = useMemo(
    () =>
      SceneMap({
        allDeals: () => (
          <All
            id={data.uuid}
            from={from}
            scrollY={scrollY}
            handleViewPress={handleViewPress}
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

  const handleShareBtn = () => {
    shareToAny('hello');
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

  const handleRedirection = (location_url: string) => {
    const coords = extractLatLngFromUrl(location_url);

    if (coords) {
      openMap({
        lat: coords.lat,
        lng: coords.lng,
        label: data?.client?.name || 'Location',
      });
    } else {
      // If lat/lng not found, open the raw URL in Google Maps
      Linking.openURL(location_url).catch(() => {
        Toast.show("Can't open this location", Toast.LONG);
      });
    }
  };

  const handleSubmit = (_data: any) => {
    console.log(_data?.executiveCode, '_data?.executiveCode==>');

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

  const isExpired = moment(data?.end_date, 'YYYY-MM-DD').isBefore(moment());

  const getValidityText = () => {
    // if (bookletDetailAllDeals?.booklet_type === 'Combo') {
    //   return bookletDetailAllDeals?.validity_months
    //     ? `Upto ${bookletDetailAllDeals.validity_months} month${
    //         bookletDetailAllDeals.validity_months > 1 ? 's' : ''
    //       }`
    //     : 'N/A';
    // }

    if (data?.date_type === 1) {
      return data?.validity_months
        ? `${data.validity_months} month${data.validity_months > 1 ? 's' : ''}`
        : 'N/A';
    }

    if (data?.start_date && data?.end_date) {
      return `${moment(data.start_date).format('D MMM YYYY')} - ${moment(
        data.end_date,
      ).format('D MMM YYYY')}${isExpired ? ' (Expired)' : ''}`;
    }

    return 'N/A';
  };
  const mobileNumber =
    bookletDetailAllDeals?.booklet_type === 'Combo'
      ? data?.mobile
      : data?.client?.mobile;

  const isCombo = bookletDetailAllDeals?.booklet_type === 'Combo';

  // const locationList = isCombo
  //   ? data?.locations
  //   : data?.location;
  const locationList = isCombo
    ? data?.locations || []
    : Array.isArray(data?.location)
    ? data?.location
    : data?.location
    ? [data.location] // convert object → array
    : [];
  const galleryImages = data?.gallery
    ? data.gallery.split(',').map(img => IMGE_URL + img.trim())
    : [];

  const headerImage =
    bookletDetailAllDeals?.booklet_type === 'Combo'
      ? galleryImages.length > 0
        ? { uri: galleryImages[0] }
        : defaultBookletImage
      : data?.booklet
      ? { uri: IMGE_URL + data?.booklet }
      : defaultBookletImage;

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={colors.transparent}
        animated={true}
        barStyle={'light-content'}
      />
      <Animated.View style={{ height: headerHeight, opacity: headerOpacity }}>
        <FastImage source={headerImage} style={styles.coverImageStyle} resizeMode="cover">
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
              />
            </TouchableOpacityView>
            {/* <TouchableOpacityView
              style={styles.backBtnStyle}
              onPress={handleShareBtn}
            >
              <Image
                source={shareIcon}
                style={styles.iconsStyle}
                tintColor={colors.disTextColor}
                resizeMode='contain'
              />
            </TouchableOpacityView> */}
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
          {/* <TouchableOpacityView
            style={styles.backBtnStyle}
            onPress={handleShareBtn}
          >
            <Image
              source={shareIcon}
              style={styles.iconsStyle}
              tintColor={colors.disTextColor}
              resizeMode="contain"
            />
          </TouchableOpacityView> */}
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
            {data?.client?.name ? data?.client?.name : data?.name}
          </AppText>
        </Animated.View>

        <AppText
          type={SIXTEEN}
          color={PLACEHOLDER}
          weight={BOLD}
          style={styles.disTextStyle}
        >
          {bookletDetailAllDeals?.booklet_type === 'Combo'
            ? data?.short_desc
            : data?.client?.short_desc
            ? data?.client?.short_desc
            : data?.client_short_desc}
        </AppText>
        {/* {data?.client?.mobile && (
            <TouchableOpacityView
            onPress={()=>openPhoneDialer(data?.client?.mobile)}
            style={{flexDirection:'row',alignItems:'center',marginTop:vs(4),gap:5}}
            >
              <Image
              source={helpLineIcon}
              style={{width:s(16),height:s(16),tintColor:colors.buttonBg}}
              resizeMode={"contain"}
              />
              <AppText type={TWELVE} weight={BOLD}>{data?.client?.mobile}</AppText>
            </TouchableOpacityView>
          )} */}

        {mobileNumber && (
          <TouchableOpacityView
            onPress={() => openPhoneDialer(mobileNumber)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: vs(4),
              gap: 5,
            }}
          >
            <Image
              source={helpLineIcon}
              style={{
                width: s(16),
                height: s(16),
                tintColor: colors.buttonBg,
              }}
              resizeMode={'contain'}
            />

            <AppText type={TWELVE} weight={BOLD}>
              {mobileNumber}
            </AppText>
          </TouchableOpacityView>
        )}

        <AppText
          type={THIRTEEN}
          color={isExpired ? BUTTON_TEXT : PLACEHOLDER}
          style={styles.disTextStyle}
        >
          {`Validity: ${getValidityText()}`}
        </AppText>

        {/* {data?.maximum_redeem && (
          <AppText
            type={THIRTEEN}
            style={styles.disTextStyle}
          >{`Free Gift Coupons Maximum Redeem: ${data?.maximum_redeem}`}</AppText>
        )} */}
        <AppText type={THIRTEEN} style={styles.disTextStyle}>
          {`Free Gift Coupons Maximum Redeem: ${
            bookletDetailAllDeals?.booklet_type === 'Combo'
              ? bookletDetailAllDeals?.maximum_redeem
              : data?.maximum_redeem
          }`}
        </AppText>

        {/* {data?.location?.length > 0 && (
          <View style={styles.locationContainer}>
            <TouchableOpacityView
              onPress={() => handleRedirection(data?.location[0]?.location_url)}
              style={styles.locationBtn}
            >
              <Image
                source={locationIcon}
                style={styles.locationIcon}
                tintColor={colors.borderColor}
                resizeMode="contain"
              />
              <AppText numberOfLines={2} type={THIRTEEN} color={BUTTON_TEXT}>
                {data?.location[0]?.location}
              </AppText>
            </TouchableOpacityView>
            {data?.location?.length > 1 && (
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
        )} */}

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

            {bookletDetailAllDeals?.booklet_type !== 'Combo' && (
              <TouchableOpacityView
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
                    : !bookletDetailAllDeals?.request_status
                    ? 'not eligible'
                    : 'REQUEST'}
                </AppText>
              </TouchableOpacityView>
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
    </View>
  );
};

export default Details;
