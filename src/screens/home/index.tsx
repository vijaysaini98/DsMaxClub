import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import Card from './ui/card';
import BanerComponent from './ui/banerCom';
import CategoriesComponent from './ui/categoriesComponent';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import styles from './styles';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import {
  AppText,
  SEMI_BOLD,
  TWENTY_TWO,
} from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  getBannerList,
  getCategoryBooklet,
  getCategoryList,
  getComboBookletDeals,
} from '@actions/home/homeAction';
import { commonStyles } from '@theme/commonStyles';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { defaultBookletImage, rightArrowIcon } from '@helper/imagesAssets';
import { sendOtp, userProfile, verifyOtp } from '@actions/auth/authAction';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { setCategoriListData } from '@actions/home/homeSlice';
import { Loader } from '@components/Spinner';
import AddCityModal from '@components/AddCityModal';
import HomeShimmerLoader from '@components/ShimerLoader/homeShimerLoader';
import CodeVerificationBottomSheet from '@screens/auth/codeVerificationBottomSheet';
import { setCartList } from '@actions/cart/cartSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state?.auth);
  const { categoryListData, categoryBookletData, isLoading, bannerList, comboBookletDeals } =
    useAppSelector((state) => state?.home);

  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isAddCityModal, setIsAddCityModal] = useState(false);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [addTocarBookletId, setAddToCartBookletId] = useState<number | string>('');

  const sheetRef = useRef(null);

  const fetchData = async () => {
    await dispatch(userProfile());
    await dispatch(getCategoryList());
    await dispatch(getComboBookletDeals());
    await dispatch(getCategoryBooklet());
    await dispatch(getBannerList({ screen_name: '1' }));
    // if (userData && userData?.otp_verified == 0) {
    //   setTimeout(() => {
    //     sheetRef?.current?.open();
    //   }, 300)

    //   dispatch(sendOtp({ email: userData?.email }))
    // }
  };

  useEffect(() => {
    fetchData();
  }, [userData?.current_city_name]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(true), 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (userData && userData?.user_type !== 0 && !userData?.city) {
      const alertTimeout = setTimeout(() => {
        setIsAddCityModal(true);
      }, 3500);

      return () => clearTimeout(alertTimeout);
    }
  }, [userData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleOtpVerify = () => {
    sheetRef.current?.close()
  }

  const handleVerify = (code: string) => {
    let data = {
      email: userData.email,
      otp: code
    }
    dispatch(verifyOtp(data, handleOtpVerify))
  };

  const handleBannerPress = (item: any, index: number) => {
    if (item?.booklet !== null && item?.type == 'combobooklet' || item?.type == 'singlebooklet') {
      if (item?.type == 'combobooklet') {
        NavigationService.navigate(routes.DETAILS_SCREEN, { data: item?.booklet, from: "ComboBooklet" });
      } else {
        NavigationService.navigate(routes.DETAILS_SCREEN, { data: item?.booklet, from: "Booklet" });
      }
    } else if (item?.type == 'Travel Deals') {
      NavigationService.navigate(routes.TRAVEL_BOOKING);
    }
    else if (item?.type == 'Hotels') {
      NavigationService.navigate(routes.HOTEL_BOOKING);
    }
  }

  const handleAddToCardOnPress = (booklet: any) => {
     dispatch(setCartList(booklet));
     setAddToCartBookletId(booklet?.uuid);
     setIsAddToCart(!isAddToCart);
    NavigationService.navigate(routes.CART_SCREEN, { data: booklet, from: "Home" });
  };


  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>

      {!show && !refreshing ? (
        <HomeShimmerLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.containerStyle, { backgroundColor: colors.white }]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        >
          <Header userName={userData?.name} />
          <BanerComponent
            data={bannerList}
            onPressBanner={(item, index) => handleBannerPress(item, index)}
          />

          <CategoriesComponent
            data={categoryListData}
            handleSeeAll={() => {
              dispatch(setCategoriListData());
              NavigationService.navigate(routes?.CATEGORIES_SCCREEN);
            }}
          />
          {comboBookletDeals?.category?.length > 0 && (
            <View>
              <View style={styles.trendingContainer}>
                <AppText
                  type={TWENTY_TWO}
                  weight={SEMI_BOLD}
                  style={styles.titleStyle}
                >
                  {"Combo Deals"}
                </AppText>
              </View>
              <ScrollView
                horizontal={comboBookletDeals?.category?.length > 1}
                scrollEnabled={comboBookletDeals?.category?.length > 1}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={comboBookletDeals?.category?.length<1}
                contentContainerStyle={styles.listStyle}
              >
                {comboBookletDeals?.category?.map((booklet, i) => {
                  return (
                    <View key={booklet?.id || i} style={comboBookletDeals?.category?.length < 2 ? styles.categoryBookletContainer2 :
                      styles.categoryBookletContainer}>
                      <Card
                        index={i}
                        // addtoCart={true}
                        item={booklet}
                        cardContainerStyle={comboBookletDeals?.category?.length < 2 && styles.cardContainerStyle}
                        imageBaseUrl={comboBookletDeals?.baseurl}
                        imageStyle={comboBookletDeals?.category?.length < 2 && styles.cardImageStyle}
                        handleCardOnPress={() => {
                          NavigationService.navigate(routes.DETAILS_SCREEN, { data: booklet, from: "ComboBooklet" });
                        }}
                        
                        imageUrl={
                          booklet?.booklet
                            ? { uri: comboBookletDeals?.baseurl + booklet?.booklet }
                            : defaultBookletImage
                        }
                        name={booklet?.name}
                        price={booklet?.price}
                        address={booklet?.location.length > 0 ? booklet?.location[0]?.location : "---"}
                        // handleAddToCardOnPress={()=>handleAddToCardOnPress(booklet)}
                        // isAddedToCart={isAddToCart && addTocarBookletId == booklet?.id ? true : false}
                      />
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          )}

          {isLoading ? (
            <Loader />
          ) : categoryBookletData?.category?.length === 0 ? (
            <ListEmptyComponent
              containerStyle={{ marginTop: 20 }}
              title={'No Booklet Available'} />
          ) : (
            categoryBookletData?.category?.map((item, index) => {
              if (!item?.booklets || item?.booklets.length === 0) return null;
              return (
                <View key={item.id || index} style={styles.trendingContainer}>
                  <AppText
                    type={TWENTY_TWO}
                    weight={SEMI_BOLD}
                    style={styles.titleStyle}
                  >
                    {item.name}
                  </AppText>

                  <ScrollView
                    // horizontal`
                    horizontal={item.booklets.length > 1}
                    scrollEnabled={item.booklets.length > 1}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}

                  >
                    {item.booklets.map((booklet: any, i: number) => {
                      return (
                        <View key={booklet.id || i}
                          // style={styles.categoryBookletContainer}
                          style={item.booklets.length < 2 ? styles.categoryBookletContainer2 :
                            styles.categoryBookletContainer}
                        >
                          <Card
                            index={i}
                            item={booklet}
                            mobile={booklet?.client?.mobile}
                            cardContainerStyle={item.booklets.length < 2 && styles.cardContainerStyle}
                            imageBaseUrl={categoryBookletData?.baseurl}
                            imageStyle={item.booklets.length < 2 && styles.cardImageStyle}
                            handleCardOnPress={() => {
                              NavigationService.navigate(routes.DETAILS_SCREEN, { data: booklet, from: "Booklet" });
                            }}
                            imageUrl={booklet?.booklet ? { uri: categoryBookletData?.baseurl + booklet?.booklet } : defaultBookletImage}
                            name={booklet?.client?.name ? booklet?.client?.name : booklet?.name}
                            price={booklet.price}
                            address={booklet?.location.length > 0 ? booklet?.location[0]?.location : "---"}
                            // shortDesc={booklet?.client?.short_desc}
                          />
                        </View>
                      )
                    })}

                    {item?.booklets.length > 3 && (
                      <View style={styles.seeAllContainer2}>
                        <TouchableOpacityView
                          style={styles.seeAllBtn2Style}
                          onPress={() =>
                            NavigationService.navigate(routes.CATEGORIES_LIST_SCCREEN, {
                              title: item?.name,
                              id: item?.uuid,
                            })
                          }
                        >
                          <Image
                            source={rightArrowIcon}
                            style={styles.rightArrowIconStyle}
                            resizeMode="contain"
                          />
                        </TouchableOpacityView>
                      </View>
                    )}
                  </ScrollView>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
      <AddCityModal
        visible={isAddCityModal}
        onClose={() => setIsAddCityModal(false)}
        onConfirm={() => {
          NavigationService.navigate(routes.EDIT_PROFILE_SCREEN)
          setIsAddCityModal(false);
        }}
      />
      {/* <CodeVerificationBottomSheet ref={sheetRef} onVerify={handleVerify} /> */}
    </AppSafeAreaView>
  );
};

export default Home;
