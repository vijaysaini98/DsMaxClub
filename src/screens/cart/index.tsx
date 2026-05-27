// import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useMemo } from 'react';
// import { AppSafeAreaView } from '@components/AppSafeAreaView';
// import { useAppSelector } from '@redux/hooks';
// import { commonStyles } from '@theme/commonStyles';
// import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';
// import styles from './styles';
// import FastImage from 'react-native-fast-image';
// import { IMGE_URL } from '@services/config';
// import TouchableOpacityView from '@components/TouchableOpacityView';
// import { deleteIcon } from '@helper/imagesAssets';

// const Cart = () => {
//   const { cartList } = useAppSelector((state) => state.cart);

//   // ✅ Calculate total price
//   const totalPrice = useMemo(() => {
//     return cartList.reduce(
//       (sum: number, item: any) => sum + Number(item?.price || 0),
//       0
//     );
//   }, [cartList]);

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.itemCard}>
//         <TouchableOpacityView>
//             <FastImage
//             source={deleteIcon}
//             style={styles.deleteIcon}
//             resizeMode={FastImage.resizeMode.contain}
//             />
//         </TouchableOpacityView>
//         <FastImage
//         source={{ uri: IMGE_URL+ item?.booklet }}
//         style={{ width: '100%', height: 50, marginBottom: 10 }}
//         resizeMode={FastImage.resizeMode.cover}
//         />
//         <View style={styles.detailContainer}>
//         <AppText>{item?.name}</AppText>
//         <AppText>₹ {item?.price}</AppText>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <AppSafeAreaView style={commonStyles.mainContainer}>
//       <FlatList
//         data={cartList}
//         numColumns={2}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         contentContainerStyle={{ paddingBottom: 90 }} // space for sticky bar
//       />

//       {/* ✅ Sticky Bottom Bar */}
//       <View style={styles.bottomBar}>
//         <View>
//           <AppText style={styles.totalText}>₹ {totalPrice}</AppText>
//           <AppText style={styles.subText}>TOTAL</AppText>
//         </View>

//         <TouchableOpacity style={styles.placeOrderBtn}>
//           <AppText type={FOURTEEN} color={WHITE} weight={MEDIUM}>BUY NOW</AppText>
//         </TouchableOpacity>
//       </View>
//     </AppSafeAreaView>
//   );
// };

// export default Cart;

import React, { useEffect, useMemo, useCallback, memo, useState } from 'react';

import { FlatList, View, TouchableOpacity } from 'react-native';

import FastImage from 'react-native-fast-image';

import { AppSafeAreaView } from '@components/AppSafeAreaView';

import { useAppDispatch, useAppSelector } from '@redux/hooks';

import { commonStyles } from '@theme/commonStyles';

import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';

import styles from './styles';

import { IMGE_URL } from '@services/config';

import TouchableOpacityView from '@components/TouchableOpacityView';

import { deleteIcon, defaultBookletImage } from '@helper/imagesAssets';

import {
  deleteCartItem,
  getCartList,
  updateCartQuantity,
} from '@actions/cart/cartActions';

const dispatch = useAppDispatch();

const CartImage = memo(({ image, style }: any) => {
  const [failed, setFailed] = useState(false);

  const imageUrl = image ? `${IMGE_URL}${image}` : null;

  return (
    <FastImage
      source={
        !imageUrl || failed
          ? defaultBookletImage
          : {
              uri: imageUrl,
              priority: FastImage.priority.high,
            }
      }
      style={style}
      resizeMode={FastImage.resizeMode.contain}
      onError={() => setFailed(true)}
    />
  );
});

const CartItem = memo(({ item, onIncrement, onDecrement }: any) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.rowContainer}>
        {/* IMAGE */}
        <CartImage image={item?.image} style={styles.image} />

        {/* RIGHT SIDE */}
        <View style={styles.rightContainer}>
          {/* TOP */}
          <View style={styles.topRow}>
            <AppText style={styles.name}>{item?.booklet_name}</AppText>

            <TouchableOpacityView
              style={styles.deleteContainer}
              onPress={() => {
                dispatch(
                  deleteCartItem({
                    cart_id: item?.cart_id,
                  }),
                );
              }}
            >
              <FastImage
                source={deleteIcon}
                style={styles.deleteIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacityView>
          </View>

          {/* QUANTITY */}
          <View style={styles.qtyContainer}>
            {/* MINUS */}
            <TouchableOpacity style={styles.qtyBtn} onPress={onDecrement}>
              <AppText>-</AppText>
            </TouchableOpacity>

            {/* QTY */}
            <AppText style={styles.qtyText}>{item?.quantity}</AppText>

            {/* PLUS */}
            <TouchableOpacity style={styles.qtyBtn} onPress={onIncrement}>
              <AppText>+</AppText>
            </TouchableOpacity>
          </View>

          {/* PRICE */}
          <AppText style={styles.price}>₹ {item?.total_price}</AppText>
        </View>
      </View>
    </View>
  );
});

const Cart = () => {
  const dispatch = useAppDispatch();

  const { cartList } = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const safeCartList = Array.isArray(cartList) ? cartList : [];

  // TOTAL PRICE
  const totalPrice = useMemo(() => {
    return safeCartList.reduce(
      (sum: number, item: any) => sum + Number(item?.total_price || 0),
      0,
    );
  }, [safeCartList]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <CartItem
          item={item}
          onIncrement={() => {
            dispatch(
              updateCartQuantity({
                cart_id: item?.cart_id,

                quantity: Number(item?.quantity) + 1,

                action: 'increment',
              }),
            );
          }}
          onDecrement={() => {
            if (Number(item?.quantity) > 1) {
              dispatch(
                updateCartQuantity({
                  cart_id: item?.cart_id,

                  quantity: Number(item?.quantity) - 1,

                  action: 'decrement',
                }),
              );
            }
          }}
        />
      );
    },
    [dispatch],
  );

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      {/* EMPTY CART */}
      {safeCartList?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText>Cart is Empty</AppText>
        </View>
      ) : (
        <>
          {/* CART LIST */}
          <FlatList
            data={safeCartList}
            renderItem={renderItem}
            keyExtractor={(item: any, index: number) =>
              item?.cart_id?.toString() || index.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            removeClippedSubviews={false}
          />

          {/* BOTTOM BAR */}
          <View style={styles.bottomBar}>
            <View>
              <AppText style={styles.totalText}>₹ {totalPrice}</AppText>

              <AppText style={styles.subText}>TOTAL</AppText>
            </View>

            <TouchableOpacity style={styles.placeOrderBtn}>
              <AppText type={FOURTEEN} color={WHITE} weight={MEDIUM}>
                BUY NOW
              </AppText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </AppSafeAreaView>
  );
};

export default Cart;
