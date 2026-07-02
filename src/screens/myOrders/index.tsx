import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText'
import ToolBar from '@components/ToolBar'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { colors } from '@theme/colors'
import MyRequestList from './myRequestList'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getMyRequestList } from '@actions/myRequest/myRequestAction'
import { ms, s, vs } from 'react-native-size-matters/extend'
import { useRoute } from '@react-navigation/native'
import styles from './styles'
// import { RenderTabBar } from '@components/RenderTabBar'



// ✅ Make sure route keys match those in renderScene
const routes = [
  { key: 'all', title: 'All' },
  { key: 'pending', title: 'Pending' },
  { key: 'approve', title: 'Approve' },
  { key: 'reject', title: ' Reject' },
];

const RenderTabBar = (props) => {
  const { tabTextType } = props;
  return (
    <TabBar
      {...props}
      scrollEnabled
      // renderLabel={({ route, focused }) => (
      //   <AppText
      //     type={EIGHTEEN}
      //     weight={focused ? MEDIUM : NORMAL}
      //     style={styles.tabTitleStyle(focused)}
      //   >
      //     {route.title}
      //   </AppText>
      // )}
      // indicatorStyle={styles.tabIndocatorStyle}
      // activeColor={colors.placeholder}
      // inactiveColor={colors.disTextColor}
      // style={styles.tabContainerStyle}
      // tabStyle={styles.tabStyle}
      // pressColor={colors.transparent}
      indicatorStyle={{
        backgroundColor: colors.buttonBg,
        height: 1,
        width: 100,
        borderRadius: 20,
        bottom: -1
      }}
      activeColor={colors.placeholder}
      inactiveColor={colors.disTextColor}
      style={{
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.disTextColor,
        height: 40,
      }}
      tabStyle={{
        height: 40,
        width: 90,
      }}
      pressColor={colors.transparent}
    />
  );
};

const MyOrders = () => {
  const dispatch = useAppDispatch()
  const {tabIndex}= useRoute().params as {tabIndex:number} || 0
  const { myRequestApproveList, myRequestAllList, myRequestPendingList, myRequestRejectList } = useAppSelector((state) => state?.myRequest)
  const [index, setIndex] = useState(tabIndex ?? 0)
  const renderScene = SceneMap({
    all: () => <MyRequestList data={myRequestAllList} tabname={"all"} />,
    pending: () => <MyRequestList data={myRequestPendingList} tabname={"pending"} />,
    approve: () => <MyRequestList data={myRequestApproveList} tabname={"approve"} />,
    reject: () => <MyRequestList data={myRequestRejectList} tabname={"reject"} />,
  });

  useEffect(() => {
    const value =
      index === 0
        ? {
          tabname: "all"
        }
        : index === 1
          ? {
            tabname: "pending"
          }
          : index === 2
            ? {
              tabname: "approve"
            }
            : {
              tabname: "reject"
            }

    dispatch(getMyRequestList(value));
  }, [index]);

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title={"My Request"} />
      <View style={styles.containerStyle}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <RenderTabBar {...props} scrollEnabled={true} index={index} tabTextType={EIGHTEEN} />
          )}
          onIndexChange={setIndex}
        />
      </View>
    </AppSafeAreaView>
  )
}

export default MyOrders

