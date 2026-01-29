import React, { forwardRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Text,
} from 'react-native';
import {
    AppText,
    EIGHTEEN,
    MEDIUM,
    SEMI_BOLD,
    THIRTEEN,
    TWENTY_FOUR,
    WHITE
} from '@components/AppText';
import { colors } from '@theme/colors';
import TouchableOpacityView from '@components/TouchableOpacityView';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ms, s, vs } from 'react-native-size-matters/extend';

const CodeVerificationBottomSheet = forwardRef(({ onVerify }: { onVerify?: (code: string) => void }, ref) => {
    const [code, setCode] = useState('');
    const blurOnFulfill = useBlurOnFulfill({ value: code, cellCount: 6 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

    const handleVerify = () => {
        if (onVerify) onVerify(code);
    };

    const renderCell = ({ index, symbol, isFocused }: { index: number, symbol: string, isFocused: boolean }) => {
        const isFilled = Boolean(symbol);
        const borderColor = isFilled
            ? colors.black
            : isFocused
                ? colors.placeholder
                : colors.borderColor;
        return (
            <View
                key={index}
                style={styles.cellStyle(borderColor)}
                onLayout={getCellOnLayoutHandler(index)}
            >
                <Text
                    style={styles.cellTextStyle(isFilled)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            </View>
        )
    }

    return (
        <RBSheet
            ref={ref}
            closeOnDragDown
            closeOnPressMask
            onClose={() => setCode('')}
            height={vs(380)}
            customStyles={{
                container: styles.rbSheetContainer,
                draggableIcon: styles.rbSheetDraggableIcon,
            }}
        >
            <View style={styles.mainContainer}>
                <AppText style={styles.titleText}
                    weight={SEMI_BOLD}
                    type={EIGHTEEN}
                >Enter Verification Code</AppText>
                <AppText
                    type={THIRTEEN}
                    weight={MEDIUM}
                    style={styles.subtitleText}>Verification code send on your Email or Phone Number</AppText>

                <CodeField
                    ref={blurOnFulfill}
                    {...props}
                    value={code}
                    onChangeText={setCode}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />

                <TouchableOpacityView
                    style={[
                        styles.verifyButton,
                        { opacity: code.length === 6 ? 1 : 0.5 }
                    ]}
                    onPress={handleVerify}
                    disabled={code.length !== 6}
                >
                    <AppText type={TWENTY_FOUR} color={WHITE} weight={MEDIUM}>Verify</AppText>
                </TouchableOpacityView>
            </View>
        </RBSheet>
    );
});

export default CodeVerificationBottomSheet;

const styles = StyleSheet.create({
    rbSheetContainer: {
        borderTopLeftRadius: ms(20),
        borderTopRightRadius: ms(20),
        padding: ms(20),
    },
    rbSheetDraggableIcon: {
        backgroundColor: '#aaa',
    },
    mainContainer: {
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center',
    },
    subtitleText: {
        textAlign: 'center',
        marginTop: 20,
    },
    codeFieldRoot: {
        marginVertical: vs(40),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    verifyButton: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cellStyle: (borderColor: string) => ({
        width: s(50),
        height: vs(75),
        borderRadius: ms(20),
        // marginLeft: 10,
        padding: Platform.OS === 'ios' ? ms(15) : ms(10),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: borderColor,
    }),
    cellTextStyle: (isFilled: boolean) => ({
        fontSize: ms(24),
        textAlign: 'center',
        color: isFilled ? colors.black : colors.borderColor,
        fontWeight: isFilled ? 'bold' : 'normal',
    }),
});