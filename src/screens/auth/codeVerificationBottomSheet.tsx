import React, { forwardRef, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
    Keyboard,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, THIRTEEN, TWENTY_EIGHT, TWENTY_FOUR, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, emailIcon, eyeCloseIcon, eyeOpenIcon, phoneIcon, userIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import ToolBar from '@components/ToolBar';
import { emailRegex, passwordRegex, phoneRegex } from '@utils/index';
import KeyBoardAware from '@components/KeyBoardAware';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { customerVerifySendOtp, sendOtp, singUp, verifyOtp } from '../../actions/auth/authAction';
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
                    style={{ textAlign: 'center', marginTop: 20 }}>Verification code send on your Email Account</AppText>

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