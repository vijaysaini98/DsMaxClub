import React, { useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, EIGHTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, eyeCloseIcon, eyeOpenIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import NavigationService from '@navigations/NavigationService';
import ToolBar from '@components/ToolBar';
import { LOGIN_SCREEN } from '@navigations/routes';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { resetPassword } from '@actions/auth/authAction';

const ResetPassword = ({ route }) => {
    const { email } = route?.params ?? ''
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state.auth)
    const [state, setState] = useState({
        newPassword: '',
        confirmPassword: '',
        isNewPasswordVisible: false,
        isConfrimPasswordVisible: false,
        newPasswordError: '',
        confirmPasswordError: '',
    })

    const handleSaveBtn = () => {
        if (state.newPassword === '') {
            setState({ ...state, newPasswordError: "New Password is required" });
            return;
        } else if (state.confirmPassword === '') {
            setState({ ...state, confirmPasswordError: "Confirm Password is required" });
            return;
        } else if (state.newPassword !== state.confirmPassword) {
            setState({ ...state, confirmPasswordError: "Passwords do not match" });
            return;
        } else {
            let data = {
                email: email,
                new_password: state.newPassword,
                confirm_new_password: state.confirmPassword
            }
            dispatch(resetPassword(data, handleSuccess))
        }
    }

    const handleSuccess = () => {
        setState({ ...state, newPasswordError: "", confirmPasswordError: "" });
    }

    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
            <ToolBar
                isLeftIcon={true}
            />
            <View style={styles.heading}>
                <AppText type={TWENTY_EIGHT} weight={BOLD}>Reset Password</AppText>
                <AppText type={EIGHTEEN} >
                    You Can Now {'\n'}Reset Your Password
                </AppText>
            </View>

            <View style={styles.inputContainer}>
                <Input
                    placeholder={"New Password"}
                    value={state?.newPassword}
                    secureTextEntry={!state.isNewPasswordVisible}
                    onChangeText={(text: string) => setState({ ...state, newPassword: text.trim() })}
                    leftIcon={state.isNewPasswordVisible ? eyeCloseIcon : eyeOpenIcon}
                    handleLeftIconPress={() => setState({ ...state, isNewPasswordVisible: !state.isNewPasswordVisible })}
                    errorText={state.newPasswordError}
                    onFocus={() => setState({ ...state, newPasswordError: "" })}
                />
                <Input
                    placeholder={"Confirm Password"}
                    value={state?.confirmPassword}
                    secureTextEntry={!state.isConfrimPasswordVisible}
                    onChangeText={(text: string) => setState({ ...state, confirmPassword: text.trim() })}
                    leftIcon={state.isConfrimPasswordVisible ? eyeCloseIcon : eyeOpenIcon}
                    handleLeftIconPress={() => setState({ ...state, isConfrimPasswordVisible: !state.isConfrimPasswordVisible })}
                    errorText={state.confirmPasswordError}
                    onFocus={() => setState({ ...state, confirmPasswordError: "" })}
                />
            </View>

            <TouchableOpacityView
                loader={isLoading}
                onPress={handleSaveBtn}
                style={styles.saveBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>Save</AppText>
            </TouchableOpacityView>
        </AppSafeAreaView>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    heading: {
        marginVertical: 70,
        gap: 26
    },
    inputContainer: {
        gap: 16,
        marginTop: 10,
        marginBottom: 60,
    },
    saveBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 48,
    },
});
