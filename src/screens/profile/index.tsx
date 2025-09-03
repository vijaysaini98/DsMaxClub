import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@theme/colors'
import Header from '@components/Header'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { deleteAccountIcon, forwardIcon, logOutIcon, myCardIcon, myRequestIcon, privacyIcon, proflieIcon, shareIcon, termsCondIcon, userIcon } from '@helper/imagesAssets'
import { AppText, SIXTEEN } from '@components/AppText'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { deleteAccount, logout } from '../../actions/auth/authAction'
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { commonStyles } from '@theme/commonStyles'
import { ms, s, vs } from 'react-native-size-matters/extend'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import DeleteAccountModal from '@components/DeleteAccountModal'
import LogOutModal from '@components/LogoutModal'

const MoreTabButton = ({ title, leftIcon, handleOnPress }) => {
  return (

    <TouchableOpacityView
      onPress={handleOnPress}
      style={styles.tabBtnContainer}>
      <View style={styles.tabBtnInnerContainer}>
        <Image
          source={leftIcon}
          style={styles.leftIconStyle}
          tintColor={colors.buttonBg}
          resizeMode='contain'
        />
        <AppText type={SIXTEEN}>{title}</AppText>
      </View>
      <Image
        source={forwardIcon}
        style={styles.rightIconStyle}
        resizeMode='contain'
      />
    </TouchableOpacityView>
  )
}



const Profile = () => {

  const dispatch = useAppDispatch();

  // const handleLogout = () =>{
  //   dispatch(logout())
  // }
  const { userData } = useAppSelector((state) => state.auth)
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = React.useState(false);
  const [logoutVisible, setLogoutVisible] = React.useState(false);

  const handleLogout = () => {
    //   Alert.alert("Are you sure you want to Logout", "", [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel",
    //     },
    //     { text: "OK", onPress: () => dispatch(logout()) },
    //   ]
    // )
    dispatch(logout(undefined, setLogoutVisible(false)))
  }

  const handleDeleteAccount = () => {
    // Alert.alert("Are you sure you want to delete your account", "", [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   { text: "OK", onPress: () => dispatch(deleteAccount())},
    // ]);

    dispatch(deleteAccount(undefined, setDeleteAccountModalVisible(false)))
  }



  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header currentCity={userData?.user_type !== "2"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={}
        contentContainerStyle={styles.container}
      >
        <MoreTabButton
          leftIcon={proflieIcon}
          title={"My Profile"}
          handleOnPress={() => { NavigationService.navigate(routes.EDIT_PROFILE_SCREEN) }}
        />
        {userData?.user_type == "2" &&
          <MoreTabButton
            leftIcon={myRequestIcon}
            title={"My Request"}
            handleOnPress={() => { NavigationService.navigate(routes.MY_REQUEST_SCREEN) }}
          />}
        {/* <MoreTabButton
          leftIcon={myCardIcon}
          title={"My Card"}
          handleOnPress={() => { NavigationService.navigate(routes.MY_CARD_SCREEN) }}
        /> */}
        <MoreTabButton
          leftIcon={shareIcon}
          title={"Share App"}
          handleOnPress={() => { }}
        />
        <MoreTabButton
          leftIcon={termsCondIcon}
          title={"Terms & Conditions"}
          handleOnPress={() => { NavigationService.navigate(routes.TERMS_CONDITION_SCREEN) }}
        />
        <MoreTabButton
          leftIcon={privacyIcon}
          title={"Privacy Policy"}
          handleOnPress={() => { NavigationService.navigate(routes.PRIVACY_POLICY_SCREEN) }}
        />
        <MoreTabButton
          leftIcon={logOutIcon}
          title={"Logout"}
          handleOnPress={() => setLogoutVisible(true)}
        />
        <MoreTabButton
          leftIcon={deleteAccountIcon}
          title={"Delete Account"}
          handleOnPress={() => setDeleteAccountModalVisible(true)}
        />
      </ScrollView>
      <LogOutModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={() => handleLogout()}
      />
      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        onClose={() => setDeleteAccountModalVisible(false)}
        onConfirm={() => handleDeleteAccount()}
      />
    </AppSafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    paddingTop: vs(14),
    paddingBottom: vs(50)
  },
  tabBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: vs(25),
    paddingVertical: vs(23),
    borderRadius: ms(100),
    borderColor: colors.borderColor3,
    marginTop: vs(20)
  },
  tabBtnInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(24)
  },
  leftIconStyle: {
    width: s(20),
    height: s(20),
    tintColor: colors.buttonBg
  },
  rightIconStyle: {
    width: s(14),
    height: s(11)
  }

})