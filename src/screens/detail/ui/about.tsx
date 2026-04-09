import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native'
import React, {  } from 'react'
import { useAppSelector } from '@redux/hooks';
import { WebView } from "react-native-webview";
import { Loader } from '@components/Spinner';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { vs } from 'react-native-size-matters';
import About_TermsConditionShimmer from '@components/ShimerLoader/About_TermsConditionShimerLoader';
import RenderHTML from 'react-native-render-html';

const About = ({ scrollY,from }: { scrollY: Animated.Value }) => {
  console.log(from,'from==>');
  
  const { bookletDetailAbout, isLoading, comboBookletDeals} = useAppSelector((state) => state?.home);
  console.log(comboBookletDeals || comboBookletDeals?.category?.[0]?.about,'comboBookletDeals?.category?.[0]?.about');
  console.log(bookletDetailAbout,'bookletDetailAbout==>');
  
  const { width } = useWindowDimensions();

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      style={{ flex: 1, marginTop: vs(10) }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 ,paddingBottom:vs(100)}}
    >
      {isLoading ? (
        // <Loader />
        <About_TermsConditionShimmer/>
      ) :
      from === 'ComboBooklet' ? (
         <RenderHTML
        contentWidth={width}
        source={{ html: bookletDetailAbout?.description }}
      />
      ) :
      bookletDetailAbout?.url ? (
        <View style={{ flex: 1, minHeight: vs(600) }}>
          <WebView
            source={{ uri: bookletDetailAbout.url }}
            // style={{ flex: 1 }}
            startInLoadingState
            renderLoading={() => <Loader />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ListEmptyComponent title="Booklet About Not Available" />
      )}
    </Animated.ScrollView>
  )
}

export default React.memo(About);

const styles = StyleSheet.create({});
