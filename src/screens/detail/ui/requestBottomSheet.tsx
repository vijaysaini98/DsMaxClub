import { Image, Keyboard, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AppText, ERROR_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWELVE, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import TouchableOpacityView from '@components/TouchableOpacityView';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import Input from '@components/Input';
import KeyBoardAware from '@components/KeyBoardAware';
import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters';
import styles from '../styles';
import { checkIcon, unCheckIcon } from '@helper/imagesAssets';

const RequestBottomSheet = ({ bottomSheetRef, snapPoints, onSubmit, onDismiss,acceptContent,setAcceptContent }) => {
    const dispatch = useAppDispatch();
    const { isBtnLoading } = useAppSelector((state) => state?.home);
    

    const [state, setState] = useState({
        bookletQty: "1",
        executiveCode: ''
    });

    const handleSubmit = () => {
        onSubmit(state);
    };

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
            // backdropComponent={renderBackdrop}
            
            enablePanDownToClose
            onDismiss={onDismiss}
            onChange={(index) => {
                if (index === -1) {
                    Keyboard.dismiss();
                }
            }}
            handleIndicatorStyle={bottomSheetStyles.handleIndicator}
        >
            <BottomSheetView style={bottomSheetStyles.contentContainer}>
                <KeyBoardAware
                    contentContainerStyle={bottomSheetStyles.keyAwareContainer}>
                    <AppText type={SIXTEEN} weight={SEMI_BOLD} style={bottomSheetStyles.titleText}>
                        Request Details
                    </AppText>
                    <Input
                        label='Booklet Qty'
                        required
                        placeholder="Enter Booklet Qty"
                        value={state?.bookletQty}
                        onChangeText={(text: string) => setState({ ...state, bookletQty: text })}
                        keyboardType='phone-pad'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        inputStyle={bottomSheetStyles.inputText}
                    />
                    <Input
                        label='Executive Code (Optional)'
                        placeholder="Enter Executive Code"
                        value={state?.executiveCode}
                        onChangeText={(text: string) => setState({ ...state, executiveCode: text.trim() })}
                        keyboardType='email-address'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        inputStyle={bottomSheetStyles.inputText}
                    />
                      <View style={styles.acceptTermsConditionContainer}>
                                      <TouchableOpacityView
                                        onPress={() => setAcceptContent(!acceptContent)}
                                        style={styles.acceptTermsConditionBtn}>
                                        {/* <View style={sstyles.acceptView(acceptContent)} /> */}
                                        {acceptContent ?
                                          <Image
                                            source={checkIcon}
                                            style={{ height: s(24), width: s(24) }}
                                            resizeMode={"contain"}
                                            tintColor={colors.buttonBg}
                                          />
                                          : <Image
                                            source={unCheckIcon}
                                            style={{ height: s(20), width: s(20) }}
                                            resizeMode={"contain"}
                                            tintColor={colors.buttonBg}
                                          />
                                        }
                                        <AppText type={FOURTEEN} weight={SEMI_BOLD} >{"Accept the Term&Conditions"}
                                            <AppText type={TWELVE} color={ERROR_TEXT} weight={SEMI_BOLD}>{"*"}</AppText>
                                        </AppText>
                                      </TouchableOpacityView>
                                    </View>
                    <TouchableOpacityView
                        onPress={handleSubmit}
                        style={bottomSheetStyles.submitBtn}
                        loader={isBtnLoading}
                    >
                        <AppText type={FOURTEEN} weight={SEMI_BOLD} color={WHITE}>
                            Submit
                        </AppText>
                    </TouchableOpacityView>
                </KeyBoardAware>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default RequestBottomSheet;

const bottomSheetStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: s(20),
        gap: s(10),
    },
    keyAwareContainer: {
        alignItems: 'center',
        gap: s(10),
    },
    titleText: {
        textAlign: "center",
    },
    inputContainer: {
        borderRadius: ms(12),
        height: vs(50),
    },
    inputText: {
        fontSize: ms(14),
    },
    handleIndicator: {
        backgroundColor: colors.buttonBg,
    },
    submitBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(15),
        width: "100%",
        alignItems: 'center',
        borderRadius: ms(12),
        marginTop: vs(10),
    },
});