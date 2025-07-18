import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, MEDIUM, SIXTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, emailIcon, eyeCloseIcon, eyeOpenIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { emailRegex } from '@utils/index';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { login } from '../../actions/auth/authAction';
import KeyBoardAware from '@components/KeyBoardAware';

const Login = () => {
    const dispatch = useAppDispatch()
    const{isLoading} = useAppSelector((state)=>state.auth)
    const [state, setState] = useState({
        email: '',
        password: '',
        emailError: "",
        passwordError: "",
        isPasswordVisible: false,
    })

    const handleLoginBtn = () => {
        // Logic to handle login
        if (state.email === '') {
            setState({ ...state, emailError: "Email is required" })
        } else if (state.password === '') {
            setState({ ...state, passwordError: "Password is required" })
        } else if (emailRegex.test(state.email) === false) {
            setState({ ...state, emailError: "Invalid Email" })

        } else {
            let data = {
                email: state?.email,
                password: state?.password
            }
            dispatch(login(data, handleSucess))
            // NavigationService.navigate(routes.BOTTOM_TAB_NAVIGATOR)
        }
    }

    const handleSucess = () => {
        setState({ ...state, emailError: "", passwordError: "" })
    }


    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
                <KeyBoardAware style={styles.container}>
            <View style={styles.heading}>
                <AppText type={TWENTY_EIGHT} weight={BOLD}>WELCOME BACK</AppText>
                <AppText type={EIGHTEEN} >
                    We happy to see you here again. {'\n'}Enter your Phone number
                </AppText>
            </View>

            <View style={styles.inputContainer}>
                <Input
                    placeholder={"Email Address"}
                    value={state?.email}
                    onChangeText={(text: string) => setState({ ...state, email: text.trim() })}
                    leftIcon={emailIcon}
                    keyboardType='email-address'
                    errorText={state.emailError}
                    onFocus={() => setState({ ...state, emailError: "" })}
                />
                <Input
                    placeholder={"Password"}
                    value={state?.password}
                    secureTextEntry={!state.isPasswordVisible}
                    onChangeText={(text: string) => setState({ ...state, password: text.trim() })}
                    leftIcon={state.isPasswordVisible ? eyeCloseIcon : eyeOpenIcon}
                    handleLeftIconPress={() => setState({ ...state, isPasswordVisible: !state.isPasswordVisible })}
                    errorText={state.passwordError}
                    onFocus={() => setState({ ...state, passwordError: "" })}
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
                // onPress={()=>  NavigationService.navigate(routes.BOTTOM_TAB_NAVIGATOR)}
                style={styles.loginBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>LOG IN</AppText>
            </TouchableOpacityView>

            <View style={styles.bottomRow}>
                <AppText type={SIXTEEN} >Don’t Have an Account? </AppText>
                <TouchableOpacityView
                    onPress={() => NavigationService.navigate(routes.SIGNUP_SCREEN)}
                >
                    <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD} >Create Account</AppText>
                </TouchableOpacityView>
            </View>
            </KeyBoardAware>
        </AppSafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    container:{
        backgroundColor:colors.white
    },
    heading: {
        marginTop: 120,
        marginBottom: 80,
        gap: 26
    },
    inputContainer: {
        gap: 16,
        marginBottom: 30,
    },
    forgotWrapper: {
        alignItems: 'flex-end',
    },
    forgotText: {
        color: '#00171F',
        fontSize: 13,
        fontWeight: '500',
    },
    loginBtn: {
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


});
