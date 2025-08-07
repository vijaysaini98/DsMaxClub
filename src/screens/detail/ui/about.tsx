import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useAppSelector } from '@redux/hooks';
import { WebView } from "react-native-webview";
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';

const About = () => {
  const webRef = useRef();
  const { bookletDetailAbout, isLoading } = useAppSelector((state) => state?.home)

  const handleUrlNavigation = (event) => {
    const url = event?.url;

    // Prevent WebView from loading external links
    const isExternalLink = !url.includes('yourdomain.com'); // adjust your domain

    if (isExternalLink) {
      Linking.openURL(url); // Open in device browser
      return false; // Block WebView from loading it
    }

    return true; // Allow WebView to load the URL
  };

  return (
    <View style={commonStyles.screenSize}>
      {isLoading ? (
        <Loader />
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: bookletDetailAbout?.url }}
          // onScroll={_onScroll}
          showsVerticalScrollIndicator={false}
          onLoad={() => <Loader />}
        // onShouldStartLoadWithRequest={(event)=>handleUrlNavigation(event)}
        // originWhitelist={['*']}
        />
      )}

    </View>
  )
}

export default About

const styles = StyleSheet.create({})