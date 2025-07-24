import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { AppText, BOLD, FOURTEEN, TWENTY_FOUR } from '@components/AppText'
import { colors } from '@theme/colors'
import QRCode from 'react-native-qrcode-svg';
import { giftIcon } from '@helper/imagesAssets'
import Svg, { Line } from 'react-native-svg'

const UserRedeemSucessfull = () => {
  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title="Redeem" />
      <View style={styles.container}>
        <Image
          source={giftIcon} // ✅ make sure this matches your asset path
          style={styles.giftIcon}
          resizeMode="contain"
        />

        <AppText
          type={TWENTY_FOUR}
          weight={BOLD}
          style={styles.successText}
        >
          Redemption Successful!
        </AppText>

        <AppText type={FOURTEEN} color={colors.forth} style={styles.subText}>
          Your voucher has been redeemed
        </AppText>

        <View style={styles.qrContainer}>
          <QRCode
            value="Eplanet Soft" // you can use a dynamic voucher string
            size={260}
            color={colors.black}
          />
          <Svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }} width={300} height={300}>
            {/* Top Left */}
            <Line x1="0" y1="0" x2="30" y2="0" stroke={colors.black} strokeWidth={7} />
            <Line x1="0" y1="0" x2="0" y2="30" stroke={colors.black} strokeWidth={7} />

            {/* Top Right */}
            <Line x1="300" y1="0" x2="270" y2="0" stroke={colors.black} strokeWidth={7} />
            <Line x1="300" y1="0" x2="300" y2="30" stroke={colors.black} strokeWidth={7} />

            {/* Bottom Left */}
            <Line x1="0" y1="300" x2="0" y2="270" stroke={colors.black} strokeWidth={7} />
            <Line x1="0" y1="300" x2="30" y2="300" stroke={colors.black} strokeWidth={7} />

            {/* Bottom Right */}
            <Line x1="300" y1="300" x2="300" y2="270" stroke={colors.black} strokeWidth={7} />
            <Line x1="300" y1="300" x2="270" y2="300" stroke={colors.black} strokeWidth={7} />
          </Svg>
        </View>
      </View>
    </AppSafeAreaView>
  )
}

export default UserRedeemSucessfull
const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    marginTop: 70
  },
  giftIcon: {
    width: 100,
    height: 113,
    alignSelf: 'center',
    // marginTop: 40,
    tintColor: colors.buttonBg, // optional styling
  },
  successText: {
    textAlign: 'center',
    marginTop: 20,
  },
  subText: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  qrContainer: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    padding: 18,
    // borderWidth: 2,
    // borderColor: colors.black,
    borderRadius: 16,
  },
});
