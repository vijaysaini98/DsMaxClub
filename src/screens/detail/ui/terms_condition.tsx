import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loader } from '@components/Spinner';
import { commonStyles } from '@theme/commonStyles';
import { useAppSelector } from '@redux/hooks';
import WebView, { WebViewProps } from 'react-native-webview';

const Terms_Condition: React.FC = () => {
  const webRef = useRef<WebView>(null);
  const { isLoading, bookletDetailT_C } = useAppSelector((state) => state.home);

  return (
    <View style={commonStyles.screenSize}>
      {isLoading ? (
        <Loader />
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: bookletDetailT_C?.url ?? '' }}
          showsVerticalScrollIndicator={false}
          startInLoadingState={true}
          renderLoading={() => <Loader />}
        />
      )}
    </View>
  );
};

export default Terms_Condition;

const styles = StyleSheet.create({});