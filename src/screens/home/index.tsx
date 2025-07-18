import React, { useRef, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import {
  AppText,
  BOLD,
  BUTTON_BG,
  BUTTON_TEXT,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  PLACEHOLDER,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
  TWELVE,
  TWENTY_TWO,
  WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import {
  locationIcon,
  nearByIcon,
  searchIcon,
  starIcon,
} from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import Input from '@components/Input';
import Header from '@components/Header';
import { cardDummyData, categoryList, trendingData } from '@helper/dumyData';
import Card from './ui/card';
import CommonCard from '@components/CommonCard';
import ViewDetailsBottomSheet from './ui/viewDetailsBottomSheet';

const Home: React.FC = () => {
  const [searchText, setSeachText] = useState<string>('');


  return (
    // <AppSafeAreaView style={styles.mainContainer}>
    <View style={styles.mainContainer}>
      <Header userName="Anil Kumawat" />
      <View style={styles.seachContainer}>
        <Input
          leftIcon={searchIcon}
          placeholder="Search..."
          placeholderTextColor={colors.placeholder}
          value={searchText}
          onChangeText={text => setSeachText(text)}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 50 }}
      >
        <View style={styles.categoriesMainContainer}>
          <View style={styles.categoriesHeaderContainer}>
            <AppText
              type={TWENTY_TWO}
              weight={SEMI_BOLD}
              style={styles.cateTitle}
            >
              Categories
            </AppText>
            <TouchableOpacityView style={styles.cateSeeAllBtn}>
              <AppText type={SIXTEEN} color={BUTTON_TEXT}>
                See All
              </AppText>
            </TouchableOpacityView>
            <View></View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categoryList.map((item, index) => (
              <TouchableOpacityView
                key={index}
                style={styles.cateCardStyle(item?.borderColor)}
              >
                <Image
                  source={item.icon}
                  style={styles.cateLogoImage}
                  resizeMode="contain"
                />
                <AppText type={SIXTEEN} weight={MEDIUM} style={styles.cateText}>
                  {item.title}
                </AppText>
              </TouchableOpacityView>
            ))}
          </ScrollView>
        </View>
        {/* <View style={{ marginLeft: 16, marginTop: 8, gap: 12 }}>
          <AppText type={TWENTY_TWO} weight={SEMI_BOLD}
            style={styles.cateTitle}
          >Trending</AppText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {trendingData.map((item, index) => (
              <View style={{
                borderRadius: 10, backgroundColor: colors.white,
                // Drop shadow for iOS
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 6,

                // Drop shadow for Android
                elevation: 6,
                borderWidth: 1,
                overflow: 'hidden'

              }}>
                <Image
                  source={item.image}
                  style={{ height: 210, width: 310, }}
                  resizeMode='cover'
                />
                <View style={{
                  backgroundColor: colors.white, paddingHorizontal: 8,
                  paddingVertical: 5, position: "absolute", borderRadius: 12, top: 12, left: 12
                }}>
                  <AppText type={TWELVE} weight={SEMI_BOLD} >{"Guest Favourite"}</AppText>
                </View>

                <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <View style={{ backgroundColor: colors.placeholder, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 }}>
                        <AppText type={FOURTEEN} color={WHITE} weight={BOLD}>{"4.3"}</AppText>
                      </View>

                      <AppText type={FOURTEEN} weight={BOLD} color={PLACEHOLDER}>Excellent
                        <AppText type={FOURTEEN} weight={MEDIUM} style={{ color: colors.disTextColor }}> (552 Ratings)</AppText></AppText>
                    </View>
                    <View style={{
                      flexDirection: 'row',

                    }}>
                      {[...Array(item.stars)].map((_, idx) => (
                        <Image
                          source={starIcon}
                          style={{ width: 9, height: 9 }}
                          resizeMode="contain"
                        />
                      ))}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <AppText type={EIGHTEEN} weight={MEDIUM}>{"Mauritius Beach"}</AppText>
                    <AppText type={FOURTEEN} weight={BOLD} color={BUTTON_BG}>{`Rs. 11,700`}</AppText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                    <Image
                      source={nearByIcon}
                      style={{ width: 15, height: 15, tintColor: colors.disTextColor }}
                      resizeMode='contain'
                    />
                    <AppText>{"Bel Ombre"}</AppText>
                  </View>
                </View>
              </View>
            ))
            }

          </ScrollView>
        </View> */}
       
        
      </ScrollView>
      {/* </AppSafeAreaView> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
  seachContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  categoriesMainContainer: {
    paddingVertical: 18,
  },
  categoriesHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cateTitle: {
    width: '80%',
  },
  cateSeeAllBtn: {
    width: '20%',
    alignItems: 'flex-end',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
    gap: 16,
  },
  cateCardStyle: (borderColor: boolean) => ({
    height: 120,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    minWidth: 110,
  }),
  cateLogoImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cateText: {
    textAlign: 'center',
  },
});
