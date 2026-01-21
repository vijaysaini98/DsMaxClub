import React, { forwardRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Text,
} from 'react-native';
import { AppText, EIGHTEEN, MEDIUM, SEMI_BOLD, THIRTEEN, TWENTY_FOUR, WHITE } from '@components/AppText';
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

    const renderCell = ({ index, symbol, isFocused }) => {
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
                container: {
                    borderTopLeftRadius: ms(20),
                    borderTopRightRadius: ms(20),
                    padding: ms(20),
                },
                draggableIcon: {
                    backgroundColor: '#aaa',
                },
            }}
        >
            <View style={{ justifyContent: 'center' }}>
                <AppText style={{
                    // marginBottom: 40,
                    textAlign: 'center'
                }}
                    weight={SEMI_BOLD}
                    type={EIGHTEEN}
                >Enter Verification Code</AppText>
                <AppText
                    type={THIRTEEN}
                    weight={MEDIUM}
                    style={{ textAlign: 'center', marginTop: 20 }}>Verification code send on your Email or Phone Number</AppText>

                <CodeField
                    ref={blurOnFulfill}
                    {...props}
                    value={code}
                    onChangeText={setCode}
                    cellCount={6}
                    rootStyle={{
                        marginVertical: vs(40),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />

                <TouchableOpacityView
                    style={[{
                        backgroundColor: colors.buttonBg,
                        paddingVertical: 12,
                        borderRadius: 10,
                        alignItems: 'center',
                    }, { opacity: code.length === 6 ? 1 : 0.5 }]}
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