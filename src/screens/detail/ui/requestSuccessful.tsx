import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import ToolBar from '@components/ToolBar';
import {
  AppText,
  BOLD,
  SEMI_BOLD,
  SIXTEEN,
  TWENTY_SIX,
  WHITE,
} from '@components/AppText';
import { backIcon, checkReedemIcon, helpLineIcon, leftArrowIcon, phoneIcon } from '@helper/imagesAssets';
import { useNavigation } from '@react-navigation/native';
import TouchableOpacityView from '@components/TouchableOpacityView';
import PhoneDialerModal from '@screens/helpLine/contactModal';
import NavigationService from '@navigations/NavigationService';

const RequestSuccessfull = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(5);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);




  const [isPhoneDialerModalVisible, setIsPhoneDialerModalVisible] = React.useState(false);

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <ToolBar
        isLeftIcon
        title="Request Successful"
        mainContainerStyle={styles.containerStyle}
      />
      <View style={styles.secondContainerStyle}>
        <Image
          source={checkReedemIcon}
          resizeMode="contain"
          style={styles.imageStyle}
        />
        <AppText type={TWENTY_SIX} weight={BOLD} style={styles.title}>
          Your Booklet Request Submitted!
        </AppText>
        <AppText type={SIXTEEN} style={styles.subtitle}>
          Please contact admin for payment and approval.
        </AppText>
        {/* <AppText type={SIXTEEN} style={styles.subtitle}>
          Going back to previous screen in {seconds} sec...
        </AppText> */}
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            gap: 5,
            width: '100%',
            // backgroundColor: 'red',
            borderRadius: 8,
            paddingVertical: 10,
            justifyContent: 'center',
          }}>
              <TouchableOpacityView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            gap: 5,
            backgroundColor: colors.buttonBg,
            borderRadius: 8,
            paddingVertical: 10,
            justifyContent: 'center',
            paddingHorizontal:10
          }}
          onPress={() => {
            NavigationService.goBack()
          }}
        >
          <Image
            source={leftArrowIcon}
            style={{ height: 20, width: 20,tintColor: colors.white}}
            resizeMode="cover"
          />
          <AppText color={WHITE} weight={BOLD}>Go back</AppText>
        </TouchableOpacityView>
             <TouchableOpacityView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            gap: 5,
            backgroundColor: colors.buttonBg,
            borderRadius: 8,
            paddingVertical: 10,
            justifyContent: 'center',
            paddingHorizontal:20
          }}
          onPress={() => {
            setIsPhoneDialerModalVisible(true)
          }}
        >
          <Image
            source={helpLineIcon}
            style={{ height: 20, width: 20,tintColor: colors.white }}
            resizeMode="cover"
          />
          <AppText color={WHITE} weight={BOLD}>Contact</AppText>
        </TouchableOpacityView>
        </View>
       
      </View>
        <PhoneDialerModal
              visible={isPhoneDialerModalVisible}
              onClose={() => {setIsPhoneDialerModalVisible(false)}}
            />
    </AppSafeAreaView>
  );
};

export default RequestSuccessfull;

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
  },
  secondContainerStyle: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 138,
    height: 132,
    marginTop: 100,
    marginBottom: 30,
  },
  title: {
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.placeholder2,
    lineHeight: 24,
    marginBottom: 20,
  },
  timer: {
    textAlign: 'center',
    color: colors.buttonBg,
  },
});
