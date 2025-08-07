// import { ActivityIndicator, FlatList, Image, StyleSheet, View, } from 'react-native'
// import React, { useEffect } from 'react'
// import { AppSafeAreaView } from '@components/AppSafeAreaView'
// import { colors } from '@theme/colors'
// import ToolBar from '@components/ToolBar'
// import { categoryList } from '@helper/dumyData'
// import TouchableOpacityView from '@components/TouchableOpacityView'
// import { AppText, FOURTEEN, MEDIUM, SIXTEEN } from '@components/AppText'
// import NavigationService from '@navigations/NavigationService'
// import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes'
// import styles from './styles'
// import { commonStyles } from '@theme/commonStyles'
// import { useAppDispatch, useAppSelector } from '@redux/hooks'
// import { getBannerList, getBookletList, getCategoryList } from '@actions/home/homeAction'
// import { Loader, SpinnerSecond } from '@components/Spinner'
// import { categaoriesIcon } from '@helper/imagesAssets'
// import { getCategoryDetails } from '@utils/index'
// // import SvgUri from 'react-native-svg-uri'
// import { SvgImageFromUri } from '@screens/home/ui/categoriesComponent'
// import { useIsFocused } from '@react-navigation/native'


// const Categories = () => {
//   const dispatch = useAppDispatch()
//   const { categoryListData, isLoading } = useAppSelector((state) => state?.home)
// const isFocused = useIsFocused() 
//   useEffect(() => {
//     dispatch(getCategoryList())
//   }, [isFocused])

//   const renderItem = ({ item, index }: any) => {
//     const { icon, borderColor } = getCategoryDetails(item?.name)
//     return (
//       <TouchableOpacityView key={index}
//         style={styles.cateCardStyle(item?.border_color)}
//         onPress={() =>
//           NavigationService.navigate(CATEGORIES_LIST_SCCREEN, { title: item?.name, id: item?.uuid })
//         }
//       >
//         {item?.icon?.includes('.svg') ? (
//           <SvgImageFromUri uri={categoryListData?.baseurl + item?.icon} />
//         ) :
//           (<Image
//             source={item?.icon ? { uri: categoryListData?.baseurl + item?.icon } : categaoriesIcon}
//             style={styles.cateLogoImage} resizeMode="cover" />)
//         }
//         <AppText
//           numberOfLines={2}
//           type={FOURTEEN} weight={MEDIUM} style={styles.cateText}>{item?.name}</AppText>
//       </TouchableOpacityView>
//     );
//   };

//   return (
//     <AppSafeAreaView style={[commonStyles.mainContainer, styles.safeArea]}>
//       <ToolBar isLeftIcon title="Categories" />
//       {
//         isLoading ? (
//           <Loader />
//         ) : (
//           <FlatList
//             data={categoryListData?.category}
//             renderItem={renderItem}
//             keyExtractor={(_, index) => index.toString()}
//             numColumns={3}
//             columnWrapperStyle={styles.row(categoryListData?.category?.length > 2)}
//             contentContainerStyle={styles.gridContainer}
//             showsVerticalScrollIndicator={false}
//           />
//         )
//       }

//     </AppSafeAreaView>
//   );
// };

// export default Categories;


import React, { useEffect, useCallback } from 'react';
import { FlatList, Image } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import ToolBar from '@components/ToolBar';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { AppText, FOURTEEN, MEDIUM } from '@components/AppText';
import NavigationService from '@navigations/NavigationService';
import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes';
import styles from './styles';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getCategoryList } from '@actions/home/homeAction';
import { Loader } from '@components/Spinner';
import { categaoriesIcon } from '@helper/imagesAssets';
import { getCategoryDetails } from '@utils/index';
import { SvgImageFromUri } from '@screens/home/ui/categoriesComponent';
import { useIsFocused } from '@react-navigation/native';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryListData, isLoading } = useAppSelector((state) => state.home);
  // const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getCategoryList());
  }, [ dispatch]);

  const handleCategoryPress = useCallback((item) => {
    NavigationService.navigate(CATEGORIES_LIST_SCCREEN, { title: item?.name, id: item?.uuid });
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      const { borderColor } = getCategoryDetails(item?.name);
      const iconUri = item?.icon ? categoryListData?.baseurl + item?.icon : null;
      return (
        <TouchableOpacityView
          key={item?.uuid ?? index}
          style={styles.cateCardStyle(item?.border_color || borderColor)}
          onPress={() => handleCategoryPress(item)}
        >
          {item?.icon?.includes('.svg') ? (
            <SvgImageFromUri uri={iconUri} />
          ) : (
            <Image
              source={iconUri ? { uri: iconUri } : categaoriesIcon}
              style={styles.cateLogoImage}
              resizeMode="cover"
            />
          )}
          <AppText
            numberOfLines={2}
            type={FOURTEEN}
            weight={MEDIUM}
            style={styles.cateText}
          >
            {item?.name}
          </AppText>
        </TouchableOpacityView>
      );
    },
    [categoryListData?.baseurl, handleCategoryPress]
  );

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.safeArea]}>
      <ToolBar isLeftIcon title="Categories" />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={categoryListData?.category}
          renderItem={renderItem}
          keyExtractor={item => item?.uuid?.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row(categoryListData?.category?.length > 2)}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </AppSafeAreaView>
  );
};

export default Categories;
