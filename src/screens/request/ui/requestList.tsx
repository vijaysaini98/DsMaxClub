import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';
import { EXECUTIVE_REQUEST_APPROVE, MY_CARD_COUPON_LIST_SCREEN } from '@navigations/routes';
import { Loader, SpinnerSecond } from '@components/Spinner';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { colors } from '@theme/colors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Card from '@screens/home/ui/card';
import NavigationService from '@navigations/NavigationService';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { defaultBookletImage } from '@helper/imagesAssets';
import { getMyCardBookletList, getMyCardCouponList } from '@actions/myCard/myCardAction';
import Toast from 'react-native-simple-toast';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { getExecutiveRequestList, getExecutiveRequestUserDetails } from '@actions/executiveRequest.tsx/executiveRequestAction';
import moment from 'moment';

const RequestList = ({ value }) => {
  const dispatch = useAppDispatch();
  // const { isLoading ,isBtnLoading} = useAppSelector((state) => state.myCard);
  const {
    isRefresh,
    isLoading, 
    executiveRequestAllList,
    executiveRequestPendingList,
    executiveRequestApproveList,
    executiveRequestRejectList,
    isBtnLoading}=useAppSelector((state)=>state?.executiveRequest)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    dispatch(getExecutiveRequestList(value, isRefresh));
  }, [dispatch, value, isRefresh]);

  const handleOnPress = (item) => {
   NavigationService.navigate(EXECUTIVE_REQUEST_APPROVE,{
    title:item?.name,
    request_id : item?.myrequest_uuid,status:item?.status,
    tabName:value?.tabname
  })
  };

  const data = useMemo(() => {

    if (value.tabname == "all") return executiveRequestAllList;
    if (value.tabname == "pending") return executiveRequestPendingList;
    if (value.tabname == "approve") return executiveRequestApproveList;
    if (value.tabname == "reject") return executiveRequestRejectList;
    return [];
  }, [value.tabname, executiveRequestAllList, executiveRequestPendingList, executiveRequestApproveList,executiveRequestRejectList] // ✅ dependencies
)

  const renderItem = useCallback(
    ({ item, index }) => {
      
      return (
        <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
          {/* <AppText style={{alignSelf:'center'}}>{index + 1}</AppText> */}
          <Card
            item={item}
            index={index}
            cardContainerStyle={{ width: '100%' }}
            imageStyle={styles.imageStyle}
            imageUrl={
              item?.booklet
                ? { uri: item?.baseurl + item?.booklet }
                : defaultBookletImage
            }
            name={`${item?.name} (${item?.unique_code})`}
            price={item.price}
            address={item?.locations?.[0]?.location ?? '---'}
            // cardDisabled={item?.status !== 'pending'}
            handleCardOnPress={() => {
              // if (item?.status === 'reject') {
              //   Toast.show('Booklet has been Expired', Toast.LONG);
              // }
              //  else {
                handleOnPress(item);
              // }
            }}
            status={item?.status}
            //  date={moment(item?.requested_date, "YYYY-MM-DD hh:mm ").format("D MMM YYYY ")}
            date={moment(item?.requested_date, "DD MMMM YYYY, HH:mm").format("DD-MM-YYYY")}
          />
        </View>
      );
    },
    [data, handleOnPress] // dependencies
  );

  return (
    <View style={styles.mainContainer}>
      {isBtnLoading && <SpinnerSecond/>}
      {isLoading && !isRefresh && !isBtnLoading ? (
        // <Loader />
        <View style={{paddingHorizontal:s(16)}}>
        <CategoriesListShimmerLoader/>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          extraData={data}
          keyExtractor={(item, index) => item?.user_booklet_uuid ?? index.toString()}
          contentContainerStyle={styles.listContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <ListEmptyComponent title={'No Card Available'} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        />
      )}
    </View>
  );
};

export default RequestList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainerStyle: {
    gap: ms(26),
    paddingBottom: vs(150),
    marginTop: vs(22),
    marginHorizontal: 16,
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
  statusContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(10),
    paddingHorizontal: s(16),
    borderRadius: ms(12),
  },
});
