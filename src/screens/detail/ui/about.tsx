import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useAppSelector } from '@redux/hooks';
import { WebView } from "react-native-webview";
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';

const About = () => {
  const webRef = useRef();
  const { bookletDetailAbout, isLoading } = useAppSelector((state) => state?.home)
  return (
    <View style={commonStyles.screenSize}>
      {isLoading ? (
        <Loader />
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: bookletDetailAbout?.url }}
        // onScroll={_onScroll}
        />
      )}

    </View>
  )
}

export default About

const styles = StyleSheet.create({})