// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { AppSafeAreaView } from '@components/AppSafeAreaView';
// import { commonStyles } from '@theme/commonStyles';
// import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText';
// import ToolBar from '@components/ToolBar';
// import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import { colors } from '@theme/colors';
// import MyRequestList from './myRequestList';
// import { useAppDispatch, useAppSelector } from '@redux/hooks';
// import { getMyRequestList } from '@actions/myRequest/myRequestAction';
// import { ms, s, vs } from 'react-native-size-matters/extend';
// import { useRoute } from '@react-navigation/native';

// // ✅ Make sure route keys match those in renderScene
// const routes = [
//   { key: 'all', title: 'All' },
//   { key: 'pending', title: 'Pending' },
//   { key: 'approve', title: 'Approve' },
//   { key: 'reject', title: ' Reject' },
// ];

// const RenderTabBar = props => {
//   const { tabTextType } = props;
//   return (
//     <TabBar
//       {...props}
//       scrollEnabled
//       indicatorStyle={{
//         backgroundColor: colors.buttonBg,
//         height: 1,
//         width: 100,
//         borderRadius: 20,
//         bottom: -1,
//       }}
//       activeColor={colors.placeholder}
//       inactiveColor={colors.disTextColor}
//       style={{
//         backgroundColor: 'transparent',
//         elevation: 0,
//         shadowOpacity: 0,
//         borderBottomWidth: 0.5,
//         borderBottomColor: colors.disTextColor,
//         height: 40,
//       }}
//       tabStyle={{
//         height: 40,
//         width: 90,
//       }}
//       pressColor={colors.transparent}
//     />
//   );
// };

// const MyRequest = () => {
//   const dispatch = useAppDispatch();
//   const { tabIndex, tabname, order_uuid } =
//     (useRoute().params as {
//       tabIndex: number;
//       tabname: string;
//       order_uuid: string;
//     }) || 0;

//   console.log(tabname, 'tabname');
//   console.log(order_uuid, 'order_uuid');

//   const getInitialIndex = () => {
//     switch (tabname) {
//       case 'pending':
//         return 1;
//       case 'approve':
//         return 2;
//       case 'reject':
//         return 3;
//       default:
//         return 0;
//     }
//   };

//   const [index, setIndex] = useState(getInitialIndex());

//   const {
//     myRequestAllList,
//     myRequestPendingList,
//     myRequestApproveList,
//     myRequestRejectList,
//   } = useAppSelector(state => state.myRequest);
//   console.log(myRequestAllList, 'myRequestAllList');
  

//   const renderScene = SceneMap({
//     all: () => (
//       <MyRequestList
//         data={myRequestAllList}
//         tabname="all"
//         order_uuid={order_uuid}
//       />
//     ),
//     pending: () => (
//       <MyRequestList
//         data={myRequestPendingList}
//         tabname="pending"
//         order_uuid={order_uuid}
//       />
//     ),
//     approve: () => (
//       <MyRequestList
//         data={myRequestApproveList}
//         tabname="approve"
//         order_uuid={order_uuid}
//       />
//     ),
//     reject: () => (
//       <MyRequestList
//         data={myRequestRejectList}
//         tabname="reject"
//         order_uuid={order_uuid}
//       />
//     ),
//   });

//   useEffect(() => {
//     const currentTab =
//       index === 0
//         ? 'all'
//         : index === 1
//         ? 'pending'
//         : index === 2
//         ? 'approve'
//         : 'reject';

//     const payload = {
//       tabname: currentTab,
//       order_uuid,
//     };

//     console.log('API Payload =>', payload);

//     dispatch(getMyRequestList(payload));
//   }, [index, order_uuid]);

