import React, {  } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Loader } from '@components/Spinner';
import { useAppSelector } from '@redux/hooks';
import WebView from 'react-native-webview';
import { vs } from 'react-native-size-matters';
import ListEmptyComponent from '@components/ListEmptyComponent';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';

const Terms_Condition: React.FC<{ scrollY: any }> = ({ scrollY }) => {
  const { isLoading, bookletDetailT_C } = useAppSelector((state) => state.home);

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
      ) : bookletDetailT_C?.url ? (
        <View style={{ flex: 1, minHeight: vs(1000) }}>
          <WebView
            source={{ uri: bookletDetailT_C.url }}
            style={{ flex: 1 }}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ListEmptyComponent title="Booklet Terms&Condition Not Available" />
      )}
    </Animated.ScrollView>
  );
};

export default React.memo(Terms_Condition);

const styles = StyleSheet.create({});


