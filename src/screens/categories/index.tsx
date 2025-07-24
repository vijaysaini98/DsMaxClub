import { ActivityIndicator, FlatList, Image, StyleSheet, View, } from 'react-native'
import React, { useEffect } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import ToolBar from '@components/ToolBar'
import { categoryList } from '@helper/dumyData'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { AppText, FOURTEEN, MEDIUM, SIXTEEN } from '@components/AppText'
import NavigationService from '@navigations/NavigationService'
import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes'
import styles from './styles'
import { commonStyles } from '@theme/commonStyles'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getBannerList, getBookletList, getCategoryList } from '@actions/home/homeAction'
import { SpinnerSecond } from '@components/Spinner'
import { categaoriesIcon } from '@helper/imagesAssets'
import { getCategoryDetails } from '@utils/index'
// import SvgUri from 'react-native-svg-uri'
import { SvgImageFromUri } from '@screens/home/ui/categoriesComponent'


const Categories = () => {
  const dispatch = useAppDispatch()
  const { categoryListData, isLoading } = useAppSelector((state) => state?.home)

  useEffect(() => {
    dispatch(getCategoryList())
  }, [])

  const renderItem = ({ item, index }: any) => {
    const { icon, borderColor } = getCategoryDetails(item?.name)
    return (
      <TouchableOpacityView key={index}
        style={styles.cateCardStyle(item?.border_color)}
        onPress={()=>
          NavigationService.navigate(CATEGORIES_LIST_SCCREEN,{title:item?.name,id:item?.uuid})
        }
        >
          {item?.icon?.includes('.svg') ? (
                          <SvgImageFromUri uri={categoryListData?.baseurl + item?.icon} />
                        ) :
                          (<Image
                            source={item?.icon ? { uri: categoryListData?.baseurl + item?.icon } : categaoriesIcon}
                            style={styles.cateLogoImage} resizeMode="cover" />)
                        }
        <AppText
          numberOfLines={2}
          type={FOURTEEN} weight={MEDIUM} style={styles.cateText}>{item?.name}</AppText>
      </TouchableOpacityView>
    );
  };

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.safeArea]}>
      <ToolBar isLeftIcon title="Categories" />
      {
        isLoading ? (
          <SpinnerSecond />
        ) : (
          <FlatList
            data={categoryListData?.category}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={styles.row(categoryListData?.category?.length>2)}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        )
      }

    </AppSafeAreaView>
  );
};

export default Categories;

