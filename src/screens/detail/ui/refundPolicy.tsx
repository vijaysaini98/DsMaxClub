import React from 'react';
import { Animated, View } from 'react-native';
import { useAppSelector } from '@redux/hooks';
import { WebView } from 'react-native-webview';
import { Loader } from '@components/Spinner';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { vs } from 'react-native-size-matters';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';

const RefundPolicyTab = ({
  scrollY,
}: {
  scrollY: Animated.Value;
}) => {
  const { refundPolicy, isLoading } = useAppSelector(state => state.auth);

  const refundUrl = refundPolicy?.url || refundPolicy?.data?.url || '';

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={16}
      style={{ flex: 1, marginTop: vs(10) }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: vs(100) }}
    >
      {isLoading ? (
        <About_TermsConditionShimmer />
      ) : refundUrl ? (
        <View style={{ flex: 1, minHeight: vs(1000) }}>
          <WebView
            source={{ uri: refundUrl }}
            style={{ flex: 1 }}
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
