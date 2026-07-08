import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { colors } from '@theme/colors'
import { s, vs } from 'react-native-size-matters/extend'
import Header from '@components/Header'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getMyCardBookletList } from '@actions/myCard/myCardAction'
import { SpinnerSecond } from '@components/Spinner'
import RequestList from './ui/requestList'
import { getExecutiveRequestList } from '@actions/executiveRequest.tsx/executiveRequestAction'
import styles from './styles'

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
      scrollEnabled={false}
      renderLabel={({ route, focused }:any) => (
        <AppText
          type={EIGHTEEN}
          weight={focused ? MEDIUM : NORMAL}
          style={{
            color: focused ? colors.buttonBg : colors.disTextColor,
            textTransform: 'capitalize',
            paddingVertical: 0,
            textAlign: 'center',
          }}
        >
          {route.title}
        </AppText>
      )}
      indicatorStyle={{
        backgroundColor: colors.buttonBg,
        height: vs(2),
        // width: s(130),
        paddingHorizontal: s(16),
        borderRadius: 20,
        bottom: -1,
        alignItems: 'center'
      }}
      activeColor={colors.placeholder}
      inactiveColor={colors.disTextColor}
      style={{
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.disTextColor,
        height: 40,
      }}
   tabStyle={{
  flex: 1,
  height: 40,
  paddingHorizontal: 0,
  alignItems: 'center',
  justifyContent: 'center',
}}
      // indicatorContainerStyle={{alignItems:'center',width:'100%',justifyContent:'center'}}
      pressColor={colors.transparent}
    />
  );
};

const Requests = () => {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('');

  const {
   
    isBtnLoading } = useAppSelector((state) => state?.executiveRequest)
    

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
          : index === 2 ?
            {
              tabname: "approve"
            } :
            {
              tabname: "reject"
            }

    dispatch(getExecutiveRequestList(value));
  }, [index]);

  // const renderScene = useCallback(
  //   SceneMap({
  //     all: () => (
  //       <RequestList
  //         value={{
  //           tabname: "all",
  //           search,
  //         }}
  //       />
  //     ),
  //     pending: () => (
  //       <RequestList
  //         value={{ tabname: "pending",   search}}
  //       />
  //     ),
  //     approve: () => (
  //       <RequestList
  //         value={{ tabname: "approve", search }}
  //       />
  //     ),
  //     reject: () => (
  //       <RequestList
  //         value={{ tabname: "reject", search }}
  //       />
  //     ),
  //   }),
  //   [isRefresh,search, executiveRequestAllList, executiveRequestPendingList, executiveRequestApproveList, executiveRequestRejectList] // ✅ dependencies
  // );
const renderScene = useCallback(
  ({ route }:any) => {
    return (
      <RequestList
        value={{
          tabname: route.key,
          search,
        }}
      />
    );
  },
  [search]
);

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer]}>
      <Header currentCity={true} />
      {isBtnLoading && <SpinnerSecond />}
<View style={styles.searchContainer}>
  <TextInput

    placeholder="Search by Booklet or User..."
    placeholderTextColor={colors.disTextColor}
    value={search}
    onChangeText={setSearch}
    style={styles.searchInput}
    returnKeyType="search"
    clearButtonMode="while-editing"
    onSubmitEditing={() => Keyboard.dismiss()}
    
  />
</View>
      
      <View style={{ flex: 1 }}>
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

export default Requests
