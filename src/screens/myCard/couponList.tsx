import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CommonCard from '@components/CommonCard'
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet'
import RedeemSheet from './redeemSheet'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { WHITE } from '@components/AppText'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { couponCodeGenrate, getCoupon } from '@actions/myCard/myCardAction'
import ListEmptyComponent from '@components/ListEmptyComponent'
import { s, vs } from 'react-native-size-matters/extend'
import { colors } from '@theme/colors'
import { Loader } from '@components/Spinner'

const CouponList = ({ data, route }) => {
    const dispatch = useAppDispatch()
    const { coupon_id, title ,user_booklet_id} = route?.params ?? ""
    const { couponList, isBtnLoading, isLoading } = useAppSelector((state) => state?.myCard)

    const viewDetailSheet = useRef()
    const redeemSheetRef = useRef()

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        dispatch(getCoupon({ coupon_id,user_booklet_id }))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getCoupon({ coupon_id,user_booklet_id })).finally(() => setRefreshing(false));
    }, [dispatch, coupon_id,user_booklet_id]);

    const handleOnPress = (item) => {
        let data = {
            uuid: item?.uuid,
            coupon_uuid: item?.coupon_uuid,
            unique_entry: item?.unique_entry
        }

        dispatch(couponCodeGenrate(data,handleSucess))
    }

    const handleSucess = () =>{
        dispatch(getCoupon({ coupon_id ,user_booklet_id}))
    }

    const renderItem = useMemo(
        () =>
            ({ item, index }: { item: CardItem, index: number }) => {
console.log("itemmy card copouns", item);

                return (
                    <CommonCard
                        key={index}
                        data={item}
                        heading={item?.heading}
                        description={item?.short_desc}
                        btnTextColor={WHITE}
                        buttonTitle={item?.used_status}
                        onViewPress={() => handleOnPress(item)}
                        viewBtnDisabled={item?.used_status == "Used"}
                        status={item?.coupon_type_id == 1 ? 'Free' : ""}
                        statusBg={item?.coupon_type_id == 1 && colors.lightGreen}
                        statusTextColor={item?.coupon_type_id == 1 && WHITE}
                    // viewBtnLoader={isBtnLoading && item?.id}
                    />
                )
            },
        []
    );
    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
            <ToolBar isLeftIcon title={title} />
            {isLoading && !refreshing ? (
                <Loader />
            )
                :
                (<FlatList
                        data={couponList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.containerStyle}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.buttonBg]}
                                tintColor={colors.buttonBg}
                            />
                        }
                        ListEmptyComponent={() => (
                            <ListEmptyComponent title={"No Coupons Available"} />
                        )}
                    />
                )}
            <ViewDetailsBottomSheet ref={viewDetailSheet} />
            <RedeemSheet ref={redeemSheetRef} />
        </AppSafeAreaView>
    )
}

export default CouponList

const styles = StyleSheet.create({
    containerStyle: {
        gap: s(15),
        paddingBottom: vs(50),
        marginTop: vs(40),
    },
})