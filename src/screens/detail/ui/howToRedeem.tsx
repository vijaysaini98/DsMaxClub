import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Loader } from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import WebView from 'react-native-webview';
import { vs } from 'react-native-size-matters';
import ListEmptyComponent from '@components/ListEmptyComponent';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';
import { getPrivacy_TermCondition } from '@actions/auth/authAction';

const autoHeightScript = `
  (function() {
    function sendHeight() {
      var height = Math.max(
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.scrollHeight : 0
      );
      if (height > 0) {
        window.ReactNativeWebView.postMessage(height.toString());
      }
    }
    window.addEventListener('load', sendHeight);
    document.addEventListener('DOMContentLoaded', sendHeight);
    setTimeout(sendHeight, 300);
    setTimeout(sendHeight, 800);
    setTimeout(sendHeight, 1500);
    setTimeout(sendHeight, 3000);
  })();
  true;
`;

const HowToRedeem: React.FC<{ scrollY: any; index: number }> = ({ scrollY, index }) => {
  const { howToRedeem, isLoading } = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();
  const [webViewHeight, setWebViewHeight] = React.useState<number>(0);
  const [isScrollable, setIsScrollable] = React.useState<boolean>(false);

  useEffect(() => {
    if (index === 3 || !howToRedeem?.url) {
      dispatch(getPrivacy_TermCondition("how-to-redeem"));
    }
  }, [index]);

  const redeemUrl = howToRedeem?.url || howToRedeem?.data?.url || '';
  const redeemHtml = howToRedeem?.description || howToRedeem?.data?.description || '';
  const hasContent = Boolean(redeemHtml || redeemUrl);

  const htmlWrapper = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 10px;
            margin: 0;
            color: #000;
            font-size: 14px;
            line-height: 1.6;
          }
          img { max-width: 100%; height: auto; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        ${redeemHtml}
      </body>
    </html>
  `;

  const onWebViewMessage = (event: any) => {
    const contentHeight = Number(event.nativeEvent.data);
    if (contentHeight && contentHeight > 0) {
      setWebViewHeight(contentHeight);
      setIsScrollable(contentHeight > 360);
    }
  };

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      scrollEnabled={hasContent && isScrollable}
      bounces={false}
      alwaysBounceVertical={false}
      overScrollMode={'never'}
      style={{ flex: 1, marginTop: vs(10) }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: hasContent && isScrollable ? vs(80) : vs(20),
      }}
    >
      {isLoading ? (
        <About_TermsConditionShimmer />
      ) : redeemHtml ? (
        <View style={{ height: webViewHeight || vs(300), width: '100%' }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlWrapper }}
            style={{ flex: 1 }}
            injectedJavaScript={autoHeightScript}
            onMessage={onWebViewMessage}
            scrollEnabled={false}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : redeemUrl ? (
        <View style={{ height: webViewHeight || vs(300), width: '100%' }}>
          <WebView
            source={{ uri: redeemUrl }}
            style={{ flex: 1 }}
            injectedJavaScript={autoHeightScript}
            onMessage={onWebViewMessage}
            scrollEnabled={false}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ListEmptyComponent title="How To Use Instructions Not Available" />
      )}
    </Animated.ScrollView>
  );
};

export default React.memo(HowToRedeem);

const styles = StyleSheet.create({});


