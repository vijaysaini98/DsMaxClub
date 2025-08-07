import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, BOLD, TWENTY_EIGHT, WHITE } from '@components/AppText'
import Header from '@components/Header'
import ToolBar from '@components/ToolBar'
import { cardDummyData, historyViewDealsDummyData, scanViewDealsDummyData } from '@helper/dumyData'
import CommonCard from '@components/CommonCard'
import RBSheet from 'react-native-raw-bottom-sheet';
import TouchableOpacityView from '@components/TouchableOpacityView'
import { colors } from '@theme/colors'
import NavigationService from '@navigations/NavigationService'
import { REDEEM_SUCCESSFULL_SCREEN } from '@navigations/routes'
// import ViewDealsBottomSheet from '@screens/scan/viewDealsBottomSheet'
import { s, vs } from 'react-native-size-matters/extend'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getVendorHistoryList } from '@actions/history/historyAction'
import ViewDealsBottomSheet from './viewDealsBottomSheet'

const History = () => {
  const dispatch = useAppDispatch();
  const {vendorHistoryList} = useAppSelector((state)=>state?.history)

  const ViewDealsRef = useRef();

  const [viewData,setViewData] = useState();

useEffect(()=>{
dispatch(getVendorHistoryList())
},[])

  // const onRedeemPress = () => {
  //   redeemSheetRef.current?.open();
  // };

  const onViewPress = (data)=>{
    setViewData(data)

    setTimeout(()=>{
      ViewDealsRef.current?.open();
    },200)
  }

  // const handleCancel = () => {
  //   redeemSheetRef.current?.close();
  // };

  // const handleContinue = () => {
  //   redeemSheetRef.current?.close();
  //   // console.log('Confirmed Redemption');
  //   NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN)
  // };
  

  const renderItem = ({ item }) => {
    return (
      <CommonCard
                        key={item.id}
                        data={item}
                        onViewPress={() => onViewPress(item)}
                        heading={item?.heading}
                        htmlContent={item?.description}
                        // couponCount={item?.no_of_coupons}
                        showRedeemBtn
                        redeemButtonStyle={{backgroundColor:colors.disabledBtn}}
                        redeemDisabled={true}
                    />
    );
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      {/* <ToolBar isLeftIcon title="Deals" mainContainerStyle={{ paddingHorizontal: 20 }} /> */}
 <Header currentCity />
      <FlatList
        data={vendorHistoryList}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: vs(20), gap: s(10) }}
        showsVerticalScrollIndicator={false}
      />
      <ViewDealsBottomSheet
       ref={ViewDealsRef} heading={'Deal View'} 
       subHeading={viewData?.heading}
        data={viewData} height={vs(400)}/>
    </AppSafeAreaView>
  );
};
export default History

const styles = StyleSheet.create({
  sheetContent: {
    alignItems: 'center',
  },
  redeemText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    borderColor: colors.buttonText,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueBtn: {
    flex: 1,
    backgroundColor: colors.buttonText,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
})


// const History=()=>{
// const ViewDealsRef = useRef();
//   const onViewPress=()=>{
// ViewDealsRef.current?.open();
//   }

//   const renderItem = ({ item }) => {
//     return (
//       <CommonCard
//         key={item.id}
//         data={item}
//         // onRedeemPress={onRedeemPress}
//         onViewPress={onViewPress}
//       />
//     );
//   };
// return(
//      <AppSafeAreaView style={commonStyles.mainContainer}>
//       <Header/>
//       <FlatList
//   data={cardDummyData}
//          renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         contentContainerStyle={{ paddingVertical: 40, gap: 10 }}
//          showsVerticalScrollIndicator={false}
//        />
//        <ViewDealsBottomSheet ref={ViewDealsRef} height={450} heading={'Deal View'} subHeading={'Two Breakfast Buffet Valid for 2 People One Time'} data={historyViewDealsDummyData}/>
//     </AppSafeAreaView>
// )
// }


// export default History;

// const styles = StyleSheet.create({

// })