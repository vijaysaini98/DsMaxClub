import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '@theme/colors';
import Header from '@components/Header';
// import { banerData, categoryList, trendingData } from '@helper/dumyData';
import Card from './ui/card';
import BanerComponent from './ui/banerCom';
import CategoriesComponent from './ui/categoriesComponent';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import styles from './styles';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes'
import { AppText, BOLD, BUTTON_BG, FOURTEEN, SEMI_BOLD, TWENTY_TWO, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getBannerList, getCategoryBooklet, getCategoryList } from '@actions/home/homeAction';
import { commonStyles } from '@theme/commonStyles';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { rightArrowIcon } from '@helper/imagesAssets';
import { userProfile } from '@actions/auth/authAction';
import { banerData } from '@helper/dumyData';



const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { userData } = useAppSelector((state) => state?.auth)
  const { categoryListData, categoryBookletData, isLoading, bannerList } = useAppSelector((state) => state?.home)
  
  const [show,setShow] = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    await dispatch(userProfile())
    await dispatch(getCategoryList(5));
    await dispatch(getCategoryBooklet());
    await dispatch(getBannerList({ screen_name: "1" }))
  };
  useEffect(() => {
    fetchData();
  }, []);

useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(true), 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  


  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header
        userName={userData?.name}
      />
      {!show && !refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} color={colors.buttonBg} />
        </View>
      )
        :
        (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.containerStyle}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.buttonBg]} // Android spinner color
                tintColor={colors.buttonBg} // iOS spinner color
              />
            }  >
            {bannerList?.banner?.length > 0 &&(
              <BanerComponent
                data={bannerList?.banner}
              // data={banerData}
              />
            )}
            <CategoriesComponent
              data={categoryListData}
              handleSeeAll={() => NavigationService.navigate(routes?.CATEGORIES_SCCREEN)}
            />
            {categoryBookletData?.category?.map((item, index) => {
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}
                  >
                    {item.booklets.map((booklet: any, i: number) => (
                      <View key={booklet.id || i} style={styles.categoryBookletContainer}>
                        <Card
                          item={booklet}
                          imageBaseUrl={categoryBookletData?.baseurl}
                          index={i}
                          handleCardOnPress={() => {
                            // Add navigation or logic here
                            NavigationService.navigate(routes.DETAILS_SCREEN,{data:booklet})
                          }}
                          imageUrl={categoryBookletData?.baseurl + booklet?.booklet}
                          name={booklet?.name}
                          price={booklet.price}
                          address={(booklet?.city || booklet?.state) ? booklet?.city?.name + booklet?.state?.name : "---"}
                        />

                      </View>
                    ))}
                    <View
                      style={
                        styles.seeAllContainer2
                      }
                    >
                      <TouchableOpacityView
                        style={styles.seeAllBtn2Style}
                      >
                        <Image
                          source={rightArrowIcon}
                          style={styles.rightArrowIconStyle}
                          resizeMode='contain'
                        />
                      </TouchableOpacityView>
                    </View>
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        )
      }

    </AppSafeAreaView>
  );
};

export default Home;
