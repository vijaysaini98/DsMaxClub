import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { AppText, BOLD, FOURTEEN, TWENTY_FOUR } from '@components/AppText'
import { colors } from '@theme/colors'
import QRCode from 'react-native-qrcode-svg';
import { giftIcon } from '@helper/imagesAssets'
import Svg, { Line } from 'react-native-svg'
import { ms, s, vs } from 'react-native-size-matters/extend'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import NavigationService from '@navigations/NavigationService'
import { getCoupon } from '@actions/myCard/myCardAction'

const UserRedeemSucessfull = ({route}) => {
  const dispatch = useAppDispatch()
const { coupon_id ,user_booklet_id} = route?.params ?? ""

  const { couponData } = useAppSelector((state) => state?.myCard)

const handleBackPress = () => {
  dispatch(getCoupon({ coupon_id,user_booklet_id }))
  NavigationService.goBack();
}

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar 
      handleLeftIconPress={()=> handleBackPress()}
      isLeftIcon title="QR Code" />
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
          Code Genrate Successful!
        </AppText>

        <AppText type={FOURTEEN} color={colors.forth} style={styles.subText}>
          Your voucher has been redeemed
        </AppText>

        <View style={styles.qrContainer}>
          <QRCode
            value={JSON.stringify(couponData)} // you can use a dynamic voucher string
            size={s(250)}
            color={colors.black}
          />
          <View style={styles.overlayCornerTL} />
          <View style={styles.overlayCornerTR} />
          <View style={styles.overlayCornerBL} />
          <View style={styles.overlayCornerBR} />
        </View>
      </View>
    </AppSafeAreaView>
  )
}

export default UserRedeemSucessfull
const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: s(16)
  },
  container: {
    flex: 1,
    marginTop: vs(70)
  },
  giftIcon: {
    width: s(100),
    height: s(113),
    alignSelf: 'center',
    tintColor: colors.buttonBg, // optional styling
  },
  successText: {
    textAlign: 'center',
    marginTop: vs(20),
  },
  subText: {
    textAlign: 'center',
    marginTop: vs(8),
    marginBottom: vs(32),
  },
  qrContainer: {
    width: s(300),
    height: s(300),
    alignSelf: 'center',
    padding: ms(18),
    borderRadius: ms(16),
  },
  svgStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlayCornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: s(20),
    height: vs(20),
    borderTopWidth: s(3),
    borderLeftWidth: s(3),
    borderColor: 'black',
  },
  overlayCornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: s(20),
    height: vs(20),
    borderTopWidth: s(3),
    borderRightWidth: s(3),
    borderColor: 'black',
  },
  overlayCornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: s(20),
    height: vs(20),
    borderBottomWidth: s(3),
    borderLeftWidth: s(3),
    borderColor: 'black',
  },
  overlayCornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: s(20),
    height: vs(20),
    borderBottomWidth: s(3),
    borderRightWidth: s(3),
    borderColor: 'black',
  }
});
