import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import { authBg, emailIcon } from '@helper/imagesAssets'
import ToolBar from '@components/ToolBar'
import { AppText, BOLD, EIGHTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText'
import Input from '@components/Input'
import TouchableOpacityView from '@components/TouchableOpacityView'
import NavigationService from '@navigations/NavigationService';
import { emailRegex } from '@utils/index'
import { VERIFICATION_SCREEN } from '@navigations/routes'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { sendOtp } from '@actions/auth/authAction'

const ForgotPassword = () => {
const dispatch = useAppDispatch();
const {isLoading} = useAppSelector((state)=>state?.auth)
    const [state, setState] = React.useState({
        email: '',
        emailErrorText: "",
    })

    const handleSendOpt = () => {
        // Logic to send OTP or reset password
        // console.log("Send OTP to:", state.email);
        if (state.email === '') {
            setState({ ...state, emailErrorText: "Email is required" })
            return;
        } else if (emailRegex.test(state.email) === false) {
            setState({ ...state, emailErrorText: "Invalid Email" })
            return;
        } else {
            let data={
                email:state.email
            }
            dispatch(sendOtp(data,handleSucess))
        }
    }

    const handleSucess = () =>{
         setState({ ...state, emailErrorText: "" })
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
                    You Will Receive {'\n'} Password Reset Instructions Via Email
                </AppText>
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder={"Email Address"}
                    value={state?.email}
                    onChangeText={(text: string) => setState({ ...state, email: text.trim()})}
                    leftIcon={emailIcon}
                    errorText={state?.emailErrorText}
                    keyboardType='email-address'
                    onFocus={() => setState({ ...state, emailErrorText: "" })}
                />
            </View>
            <TouchableOpacityView
            loader={isLoading}
                onPress={handleSendOpt}
                style={styles.sendOptBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>SEND OTP</AppText>
            </TouchableOpacityView>
        </AppSafeAreaView>
    )
}

export default ForgotPassword

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
        marginBottom: 80,
    },

    sendOptBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 48,
    }
})