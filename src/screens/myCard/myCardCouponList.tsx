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
import { vs } from 'react-native-size-matters/extend'

const MyCardCouponList = ({ data, route }) => {
    const dispatch = useAppDispatch()
    const { myCardCouponList } = useAppSelector((state) => state?.myCard)
    const { title, user_booklet_uuid, tab_status,booklet_uniquecode } = route?.params ?? ""

    const viewDetailSheet = useRef()
    const redeemSheetRef = useRef()

    const [viewData, setViewData] = useState()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        dispatch(getMyCardCouponList({ user_booklet_uuid }))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getMyCardCouponList({ user_booklet_uuid })).finally(() => setRefreshing(false));
    }, [dispatch, user_booklet_uuid]);

    const handleViewBtn = (data) => {
        if (tab_status == "active") {
            NavigationService.navigate(COUPON_LIST_SCREEN, { coupon_id: data?.coupon_uuid, title: data?.heading, user_booklet_id: data?.user_bookletid })
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
                console.log("itemmy card copouns", item);

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
                        status={item?.tab_status}
                    />
                )
            },
        [myCardCouponList]
    );

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
            <ToolBar isLeftIcon title={`${title} (${booklet_uniquecode})`} />
            <FlatList
                data={myCardCouponList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.containerStyle}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <ListEmptyComponent title={"No Coupons Available"} />
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
        paddingBottom: vs(50),
        marginTop: vs(40),
    },
})