import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
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
import { AppText, SEMI_BOLD, TWENTY_TWO } from '@components/AppText';
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
import { useFocusEffect } from '@react-navigation/native';
import { addToCartAction, getCartList } from '@actions/cart/cartActions';
import { IMGE_URL } from '@services/config';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state?.auth);
  const {
    categoryListData,
    categoryBookletData,
    isLoading,
    bannerList,
    comboBookletDeals,
  } = useAppSelector(state => state?.home);
  

  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isAddCityModal, setIsAddCityModal] = useState(false);
 
  const sheetRef = useRef(null);

  const fetchData = async () => {
    await dispatch(userProfile());
    await dispatch(getCategoryList());
    await dispatch(getComboBookletDeals());
    await dispatch(getCategoryBooklet());
    await dispatch(getBannerList({ screen_name: '1' }));
  
  };

  useFocusEffect(
  React.useCallback(() => {
    dispatch(getCartList());
  }, []),
);

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

useFocusEffect(
  React.useCallback(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => null,
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );

      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => subscription.remove(); 
  }, []),
);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleOtpVerify = () => {
    sheetRef.current?.close();
  };

  const handleVerify = (code: string) => {
    let data = {
      email: userData.email,
      otp: code,
    };
    dispatch(verifyOtp(data, handleOtpVerify));
  };

  const handleBannerPress = (item: any, index: number) => {
    if (
      (item?.booklet !== null && item?.type == 'combobooklet') ||
      item?.type == 'singlebooklet'
    ) {
      if (item?.type == 'combobooklet') {
        NavigationService.navigate(routes.DETAILS_SCREEN, {
          data: item?.booklet,
          from: 'ComboBooklet',
        });
      } else {
        NavigationService.navigate(routes.DETAILS_SCREEN, {
          data: item?.booklet,
          from: 'Booklet',
        });
      }
    } else if (item?.type == 'Travel Deals') {
      NavigationService.navigate(routes.TRAVEL_BOOKING);
    } else if (item?.type == 'Hotels') {
      NavigationService.navigate(routes.HOTEL_BOOKING);
    }
  };


  

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      {!show && !refreshing ? (
        <HomeShimmerLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.containerStyle,
            {backgroundColor: colors.white},
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        >
          <Header userName={userData?.name}  showCart={true}/>

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
         

          {isLoading ? (
            <Loader />
          ) : categoryBookletData?.category?.length === 0 ? (
            <ListEmptyComponent
              containerStyle={{ marginTop: 20 }}
              title={'No Booklet Available'}
            />
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
                        <View
                          key={booklet.id || i}
                          // style={styles.categoryBookletContainer}
                          style={
                            item.booklets.length < 2
                              ? styles.categoryBookletContainer2
                              : styles.categoryBookletContainer
                          }
                        >
                          <Card
                            index={i}
                            // addtoCart={true}
                            isCompleteLocation={true}
                            // addtoCart={true}
                            item={booklet}
                            mobile={booklet?.client?.mobile}
                            cardContainerStyle={
                              item.booklets.length < 2 &&
                              styles.cardContainerStyle
                            }
                            imageBaseUrl={categoryBookletData?.baseurl}
                            imageStyle={
                              item.booklets.length < 2 && styles.cardImageStyle
                            }
                            handleCardOnPress={() => {
                              NavigationService.navigate(
                                routes.DETAILS_SCREEN,
                                { data: booklet, from: 'Booklet' },
                              );
                            }}
                            imageUrl={
                              booklet?.booklet
                                ? {
                                    uri:
                                      IMGE_URL +
                                      booklet?.booklet,
                                  }
                                : defaultBookletImage
                            }
                            // name={booklet?.client?.name ? booklet?.client?.name : booklet?.name}
                            name={booklet?.name}
                            price={booklet.price}
                            address={
                              booklet?.location.length > 0
                                ? booklet?.location[0]?.location
                                : '---'
                            }
                      
                          />
                        </View>
                      );
                    })}

                    {item?.booklets.length > 3 && (
                      <View style={styles.seeAllContainer2}>
                        <TouchableOpacityView
                          style={styles.seeAllBtn2Style}
                          onPress={() =>
                            NavigationService.navigate(
                              routes.CATEGORIES_LIST_SCCREEN,
                              {
                                title: item?.name,
                                id: item?.uuid,
                              },
                            )
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
          {comboBookletDeals?.category?.length > 0 && (
            <View>
              <View style={styles.trendingContainer}>
                <AppText
                  type={TWENTY_TWO}
                  weight={SEMI_BOLD}
                  style={styles.titleStyle}
                >
                  {'Combo Deals'}
                </AppText>
              </View>
              <ScrollView
                horizontal={comboBookletDeals?.category?.length > 1}
                scrollEnabled={comboBookletDeals?.category?.length > 1}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
              >
                {comboBookletDeals?.category?.map((booklet, i) => {
                  return (
                    <View
                      key={booklet?.id || i}
                      style={
                        comboBookletDeals?.category?.length < 2
                          ? styles.categoryBookletContainer2
                          : styles.categoryBookletContainer
                      }
                    >
                      <Card
                        index={i}
                        isCompleteLocation={true}
                        // addtoCart={true}
                        item={booklet}
                        cardContainerStyle={
                          comboBookletDeals?.category?.length < 2 &&
                          styles.cardContainerStyle
                        }
                        imageBaseUrl={comboBookletDeals?.baseurl}
                        imageStyle={
                          comboBookletDeals?.category?.length < 2 &&
                          styles.cardImageStyle
                        }
                        
                        handleCardOnPress={() => {
                          NavigationService.navigate(
                            routes.COMBO_OFFER_LIST_SCREEN,
                            { data: booklet, from: 'ComboBooklet' },
                          );
                        }}
                        imageUrl={
                          booklet?.booklet
                            ? {
                                uri:
                                  IMGE_URL + booklet?.booklet,
                              }
                            : defaultBookletImage
                        }
                        name={booklet?.name}
                        price={booklet?.price}
                        address={
                          booklet?.location.length > 0
                            ? booklet?.location[0]?.location
                            : '---'
                        }
                       
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      )}
      <AddCityModal
        visible={isAddCityModal}
        onClose={() => setIsAddCityModal(false)}
        onConfirm={() => {
          NavigationService.navigate(routes.EDIT_PROFILE_SCREEN);
          setIsAddCityModal(false);
        }}
      />
      {/* <CodeVerificationBottomSheet ref={sheetRef} onVerify={handleVerify} /> */}
    </AppSafeAreaView>
  );
};

export default Home;
