import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { EXECUTIVE_REQUEST_APPROVE } from '@navigations/routes';
import { SpinnerSecond } from '@components/Spinner';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { colors } from '@theme/colors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Card from '@screens/home/ui/card';
import NavigationService from '@navigations/NavigationService';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { defaultBookletImage } from '@helper/imagesAssets';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { getExecutiveRequestList } from '@actions/executiveRequest.tsx/executiveRequestAction';
import moment from 'moment';
import { IMGE_URL } from '@services/config';

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

      const { userData } = useAppSelector(state => state?.auth);

      console.log(executiveRequestAllList,'executiveRequestAllList');
      

    
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
const limit = 20;
const [hasMore, setHasMore] = useState(true);
const [loadingMore, setLoadingMore] = useState(false);

useEffect(() => {
  setOffset(0);
  setHasMore(true);

  dispatch(
    getExecutiveRequestList({
      ...value,
      offset: 0,
      limit,
    })
  );
}, [value.tabname]);

const loadMore = () => {
  if (loadingMore || !hasMore) {
    return;
  }

  const newOffset = offset + limit;

  setLoadingMore(true);

  dispatch(
    getExecutiveRequestList({
      ...value,
      offset: newOffset,
      limit,
    })
  ).then((res: any) => {

    const meta = res?.data?.meta;

    setOffset(newOffset);

    setHasMore(meta?.has_more ?? false);

  }).finally(() => {
    setLoadingMore(false);
  });

};

  // const onRefresh = useCallback(() => {
  //   dispatch(getExecutiveRequestList(value, isRefresh));
  // }, [dispatch, value, isRefresh]);
  const onRefresh = () => {

  setOffset(0);
  setHasMore(true);

  dispatch(
    getExecutiveRequestList({
      ...value,
      offset: 0,
      limit,
    })
  );

};

  const handleOnPress = (item) => {
   NavigationService.navigate(EXECUTIVE_REQUEST_APPROVE,{
    title:item?.name,
    request_id : item?.myrequest_uuid,status:item?.status,
    tabName:value?.tabname
  })
  };

//   const data = useMemo(() => {

//     if (value.tabname == "all") return executiveRequestAllList;
//     if (value.tabname == "pending") return executiveRequestPendingList;
//     if (value.tabname == "approve") return executiveRequestApproveList;
//     if (value.tabname == "reject") return executiveRequestRejectList;
//     return [];
//   }, [value.tabname, executiveRequestAllList, executiveRequestPendingList, executiveRequestApproveList,executiveRequestRejectList] // ✅ dependencies
// )
const data = useMemo(() => {
  let list: any[] = [];

  switch (value?.tabname) {
    case 'all':
      list = executiveRequestAllList ?? [];
      break;
    case 'pending':
      list = executiveRequestPendingList ?? [];
      break;
    case 'approve':
      list = executiveRequestApproveList ?? [];
      break;
    case 'reject':
      list = executiveRequestRejectList ?? [];
      break;
    default:
      list = [];
  }

  const keyword = value?.search?.trim().toLowerCase();

  if (!keyword) {
    return list;
  }

  return list.filter(item => {
    return (
      (item?.name ?? '').toLowerCase().includes(keyword) ||
      (item?.username ?? '').toLowerCase().includes(keyword) ||
      (item?.unique_code ?? '').toLowerCase().includes(keyword)
    );
  });
}, [
  value?.tabname,
  value?.search,
  executiveRequestAllList,
  executiveRequestPendingList,
  executiveRequestApproveList,
  executiveRequestRejectList,
]);
  const renderItem = useCallback(
    ({ item, index }:any) => {
console.log(item,'item in request list');


      
      
      return (
        <View style={[styles.shadowContainer, { overflow: 'hidden' }]}>
          <Card
            item={item}
            type="request"
            index={index}
            cardContainerStyle={{ width: '100%' }}
            imageStyle={styles.imageStyle}
            imageUrl={
              item?.booklet
                ? { uri: IMGE_URL + item?.booklet }
                : defaultBookletImage
            }
            name={`${item?.name} (${item?.unique_code})`}
            // price={item.price}
            address={item?.locations?.[0]?.location ?? '---'}
            // cardDisabled={true}
            cardDisabled={userData?.user_type !== '1' ? true : false}

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

            purchaseDate={item?.requested_date}
          />
        </View>
      );
    },
    [data] // dependencies
  );

  return (
    <View style={styles.mainContainer}>
      {isBtnLoading && <SpinnerSecond/>}
      {isLoading && !isRefresh && !isBtnLoading ? (
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
            onEndReached={loadMore}
  onEndReachedThreshold={0.4}
          ListEmptyComponent={() => <ListEmptyComponent title={'No Card Available'} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          ListFooterComponent={
    loadingMore ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color={colors.buttonBg} />
      </View>
    ) : null
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
