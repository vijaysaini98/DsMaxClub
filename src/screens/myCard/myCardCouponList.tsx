import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { AppText, FOURTEEN, SEMI_BOLD, WHITE } from '@components/AppText'
import NavigationService from '@navigations/NavigationService'
import { COUPON_LIST_SCREEN } from '@navigations/routes'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getCoupon, getMyCardCouponList } from '@actions/myCard/myCardAction'
import ListEmptyComponent from '@components/ListEmptyComponent'
import { colors } from '@theme/colors'
import { vs } from 'react-native-size-matters/extend'
import { Loader } from '@components/Spinner'
import CommonCard from '@components/CommonCard'
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet'

const MyCardCouponList = ({ route }) => {
  const dispatch = useAppDispatch()
  const { myCardCouponList, isLoading } = useAppSelector((state) => state?.myCard)
  console.log(myCardCouponList,'myCardCouponList==>');
  
  const { title, user_booklet_uuid, tab_status, booklet_uniquecode } = route?.params ?? {}

  const viewDetailSheet = useRef()
  const [viewData, setViewData] = useState()
  const [refreshing, setRefreshing] = useState(false)

  // ✅ Track which coupon button is loading
  const [loadingCouponId, setLoadingCouponId] = useState<string | null>(null)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getMyCardCouponList({ user_booklet_uuid })).finally(() => setRefreshing(false))
  }, [dispatch, user_booklet_uuid])

  // const handleViewBtn = (item) => {
  //   console.log(item,'item in coupon list====>');
  //   console.log(item?.coupon_uuid,'item?.coupon_uuid');
  //   console.log(item?.user_bookletid,'item?.user_bookletid');
  //   console.log(item?.item?.tab_status,'item?.item?.tab_status');
    
    
    
  //   if (tab_status === 'active') {
  //     setLoadingCouponId(item?.coupon_uuid) 
  //     dispatch(
  //       getCoupon(
  //         { coupon_id: item?.coupon_uuid, user_booklet_id: item?.user_bookletid },
  //         () => onSuccess(item)
  //       )
  //     ).finally(() => setLoadingCouponId(null)) // stop loader
  //   }
  //   // } else {
  //   //   setViewData(item)
  //   //   setTimeout(() => {
  //   //     viewDetailSheet?.current?.open()
  //   //   }, 200)
  //   // }
  // }

  const handleViewBtn = (item) => {
  // console.log(item, 'item in coupon list====>');
  // console.log(item?.coupon_uuid, 'coupon_uuid');
  // console.log(item?.user_bookletid, 'user_bookletid');
  // console.log(item?.tab_status, 'item tab_status');

  if (item?.tab_status?.toLowerCase() === 'active') {
    setLoadingCouponId(item?.coupon_uuid);

    dispatch(
      getCoupon(
        {
          coupon_id: item?.coupon_uuid,
          user_booklet_id: item?.user_bookletid,
        },
        () => onSuccess(item)
      )
    ).finally(() => setLoadingCouponId(null));
  } else {
    console.log('Blocked: Not Active');
  }
};

  const onSuccess = (item) => {
    NavigationService.navigate(COUPON_LIST_SCREEN, {
      coupon_id: item?.coupon_uuid,
      title: item?.heading,
      user_booklet_id: item?.user_bookletid,
    })
  }

  const renderItem = ({ item }:any) => {
    return (
      <CommonCard
        key={item.id}
        data={item}
        onViewPress={() => handleViewBtn(item)}
        heading={item?.heading}
        htmlContent={item?.description}
        btnTextColor={WHITE}
        couponCount={item?.total_coupons}
        viewBtnDisabled={tab_status === 'expire' || tab_status === 'Comming Soon'}
        status={item?.tab_status}
        // ✅ Only show loader for the clicked item
        viewBtnLoader={loadingCouponId === item?.coupon_uuid}
        location={item?.locations}
        // vendorName={item?.vendor_name}
        usedCoupon={item?.used_copies}
        shortDesc={item?.short_description}
        // hideViewButton={item?.booklet_type === "Combo"}
        // showLocationText={true}
        showFreeDotUI={true}
        showCouponLocationIcon={true}
      />
      // <View>
      //   <AppText>bcbvc</AppText>
      // </View>
      
    )
  }

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
      <ToolBar isLeftIcon
        textType={FOURTEEN}
        textWeight={SEMI_BOLD}
      title={
  booklet_uniquecode
    ? `${title} (${booklet_uniquecode})`
    : title
} />
      {isLoading && !refreshing ? (
        <Loader />
      ) : (
        <FlatList
          data={myCardCouponList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <ListEmptyComponent title={'No Coupons Available'} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        />
      )}
      <ViewDetailsBottomSheet ref={viewDetailSheet} data={viewData} />
    </AppSafeAreaView>
  )
}

export default MyCardCouponList

const styles = StyleSheet.create({
  containerStyle: {
    gap: 15,
    paddingBottom: vs(50),
    marginTop: vs(40),
  },
})
