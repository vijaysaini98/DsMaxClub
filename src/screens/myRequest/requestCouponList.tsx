import { FlatList, StyleSheet, View } from 'react-native'
import CommonCard from '@components/CommonCard';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cardDummyData } from '@helper/dumyData'
import { AppText, BUTTON_BG, ERROR_TEXT, TWELVE, WHITE } from '@components/AppText'
import ViewDetailsBottomSheet from '@screens/detail/ui/viewDetailsBottomSheet';
import RedeemSheet from '@screens/myCard/redeemSheet';
import { colors } from '@theme/colors';
import ToolBar from '@components/ToolBar';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getMyRequestCouponList } from '@actions/myRequest/myRequestAction';

const RequestCouponList = ({route}) => {
    const {booklet_id} = route?.params
    const dispatch = useAppDispatch()
    const viewDetailSheet = useRef()
    const redeemSheetRef = useRef()

    const { couponList } = useAppSelector((state) => state?.myRequest)

    
    useEffect(() => {
        dispatch(getMyRequestCouponList({
    booklet_id:booklet_id
}))
    }, [])

    const [viewData, setViewData] = useState();
    const renderItem = useMemo(
        () =>
            ({ item }: { item: CardItem }) => (
                <>
                    <CommonCard
                        key={item.id}
                        data={item}
                        // status={"Active"}
                        // showRedeemBtn
                        onViewPress={() => viewDetailSheet?.current?.open()}
                        // onRedeemPress={() => redeemSheetRef?.current?.open()}
                        heading={item?.heading}
                        description={item?.description}
                        price={"400"}
                        actualPrice={"11,700"}
                        btnTextColor={WHITE}
                        // buttonTitle2={"REDEEM AGAIN"}
                    />
                    {/* <AppText type={TWELVE} color={ERROR_TEXT} weight={BUTTON_BG} style={styles.rejectText}>{"Reject Reason: QR code already used by another account."}</AppText> */}
                </>
            ),
        []
    );
    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}>
            <ToolBar isLeftIcon title={"My Request"} />

            <FlatList
                data={couponList}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.containerStyle}
                showsVerticalScrollIndicator={false}
            />
            <ViewDetailsBottomSheet
                data={viewData}
                ref={viewDetailSheet} />
            <RedeemSheet ref={redeemSheetRef} />
        </AppSafeAreaView>
    )
}

export default RequestCouponList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    containerStyle: {
        gap: 15,
        paddingBottom: 50,
        marginTop: 40,
    },
    rejectText: {
        textAlign: 'center',
        marginTop: 10
    },
})