//   return (
//     <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
//       <ToolBar isLeftIcon title={'Order Details'} />
//       <View style={styles.containerStyle}>
//         <TabView
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           renderTabBar={props => (
//             <RenderTabBar
//               {...props}
//               scrollEnabled={true}
//               index={index}
//               tabTextType={EIGHTEEN}
//             />
//           )}
//           onIndexChange={setIndex}
//         />
//       </View>
//     </AppSafeAreaView>
//   );
// };

// export default MyRequest;

// const styles = StyleSheet.create({
//   mainContainer: {
//     paddingHorizontal: s(16),
//   },
//   containerStyle: {
//     flex: 1,
//     paddingTop: vs(25),
//   },
//   tabContainerStyle: {
//     backgroundColor: 'transparent',
//     elevation: 0,
//     shadowOpacity: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.disTextColor,
//     height: vs(40),
//   },
//   tabStyle: {
//     height: vs(40),
//     width: s(90),
//   },
//   tabIndocatorStyle: {
//     backgroundColor: colors.buttonBg,
//     height: 2,
//     width: s(100),
//     borderRadius: ms(20),
//   },
//   tabTitleStyle: (focused?: boolean) => ({
//     color: focused ? colors.buttonBg : colors.disTextColor,
//     textTransform: 'capitalize',
//     paddingVertical: 0,
//   }),
// });

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import {
  AppText,
  BOLD,
  BUTTON_TEXT,
  MEDIUM,
} from '@components/AppText';
import { commonStyles } from '@theme/commonStyles';
import { colors } from '@theme/colors';
import { s, vs, ms } from 'react-native-size-matters/extend';

import { getMyRequestList } from '@actions/myRequest/myRequestAction';
import BookletList from './myRequestList';
import { clearMyRequestDetails } from '@actions/myRequest/myRequestSlice';
import { SpinnerSecond } from '@components/Spinner';

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
const {
  order_uuid,
  tabname = 'all',
} = (route.params || {}) as {
  order_uuid: string;
  tabname?: string;
};

  const { myRequestAllList,isLoading } = useAppSelector(
    state => state.myRequest,
  );

  console.log(myRequestAllList, 'myRequestAllList in order details screen');
  
  const orderDetails = myRequestAllList?.order_details || {};
  console.log(myRequestAllList?.order_details, 'orderDetails in order details screen');
  

useEffect(() => {
  if (!order_uuid) return;

  dispatch(clearMyRequestDetails(tabname));

  dispatch(
    getMyRequestList({
      tabname,
      order_uuid,
    }),
  );
}, [dispatch, order_uuid, tabname]);

  const getStatusStyle = () => {
    switch (orderDetails?.status?.toLowerCase()) {
      case 'approve':
      case 'completed':
        return {
          bg: '#E8F7EE',
          color: '#16A34A',
          label: 'Completed',
        };

      case 'pending':
        return {
          bg: '#FFF4DD',
          color: '#F59E0B',
          label: 'Pending',
        };

      default:
        return {
          bg: '#FDECEC',
          color: '#DC2626',
          label: 'Failed',
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <AppSafeAreaView
      style={[
        commonStyles.mainContainer,
        styles.container,
      ]}>
      <ToolBar
        isLeftIcon
        title="Order Details"
      />
        {isLoading && <SpinnerSecond />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>

        <View style={styles.card}>

          <View style={styles.row}>
            <View>
              <AppText
                color={BUTTON_TEXT}
                weight={BOLD}>
                Order Id
              </AppText>

              <AppText
                weight={MEDIUM}
                style={styles.value}>
                {orderDetails?.unique_orderid || '-'}
              </AppText>
            </View>

            <View
              style={[
                styles.status,
                {
                  backgroundColor:
                    statusStyle.bg,
                },
              ]}>
              <AppText
                style={{
                  color:
                    statusStyle.color,
                }}>
                {statusStyle.label}
              </AppText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.item}>
              <AppText color={BUTTON_TEXT} weight={BOLD}>
                Transaction Id
              </AppText>

              <AppText
                weight={MEDIUM}
                style={styles.value}>
                {orderDetails?.merchant_transaction_id ||
                  '-'}
              </AppText>
            </View>

            <View style={styles.item}>
              <AppText color={BUTTON_TEXT} weight={BOLD}>
                Placed By
              </AppText>

              <AppText
                weight={MEDIUM}
                style={styles.value}>
                {orderDetails?.username}
              </AppText>
            </View>
          </View>

          <View
            style={[
              styles.row,
              {
                marginTop: 18,
              },
            ]}>
            <View style={styles.item}>
              <AppText color={BUTTON_TEXT} weight={BOLD}>
                Initiated At
              </AppText>

              <AppText
                weight={MEDIUM}
                style={styles.value}>
                {orderDetails?.order_date}
              </AppText>
            </View>

            <View style={styles.item}>
              <AppText color={BUTTON_TEXT} weight={BOLD}>
                Total Amount
              </AppText>

              <AppText
                weight={MEDIUM}
                style={styles.value}>
                Rs. {orderDetails?.total_amount}
              </AppText>
            </View>
          </View>
        </View>

        {orderDetails?.failure_reason ? (
          <View style={styles.failureBox}>
            <AppText
              weight={BOLD}
              style={{
                color: '#C0392B',
              }}>
              Payment Declined
            </AppText>

            <AppText
              style={{
                marginTop: 6,
                color: '#C0392B',
              }}>
              {orderDetails.failure_reason}
            </AppText>
          </View>
        ) : null}

        <AppText
          weight={BOLD}
          style={styles.heading}>
          Booklets in this Order (
          {myRequestAllList?.data?.length || 0})
        </AppText>

        <BookletList
          data={myRequestAllList?.data || []}
        />
        
      </ScrollView>
      
    </AppSafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    backgroundColor: '#F7F8FC',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: vs(18),
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    width: '46%',
  },

  value: {
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 18,
  },

  status: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  failureBox: {
    backgroundColor: '#FDECEC',
    marginTop: 20,
    padding: 16,
    borderRadius: 14,
  },

  heading: {
    marginTop: 24,
    marginBottom: 16,
  },
});
