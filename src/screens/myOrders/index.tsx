// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { AppSafeAreaView } from '@components/AppSafeAreaView'
// import { commonStyles } from '@theme/commonStyles'
// import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText'
// import ToolBar from '@components/ToolBar'
// import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
// import { colors } from '@theme/colors'
// import { useAppDispatch, useAppSelector } from '@redux/hooks'

// import { useRoute } from '@react-navigation/native'
// import styles from './styles'
// import MyOrderList from './myOrderList'
// import { getMyorderList } from '@actions/myOrders/myOrderAction'



// // ✅ Make sure route keys match those in renderScene
// const routes = [
//   { key: 'all', title: 'All' },
//   { key: 'completed', title: 'Completed' },
//   { key: 'pending', title: 'Pending' },
//   { key: 'rejected', title: 'Expired' },
// ];
// const RenderTabBar = (props:any) => {
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
//         bottom: -1
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

// const MyOrders = () => {
//   const dispatch = useAppDispatch()
//   const {tabIndex}= useRoute().params as {tabIndex:number} || 0
//   const {
//   myOrderAllList,
//   myOrderCompletedList,
//   myOrderPendingList,
//   myOrderRejectedList,
// } = useAppSelector(state => state.myOrder);
//   const [index, setIndex] = useState(tabIndex ?? 0)
// const renderScene = ({ route }: any) => {
//   switch (route.key) {
//     case 'all':
//       return (
//         <MyOrderList
//           data={myOrderAllList}
//           tabname="All"
//         />
//       );

//     case 'completed':
//       return (
//         <MyOrderList
//           data={myOrderCompletedList}
//           tabname="Completed"
//         />
//       );

//     case 'pending':
//       return (
//         <MyOrderList
//           data={myOrderPendingList}
//           tabname="Pending"
//         />
//       );

//     case 'rejected':
//       return (
//         <MyOrderList
//           data={myOrderRejectedList}
//           tabname="failed"
//         />
//       );

//     default:
//       return null;
//   }
// };

//   useEffect(() => {
//     const value =
//       index === 0
//         ? {
//           tabname: "All"
//         }
//         : index === 1
//           ? {
//             tabname: "Completed"
//           }
//           : index === 2
//             ? {
//               tabname: "Pending"
//             }
//             : {
//               tabname: "failed"
//             }

//     dispatch(getMyorderList(value));
//   }, [index]);

//   return (
//     <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
//       <ToolBar isLeftIcon title={"My Orders"} />
//       <View style={styles.containerStyle}>
//         <TabView
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           renderTabBar={(props) => (
//             <RenderTabBar {...props} scrollEnabled={true} index={index} tabTextType={EIGHTEEN} />
//           )}
//           onIndexChange={setIndex}
//         />
//       </View>
//     </AppSafeAreaView>
//   )
// }

// export default MyOrders

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useRoute } from '@react-navigation/native';

import styles from './styles';
import MyOrderList from './myOrderList';

import { getMyorderList } from '@actions/myOrders/myOrderAction';
import OrderStatusDropdown from '@components/OrderStatusDropdown';

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

  const { tabIndex } =
    (useRoute().params as { tabIndex?: number }) || {};

  const {
    myOrderAllList,
    myOrderCompletedList,
    myOrderPendingList,
    myOrderRejectedList,
    myOrderCancelledList,
    myOrderExpiredList,
  } = useAppSelector(state => state.myOrder);

  console.log(myOrderCancelledList,'myOrderCancelledList');
  

  const getDefaultStatus = () => {
    switch (tabIndex) {
      case 1:
        return 'Completed';

      case 2:
        return 'Pending';

      case 3:
        return 'Failed';

      default:
        return 'All';
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
    <AppSafeAreaView
      style={[
        commonStyles.mainContainer,
        styles.mainContainer,
      ]}>
      <ToolBar
        isLeftIcon
        title="My Orders"
      />

      <View style={styles.containerStyle}>
        <OrderStatusDropdown
          value={selectedStatus}
          data={orderStatusList}
          onSelect={setSelectedStatus}
        />

        <MyOrderList
          data={getOrderData()}
          tabname={selectedStatus}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default MyOrders;