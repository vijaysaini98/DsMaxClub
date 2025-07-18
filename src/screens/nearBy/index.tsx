import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import { commonStyles } from '@theme/commonStyles'
import Header from '@components/Header'

const NearBy = () => {
  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header />
      <Text>NearBy</Text>
    </AppSafeAreaView>
  )
}

export default NearBy

const styles = StyleSheet.create({})