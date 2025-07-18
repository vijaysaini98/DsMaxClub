import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import { commonStyles } from '@theme/commonStyles'
import Header from '@components/Header'

const Help_Line = () => {
  return (
     <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header/>
      <Text>Help_Line</Text>
    </AppSafeAreaView>
  )
}

export default Help_Line

const styles = StyleSheet.create({})