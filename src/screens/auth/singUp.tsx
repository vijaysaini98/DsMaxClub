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
import CodeVerificationBottomSheet from './codeVerificationBottomSheet';

const SingUp = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state?.auth)
    const sheetRef = useRef(null);

    const nameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [state, setState] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        isPasswordVisible: false,
        nameError: "",
        phoneError: "",
        emailError: "",
        passwordError: "",
    })

    const handleSignUpBtn = () => {
        // sheetRef.current?.open()
        Keyboard.dismiss()
        // Logic to handle sign up
        if (state.name === '') {
            setState({ ...state, nameError: "Name is required" })
        } else if (state.phone === '') {
            setState({ ...state, phoneError: "Phone number is required" })
        } else if (state.phone.length < 10) {
            setState({ ...state, phoneError: "Phone number must be at least 10 digits" })
        } else if (phoneRegex.test(state.phone) === false) {
            setState({ ...state, phoneError: "Invalid Phone Number" })
        }
        else if (state.email === '') {
            setState({ ...state, emailError: "Email is required" })
        } else if (emailRegex.test(state.email) === false) {
            setState({ ...state, emailError: "Invalid Email" })
        }
        else if (state.password === '') {
            setState({ ...state, passwordError: "Password is required" })
        }
        // else if (passwordRegex.test(state?.password) === false) {
        //     setState({ ...state, passwordError: "Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character." });
        // }
        else if (state.password.length < 4) {
            setState({ ...state, passwordError: "Password is at least 4 character " })
        }
        else {
            let data = {
                email: state.email,
                mobile: state?.phone
            }

            // sheetRef.current?.open();
            setState({ ...state, nameError: "", phoneError: "", emailError: "", passwordError: "" })
            dispatch(customerVerifySendOtp(data, handleOtpSendSuccess))
        }
    }

    const handleOtpSendSuccess = () => {
        sheetRef.current?.open()
    }

    const handleSuccess = () => {
        setState({ ...state, nameError: "", phoneError: "", emailError: "", passwordError: "" })
        sheetRef.current?.close();
    }

    const handleVerify = (code: string) => {

        setState({ ...state, nameError: "", phoneError: "", emailError: "", passwordError: "" })

        let data = {
            name: state?.name,
            email: state?.email,
            otp: code,
            mobile: state?.phone,
            password: state?.password
        }
        dispatch(singUp(data, handleSuccess))
    };

    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
            <ToolBar
                isLeftIcon
                title='Register'
            />
            <KeyBoardAware isSecond>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder={"Full Name"}
                        value={state?.name}
                        onChangeText={(text: string) => setState({ ...state, name: text })}
                        leftIcon={userIcon}
                        errorText={state.nameError}
                        keyboardType='email-address'
                        onFocus={() => setState({ ...state, nameError: "" })}
                        onSubmitEditing={() => {
                            phoneInputRef?.current?.focus();
                        }}
                    />
                    <Input
                        placeholder={"Phone Number"}
                        value={state?.phone}
                        onChangeText={(text: string) => setState({ ...state, phone: text.trim() })}
                        leftIcon={phoneIcon}
                        maxLength={10}
                        keyboardType='phone-pad'
                        errorText={state.phoneError}
                        onFocus={() => setState({ ...state, phoneError: "" })}
                        assignRef={input => {
                            phoneInputRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            emailInputRef?.current?.focus();
                        }}
                    />
                    <Input
                        placeholder={"Email Address"}
                        value={state?.email}
                        onChangeText={(text: string) => setState({ ...state, email: text.trim() })}
                        leftIcon={emailIcon}
                        keyboardType='email-address'
                        errorText={state.emailError}
                        onFocus={() => setState({ ...state, emailError: "" })}
                        assignRef={input => {
                            emailInputRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            passwordInputRef?.current?.focus();
                        }}
                    />
                    <Input
                        placeholder={"Password"}
                        value={state?.password}
                        secureTextEntry={!state.isPasswordVisible}
                        onChangeText={(text: string) => setState({ ...state, password: text.trim() })}
                        leftIcon={state.isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
                        handleLeftIconPress={() => setState({ ...state, isPasswordVisible: !state.isPasswordVisible })}
                        // keyboardType='email-address'
                        // keyboardType='default'
                        errorText={state.passwordError}
                        onFocus={() => setState({ ...state, passwordError: "" })}
                        assignRef={input => {
                            passwordInputRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            handleSignUpBtn()
                        }}
                    />

                </View>

                {/* SignUp Button */}
                <TouchableOpacityView
                    loader={isLoading}
                    onPress={handleSignUpBtn}
                    // onPress={()=>sheetRef.current?.open()}
                    style={styles.createAccountBtn}>
                    <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>CREATE ACCOUNT</AppText>
                </TouchableOpacityView>
                <View style={styles.bottomRow}>
                    <AppText type={SIXTEEN} >Already have an Account? </AppText>
                    <TouchableOpacityView
                        onPress={() => NavigationService.reset(routes.LOGIN_SCREEN)}
                    >
                        <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD} >Login</AppText>
                    </TouchableOpacityView>
                </View>
            </KeyBoardAware>
            <CodeVerificationBottomSheet ref={sheetRef} onVerify={handleVerify} />
        </AppSafeAreaView>
    );
};

export default SingUp;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    heading: {
        marginTop: 120,
        marginBottom: 80,
        gap: 26
    },
    inputContainer: {
        gap: 16,
        marginTop: 70,
        marginBottom: 50,
    },
    forgotWrapper: {
        alignItems: 'flex-end',
    },
    forgotText: {
        color: '#00171F',
        fontSize: 13,
        fontWeight: '500',
    },
    createAccountBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 48,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
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
