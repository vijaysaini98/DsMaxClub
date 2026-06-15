import React, { version } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { AppText, BOLD, FOURTEEN, MEDIUM, THIRTEEN, TWENTY_EIGHT } from '@components/AppText';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { authBg, executiveIcon, logoImage, userLogoIcon, vendorIcon } from '@helper/imagesAssets';
import { colors } from '@theme/colors';
import NavigationService from '@navigations/NavigationService';
import * as routes from '@navigations/routes';
import { buildVersion } from '@utils/index';
import { useAppSelector } from '@redux/hooks';
import { SvgUri } from 'react-native-svg';

const userType = [
  {
    id: 1, type: '2', name: 'User',
    icon: userLogoIcon,
    onPress: () => NavigationService.navigate(routes.LOGIN_SCREEN, { userType: '2' })
  },
  {
    id: 2, type: '0', name: 'Vendor',
    icon: vendorIcon,
    onPress: () => NavigationService.navigate(routes.LOGIN_SCREEN, { userType: '0' })
  },
  {
    id: 3, type: '1', name: 'Executive',
    icon: executiveIcon,
    onPress: () => NavigationService.navigate(routes.LOGIN_SCREEN, { userType: '1' })
  },
];

const LoginType = () => {
   const {maintenanceInfo } = useAppSelector(state => state.auth);
   console.log(maintenanceInfo?.logo,'maintenanceInfo?.logo');
   const isSvg = maintenanceInfo?.logo?.endsWith('.svg');
  return (
    <AppSafeAreaView
      isSecond
      bgImage={authBg}
      style={styles.mainContainer}
    >
      <View style={styles.centerContainer}>
        <View style={styles.logoWrapper}>
          {isSvg ? (
    <SvgUri
      uri={maintenanceInfo?.logo}
      width="100%"
      height="100%"
    />
  ) : (
    <FastImage
      source={{ uri: maintenanceInfo?.logo }}
      style={styles.logoImage}
      resizeMode={FastImage.resizeMode.contain}
    />
  )}
        </View>
        <AppText type={TWENTY_EIGHT} weight={BOLD}>WELCOME BACK</AppText>
        <AppText type={FOURTEEN} weight={MEDIUM} >Please Choose Your User Type</AppText>

        <View style={styles.buttonContainer}>
          {userType.map(item => (
            <TouchableOpacityView
              onPress={() => item?.onPress()}
              key={item.id}
              style={styles.card}
            >
              <FastImage
                source={item?.icon}
                style={{ height: ms(60), width: ms(60), marginBottom: vs(10) }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <AppText type={FOURTEEN} weight={MEDIUM}>
                {item.name}
              </AppText>
            </TouchableOpacityView>
          ))}
        </View>
      </View>
        <View style={styles.buildVersionContainer}>
                      <AppText
                          type={THIRTEEN}
                          weight={MEDIUM}
                          // color={PLACEHOLDER}
                          style={{
                              color: colors.borderColor,
                          }}
                      >
                          {" "}
                          V-{`${version} (${buildVersion})`}
                      </AppText>
                  </View>
    </AppSafeAreaView>
  );
};

export default LoginType;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: vs(40),
    paddingHorizontal: s(16),
  },
  centerContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(50),
  },
  logoWrapper: {
    height: vs(110),
    width: ms(110),
    backgroundColor: colors.white,
    borderRadius: ms(8),
    elevation: 3,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: vs(100),
    width: ms(100),
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: vs(40),
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: colors.tabBg,
    paddingVertical: vs(15),
    paddingHorizontal: s(25),
    borderRadius: ms(8),
    marginVertical: vs(10),
    borderColor: colors.borderColor,
    width: ms(150),
    elevation: 3,
    alignItems: 'center'
  },
  cardText: {
    fontSize: ms(18),
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    marginVertical: vs(10),
  },
  buildVersionContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    }
});
