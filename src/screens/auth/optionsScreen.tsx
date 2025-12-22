import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { authBg, logoImage } from '@helper/imagesAssets'
import { colors } from '@theme/colors'
import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, THIRTEEN } from '@components/AppText'
import TouchableOpacityView from '@components/TouchableOpacityView'
import FastImage from 'react-native-fast-image'
import { ms, s, vs } from 'react-native-size-matters/extend'
import NavigationService from '@navigations/NavigationService'
import { LOGIN_SCREEN, SIGNUP_SCREEN } from '@navigations/routes'
// import ReactNativeVersionInfo from 'react-native-version-info'


// let version = ReactNativeVersionInfo.appVersion;
// let buildVersion = ReactNativeVersionInfo.buildVersion;

const OptionsScreen = () => {
    return (
        <AppSafeAreaView
            isSecond
            bgImage={authBg}
            style={styles.mainContainer}>
            <FastImage
                source={logoImage}
                style={styles.logoStyle}
                resizeMode='contain'
            />
            <View style={styles.optionsContainer}>
                <TouchableOpacityView
                    onPress={() => NavigationService.navigate(LOGIN_SCREEN)}
                    style={styles.optionBtnStyle}>
                    <AppText
                        type={FOURTEEN}
                        weight={SEMI_BOLD}
                        color={BUTTON_TEXT}
                    >{"Login"}</AppText>
                </TouchableOpacityView>
                <TouchableOpacityView
                    onPress={() => NavigationService.navigate(SIGNUP_SCREEN)}
                    style={styles.optionBtnStyle}>
                    <AppText
                        type={FOURTEEN}
                        weight={SEMI_BOLD}
                        color={BUTTON_TEXT}
                    >{"Register"}</AppText>
                </TouchableOpacityView>

            </View>
            {/* <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
            }}>
                <AppText
                    type={THIRTEEN}
                    weight={MEDIUM}
                    style={{
                        color: colors.buttonBg,
                    }}
                >
                    {" "}
                    V-{`${version} (${buildVersion})`}
                </AppText>
            </View> */}
        </AppSafeAreaView>
    )
}

export default OptionsScreen


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: vs(40),
        // paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyle: {
        height: vs(200),
        width: ms(200),
        alignSelf: 'center'
    },
    optionsContainer: {
        marginTop: vs(100),
        justifyContent: "space-evenly",
        alignItems: 'center',
        flexDirection: 'row'
    },
    optionBtnStyle: {
        height: vs(100),
        width: s(160),
        backgroundColor: colors.tabBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ms(10)
    }

});