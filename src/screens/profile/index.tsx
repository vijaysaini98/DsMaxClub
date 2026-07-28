import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { version } from 'react';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import TouchableOpacityView from '@components/TouchableOpacityView';
import {
  deleteAccountIcon,
  forwardIcon,
  hotelBookingIcon,
  logOutIcon,
  myCardIcon,
  myRequestIcon,
  privacyIcon,
  proflieIcon,
  reportIcon,
  shareIcon,
  termsCondIcon,
  travelBookingIcon,
  userIcon,
} from '@helper/imagesAssets';
import { AppText, BOLD, MEDIUM, SIXTEEN, THIRTEEN } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { deleteAccount, logout } from '../../actions/auth/authAction';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { commonStyles } from '@theme/commonStyles';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import DeleteAccountModal from '@components/DeleteAccountModal';
import LogOutModal from '@components/LogoutModal';
import { buildVersion, shareToAny } from '@utils/index';

export const MoreTabButton = ({
  title,
  leftIcon,
  handleOnPress,
  isBold,
}: any) => {
  return (
    <TouchableOpacityView
      onPress={handleOnPress}
      style={styles.tabBtnContainer}
    >
      <View style={styles.tabBtnInnerContainer}>
        <Image
          source={leftIcon}
          style={styles.leftIconStyle}
          tintColor={colors.buttonBg}
          resizeMode="contain"
        />
        <AppText type={SIXTEEN} weight={isBold ? BOLD : MEDIUM}>
          {title}
        </AppText>
      </View>
      <Image
        source={forwardIcon}
        style={styles.rightIconStyle}
        resizeMode="contain"
      />
    </TouchableOpacityView>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userData,isLoading } = useAppSelector(state => state.auth);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    React.useState(false);
  const [logoutVisible, setLogoutVisible] = React.useState(false);


  const handleLogout = () => {
    dispatch(logout(undefined, setLogoutVisible(false)));
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(undefined, setDeleteAccountModalVisible(false)));
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header currentCity={userData?.user_type !== '2'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <MoreTabButton
          leftIcon={proflieIcon}
          title={'My Profile'}
          handleOnPress={() => {
            NavigationService.navigate(routes.EDIT_PROFILE_SCREEN);
          }}
        />
        {userData?.user_type == '0' && (
          <MoreTabButton
            leftIcon={reportIcon}
            title={'Sales Report'}
            handleOnPress={() => {
              NavigationService.navigate(routes.REPORT_SCREEN);
            }}
            isBold={true}
          />
        )}

        {userData?.user_type == '2' && (
          <MoreTabButton
            leftIcon={myRequestIcon}
            title={'My Orders'}
            handleOnPress={() => {
              NavigationService.navigate(routes.MY_ORDERS_SCREEN);
            }}
          />
        )}
        {userData?.user_type != '0' && (
          <>
            <MoreTabButton
              leftIcon={hotelBookingIcon}
              title={'Hotel Booking'}
              handleOnPress={() => {
                NavigationService.navigate(routes.HOTEL_BOOKING);
              }}
            />
            <MoreTabButton
              leftIcon={travelBookingIcon}
              title={'Travel Booking'}
              handleOnPress={() => {
                NavigationService.navigate(routes.TRAVEL_BOOKING);
              }}
            />
          </>
        )}
        <MoreTabButton
          leftIcon={shareIcon}
          title={'Share App'}
          handleOnPress={() => {
            shareToAny(
              `Save big on food, hotels, events & trips with DS Max Club Trip Experts 🎉
            Exclusive deals & unbeatable offers — all in one app!
            👉 Download now & start saving instantly
            https://play.google.com/store/apps/details?id=com.dsmaxclub`,
            );
          }}
        />
        <MoreTabButton
          leftIcon={termsCondIcon}
          title={'Terms & Conditions'}
          handleOnPress={() => {
            NavigationService.navigate(routes.TERMS_CONDITION_SCREEN);
          }}
        />
        <MoreTabButton
          leftIcon={privacyIcon}
          title={'Privacy Policy'}
          handleOnPress={() => {
            NavigationService.navigate(routes.PRIVACY_POLICY_SCREEN);
          }}
        />
        <MoreTabButton
          leftIcon={logOutIcon}
          title={'Logout'}
          handleOnPress={() => setLogoutVisible(true)}
        />
        <MoreTabButton
          leftIcon={deleteAccountIcon}
          title={'Delete Account'}
          handleOnPress={() => setDeleteAccountModalVisible(true)}
        />

        <View style={styles.versionContainer}>
          <AppText
            type={THIRTEEN}
            weight={MEDIUM}
            // color={PLACEHOLDER}
            style={{
              color: colors.borderColor,
            }}
          >
            {' '}
            V-{`${version} (${buildVersion})`}
          </AppText>
        </View>
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
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    paddingTop: vs(14),
    paddingBottom: vs(150),
  },
  tabBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: vs(25),
    paddingVertical: vs(23),
    borderRadius: ms(100),
    borderColor: colors.borderColor3,
    marginTop: vs(20),
  },
  tabBtnInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(24),
  },
  leftIconStyle: {
    width: s(20),
    height: s(20),
    tintColor: colors.buttonBg,
  },
  rightIconStyle: {
    width: s(14),
    height: s(11),
  },
  versionContainer: {
    marginTop: vs(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(10),
  },
});
