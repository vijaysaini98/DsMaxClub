import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '@theme/commonStyles'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import Header from '@components/Header'
import { AppText } from '@components/AppText'

const AfterScan = () => {
  return (
   <AppSafeAreaView style={commonStyles.mainContainer}>
    <AppText>after scan</AppText>
      <Header userName="Anil Kumawat" />
    </AppSafeAreaView>
  )
}

export default AfterScan

const styles = StyleSheet.create({})