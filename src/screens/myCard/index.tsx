import { StyleSheet,View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText'
import ToolBar from '@components/ToolBar'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import MyCardList from './myCardList'
import { colors } from '@theme/colors'
import { s, vs } from 'react-native-size-matters/extend'
import Header from '@components/Header'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getMyCardBookletList } from '@actions/myCard/myCardAction'
import { SpinnerSecond } from '@components/Spinner'

// ✅ Make sure route keys match those in renderScene
const routes = [
  { key: 'allCards', title: 'All Cards' },
  { key: 'active', title: 'Active' },
  // { key: 'used', title: 'Used' },
  { key: 'expired', title: 'Expired' },
];

const RenderTabBar = (props:any) => {
  const { tabTextType } = props;
  return (
    <TabBar
      {...props}
      scrollEnabled
      renderLabel={({ route, focused }:any) => (
        <AppText
          type={EIGHTEEN}
          weight={focused ? MEDIUM : NORMAL}
          style={{
            color: focused ? colors.buttonBg : colors.disTextColor,
            textTransform: 'capitalize',
            paddingVertical: 0,
            textAlign: 'center'
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
        bottom: -1
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
        height: 40,
        // width: 90,
        width: s(130),
        paddingHorizontal: s(16),
        alignItems: 'center',
        justifyContent: "center",
      }}
      pressColor={colors.transparent}
    />
  );
};

const MyCard = () => {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState(0)

  const {
    isRefresh,
    myCardAllBookletList,
    myCardActiveBookletList,
    myCardExpiredBookletList,
    isBtnLoading
  } = useAppSelector((state) => state?.myCard)

  useEffect(() => {
    const value =
      index === 0
        ? {
          tabname: "all"
        }
        : index === 1
          ? {
            tabname: "active"
          }
          : {
            tabname: "expire"
          }

    dispatch(getMyCardBookletList(value));
  }, [index]);

  const renderScene = useCallback(
    SceneMap({
      allCards: () => (
        <MyCardList
          value={{
            tabname: "all"
          }}
        />
      ),
      active: () => (
        <MyCardList
          value={{ tabname: "active" }}
        />
      ),
      expired: () => (
        <MyCardList
          value={{ tabname: "expire" }}
        />
      ),
    }),
    [isRefresh, myCardAllBookletList, myCardActiveBookletList, myCardExpiredBookletList] // ✅ dependencies
  );


  return (
    <AppSafeAreaView style={[commonStyles.mainContainer]}>
      {/* <ToolBar isLeftIcon title={"My Card"} /> */}
      <Header
      // userName={userData?.name}
      />
      {isBtnLoading && <SpinnerSecond />}
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

export default MyCard

const styles = StyleSheet.create({})