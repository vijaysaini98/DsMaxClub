import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText';
import ToolBar from '@components/ToolBar';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colors } from '@theme/colors';
import MyRequestList from './myRequestList';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getMyRequestList } from '@actions/myRequest/myRequestAction';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { useRoute } from '@react-navigation/native';

// ✅ Make sure route keys match those in renderScene
const routes = [
  { key: 'all', title: 'All' },
  { key: 'pending', title: 'Pending' },
  { key: 'approve', title: 'Approve' },
  { key: 'reject', title: ' Reject' },
];

const RenderTabBar = props => {
  const { tabTextType } = props;
  return (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{
        backgroundColor: colors.buttonBg,
        height: 1,
        width: 100,
        borderRadius: 20,
        bottom: -1,
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

const MyRequest = () => {
  const dispatch = useAppDispatch();
  const { tabIndex, tabname, order_id } =
    (useRoute().params as {
      tabIndex: number;
      tabname: string;
      order_id: string;
    }) || 0;

  console.log(tabname, 'tabname');
  console.log(order_id, 'order_id');

  const getInitialIndex = () => {
    switch (tabname) {
      case 'pending':
        return 1;
      case 'approve':
        return 2;
      case 'reject':
        return 3;
      default:
        return 0;
    }
  };

  const [index, setIndex] = useState(getInitialIndex());

  const {
    myRequestAllList,
    myRequestPendingList,
    myRequestApproveList,
    myRequestRejectList,
  } = useAppSelector(state => state.myRequest);

  const renderScene = SceneMap({
    all: () => <MyRequestList data={myRequestAllList} tabname="all" />,
    pending: () => (
      <MyRequestList data={myRequestPendingList} tabname="pending" />
    ),
    approve: () => (
      <MyRequestList data={myRequestApproveList} tabname="approve" />
    ),
    reject: () => <MyRequestList data={myRequestRejectList} tabname="reject" />,
  });

  useEffect(() => {
    const currentTab =
      index === 0
        ? 'all'
        : index === 1
        ? 'pending'
        : index === 2
        ? 'approve'
        : 'reject';

    const payload = {
      tabname: currentTab,
      order_id,
    };

    console.log('API Payload =>', payload);

    dispatch(getMyRequestList(payload));
  }, [index, order_id]);

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title={'My Request'} />
      <View style={styles.containerStyle}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={props => (
            <RenderTabBar
              {...props}
              scrollEnabled={true}
              index={index}
              tabTextType={EIGHTEEN}
            />
          )}
          onIndexChange={setIndex}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default MyRequest;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: s(16),
  },
  containerStyle: {
    flex: 1,
    paddingTop: vs(25),
  },
  tabContainerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.disTextColor,
    height: vs(40),
  },
  tabStyle: {
    height: vs(40),
    width: s(90),
  },
  tabIndocatorStyle: {
    backgroundColor: colors.buttonBg,
    height: 2,
    width: s(100),
    borderRadius: ms(20),
  },
  tabTitleStyle: (focused?: boolean) => ({
    color: focused ? colors.buttonBg : colors.disTextColor,
    textTransform: 'capitalize',
    paddingVertical: 0,
  }),
});
