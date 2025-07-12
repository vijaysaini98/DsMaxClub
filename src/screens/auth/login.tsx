// import { Image, StyleSheet, View } from 'react-native'
// import React from 'react'
// import { AppSafeAreaView } from '@components/AppSafeAreaView'
// import { AppText } from '@components/AppText'
// import { colors } from '@theme/colors'

// const Login = () => {
//     return (
//         <AppSafeAreaView
//             style={styles.mainContainer}
//         >
//             <View style={{flexDirection:'row'}}>
// <Image/>
//             </View>
//             <AppText>{"Login Screen"}</AppText>
//         </AppSafeAreaView>
//     )
// }

// export default Login

// const styles = StyleSheet.create({
//     mainContainer: { flex: 1, backgroundColor: colors.mainBg, }
// })


import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, EIGHTEEN, MEDIUM, SIXTEEN, TWENTY_EIGHT, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';
import { authBg, backIcon, emailIcon, eyeCloseIcon, eyeOpenIcon } from '@helper/imagesAssets';
import { fontFamily } from '@theme/fonts';
import TouchableOpacityView from '@components/TouchableOpacityView';
// import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({ secureTextEntry,
    handleLeftIconPress,
    inputStyle, inputContaierStyle, placeholder, placeholderTextColor, value, onChangeText, leftIcon }) => {
    return (
        <View style={[{
            height: 60, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: "rgba(4, 34, 44, 0.3)", borderRadius: 30,
            paddingHorizontal: 16, backgroundColor: colors.white,
            gap: 10
        }, inputContaierStyle]}>
            {leftIcon && <TouchableOpacityView
                activeOpacity={handleLeftIconPress ? 0.7 : 1}
                onPress={handleLeftIconPress}>
                <Image
                    source={leftIcon}
                    style={{ width: 24, height: 20 }}
                />
            </TouchableOpacityView>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : "rgba(4, 34, 44, 1)"}
                style={[{ fontSize: 16, fontWeight: fontFamily }, inputStyle]}
                secureTextEntry={secureTextEntry}
            // style={{width:""}}  
            />
        </View>
    )
}

const Login = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        isPasswordVisible: false,
    })

    const handleForgotPasswordPress =() =>{
        // Handle forgot password logic here
        console.log("Forgot Password Pressed");
    }
    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow}>
                <Image source={backIcon} style={{ width: 12, height: 24 }} />
            </TouchableOpacity>

            {/* Heading */}
            <View style={styles.heading}>
                <AppText type={TWENTY_EIGHT} weight={BOLD}>WELCOME BACK</AppText>
                <AppText type={EIGHTEEN} >
                    We happy to see you here again. {'\n'}Enter your Phone number
                </AppText>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>

                <Input
                    placeholder={"Email Address"}
                    value={state?.email}
                    onChangeText={(text: string) => setState({ ...state, email: text })}
                    leftIcon={emailIcon}
                />
                <Input
                    placeholder={"Password"}
                    value={state?.isPasswordVisible}
                    secureTextEntry={!state.isPasswordVisible}
                    onChangeText={(text: string) => setState({ ...state, password: text })}
                    leftIcon={state.isPasswordVisible ? eyeCloseIcon : eyeOpenIcon}
                    handleLeftIconPress={() => setState({ ...state, isPasswordVisible: !state.isPasswordVisible })}
                />
<View style={styles.forgotWrapper}>
                <TouchableOpacityView 
                onPress={handleForgotPasswordPress}>
                    <AppText type={SIXTEEN} weight={MEDIUM}>Forgot Password?</AppText>
                </TouchableOpacityView>
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacityView style={styles.loginBtn}>
                <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>LOG IN</AppText>
            </TouchableOpacityView>

            {/* Bottom Link */}
            <View style={styles.bottomRow}>
                <AppText >Don’t Have an Account? </AppText>
                <TouchableOpacity>
                    <AppText >Create Account</AppText>
                </TouchableOpacity>
            </View>
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
    backArrow: {
        paddingTop: 20,
        width: "100%"
    },
    heading: {
        marginTop: 70,
        marginBottom: 80,
        gap: 26
    },
    title: {
        fontSize: 24,
        color: '#00171F',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#00171F',
    },
    inputContainer: {
        gap: 16,
        marginBottom: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#CBD5E1',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#000',
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
        backgroundColor:colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 40,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomText: {
        color: '#00171F',
    },
    createText: {
        color: '#6D2B1F',
        fontWeight: 'bold',
    },
});
