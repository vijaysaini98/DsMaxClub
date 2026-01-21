import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { useAppSelector } from '@redux/hooks';
import { commonStyles } from '@theme/commonStyles';
import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { IMGE_URL } from '@services/config';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { deleteIcon } from '@helper/imagesAssets';

const Cart = () => {
  const { cartList } = useAppSelector((state) => state.cart);

  // ✅ Calculate total price
  const totalPrice = useMemo(() => {
    return cartList.reduce(
      (sum: number, item: any) => sum + Number(item?.price || 0),
      0
    );
  }, [cartList]);

  const renderItem = ({ item }: any) => {
    console.log("Cart Item: ", item);
    return (
      <View style={styles.itemCard}>
        <TouchableOpacityView>
            <FastImage
            source={deleteIcon}
            style={styles.deleteIcon}
            resizeMode={FastImage.resizeMode.contain}
            />
        </TouchableOpacityView>
        <FastImage
        source={{ uri: IMGE_URL+ item?.booklet }}
        style={{ width: '100%', height: 50, marginBottom: 10 }}
        resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.detailContainer}>
        <AppText>{item?.name}</AppText>
        <AppText>₹ {item?.price}</AppText>
        </View>
      </View>
    );
  };

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <FlatList
        data={cartList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 90 }} // space for sticky bar
      />

      {/* ✅ Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <AppText style={styles.totalText}>₹ {totalPrice}</AppText>
          <AppText style={styles.subText}>TOTAL</AppText>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn}>
          <AppText type={FOURTEEN} color={WHITE} weight={MEDIUM}>BUY NOW</AppText>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
};

export default Cart;
