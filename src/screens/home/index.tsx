import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
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
} from '@actions/home/homeAction';
import { commonStyles } from '@theme/commonStyles';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { defaultBookletImage, rightArrowIcon } from '@helper/imagesAssets';
import { userProfile } from '@actions/auth/authAction';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { setCategoriListData } from '@actions/home/homeSlice';
import { Loader } from '@components/Spinner';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state?.auth);
  const { categoryListData, categoryBookletData, isLoading, bannerList } =
    useAppSelector((state) => state?.home);

  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    await dispatch(userProfile());
    await dispatch(getCategoryList());
    await dispatch(getCategoryBooklet());
    await dispatch(getBannerList({ screen_name: '1' }));
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
    if (!userData?.city) {
      const alertTimeout = setTimeout(() => {
        Alert.alert(
          'Add City',
          'Please add City from Profile => Edit Profile',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Add',
              onPress: () => NavigationService.navigate(routes.EDIT_PROFILE_SCREEN),
            },
          ],
          { cancelable: true }
        );
      }, 3000);

      return () => clearTimeout(alertTimeout);
    }
  }, [userData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header userName={userData?.name} />

      {!show && !refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={colors.buttonBg} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        >
          <BanerComponent data={bannerList?.banner} />

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
            <ListEmptyComponent title={'No Booklet Available'} />
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}
                  >
                    {item.booklets.map((booklet: any, i: number) => (
                      <View key={booklet.id || i} style={styles.categoryBookletContainer}>
                        <Card
                          index={i}
                          item={booklet}
                          imageBaseUrl={categoryBookletData?.baseurl}
                          handleCardOnPress={() => {
                            NavigationService.navigate(routes.DETAILS_SCREEN, { data: booklet });
                          }}
                          imageUrl={booklet?.booklet ? { uri: categoryBookletData?.baseurl + booklet?.booklet } : defaultBookletImage}
                          name={booklet?.name}
                          price={booklet.price}
                          address={booklet?.client?.address || '---'}
                        />
                      </View>
                    ))}

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
                  </ScrollView>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </AppSafeAreaView>
  );
};

export default Home;
