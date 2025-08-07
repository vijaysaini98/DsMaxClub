import { Image, ImageBackground, Linking, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import ToolBar from '@components/ToolBar'
import { banerImages, defaultBookletImage, locationIcon, shareIcon } from '@helper/imagesAssets'
import { AppText, BOLD, BUTTON_TEXT, PLACEHOLDER, SIXTEEN, THIRTEEN, TWENTY_TWO, WHITE } from '@components/AppText'
import { colors } from '@theme/colors'
import { TabView, SceneMap } from 'react-native-tab-view'
import TouchableOpacityView from '@components/TouchableOpacityView'
import All from './ui/all'
import About from './ui/about'
import Gallery from './ui/gallery'
import Terms_Condition from './ui/terms_condition'
import styles from './styles'
import { shareToAny } from '@utils/index'
import { RenderTabBar } from '@components/RenderTabBar'
import { IMGE_URL } from '@services/config'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { bookletRequest, getBookletDetail } from '@actions/home/homeAction'
import FastImage from 'react-native-fast-image'
import { s, vs } from 'react-native-size-matters/extend'

const Details = ({ route }) => {
  const { data } = route?.params ?? ""
  const [index, setIndex] = React.useState(0);
  const { isBtnLoading } = useAppSelector((state) => state.home)

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
    allDeals: () => <All id={data.uuid} />,
    about: () => <About />,
    gallery: () => <Gallery id={data.uuid} />,
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

  const handleOnPress = () => {
    let apidata = {
      booklet_id: data.uuid
    }
    dispatch(bookletRequest(apidata))
  }

  const openInGoogleMaps = (url:string) => {
  // const url = 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDQgBEC4YrwEYxwEYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyCQgCEAAYChiABDIJCAMQABgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIHCAYQABiABDIGCAcQRRg90gEINDEyOGowajmoAgawAgHxBWOcMG8Ry70i&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KQEAAEDstG05MRfbTeztsDWz&daddr=A-15,+Ajmer+Rd,+Vidyut+Nagar+B,+Vidhyut+Nagar,+Jaipur,+Rajasthan+302021';
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Can't open URL: " + url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.transparent} />
      <FastImage
        source={
          data?.booklet ?
            { uri: IMGE_URL + data?.booklet } : defaultBookletImage}
        style={styles.coverImageStyle}
        resizeMode="cover">
        <ToolBar
          isLeftIcon
          title={"Detail"}
          mainContainerStyle={styles.toolBarStyle}
          leftIconTintColor={colors.black}
          textBack={true}
        />
      </FastImage>
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
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", gap: 10 }}>
          <AppText type={TWENTY_TWO} weight={BOLD} color={PLACEHOLDER}
            // style={styles.titleTextStyle}
            numberOfLines={2}
            style={{ width: '90%' }}
          >
            {data?.client?.name ? data?.client?.name : data?.client_name}
          </AppText>
          <TouchableOpacityView
            onPress={handleShareBtn}
            style={{ marginTop: 5 }}
          >
            <Image
              source={shareIcon}
              style={styles.iconsStyle}
              tintColor={colors.disTextColor}
              resizeMode='contain'
            />
          </TouchableOpacityView>
        </View>
        {(data?.client?.short_desc || data?.client_short_desc) &&
          <AppText type={SIXTEEN} color={PLACEHOLDER} style={styles.disTextStyle}>
            {data?.client?.short_desc ? data?.client?.short_desc : data?.client_short_desc}
          </AppText>}
          
           {data?.client?.location_url &&(
            <TouchableOpacityView
            onPress={()=> openInGoogleMaps(data?.client?.location_url)}
            style={{flexDirection:'row',gap:5,alignItems:'center'}}
            >
              <Image
              source={locationIcon}
              style={{height:vs(15),width:s(15)}}
              tintColor={colors.borderColor}
              resizeMode='contain'
              />
              <AppText type={THIRTEEN} color={BUTTON_TEXT}style={{textDecorationLine:'underline',textDecorationColor:colors.buttonText,letterSpacing:0.8}} >{"Check Location"}</AppText>
            </TouchableOpacityView>
          )}
          
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
          onPress={handleOnPress}
          style={styles.buyBtnStyle}
          loader={isBtnLoading}
        >
          <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>{"REQUEST"}</AppText>
        </TouchableOpacityView>
      </View>
    </View>

  );
};

export default Details;




// import React, { useEffect } from 'react'
// import { Image, ImageBackground, Linking, StatusBar, View, StyleSheet } from 'react-native'
// import { AppSafeAreaView } from '@components/AppSafeAreaView'
// import ToolBar from '@components/ToolBar'
// import { banerImages, defaultBookletImage, locationIcon, shareIcon } from '@helper/imagesAssets'
// import { AppText, BOLD, BUTTON_TEXT, PLACEHOLDER, SIXTEEN, THIRTEEN, TWENTY_TWO, WHITE } from '@components/AppText'
// import { colors } from '@theme/colors'
// import TouchableOpacityView from '@components/TouchableOpacityView'
// import All from './ui/all'
// import About from './ui/about'
// import Gallery from './ui/gallery'
// import Terms_Condition from './ui/terms_condition'
// import styles from './styles'
// import { shareToAny } from '@utils/index'
// import { IMGE_URL } from '@services/config'
// import { useAppDispatch, useAppSelector } from '@redux/hooks'
// import { bookletRequest, getBookletDetail } from '@actions/home/homeAction'
// import FastImage from 'react-native-fast-image'
// import { s, vs } from 'react-native-size-matters/extend'
// import { Tabs } from 'react-native-collapsible-tab-view'

// const HEADER_HEIGHT = 150

// const Details = ({ route }) => {
//   const { data } = route?.params ?? {}
//   const [index, setIndex] = React.useState(0)
//   const { isBtnLoading } = useAppSelector((state) => state.home)
//   const dispatch = useAppDispatch()

//   const routes = [
//     { key: 'allDeals', title: 'All Deals' },
//     { key: 'about', title: 'About' },
//     { key: 'gallery', title: 'Gallery' },
//     { key: 'tc', title: 'T&C' },
//   ]

//   useEffect(() => {
//     const value =
//       index === 0 ? { booklet_id: data?.uuid, tabname: 'All Deals' } :
//       index === 1 ? { booklet_id: data?.uuid, tabname: 'About' } :
//       index === 2 ? { booklet_id: data?.uuid, tabname: 'Gallery' } :
//       { booklet_id: data?.uuid, tabname: 'Termscondition' }

//     dispatch(getBookletDetail(value))
//   }, [index])

//   const handleFavouriteBtn = () => {}
//   const handleShareBtn = () => shareToAny('hello')
//   const handleOnPress = () => dispatch(bookletRequest({ booklet_id: data.uuid }))

//   const openInGoogleMaps = (url: string) => {
//     Linking.canOpenURL(url)
//       .then((supported) => supported && Linking.openURL(url))
//       .catch((err) => console.error('An error occurred', err))
//   }

//   const renderHeader = () => (
//     <View>
//       <FastImage
//         source={data?.booklet ? { uri: IMGE_URL + data?.booklet } : defaultBookletImage}
//         style={styles.coverImageStyle}
//         resizeMode="cover"
//       >
//         <ToolBar
//           isLeftIcon
//           title="Detail"
//           mainContainerStyle={styles.toolBarStyle}
//           leftIconTintColor={colors.black}
//           textBack={true}
//         />
//       </FastImage>
//       <View style={styles.secondContainer}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 10 }}>
//           <AppText
//             type={TWENTY_TWO}
//             weight={BOLD}
//             color={PLACEHOLDER}
//             numberOfLines={2}
//             style={{ width: '90%' }}
//           >
//             {data?.client?.name || data?.client_name}
//           </AppText>
//           <TouchableOpacityView onPress={handleShareBtn} style={{ marginTop: 5 }}>
//             <Image
//               source={shareIcon}
//               style={styles.iconsStyle}
//               tintColor={colors.disTextColor}
//               resizeMode="contain"
//             />
//           </TouchableOpacityView>
//         </View>
//         {(data?.client?.short_desc || data?.client_short_desc) && (
//           <AppText type={SIXTEEN} color={PLACEHOLDER} style={styles.disTextStyle}>
//             {data?.client?.short_desc || data?.client_short_desc}
//           </AppText>
//         )}
//         {data?.client?.location_url && (
//           <TouchableOpacityView
//             onPress={() => openInGoogleMaps(data?.client?.location_url)}
//             style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
//           >
//             <Image
//               source={locationIcon}
//               style={{ height: vs(15), width: s(15) }}
//               tintColor={colors.borderColor}
//               resizeMode="contain"
//             />
//             <AppText
//               type={THIRTEEN}
//               color={BUTTON_TEXT}
//               style={{ textDecorationLine: 'underline', textDecorationColor: colors.buttonText, letterSpacing: 0.8 }}
//             >
//               Check Location
//             </AppText>
//           </TouchableOpacityView>
//         )}
//       </View>
//     </View>
//   )

//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar backgroundColor={colors.transparent} />
//       <Tabs.Container
//         renderHeader={renderHeader}
//         headerHeight={HEADER_HEIGHT}
//         lazy
//         allowHeaderOverscroll
//         containerStyle={{backgroundColor:colors.white}}
//       >
//         <Tabs.Tab name="All Deals">
//           <All id={data.uuid} />
//         </Tabs.Tab>
//         <Tabs.Tab name="About">
//           <About />
//         </Tabs.Tab>
//         <Tabs.Tab name="Gallery">
//           <Gallery id={data.uuid} />
//         </Tabs.Tab>
//         <Tabs.Tab name="T&C">
//           <Terms_Condition />
//         </Tabs.Tab>
//       </Tabs.Container>

//       <View style={style.bottomBtnContainer}>
//         <TouchableOpacityView
//           onPress={handleOnPress}
//           style={style.buyBtnStyle}
//           loader={isBtnLoading}
//         >
//           <AppText type={SIXTEEN} color={WHITE} weight={BOLD}>REQUEST</AppText>
//         </TouchableOpacityView>
//       </View>
//     </View>
//   )
// }

// const style = StyleSheet.create({
//   bottomBtnContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: colors.white,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee'
//   },
//   buyBtnStyle: {
//     backgroundColor: colors.buttonBg,
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   }
// })

// export default Details
