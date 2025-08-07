import React, { forwardRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { AppText, BOLD, EIGHTEEN, FOURTEEN, ITALIC, SEMI_BOLD, THIRD, TWENTY, TWENTY_EIGHT, TWENTY_TWO } from '@components/AppText';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import RenderHtml from 'react-native-render-html';
import { ms, vs } from 'react-native-size-matters/extend';



const ViewDetailsBottomSheet = ({ data, ref },) => {

    const { width } = useWindowDimensions();


    return (
        <RBSheet
            ref={ref}
            useNativeDriver={false}
            height={650}
            closeOnDragDown={true}
            closeOnPressMask={true}
            draggable={true}
            customStyles={
                {
                    container: {
                        borderTopLeftRadius: ms(32),
                        borderTopRightRadius: ms(32)
                    },
                    wrapper: {
                        backgroundColor: colors.fifth,
                    },
                    draggableIcon: {
                        backgroundColor: colors.forth,
                        height: vs(4),
                        width: '40%',
                        alignSelf: 'center',
                        marginTop: vs(20),
                        borderRadius: ms(10)
                    }
                }
            }>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[commonStyles.marginHorizontal, { marginTop: 20 }]}>
                <AppText type={TWENTY_EIGHT} weight={BOLD} style={styles.viewTextStyle}>View Details</AppText>
                <AppText color={THIRD} type={EIGHTEEN} weight={SEMI_BOLD} style={{ marginTop: 20 }}>{data?.heading}</AppText>
                <AppText color={THIRD} type={FOURTEEN} style={{ marginTop: 20 }}>{`No of Coupons:  ${data?.no_of_coupons}`}</AppText>
                <AppText color={THIRD} type={FOURTEEN} style={{ marginTop: 20 }}>{`Maximum Redeem:  ${data?.maximum_redeem}`}</AppText>
                <AppText color={THIRD} type={FOURTEEN} style={{ marginTop: 20, marginBottom: 5 }}>{"Description: "} </AppText>

                <RenderHtml
                    contentWidth={width}
                    source={{ html: data?.description }}
                    tagsStyles={{
                        h1: { fontSize: TWENTY_TWO, fontWeight: 'bold', color: colors.black },
                        h2: { fontSize: TWENTY, fontWeight: 'bold', color: colors.black },
                        h3: { fontSize: EIGHTEEN, fontWeight: 'bold', color: colors.black },
                        // p: { , color: 'red' },
                        i: { fontFamily: ITALIC },
                        a: { color: 'blue', textDecorationLine: 'underline' },
                        b: { fontWeight: 'bold' }
                    }}
                />
            </ScrollView>

        </RBSheet>
    );
};

export default ViewDetailsBottomSheet;


const styles = StyleSheet.create
    ({
        viewTextStyle: {
            alignSelf: 'center',
            paddingTop: 20
        },
    })
