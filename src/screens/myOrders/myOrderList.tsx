import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  AppText,
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
import { defaultBookletImage } from '@helper/imagesAssets';
import moment from 'moment';
import { getMyRequestList } from '@actions/myRequest/myRequestAction';
import ListEmptyComponent from '@components/ListEmptyComponent';
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader';
import { getMyorderList } from '@actions/myOrders/myOrderAction';
import TouchableOpacityView from '@components/TouchableOpacityView';

const MyOrderList = ({ data, tabname }: { data: any; tabname: string }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(
  state => state.myOrder,
);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getMyorderList({ tabname: tabname })).finally(() =>
      setRefreshing(false),
    );
  }, [dispatch]);



const renderItem = ({ item }: any) => {

    console.log(item,'orders items');
    
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

      case 'failed':
      case 'cancelled':
      case 'rejected':
        return {
          bg: '#FDECEC',
          text: '#E53935',
          label: 'Failed',
        };

      default:
        return {
          bg: '#EEEEEE',
          text: '#666666',
          label: status,
        };
    }
  };

  const statusStyle = getStatusColor(item.status);
const onOrderPress = () => {
  NavigationService.navigate(MY_REQUEST_SCREEN, {
    tabname: tabname,
    order_id: item?.uuid,
  });
};
  return (
    <TouchableOpacityView style={styles.card} onPress={onOrderPress}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
           
          <AppText style={styles.orderTitle} weight={SEMI_BOLD}>Transaction ID</AppText>

          <AppText style={styles.orderNumber}>
            {item?.merchant_txn_id }
          </AppText>
        </View>

        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: statusStyle.bg,
            },
          ]}>
          <AppText
            style={[
              styles.statusText,
              {
                color: statusStyle.text,
              },
            ]}>
            {statusStyle.label}
          </AppText>
        </View>
      </View>

      <AppText style={styles.price} weight={SEMI_BOLD} >
        Price - Rs. {Number(item.amount).toFixed(2)}
      </AppText>

      <AppText weight={SEMI_BOLD}>
        Date - {item.order_date}
      </AppText>
    </TouchableOpacityView>
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
          keyExtractor={(item, index) => index.toString()}
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
        />
      )}
    </View>
  );
};

export default MyOrderList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  listContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  orderTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  orderNumber: {
   
    marginTop: 4,
    color: '#000',
  },

  statusContainer: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },

  price: {

    color: '#222',
    marginBottom: 10,
  },

  date: {
    fontSize: 15,
    // color: '#666',
  },
});
