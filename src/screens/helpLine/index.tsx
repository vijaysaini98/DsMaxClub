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
import PhoneDialerModal from './contactModal';

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

const [isPhoneDialerModalVisible, setIsPhoneDialerModalVisible] = React.useState(false);

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
            text="We’re here to help you +91-9785053501 OR +91-9773399121"
            // handleOnPress={() => openPhoneDialer("+91-9785053501")}
            handleOnPress={()=> setIsPhoneDialerModalVisible(true)}
          />
          <ContactTabButton
            icon={emailIcon2}
            title="Email us"
            text="Our team is online dsmaxclub@gmail.com"
            handleOnPress={() => openEmail("dsmaxclub@gmail.com")}
          />
        </View>
        <ContactTabButton
          containerStyle={styles.addressTab}
          icon={locationIcon}
          title="Address"
          text={`Divine Lane, Anukriti The Empyrean, Ajmer Road, Jaisinghpura, Jaipur, Bhankrota, Rajasthan 302026`}
          handleOnPress={() =>
            openMap({
              lat: 26.840505849413052,
              lng: 75.68784130442054,
              label: "DS Max Club",
            })
          }
        />
        <TouchableOpacityView
          onPress={() =>
            openMap({
              lat: 26.840505849413052,
              lng: 75.68784130442054,
              label: "DS Max Club",
            })}
          style={styles.mapContainer}>
          <FastImage
            source={mapImagge}
            style={styles.mapImage}
            // tintColor={colors.white}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacityView>
      </ScrollView>
      <PhoneDialerModal
        visible={isPhoneDialerModalVisible}
        onClose={() => {setIsPhoneDialerModalVisible(false)}}
      />
    </AppSafeAreaView>
  );
};

export default Help_Line;
