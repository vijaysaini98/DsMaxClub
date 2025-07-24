import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { AppText, BOLD, TWENTY_EIGHT } from '@components/AppText'
import Header from '@components/Header'
import ToolBar from '@components/ToolBar'
import { cardDummyData, historyViewDealsDummyData, scanViewDealsDummyData } from '@helper/dumyData'
import CommonCard from '@components/CommonCard'
import RBSheet from 'react-native-raw-bottom-sheet';
import TouchableOpacityView from '@components/TouchableOpacityView'
import { colors } from '@theme/colors'
import NavigationService from '@navigations/NavigationService'
import { REDEEM_SUCCESSFULL_SCREEN } from '@navigations/routes'
import ViewDealsBottomSheet from '@screens/scan/viewDealsBottomSheet'

const History = () => {
  const redeemSheetRef = useRef(null);
const ViewDealsRef = useRef();
  const onRedeemPress = () => {
    redeemSheetRef.current?.open();
  };

  const onViewPress = ()=>{
    ViewDealsRef.current?.open();
  }

  const handleCancel = () => {
    redeemSheetRef.current?.close();
  };

  const handleContinue = () => {
    redeemSheetRef.current?.close();
    // console.log('Confirmed Redemption');
    NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN)
  };

  const renderItem = ({ item }) => {
    return (
      <CommonCard
        key={item.id}
        data={item}
        showRedeemBtn
        onRedeemPress={onRedeemPress}
        onViewPress={onViewPress}
      />
    );
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <ToolBar isLeftIcon title="Deals" mainContainerStyle={{ paddingHorizontal: 20 }} />

      <FlatList
        data={cardDummyData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 40, gap: 10 }}
        showsVerticalScrollIndicator={false}
      />

      <RBSheet
        ref={redeemSheetRef}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        <View style={styles.sheetContent}>
          <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.redeemText}>
            Are you sure want to Redeem it?
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacityView onPress={handleCancel} style={styles.cancelBtn}>
              <AppText weight={BOLD} style={{ color: colors.buttonText }}>
                CANCEL
              </AppText>
            </TouchableOpacityView>

            <TouchableOpacityView onPress={handleContinue} style={styles.continueBtn}>
              <AppText weight={BOLD} style={{ color: colors.white }}>
                CONTINUE
              </AppText>
            </TouchableOpacityView>
          </View>
        </View>
      </RBSheet>
      <ViewDealsBottomSheet ref={ViewDealsRef} heading={'Deal View'} subHeading={'Two Breakfast Buffet Valid for 2 People One Time'} data={scanViewDealsDummyData} height={380}/>
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