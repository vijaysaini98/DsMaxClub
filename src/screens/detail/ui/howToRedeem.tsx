import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Loader } from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import WebView from 'react-native-webview';
import { vs } from 'react-native-size-matters';
import ListEmptyComponent from '@components/ListEmptyComponent';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';
import { getPrivacy_TermCondition } from '@actions/auth/authAction';

const HowToRedeem: React.FC<{ scrollY: any,index:number }> = ({ scrollY, index }) => {
  const { howToRedeem, isLoading } = useAppSelector((state) => state?.auth)
  const dispatch = useAppDispatch();

useEffect(()=>{
  if(index == 4)
    dispatch(getPrivacy_TermCondition("how-to-redeem"));
},[index])

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      style={{ flex: 1, marginTop: vs(10) }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1,paddingBottom:vs(100) }}
    >
      {isLoading ? (
        // <Loader />
        <About_TermsConditionShimmer/>
      ) : howToRedeem?.url ? (
        <View style={{ flex: 1, minHeight: vs(1000) }}>
          {/* <WebView
            source={{ uri: bookletDetailT_C.url }}
            style={{ flex: 1 }}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
          /> */}
          <WebView
            source={{ uri: howToRedeem.url }}
            style={{ flex: 1 }}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
                        // ref={webRef}
                        // source={{ uri: privacyPolicy?.url }}
                        // // onScroll={_onScroll}
                        // showsVerticalScrollIndicator={false}
                        // style={styles.webView}
                        // onLoad={() => <Loader />}
                    // onShouldStartLoadWithRequest={handleUrlNavigation}
                    // originWhitelist={['*']}
                    />
        </View>
      ) : (
        <ListEmptyComponent title="Booklet Terms&Condition Not Available" />
      )}
    </Animated.ScrollView>
  );
};

export default React.memo(HowToRedeem);

const styles = StyleSheet.create({});


