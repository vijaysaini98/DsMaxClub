import { Animated, Dimensions, Image, ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import ToolBar from '@components/ToolBar'
import { banerImages, detailsDummy, shareIcon, unlikeIcon } from '@helper/imagesAssets'
import { AppText, BOLD, EIGHTEEN, FOURTEEN, MEDIUM, NORMAL, PLACEHOLDER, SIXTEEN, TWENTY_TWO, WHITE } from '@components/AppText'
import { colors } from '@theme/colors'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import TouchableOpacityView from '@components/TouchableOpacityView'
import All from './ui/all'
import About from './ui/about'
import Gallery from './ui/gallery'
import Terms_Condition from './ui/terms_condition'
import styles from './styles'
import { shareToAny } from '@utils/index'
import { RenderTabBar } from '@components/RenderTabBar'
import { IMGE_URL } from '@services/config'
import FastImage from 'react-native-fast-image'
import { useAppDispatch } from '@redux/hooks'
import { getBookletDetail } from '@actions/home/homeAction'

// ✅ SceneMap key names must match `routes` keys


const Details = ({ route }) => {
  const { data } = route?.params ?? ""
  const [index, setIndex] = React.useState(0);
  console.log("data====>>>>", data);

  const dispatch = useAppDispatch()

  useEffect(() => {
    const value =
      index === 0
        ? {
          booklet_id: data?.uuid,
          tabname: "All Deals"
        }
        : index === 1
          ? {
            booklet_id: data?.uuid,
            tabname: "About"
          }
          : index === 2
            ? {
              booklet_id: data?.uuid,
              tabname: "Gallery"
            }
            : {
              booklet_id: data?.uuid,
              tabname: "Termscondition"
            }

    dispatch(getBookletDetail(value));
  }, [index]);

  const renderScene = SceneMap({
    allDeals: () => <All />,
    about: () => <About />,
    gallery: () => <Gallery />,
    tc: () => <Terms_Condition />,
  });

  // ✅ Make sure route keys match those in renderScene
  const routes = [
    { key: 'allDeals', title: 'All Deals' },
    { key: 'about', title: 'About' },
    { key: 'gallery', title: 'Gallery' },
    { key: 'tc', title: 'T&C' },
  ];


  const handleFavouriteBtn = () => {

  }

  const handleShareBtn = () => {
    shareToAny('hello');
  }

  return (
    <AppSafeAreaView style={styles.mainContainer}>
       <ImageBackground 
       source={
        data?.booklet?
        { uri: IMGE_URL + data?.booklet } : banerImages} 
       style={styles.coverImageStyle} 
       resizeMode="cover">
       <ToolBar
          isLeftIcon
          title={"Detail"}
          mainContainerStyle={styles.toolBarStyle}
          leftIconTintColor={colors.black}
        />
        </ImageBackground>
      <View style={styles.secondContainer}>
        {/* <View style={styles.ratingContainer}>
          <View style={styles.ratingContainer2}>
            <View style={styles.ratingViewBox}>
              <AppText type={FOURTEEN} color={WHITE} weight={BOLD}>4.3</AppText>
            </View>
            <AppText type={FOURTEEN} weight={BOLD} color={PLACEHOLDER}>
              Excellent
              <AppText type={FOURTEEN} weight={MEDIUM}
                style={{ color: colors.disTextColor }}> (552 Ratings)</AppText>
            </AppText>
          </View>

          <View style={styles.ratingIconContainer}>
            <TouchableOpacityView
              onPress={handleFavouriteBtn}
            >
              <Image
                source={unlikeIcon}
                style={styles.iconsStyle}
                resizeMode='contain'
              />
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={handleShareBtn}
            >
              <Image
                source={shareIcon}
                style={styles.iconsStyle}
                tintColor={colors.disTextColor}
                resizeMode='contain'
              />
            </TouchableOpacityView>
          </View>
        </View> */}

        <AppText type={TWENTY_TWO} weight={BOLD} color={PLACEHOLDER} style={styles.titleTextStyle}>
          {data?.client?.name}
        </AppText>
        <AppText type={SIXTEEN} color={PLACEHOLDER} style={styles.disTextStyle}>
          {"Lorem Ipsum is simply dummy text of the printing and typesetting."}
        </AppText>
        <View style={styles.thridContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={(props) => (
              <RenderTabBar {...props} scrollEnabled={true} index={index} />
            )}
            onIndexChange={setIndex}
          />
        </View>

      </View>
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacityView
          style={styles.buyBtnStyle}
        >
          <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>{"BUY"}</AppText>
        </TouchableOpacityView>
      </View>
    </AppSafeAreaView>
    
  );
};

export default Details;