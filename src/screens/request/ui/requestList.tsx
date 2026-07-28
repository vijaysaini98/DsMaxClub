import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
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

const RequestList = ({ value }: any) => {
  const dispatch = useAppDispatch();
  const {
    isRefresh,
    isLoading,
    isPaginationLoading,
    executiveRequestAllList,
    executiveRequestPendingList,
    executiveRequestApproveList,
    executiveRequestRejectList,
    isBtnLoading,
  } = useAppSelector(state => state?.executiveRequest);

  const { userData } = useAppSelector(state => state?.auth);

  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [hasMore, setHasMore] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(value?.search ?? '');
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  useEffect(() => {
  if (value?.search === '') {
    setDebouncedSearch('');
    return;
  }

  const timer = setTimeout(() => {
    setDebouncedSearch(value?.search ?? '');
  }, 500);

  return () => clearTimeout(timer);
}, [value?.search]);


  useEffect(() => {
    setOffset(0);
    setHasMore(true);

    dispatch(
      getExecutiveRequestList(
        {
          ...value,
          search: debouncedSearch,
          offset: 0,
          limit,
        },
        false,
        false,
        ({ hasMore }: any) => {
          setHasMore(hasMore);
        },
      ),
    ).then((res: any) => {
      setHasMore(res?.data?.meta?.has_more ?? false);
    });
  }, [value?.tabname, debouncedSearch]);

  const loadMore = () => {
    if (
      isPaginationLoading ||
      isLoading ||
      isBtnLoading ||
      !hasMore ||
      data.length < limit
    ) {
      return;
    }

    const newOffset = offset + limit;

    dispatch(
      getExecutiveRequestList(
        {
          ...value,
          search: debouncedSearch,
          offset: newOffset,
          limit,
        },
        false,
        true,
        ({ hasMore, offset }: any) => {
          setHasMore(hasMore);
          setOffset(offset);
        },
      ),
    );
  };

  const onRefresh = () => {
    setOffset(0);
    setHasMore(true);

    dispatch(
      getExecutiveRequestList(
        {
          ...value,
          search: debouncedSearch,
          offset: 0,
          limit,
        },
        true,
        false,
        ({ hasMore }: any) => {
          setHasMore(hasMore);
        },
      ),
    );
  };

  const handleOnPress = useCallback(
    (item: any) => {
      NavigationService.navigate(EXECUTIVE_REQUEST_APPROVE, {
        title: item?.name,
        request_id: item?.myrequest_uuid,
        status: item?.status,
        tabName: value?.tabname,
      });
    },
    [value?.tabname],
  );

  const data = useMemo(() => {
    switch (value?.tabname) {
      case 'all':
        return executiveRequestAllList ?? [];

      case 'pending':
        return executiveRequestPendingList ?? [];

      case 'approve':
        return executiveRequestApproveList ?? [];

      case 'reject':
        return executiveRequestRejectList ?? [];

      default:
        return [];
    }
  }, [
    value?.tabname,
    executiveRequestAllList,
    executiveRequestPendingList,
    executiveRequestApproveList,
    executiveRequestRejectList,
  ]);
  const renderItem = useCallback(
    ({ item, index }: any) => (
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
          address={item?.locations?.[0]?.location ?? '---'}
          cardDisabled={userData?.user_type !== '1'}
          handleCardOnPress={() => handleOnPress(item)}
          status={item?.status}
          purchaseDate={item?.requested_date}
        />
      </View>
    ),
    [handleOnPress, userData?.user_type],
  );

  return (
    <View style={styles.mainContainer}>
      {isBtnLoading && <SpinnerSecond />}
      {isLoading && !isRefresh && !isBtnLoading ? (
        <View style={{ paddingHorizontal: s(16) }}>
          <CategoriesListShimmerLoader />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          extraData={data}
          keyExtractor={(item, index) =>
            item?.user_booklet_uuid ?? index.toString()
          }
          contentContainerStyle={styles.listContainerStyle}
          showsVerticalScrollIndicator={false}
          // onEndReached={loadMore}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              loadMore();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() => (
            <ListEmptyComponent title={'No Requests Available'} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          ListFooterComponent={
            isPaginationLoading ? (
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
