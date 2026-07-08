import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useRoute } from '@react-navigation/native';

import styles from './styles';
import MyOrderList from './myOrderList';

import { getMyorderList } from '@actions/myOrders/myOrderAction';
import OrderStatusDropdown from '@components/OrderStatusDropdown';
import {
  AppText,
  BOLD,
  BUTTON_BG,
  BUTTON_TEXT,
  FOURTEEN,
  TWELVE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import { filterIcon } from '@helper/imagesAssets';

const orderStatusList = [
  'all',
  'completed',
  'pending',
  'failed',
  'cancelled',
  'expired',
];

const MyOrders = () => {
  const dispatch = useAppDispatch();

  const { tabIndex } = (useRoute().params as { tabIndex?: number }) || {};

  const {
    myOrderAllList,
    myOrderCompletedList,
    myOrderPendingList,
    myOrderRejectedList,
    myOrderCancelledList,
    myOrderExpiredList,
  } = useAppSelector(state => state.myOrder);

  const getDefaultStatus = () => {
    switch (tabIndex) {
      case 1:
        return 'completed';

      case 2:
        return 'pending';

      case 3:
        return 'failed';

      default:
        return 'all';
    }
  };

  const [selectedStatus, setSelectedStatus] = useState(getDefaultStatus());

  useEffect(() => {
    let apiStatus = '';

    switch (selectedStatus) {
      case 'all':
        apiStatus = 'all';
        break;

      case 'completed':
        apiStatus = 'completed';
        break;

      case 'pending':
        apiStatus = 'pending';
        break;

      case 'failed':
        apiStatus = 'failed';
        break;

      case 'cancelled':
        apiStatus = 'cancelled';
        break;

      case 'expired':
        apiStatus = 'expired';
        break;

      default:
        apiStatus = 'all';
    }

    dispatch(
      getMyorderList({
        tabname: apiStatus,
        offset: 0,
        limit: 20,
      }),
    );
  }, [selectedStatus]);

  const getOrderData = () => {
    switch (selectedStatus) {
      case 'completed':
        return myOrderCompletedList;

      case 'pending':
        return myOrderPendingList;

      case 'failed':
        return myOrderRejectedList;

      case 'cancelled':
        return myOrderCancelledList;

      case 'expired':
        return myOrderExpiredList;

      default:
        return myOrderAllList;
    }
  };

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title="My Orders" />

      <View style={styles.containerStyle}>
        <View style={styles.topRow}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Image source={filterIcon} style={styles.filterImage} />

            <AppText type={FOURTEEN} weight={BOLD} style={{ marginLeft: 10 }}>
              Filter
            </AppText>
          </View>
          <OrderStatusDropdown
            value={selectedStatus}
            data={orderStatusList}
            onSelect={setSelectedStatus}
          />
        </View>

        <MyOrderList data={getOrderData()} tabname={selectedStatus} />
      </View>
    </AppSafeAreaView>
  );
};

export default MyOrders;
