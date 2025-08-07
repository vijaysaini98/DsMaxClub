import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { commonStyles } from '@theme/commonStyles';
import Header from '@components/Header';
import FastImage from 'react-native-fast-image';
import { emailIcon2, helpLineIcon, locationIcon, mapImagge } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { AppText, BLACK, BOLD, MEDIUM, PLACEHOLDER, SIXTEEN, TWELVE } from '@components/AppText';
import styles from './styles';
import { openEmail, openMap, openPhoneDialer } from '@utils/index';

interface ContactTabButtonProps {
  icon: any;
  containerStyle?: object;
  title: string;
  text: string;
  handleOnPress: () => void
}

const ContactTabButton: React.FC<ContactTabButtonProps> = ({ handleOnPress, icon, containerStyle, title, text }) => (
  <View style={[styles.contactTab, containerStyle]}>
    <TouchableOpacityView
      onPress={handleOnPress}
      style={styles.iconBtn}>
      <Image
        source={icon}
        style={[styles.iconImage]}
        tintColor={colors.white}
      // resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacityView>
    <AppText type={SIXTEEN} color={BLACK} weight={BOLD} style={styles.tabTitle}>{title}</AppText>
    <AppText type={TWELVE} color={PLACEHOLDER} weight={MEDIUM} style={styles.tabText}>{text}</AppText>
  </View>
);

const Help_Line = () => {



  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.row}>
          <ContactTabButton
            icon={helpLineIcon}
            title="Call US"
            text="We’re here to help you +91-9876543210"
            handleOnPress={() => openPhoneDialer("+91-9876543210")}
          />
          <ContactTabButton
            icon={emailIcon2}
            title="Email us"
            text="Our team is online abc@gmail.com"
            handleOnPress={() => openEmail("abc@gmail.com")}
          />
        </View>
        <ContactTabButton
          containerStyle={styles.addressTab}
          icon={locationIcon}
          title="Address"
          text={`302/6, Lane, 6, Valmiki Marg,\nRaja Park, Jaipur, Rajasthan 302004`}
        //  handleOnPress={()=> openMap("abc@gmail.com")}
        />
        <View style={styles.mapContainer}>
          <FastImage
            source={mapImagge}
            style={styles.mapImage}
            // tintColor={colors.white}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default Help_Line;
