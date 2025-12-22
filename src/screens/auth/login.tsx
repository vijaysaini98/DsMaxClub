import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, MEDIUM, PLACEHOLDER, SIXTEEN, THIRTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, emailIcon, eyeCloseIcon, eyeOpenIcon, logoImage } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { emailRegex } from '@utils/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { login, verifyOtp } from '../../actions/auth/authAction';
import KeyBoardAware from '@components/KeyBoardAware';
import FastImage from 'react-native-fast-image';
import { ms, vs } from 'react-native-size-matters';
import CodeVerificationBottomSheet from './codeVerificationBottomSheet';
import { s } from 'react-native-size-matters/extend';
// import ReactNativeVersionInfo from 'react-native-version-info';
import DeviceInfo from 'react-native-device-info';

// let version = ReactNativeVersionInfo.appVersion;
// let buildVersion = ReactNativeVersionInfo.buildVersion;
let version = DeviceInfo.getVersion();
let buildVersion = DeviceInfo.getBuildNumber();;

const Login = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state.auth)
    const sheetRef = useRef(null);

    const passwordInputRef = React.useRef(null);
    const emailInputRef = React.useRef(null);


    const [state, setState] = useState({
        email: '',
        password: '',
        emailError: "",
        passwordError: "",
        isPasswordVisible: false,
    })

    const handleLoginBtn = () => {
        if (state.email === '') {
            setState({ ...state, emailError: "Email is required" })
        } else if (state.password === '') {
            setState({ ...state, passwordError: "Password is required" })
        } else if (emailRegex.test(state.email) === false) {
            setState({ ...state, emailError: "Invalid Email" })

        }
        else {
            let data = {
                email: state?.email,
                password: state?.password
            }
            dispatch(login(data, handleSucess, () => sheetRef.current?.open()))
        }
    }

    const handleSucess = () => {
        setState({ ...state, emailError: "", passwordError: "" })
    }

    const handleOtpVerify = () => {
        sheetRef.current?.close()
        setState({ ...state, emailError: "", passwordError: "" })
        NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
    }

    const handleVerify = (code: string) => {
        let data = {
            email: state?.email,
            otp: code
        }
        dispatch(verifyOtp(data, handleOtpVerify))
    };

    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
            <KeyBoardAware style={styles.container}>
                {/* <ToolBar
title='Login'
isLeftIcon={true}
/> */}
                <View style={styles.heading}>
                    <FastImage
                        source={logoImage}
                        style={{ height: vs(100), width: ms(100), alignSelf: 'center' }}
                        resizeMode='contain'
                    />
                    <AppText type={TWENTY_EIGHT} weight={BOLD}>WELCOME BACK</AppText>
                    <AppText type={EIGHTEEN} style={{ marginTop: 26, textAlign: 'center' }}>
                        We're happy to see you again. {'\n'}Enter your email and password
                    </AppText>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder={"Email Address"}
                        value={state?.email}
                        onChangeText={(text: string) => setState({ ...state, email: text.toLowerCase().trim() })}
                        leftIcon={emailIcon}
                        keyboardType='email-address'
                        errorText={state.emailError}
                        onFocus={() => setState({ ...state, emailError: "" })}
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
                        errorText={state.passwordError}
                        onFocus={() => setState({ ...state, passwordError: "" })}
                        assignRef={input => {
                            passwordInputRef.current = input;
                        }}
                        onSubmitEditing={() => {
                            handleLoginBtn()
                        }}
                    />
                    <View style={styles.forgotWrapper}>
                        <TouchableOpacityView
                            onPress={() => NavigationService.navigate(routes.FORGOT_PASSWORD_SCREEN)}>
                            <AppText type={SIXTEEN} weight={MEDIUM}>Forgot Password?</AppText>
                        </TouchableOpacityView>
                    </View>
                </View>

                {/* Login Button */}
                <TouchableOpacityView
                    onPress={() => handleLoginBtn()}
                    loader={isLoading}
                    style={styles.loginBtn}>
                    <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>LOG IN</AppText>
                </TouchableOpacityView>

                <View style={styles.bottomRow}>
                    <AppText type={SIXTEEN} >Don’t have an Account? </AppText>
                    <TouchableOpacityView
                        onPress={() => NavigationService.navigate(routes.SIGNUP_SCREEN)}
                    >
                        <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD} >Create Account</AppText>
                    </TouchableOpacityView>
                </View>
            </KeyBoardAware>
            <View style={styles.buildVersionContainer}>
                <AppText
                    type={THIRTEEN}
                    weight={MEDIUM}
                    color={PLACEHOLDER}
                    // style={{
                    //     color: colors.buttonBg,
                    // }}
                >
                    {" "}
                    V-{`${version} (${buildVersion})`}
                </AppText>
            </View>
            <CodeVerificationBottomSheet ref={sheetRef} onVerify={handleVerify} />
        </AppSafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: vs(40),
        paddingHorizontal: s(16),
    },
    container: {
        backgroundColor: colors.white
    },
    heading: {
        marginVertical: vs(10),
        alignItems: 'center'
    },
    inputContainer: {
        gap: s(16),
        marginBottom: vs(30),
    },
    forgotWrapper: {
        alignItems: 'flex-end',
    },
    forgotText: {
        color: '#00171F',
        fontSize: ms(13),
        fontWeight: '500',
    },
    loginBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(19),
        alignItems: 'center',
        borderRadius: ms(50),
        marginBottom: vs(10),
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buildVersionContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    }
});
