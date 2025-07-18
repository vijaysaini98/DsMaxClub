import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import { banerData, categoryList, trendingData } from '@helper/dumyData';
import Card from './ui/card';
import BanerComponent from './ui/banerCom';
import CategoriesComponent from './ui/categoriesComponent';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import styles from './styles';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes'
import { AppText, BOLD, BUTTON_BG, FOURTEEN, SEMI_BOLD, TWENTY_TWO, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getCategoryBooklet, getCategoryList } from '@actions/home/homeAction';
import { commonStyles } from '@theme/commonStyles';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { rightArrowIcon } from '@helper/imagesAssets';



const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { userData } = useAppSelector((state) => state?.auth)
  const { categoryListData, categoryBookletData, isLoading } = useAppSelector((state) => state?.home)

  const [refreshing, setRefreshing] = useState(false)

  // useEffect(() => {
  //   dispatch(getCategoryList(5))
  //   dispatch(getCategoryBooklet())
  // }, [])

  // // console.log("categoryListData", categoryListData);

  // const onRefresh = () =>{
  //   setRefreshing(true)
  // }

  const fetchData = async () => {
    await dispatch(getCategoryList(5));
    await dispatch(getCategoryBooklet());
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {isLoading && !refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} color={colors.buttonBg} />
        </View>
      )
        :
        (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.containerStyle}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.buttonBg]} // Android spinner color
                tintColor={colors.buttonBg} // iOS spinner color
              />
            }  >
            <BanerComponent
              data={banerData}
            />
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
                    contentContainerStyle={[styles.listStyle,
                    ]}
                  >
                    {item.booklets.map((booklet: any, i: number) => (
                      <View key={booklet.id || i} style={styles.categoryBookletContainer}>
                        <Card
                          item={booklet}
                          imageBaseUrl={categoryBookletData?.baseurl}
                          index={i}
                          handleCardOnPress={() => {
                            // Add navigation or logic here
                          }}
                        />

                      </View>
                    ))}
                    {/* <View
                    style={{alignItems:'center',justifyContent:'center',backgroundColor:colors.buttonBg,padding:10}}
                    > */}
                    <TouchableOpacityView
                      style={{
                        flexDirection: 'row', alignItems: 'center',
                        borderRadius: 10,
                        justifyContent: 'center', backgroundColor: colors.tabBg, padding: 20
                      }}
                    >
                      {/* <AppText
                      weight={BOLD}
                      type={FOURTEEN}
                      color={WHITE}
                      style={{textDecorationColor:colors.white,textDecorationLine:'underline'}}
                      >{"See All"}</AppText> */}
                      <Image
                        source={rightArrowIcon}
                        style={{ height: 30, width: 30, tintColor: colors.buttonBg }}
                        resizeMode='contain'
                      />
                    </TouchableOpacityView>
                    {/* </View> */}
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
