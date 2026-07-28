import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  FOURTEEN,
  MEDIUM,
  SEMI_BOLD,
  WHITE,
} from '@components/AppText';
import {
  MY_REQUEST_SCREEN,
  REQUEST_COUPON_LIST_SCREEN,
} from '@navigations/routes';
import { SpinnerSecond } from '@components/Spinner';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { colors } from '@theme/colors';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Card from '@screens/home/ui/card';
import NavigationService from '@navigations/NavigationService';
import { IMGE_URL } from '@services/config';
import { defaultBookletImage, rightArrow } from '@helper/imagesAssets';
import moment from 'moment';
import { getMyRequestList } from '@actions/myRequest/myRequestAction';
import ListEmptyComponent from '@components/ListEmptyComponent';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { getMyorderList } from '@actions/myOrders/myOrderAction';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { setOffset } from '@actions/myOrders/myOrderSlice';

const MyOrderList = ({ data, tabname }: { data: any; tabname: string }) => {
  const dispatch = useAppDispatch();
  const { isLoading,hasMore,offset } = useAppSelector(state => state.myOrder);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;

const [loadingMore, setLoadingMore] = useState(false);
const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] =
  useState(false);

const onRefresh = useCallback(() => {
  setRefreshing(true);

  dispatch(setOffset(0));

  dispatch(
    getMyorderList({
      tabname,
      offset: 0,
      limit,
    }),
  )
    .finally(() => {
      setRefreshing(false);
    });
}, [dispatch, tabname]);


const loadMore = () => {
  if (
    loadingMore ||
    isLoading ||
    !hasMore ||
    data.length < limit
  ) {
    return;
  }

  const newOffset = offset + limit;

  setLoadingMore(true);

  dispatch(
    getMyorderList({
      tabname,
      offset: newOffset,
      limit,
    }),
  ).finally(() => {
    setLoadingMore(false);
  });
};

  const renderItem = ({ item }: any) => {
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'success':
    case 'completed':
      return {
        bg: '#E7F8EC',
        text: '#1E9E58',
        label: 'Completed',
      };

    case 'pending':
      return {
        bg: '#FFF3E6',
        text: '#F39C12',
        label: 'Pending',
      };

    case 'cancelled':
      return {
        bg: '#FDECEC',
        text: 'colors.buttonBg',
        label: 'Cancelled',
      };

    case 'expired':
      return {
        bg: '#F5F5F5',
        text: '#7F8C8D',
        label: 'Expired',
      };

    case 'failed':
      return {
        bg: '#FDECEC',
        text: colors.buttonBg,
        label: 'Failed',
      };

    default:
      return {
        bg: '#FDECEC',
        text: colors.buttonBg,
        label: status,
      };
  }
};

  const statusStyle = getStatusColor(item.status);

  const onOrderPress = () => {
    NavigationService.navigate(MY_REQUEST_SCREEN, {
      tabname: 'all',
      order_uuid: item?.uuid,

    });
  };

return (
  <View style={styles.card}>
    {/* Top Row */}
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <AppText color={BUTTON_TEXT} weight={BOLD}>
          Order ID
        </AppText>

        <AppText weight={MEDIUM} style={styles.value}>
          {item?.unique_orderid ? `# ${item.unique_orderid}` : '-'}
        </AppText>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <AppText weight={BOLD} style={[styles.value, { color: colors.buttonBg }]}>
          {item?.order_date || '-'}
        </AppText>

        <AppText
          weight={BOLD}
          style={[styles.value, { marginTop: 10, }]}
        >
         Rs. {Number(item?.amount || 0)}
        </AppText>
      </View>
    </View>

    <View style={styles.divider} />

    {/* Bottom Row */}
    <View style={styles.bottomRow}>
      <View
        style={[
          styles.statusContainer,
          { backgroundColor: statusStyle.bg },
        ]}>
        <AppText
          style={[
            styles.statusText,
            { color: statusStyle.text },
          ]}>
          {statusStyle.label}
        </AppText>
      </View>

      <TouchableOpacityView
        style={styles.circle}
        onPress={onOrderPress}>
        <Image source={rightArrow} style={styles.rightArrow} />
      </TouchableOpacityView>
    </View>
  </View>
);
};
  return (
    <View style={styles.mainContainer}>
      {isLoading && !refreshing ? (
        // <SpinnerSecond />
        <CategoriesListShimmerLoader />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.uuid.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          ListEmptyComponent={() => (
            <ListEmptyComponent title={'No Orders Available'} />
          )}
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
ListFooterComponent={
  loadingMore ? (
    <View style={{ paddingVertical: 20 }}>
      <ActivityIndicator color={colors.buttonBg} />
    </View>
  ) : null
}
removeClippedSubviews={true}
initialNumToRender={10}
maxToRenderPerBatch={10}
windowSize={10}
        />
      )}
    </View>
  );
};

export default MyOrderList;



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },

  listContainerStyle: {
    paddingHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    height:135,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  leftContainer: {
    flex: 1,
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  title: {
    color: '#8A8A8A',
    marginBottom: 4,
  },

  value: {
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 10,
  },

  amountContainer: {
    marginBottom: 16,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  statusContainer: {
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.forth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightArrow: {
    width: 18,
    height: 10,
    resizeMode: 'contain',
  },
});