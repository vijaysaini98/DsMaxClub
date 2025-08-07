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
      renderLabel={({ route, focused }) => (
        <AppText
          type={EIGHTEEN}
          weight={focused ? MEDIUM : NORMAL}
          style={styles.tabTitleStyle(focused)}
        >
          {route.title}
        </AppText>
      )}
      indicatorStyle={styles.tabIndocatorStyle}
      activeColor={colors.placeholder}
      inactiveColor={colors.disTextColor}
      style={styles.tabContainerStyle}
      tabStyle={styles.tabStyle}
      pressColor={colors.transparent}
    />
  );
};

const MyRequest = () => {
  const dispatch = useAppDispatch()
  const {myRequestApproveList,myRequestAllList,myRequestPendingList,myRequestRejectList} = useAppSelector((state)=>state?.myRequest)
    const [index, setIndex] = useState(0)
    const renderScene = SceneMap({
        all: () => <MyRequestList data = {myRequestAllList}/>,
        pending: () => <MyRequestList data = {myRequestPendingList}/>,
        approve: () => <MyRequestList data = {myRequestApproveList}/>,
        reject: () => <MyRequestList data = {myRequestRejectList}/>,
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

export default MyRequest

const styles = StyleSheet.create({
mainContainer:{ 
  paddingHorizontal: s(16) 
},
containerStyle:{ 
  flex: 1, 
  paddingTop: vs(40) 
},
tabContainerStyle:{
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.disTextColor,
        height: vs(40),
      },
      tabStyle:{
        height: vs(40),
        width: s(90),
      },
      tabIndocatorStyle:{
        backgroundColor: colors.buttonBg,
        height: 1,
        width: s(100),
        borderRadius: ms(20),
      },
      tabTitleStyle:(focused?:boolean)=>({
            color: focused ? colors.buttonBg : colors.disTextColor,
            textTransform: 'capitalize',
            paddingVertical: 0,
          })

})