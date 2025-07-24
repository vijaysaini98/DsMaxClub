import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import { commonStyles } from '@theme/commonStyles'
import Header from '@components/Header'
import ToolBar from '@components/ToolBar'
import { AppText, BOLD, SIXTEEN, TWENTY_EIGHT, TWENTY_SIX } from '@components/AppText'
import { checkReedemIcon } from '@helper/imagesAssets'

const RedeemSuccessfull = () => {
  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
     <ToolBar isLeftIcon title="Redeem" mainContainerStyle={{ paddingHorizontal: 20 }} />
     <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingHorizontal: 15}}>
     <Image source={checkReedemIcon} resizeMode='contain' style={styles.imageStyle}/>
      <AppText type={TWENTY_SIX} weight={BOLD} style={styles.title}>
          Redemption Successful!
        </AppText>

        <AppText type={SIXTEEN} style={styles.subtitle}>
          This deal has{"\n"}been marked as redeemed.
        </AppText>
</View>
    </AppSafeAreaView>
  )
}

export default RedeemSuccessfull

const styles = StyleSheet.create({
    imageStyle:{
        width:138,
        height:132,
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
  },
})