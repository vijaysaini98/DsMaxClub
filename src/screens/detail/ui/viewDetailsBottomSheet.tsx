import React, { forwardRef, useCallback } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, Keyboard } from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, ITALIC, MEDIUM, SEMI_BOLD, THIRD, TWENTY, TWENTY_EIGHT, TWENTY_TWO } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import RenderHtml from 'react-native-render-html';
import { ms, vs } from 'react-native-size-matters/extend';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { s } from 'react-native-size-matters/extend';



const ViewDetailsBottomSheet = ({ bottomSheetRef, snapPoints, onSubmit, onDismiss, data }) => {

    const { width } = useWindowDimensions();

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        [],
    );


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            onDismiss={onDismiss}
            onChange={(index) => {
                if (index === -1) {
                    Keyboard.dismiss();
                }
            }}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <BottomSheetScrollView style={styles.contentContainer}>

                <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.viewTextStyle}>View Details</AppText>
                <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{ marginTop: 20 }}>{data?.heading}</AppText>
                <AppText color={THIRD} type={FOURTEEN} weight={MEDIUM} style={{ marginTop: 20 }}>No of Coupons: <AppText color={THIRD} type={FOURTEEN}>{data?.no_of_coupons}</AppText></AppText>
                {/* {data?.coupon_type_id == 1 ? 
                    <AppText color={THIRD} type={FOURTEEN} style={{ marginTop: 20 }}>{`Maximum Redeem:  ${data?.maximum_redeem}`}</AppText>
                    : null} */}
                <AppText color={THIRD} type={FOURTEEN} weight={MEDIUM} style={{ marginTop: 10, marginBottom: 5 }}>{"Description: "} </AppText>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: data?.description }}
                    tagsStyles={{
                        h1: { fontSize: TWENTY_TWO, fontWeight: '200', color: colors.black },
                        h2: { fontSize: TWENTY, fontWeight: '200', color: colors.black },
                        h3: { fontSize: EIGHTEEN, fontWeight: '200', color: colors.black },
                        // p: { , color: 'red' },
                        i: { fontFamily: ITALIC },
                        a: { color: 'blue', textDecorationLine: 'underline' },
                        b: { fontWeight: '200' }
                    }}
                />
                <AppText color={THIRD} type={FOURTEEN} weight={MEDIUM} style={{ marginTop: 10, marginBottom: 5 }}>{"Short Description: "}{data?.short_desc}</AppText>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default ViewDetailsBottomSheet;


const styles = StyleSheet.create({
    viewTextStyle: {
        alignSelf: 'center',
        paddingTop: 20
    },
    handleIndicator: {
        backgroundColor: colors.buttonBg,
    },
    contentContainer: {
        flex: 1,
        padding: s(20),
        gap: s(10),
    },
})
