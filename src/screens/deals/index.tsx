import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import Card from '@screens/home/ui/card';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getVendorDealBookletList } from '@actions/deals/dealAction';
import { ms, s, vs } from 'react-native-size-matters/extend';
import NavigationService from '@navigations/NavigationService';
import { VENDOR_USER_LIST } from '@navigations/routes';
import { userProfile } from '@actions/auth/authAction';
import { defaultBookletImage } from '@helper/imagesAssets';
import { setVendorUserList } from '@actions/deals/dealSlice';
import ListEmptyComponent from '@components/ListEmptyComponent';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';

const Deal = () => {

  const dispatch = useAppDispatch()
  const { vendorDealBookletList, isLoading } = useAppSelector((state) => state?.deal)
  const [refreshing, setRefreshing] = useState(false);
  const ViewDetailsSheet = useRef();

  const onViewPress = () => {
    ViewDetailsSheet.current.open();
  };

  const fetchData = async () => {
    await dispatch(userProfile())
    await dispatch(getVendorDealBookletList())
  };

  useEffect(() => {
    fetchData()
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getVendorDealBookletList()).finally(() => setRefreshing(false));
  }, [dispatch]);


  const renderItem = ({ item, index }: any) => {

    return (
      <View style={styles.shadowContainer}>
        <Card item={item} index={index}
          cardContainerStyle={{ width: "100%" }}
          // imageStyle={{ width: s(391) }}
          handleCardOnPress={() => { }}
          imageStyle={styles.imageStyle}
          imageUrl={item?.booklet ? { uri: vendorDealBookletList?.baseurl + item?.booklet } : defaultBookletImage}
          name={item?.name}
          price={item.price}
           address={ item?.location.length>0 ? item?.location[0]?.location : "---"}
          handleCardOnPress={() => {
            dispatch(setVendorUserList([]))
            NavigationService.navigate(VENDOR_USER_LIST, { title: item?.name, booklet_id: item?.uuid })
          }}
        />
      </View>
    )
  }
  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header currentCity />
      {isLoading && !refreshing ?
      //  <Loader /> 
      <View style={{paddingHorizontal:s(16)}}>
      <CategoriesListShimmerLoader/>
      </View>
       :
        <FlatList
          data={vendorDealBookletList?.booklets}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          // numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          contentContainerStyle={{ paddingHorizontal: s(16), gap: s(10), paddingBottom: vs(20) }}
          showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                            <ListEmptyComponent title={"No Request Available"} />
                        )}
        />
      }
      <ViewDetailsBottomSheet ref={ViewDetailsSheet} />
    </AppSafeAreaView>
  );
};

export default Deal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: vs(40),
  },
  shadowContainer: {
    borderRadius: ms(15),
    backgroundColor: colors.white,
    // iOS shadow
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    // Android shadow
    elevation: 2,
    // marginBottom: 15,
  },
  imageStyle: {
    width: "100%",
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10)
  },
});
