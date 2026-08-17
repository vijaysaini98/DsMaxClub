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
      var body = document.body;
      var html = document.documentElement;
      var container = document.getElementById('content-container') || body;
      var height = Math.max(
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0,
        html ? html.scrollHeight : 0,
        html ? html.offsetHeight : 0,
        container ? container.scrollHeight : 0
      );
      if (height > 0) {
        window.ReactNativeWebView.postMessage(height.toString());
      }
    }

    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function() {
        sendHeight();
      });
      if (document.body) ro.observe(document.body);
    }

    window.addEventListener('load', sendHeight);
    document.addEventListener('DOMContentLoaded', sendHeight);
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);
  })();
  true;
`;

const RefundPolicyTab = ({ scrollY }: { scrollY: Animated.Value }) => {
  const { refundPolicy: authRefundPolicy, isLoading: authLoading } = useAppSelector(
    state => state?.auth,
  );
  const { bookletDetailRefund, isLoading: homeLoading } = useAppSelector(
    state => state?.home,
  );

  const isLoading = authLoading || homeLoading;
  const policyData = authRefundPolicy || bookletDetailRefund;

  const [webViewHeight, setWebViewHeight] = React.useState<number>(0);

  const refundHtml =
    policyData?.description ||
    policyData?.data?.description ||
    '';
  const refundUrl =
    policyData?.url || policyData?.data?.url || '';
  const hasContent = Boolean(refundHtml || refundUrl);

  const htmlWrapper = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            background-color: transparent;
          }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 10px 10px 20px 10px;
            color: #060505ff;
            font-size: 14px;
            line-height: 1.6;
          }
          img { max-width: 100%; height: auto; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div id="content-container">${refundHtml}</div>
      </body>
    </html>
  `;

  const onWebViewMessage = (event: any) => {
    const contentHeight = Number(event.nativeEvent.data);
    if (contentHeight && contentHeight > 0) {
      setWebViewHeight(contentHeight);
    }
  };

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={16}
      scrollEnabled={hasContent}
      bounces={false}
      alwaysBounceVertical={false}
      overScrollMode={'never'}
      style={{ flex: 1, marginTop: vs(10) }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: vs(20),
      }}
    >
      {isLoading ? (
        <About_TermsConditionShimmer />
      ) : refundHtml ? (
        <View style={{ height: webViewHeight ? webViewHeight + 10 : vs(300), width: '100%' }}>
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
        <View style={{ height: webViewHeight ? webViewHeight + 10 : vs(300), width: '100%' }}>
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
