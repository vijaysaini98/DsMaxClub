import React from 'react';
import { Animated, View } from 'react-native';
import { useAppSelector } from '@redux/hooks';
import { WebView } from 'react-native-webview';
import { Loader } from '@components/Spinner';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { vs } from 'react-native-size-matters';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';

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

const RefundPolicyTab = ({
  scrollY,
}: {
  scrollY: Animated.Value;
}) => {
  const { refundPolicy, isLoading } = useAppSelector(state => state.auth);
  const [webViewHeight, setWebViewHeight] = React.useState<number>(0);
  const [isScrollable, setIsScrollable] = React.useState<boolean>(false);

  const refundUrl = refundPolicy?.url || refundPolicy?.data?.url || '';
  const refundHtml = refundPolicy?.description || refundPolicy?.data?.description || '';
  const hasContent = Boolean(refundHtml || refundUrl);

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
        ${refundHtml}
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
        { useNativeDriver: false },
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
      ) : refundHtml ? (
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
      ) : refundUrl ? (
        <View style={{ height: webViewHeight || vs(300), width: '100%' }}>
          <WebView
            source={{ uri: refundUrl }}
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
        <ListEmptyComponent title="Refund Policy Not Available" />
      )}
    </Animated.ScrollView>
  );
};

export default React.memo(RefundPolicyTab);
