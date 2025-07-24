import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Loader } from '@components/Spinner'
import { commonStyles } from '@theme/commonStyles'
import { useAppSelector } from '@redux/hooks'
import WebView from 'react-native-webview'

const Terms_Condition = () => {
  const webRef = useRef()
  const {isLoading,bookletDetailT_C} = useAppSelector((state)=>state.home)
  return (
      <View style={commonStyles.screenSize}>
      {isLoading ? (
        <Loader />
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: bookletDetailT_C?.url }}
        // onScroll={_onScroll}
        />
      )}

    </View>
  )
}

export default Terms_Condition

const styles = StyleSheet.create({})