import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
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

const MyOrderList = ({ data, tabname }: { data: any; tabname: string }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.myOrder);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getMyorderList({ tabname: tabname })).finally(() =>
      setRefreshing(false),
    );
  }, [dispatch]);

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

        case 'failed':
        case 'cancelled':
        case 'rejected':
          return {
            bg: '#FDECEC',
            text: colors.buttonBg,
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
        tabname: 'all',
        order_id: item?.uuid,
      });
    };
    return (
      <View style={styles.card} >
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
         

            <AppText
              style={styles.orderNumber}
              color={BUTTON_TEXT}
              weight={BOLD}
            >
              {item?.merchant_txn_id}
            </AppText>
            <AppText weight={SEMI_BOLD}>
              {item.order_date}
            </AppText>
          </View>

          <View
            style={[
              styles.statusContainer,
              { backgroundColor: statusStyle.bg },
            ]}
          >
            <AppText style={[styles.statusText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </AppText>
          </View>
        </View>
        <View
          style={{ width: '100%', height: 1, backgroundColor: 'lightgray' }}
        />
        <View style={styles.detailRow}>
            <AppText weight={SEMI_BOLD} style={{marginTop: 10}}>
              Rs. {Number(item.amount).toFixed(2)}
            </AppText>
            <TouchableOpacityView style={styles.circle} onPress={onOrderPress}>
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
    backgroundColor: '#F8F9FC',
  },

  listContainerStyle: {
    paddingHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  orderNumber: {
    marginTop: 4,
    width: '90%',
  },

  statusContainer: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 6,
    // backgroundColor:'red'
  },

  detailItem: {
    flex: 1,
  },

  label: {
    marginBottom: 4,
  },

  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#ECECEC',
    marginHorizontal: 18,
  },

  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  rightArrow:{
    width: 20,
    height: 10,
    resizeMode: 'contain',
  },
  circle:{
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.forth,
    justifyContent:'center',
    alignItems:'center'
  }

});
