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
import { categaoriesIcon, defaultBookletImage } from '@helper/imagesAssets';
import { getCategoryDetails } from '@utils/index';
import { SvgImageFromUri } from '@screens/home/ui/categoriesComponent';
import CategoriesShimmer from '@components/ShimerLoader/categoriesShimerLoader';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryListData, isLoading } = useAppSelector((state) => state.home);
  // const isFocused = useIsFocused();
  const [hasError, setHasError] = React.useState(false);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

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
  style={styles.cateCardStyle(colors.borderColor)}
  onPress={() => handleCategoryPress(item)}
>
  {item?.icon?.includes('.svg') ? (
    <SvgImageFromUri uri={iconUri} />
  ) : (
    <Image
      source={
        hasError || !iconUri
          ? defaultBookletImage
          : { uri: iconUri }
      }
      style={styles.cateLogoImage}
      resizeMode="cover"
      onError={() => setHasError(true)}
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
        // <Loader />
        <CategoriesShimmer />
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
