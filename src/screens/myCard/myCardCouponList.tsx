import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cardDummyData } from '@helper/dumyData'
import CommonCard from '@components/CommonCard'
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet'
import RedeemSheet from './redeemSheet'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { AppText, WHITE } from '@components/AppText'
import NavigationService from '@navigations/NavigationService'
import { COUPON_LIST_SCREEN } from '@navigations/routes'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getMyCardCouponList } from '@actions/myCard/myCardAction'
import ListEmptyComponent from '@components/ListEmptyComponent'
import { colors } from '@theme/colors'

const MyCardCouponList = ({ data, route }) => {
    const dispatch = useAppDispatch()
    const { myCardCouponList } = useAppSelector((state) => state?.myCard)
    const { title, booklet_id, tab_status } = route?.params ?? ""

    const viewDetailSheet = useRef()
    const redeemSheetRef = useRef()

    const [viewData, setViewData] = useState()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        dispatch(getMyCardCouponList({ booklet_id }))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getMyCardCouponList({ booklet_id })).finally(() => setRefreshing(false));
    }, [dispatch, booklet_id]);

    const handleViewBtn = (data) => {
        if (tab_status == "active") {
            NavigationService.navigate(COUPON_LIST_SCREEN, { coupon_id: data?.coupon_uuid, title: data?.heading })
        } else {
            setViewData(data)
            setTimeout(() => {
                viewDetailSheet?.current?.open()
            }, 200)
        }
    }

    const renderItem = useMemo(
        () =>
            ({ item }: { item: CardItem }) => {
                
                return (
                    <CommonCard
                        key={item.id}
                        data={item}
                        onViewPress={() => handleViewBtn(item)}
                        heading={item?.heading}
                        htmlContent={item?.description}
                        btnTextColor={WHITE}
                        couponCount={item?.total_coupons}
                        viewBtnDisabled={tab_status == "expire"}
                        status={tab_status}
                    />
                )
            },
        [myCardCouponList]
    );

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
            <ToolBar isLeftIcon title={title} />
            <FlatList
                data={myCardCouponList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.containerStyle}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <ListEmptyComponent title={"No Coupons Availble"} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.buttonBg]}
                        tintColor={colors.buttonBg}
                    />
                }
            />
            <ViewDetailsBottomSheet ref={viewDetailSheet} data={viewData} />
        </AppSafeAreaView>
    )
}

export default MyCardCouponList

const styles = StyleSheet.create({
    containerStyle: {
        gap: 15,
        paddingBottom: 50,
        marginTop: 40,
    },
})