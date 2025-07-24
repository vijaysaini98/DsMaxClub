import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, EIGHTEEN, MEDIUM, NORMAL } from '@components/AppText'
import ToolBar from '@components/ToolBar'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
// import { RenderTabBar } from '@components/RenderTabBar'
import MyCardList from './myCardList'
import { colors } from '@theme/colors'



// ✅ Make sure route keys match those in renderScene
const routes = [
    { key: 'allCards', title: 'All Cards' },
    { key: 'active', title: 'Active' },
    { key: 'used', title: 'Used' },
    { key: 'expired', title: 'Expired' },
];

const RenderTabBar = (props) => {
  const { tabTextType } = props;
  return (
    <TabBar
      {...props}
      scrollEnabled
      renderLabel={({ route, focused }) => (
        <AppText
          type={EIGHTEEN}
          weight={focused ? MEDIUM : NORMAL}
          style={{
            color: focused ? colors.buttonBg : colors.disTextColor,
            textTransform: 'capitalize',
            paddingVertical: 0,
          }}
        >
          {route.title}
        </AppText>
      )}
      indicatorStyle={{
        backgroundColor: colors.buttonBg,
        height: 1,
        width: 90,
        borderRadius: 20,
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
        width: 90,
      }}
      pressColor={colors.transparent}
    />
  );
};

const MyCard = () => {
    const [index, setIndex] = useState(0)

    const renderScene = SceneMap({
        allCards: () => <MyCardList />,
        active: () => <MyCardList />,
        used: () => <MyCardList />,
        expired: () => <MyCardList />,
    });

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
            <ToolBar isLeftIcon title={"My Card"} />
            <View style={{ flex: 1, paddingTop: 40 }}>
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