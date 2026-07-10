import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import Header from '@components/Header'
import CommonCard from '@components/CommonCard'
import { colors } from '@theme/colors'
import { s, vs } from 'react-native-size-matters/extend'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getVendorHistoryList } from '@actions/history/historyAction'
import ViewDealsBottomSheet from './viewDealsBottomSheet'

const History = () => {
  const dispatch = useAppDispatch();
  const { vendorHistoryList } = useAppSelector((state) => state?.history)

  const ViewDealsRef = useRef();

  const [viewData, setViewData] = useState();

  useEffect(() => {
    dispatch(getVendorHistoryList())
  }, [])



  const onViewPress = (data) => {
    setViewData(data)

    setTimeout(() => {
      ViewDealsRef.current?.open();
    }, 200)
  }




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
        redeemButtonStyle={{ backgroundColor: colors.disabledBtn }}
        redeemDisabled={true}
      />
    );
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
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
        data={viewData} height={vs(400)} />
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