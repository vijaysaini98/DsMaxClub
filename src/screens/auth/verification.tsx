import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ToolBar from '@components/ToolBar'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { authBg } from '@helper/imagesAssets'
import {
    AppText,
    BOLD,
    BUTTON_TEXT,
    EIGHTEEN,
    SIXTEEN,
    TWENTY_EIGHT,
    WHITE,
} from '@components/AppText'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { colors } from '@theme/colors'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import NavigationService from '@navigations/NavigationService';
import { RESET_PASSWORD_SCREEN } from '@navigations/routes'

const Verification = () => {
    const [showResend, setShowResend] = useState(false)
    const [countdown, setCountdown] = useState(60)
    const [value, setValue] = useState('');
    const [propsField, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const ref = useBlurOnFulfill({ value, cellCount: 6 });


    useEffect(() => {
        let timer

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
        } else {
            setShowResend(true)
        }

        return () => clearInterval(timer)
    }, [countdown])

    const handleVerifyBtn = () => {
        setCountdown(60)
        setShowResend(false)
         NavigationService.navigate(RESET_PASSWORD_SCREEN)
    }


    const handleOnChange = (text: string) => {
        setValue(text);
        if (text.length === 6) {
            console.log("Verification code entered:", text);
            NavigationService.navigate(RESET_PASSWORD_SCREEN)
        }
    };

    const handleResetBtn =()=>{
        setCountdown(60)
        setShowResend(false)
        setValue('')
    }

    const renderCell = ({ index, symbol, isFocused }: { index: number, symbol: any, isFocused: boolean }) => {
        const isFilled = Boolean(symbol);
        const borderColor = isFilled
            ? colors.black
            : isFocused
                ? colors.placeholder
                : colors.borderColor;

        return (
            <View
                key={index}
                style={
                    styles.cell(borderColor)}
                onLayout={getCellOnLayoutHandler(index)}
            >
                <Text
                    style={[
                        styles.cellText(isFilled)
                    ]}
                >
                    {symbol || (isFocused ? <Cursor /> : '')}
                </Text>
            </View>
        );
    };

    return (
        <AppSafeAreaView isSecond bgImage={authBg} style={styles.mainContainer}>
            <ToolBar isLeftIcon={true} />
            <View style={styles.heading}>
                <AppText type={TWENTY_EIGHT} weight={BOLD}>
                    Verification
                </AppText>
                <AppText type={EIGHTEEN}>Enter The OTP</AppText>
            </View>

            <View style={styles.optContainer}>
                <CodeField
                    ref={ref}
                    {...propsField}
                    value={value}
                    onChangeText={handleOnChange}
                    cellCount={6}
                    textContentType="oneTimeCode"
                    keyboardType="number-pad"
                    renderCell={renderCell}
                />
            </View>
            <TouchableOpacityView 
            onPress={handleVerifyBtn}
            style={styles.verifyBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>
                    VERIFY
                </AppText>
            </TouchableOpacityView>

            <View style={styles.bottomContainer}>
                <AppText type={SIXTEEN}>Haven’t received the OTP code?</AppText>

                {showResend ? (
                    <TouchableOpacityView onPress={handleResetBtn}>
                        <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD}>
                            Resend OTP
                        </AppText>
                    </TouchableOpacityView>
                ) : (
                    <AppText type={SIXTEEN} color={colors.borderColor}>
                        Resend in {countdown}s
                    </AppText>
                )}
            </View>
        </AppSafeAreaView>
    )
}

export default Verification

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    heading: {
        marginTop: 70,
        marginBottom: 80,
        gap: 26
    },
    inputContainer: {
        gap: 16,
        marginBottom: 80,
    },
    verifyBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 60,
    },
    cell: (borderColor: string) => ({
        width: 50,
        height: 75,
        borderRadius: 100,
        marginLeft: 10,
        padding: Platform.OS === 'ios' ? 15 : 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: borderColor,
    }),
    optContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 60
    },
    focusCell: {
        borderRadius: 8,
        borderWidth: 0.1,
        padding: Platform.OS === 'ios' ? 15 : 10,
    },
    cellText: (isFilled: boolean) => ({
        fontSize: 24,
        textAlign: 'center',
        color: isFilled ? colors.black : colors.borderColor,
        fontWeight: isFilled ? 'bold' : 'normal',

    }),
    bottomContainer: {
        alignItems: 'center',
        gap: 32
    }
})