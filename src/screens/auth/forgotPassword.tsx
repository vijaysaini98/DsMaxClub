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
import KeyBoardAware from '@components/KeyBoardAware'
import { ms, s, vs } from 'react-native-size-matters'

const ForgotPassword = () => {
const dispatch = useAppDispatch();
const {isLoading} = useAppSelector((state)=>state?.auth)
    const [state, setState] = React.useState({
        email: '',
        emailErrorText: "",
    })

    const handleSendOpt = () => {
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
           NavigationService.navigate(VERIFICATION_SCREEN, {
          email: state?.email,
        });
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
            <KeyBoardAware>
            <View style={styles.heading}>
                <AppText type={TWENTY_EIGHT} weight={BOLD}>Reset Password</AppText>
                <AppText type={EIGHTEEN} style={{textAlign:'center'}} >
                    You Will Receive Password Reset Instructions Via Email
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
                    onSubmitEditing={() => {
                            handleSendOpt()
                        }}
                />
            </View>
            <TouchableOpacityView
            loader={isLoading}
                onPress={handleSendOpt}
                style={styles.sendOptBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>SEND OTP</AppText>
            </TouchableOpacityView>
            </KeyBoardAware>
        </AppSafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: vs(40),
        paddingHorizontal: s(16),
    },
    heading: {
        marginTop: vs(70),
        marginBottom: vs(80),
        gap: s(26),
        alignItems:'center'
    },
    inputContainer: {
        marginBottom: vs(80),
    },

    sendOptBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(19),
        alignItems: 'center',
        borderRadius: ms(50),
        marginBottom: vs(48),
    }
})