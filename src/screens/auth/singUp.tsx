import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, MEDIUM, SIXTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, emailIcon, eyeCloseIcon, eyeOpenIcon, phoneIcon, userIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import ToolBar from '@components/ToolBar';
import { emailRegex, phoneRegex } from '@utils/index';
import KeyBoardAware from '@components/KeyBoardAware';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { singUp } from '../../actions/auth/authAction';

const SingUp = () => {
    const dispatch = useAppDispatch()
    const{isLoading}= useAppSelector((state)=>state?.auth)

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
        } else {
            // setState({ ...state, nameError: "", phoneError: "", emailError: "", passwordError: "" })
            // // NavigationService.navigate(routes.LOGIN_SCREEN);
            const formData = new FormData();

            formData.append('name', state?.name)
            formData.append('mobile', state?.phone)
            formData.append('email', state?.email);
            formData.append("password", state?.password);

            dispatch(singUp(formData,handleSuccess))
        }
    }

    const handleSuccess = () =>{
        setState({ ...state, nameError: "", phoneError: "", emailError: "", passwordError: "" })
    }

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
                    />
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
                        keyboardType='email-address'
                        errorText={state.passwordError}
                        onFocus={() => setState({ ...state, passwordError: "" })}
                    />

                </View>

                {/* SignUp Button */}
                <TouchableOpacityView
                loader={isLoading}
                    onPress={handleSignUpBtn}
                    style={styles.createAccountBtn}>
                    <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>CREATE ACCOUNT</AppText>
                </TouchableOpacityView>
            </KeyBoardAware>
            <View style={styles.bottomRow}>
                <AppText type={SIXTEEN} >Already Have an Account? </AppText>
                <TouchableOpacityView
                    onPress={() => NavigationService.reset(routes.LOGIN_SCREEN)}
                >
                    <AppText type={SIXTEEN} color={BUTTON_TEXT} weight={BOLD} >Login</AppText>
                </TouchableOpacityView>
            </View>
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
});
