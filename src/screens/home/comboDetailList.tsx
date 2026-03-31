import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Loader } from '@components/Spinner'
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader'
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { AppText } from '@components/AppText';
import { commonStyles } from '@theme/commonStyles';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { ms, s, vs } from 'react-native-size-matters';
import { colors } from '@theme/colors';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { getComboOffersList, getMyCardBookletList } from '@actions/myCard/myCardAction';

const ComboDetailList = ({ route }:any) => {
      const { isLoading, isRefresh,isBtnLoading,comboOfferList } = useAppSelector((state) => state?.myCard)
      const [refreshing, setRefreshing] = useState(false);
      const { data, from } = route?.params ?? '';

console.log(data,'data in combo detail list===>');

        const dispatch = useAppDispatch();
   useEffect(() => {
//  dispatch(getComboOffersList(data?.client?.[0]?.uuid));
if(data?.client?.[0]?.uuid ){
 dispatch(getComboOffersList( { booklet_uuid: data?.client?.[0]?.uuid }));

}

}, [dispatch, isRefresh, data]);

        const onRefresh = useCallback(() => {
          // setRefreshing(true);
        //   dispatch(getMyCardBookletList(value, isRefresh));
        }, [isRefresh]);

        const renderItem=({item}:any)=>{
            return(
                <View>

                </View>
            )
        }
  return (
   <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <ToolBar isLeftIcon title={"My Request"} />
      <View style={styles.containerStyle}>
        <FlatList
          data={comboOfferList}
          renderItem={renderItem}
        //   extraData={data}
        //   keyExtractor={(item, index) => item?.user_booklet_uuid ?? index.toString()}
          contentContainerStyle={styles.listContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <ListEmptyComponent title={'No Card Available'} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
        />
             </View>
    </AppSafeAreaView>
  )
}

export default ComboDetailList

const styles = StyleSheet.create({
      mainContainer: {
    flex: 1,
    paddingHorizontal: s(16)
  },
    containerStyle: {
      flex: 1,
      paddingTop: vs(25)
    },
      listContainerStyle: {
        gap: ms(26),
        paddingBottom: vs(150),
        marginTop: vs(22),
        marginHorizontal: 16,
      },
})