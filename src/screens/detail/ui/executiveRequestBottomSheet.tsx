import { Image, Keyboard, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AppText, ERROR_TEXT, FOURTEEN, SEMI_BOLD, SIXTEEN, TWELVE, WHITE } from '@components/AppText';
import { useAppSelector } from '@redux/hooks';
import TouchableOpacityView from '@components/TouchableOpacityView';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import Input from '@components/Input';
import KeyBoardAware from '@components/KeyBoardAware';
import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import styles from '../styles';
import { checkIcon, unCheckIcon } from '@helper/imagesAssets';

interface ExecutiveRequestBottomSheetProps { 
    bottomSheetRef: any; 
    snapPoints: number[]; 
    handleDismiss: () => void; 
    onSubmit: (state: any) => void; 
    setAcceptContent: (value: boolean) => void; 
    acceptContent: boolean 
}

const ExecutiveRequestBottomSheet = ({ 
    bottomSheetRef, 
    snapPoints, 
    handleDismiss, 
    onSubmit, 
    setAcceptContent, 
    acceptContent 
}:ExecutiveRequestBottomSheetProps ) => {
    
    const { isBtnLoading } = useAppSelector((state) => state?.home);

    const [state, setState] = useState({
        // customerName: '',
        // customerEmail: '',
        customerMobile: '',
        bookletQty: "1",
        executiveCode: ''
    });

    const phoneInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const bookletQtyRef = useRef(null);
    
    const handleSubmit = () => {
        Keyboard.dismiss()
        // if (emailRegex.test(state.customerEmail) === false) {
        //     Toast.show("Invalid Email", Toast.LONG);
        // }
         if (state.customerMobile === '') {
            Toast.show("Mobile Number is required", Toast.LONG);
        }
        else if (state.customerMobile.length < 10) {
            Toast.show("Mobile Number must be at least 10 digits", Toast.LONG);
        }
        else {
            onSubmit(state);
        }
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

    const onDismiss = () => {
        handleDismiss()
        setState({

            customerMobile: '',
            bookletQty: "1",
            executiveCode: ''
        })
    }

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
                    setState({
                   
                        customerMobile: '',
                        bookletQty: "1",
                        executiveCode: ''
                    })
                }
            }}
            handleIndicatorStyle={bottomSheetStyles.handleIndicator}
        >
            <BottomSheetView style={bottomSheetStyles.contentContainer}>
                <KeyBoardAware
                    contentContainerStyle={bottomSheetStyles.keyAwareContainer}>
                    <AppText type={SIXTEEN} weight={SEMI_BOLD} style={bottomSheetStyles.titleText}>
                        Customer Details
                    </AppText>
                   
                    <Input
                        label='Mobile '
                        required
                        placeholder="Enter Mobile Number"
                        value={state?.customerMobile}
                        onChangeText={(text: string) => setState({ ...state, customerMobile: text.trim() })}
                        assignRef={input => {
                            phoneInputRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            bookletQtyRef?.current?.focus();
                        }}
                        keyboardType='phone-pad'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        maxLength={10}
                        inputStyle={bottomSheetStyles.inputText}
                    />
                    <Input
                        label='Booklet Qty'
                        required
                        placeholder="Enter Booklet Qty"
                        value={state?.bookletQty}
                        onChangeText={(text: string) => setState({ ...state, bookletQty: text })}
                        assignRef={input => {
                            bookletQtyRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            handleSubmit()
                        }}
                        keyboardType='phone-pad'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        inputStyle={bottomSheetStyles.inputText}
                    />
                    <View style={styles.acceptTermsConditionContainer}>
                        <TouchableOpacityView
                            onPress={() => setAcceptContent(!acceptContent)}
                            style={styles.acceptTermsConditionBtn}>
                            {acceptContent ?
                                <Image
                                    source={checkIcon}
                                    style={bottomSheetStyles.checkIconStyle}
                                    resizeMode={"contain"}
                                    tintColor={colors.buttonBg}
                                />
                                : <Image
                                    source={unCheckIcon}
                                    style={bottomSheetStyles.checkIconStyle}
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

export default ExecutiveRequestBottomSheet;

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
    checkIconStyle: { 
        height: s(24),
         width: s(24) 
        }
});