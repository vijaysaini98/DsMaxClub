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
// import { defaultBookletImage, deleteIcon } from '@helper/imagesAssets';
// import Header from '@components/Header';

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
//         // source={{ uri: IMGE_URL+ item?.booklet }}
//         source={defaultBookletImage}
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
//       <Header />
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


// after api integration====>

// import React, { useEffect, useMemo, useCallback, memo, useState } from 'react';

// import { FlatList, View, TouchableOpacity } from 'react-native';

// import FastImage from 'react-native-fast-image';

// import { AppSafeAreaView } from '@components/AppSafeAreaView';

// import { useAppDispatch, useAppSelector } from '@redux/hooks';

// import { commonStyles } from '@theme/commonStyles';

// import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText';

// import styles from './styles';

// import { IMGE_URL } from '@services/config';

// import TouchableOpacityView from '@components/TouchableOpacityView';

// import { deleteIcon, defaultBookletImage } from '@helper/imagesAssets';

// import {
//   deleteCartItem,
//   getCartList,
//   updateCartQuantity,
// } from '@actions/cart/cartActions';

// const dispatch = useAppDispatch();

// const CartImage = memo(({ image, style }: any) => {
//   const [failed, setFailed] = useState(false);

//   const imageUrl = image ? `${IMGE_URL}${image}` : null;

//   return (
//     <FastImage
//       source={
//         !imageUrl || failed
//           ? defaultBookletImage
//           : {
//               uri: imageUrl,
//               priority: FastImage.priority.high,
//             }
//       }
//       style={style}
//       resizeMode={FastImage.resizeMode.contain}
//       onError={() => setFailed(true)}
//     />
//   );
// });

// const CartItem = memo(({ item, onIncrement, onDecrement }: any) => {
//   return (
//     <View style={styles.itemCard}>
//       <View style={styles.rowContainer}>
//         {/* IMAGE */}
//         <CartImage image={item?.image} style={styles.image} />

//         {/* RIGHT SIDE */}
//         <View style={styles.rightContainer}>
//           {/* TOP */}
//           <View style={styles.topRow}>
//             <AppText style={styles.name}>{item?.booklet_name}</AppText>

//             <TouchableOpacityView
//               style={styles.deleteContainer}
//               onPress={() => {
//                 dispatch(
//                   deleteCartItem({
//                     cart_id: item?.cart_id,
//                   }),
//                 );
//               }}
//             >
//               <FastImage
//                 source={deleteIcon}
//                 style={styles.deleteIcon}
//                 resizeMode={FastImage.resizeMode.contain}
//               />
//             </TouchableOpacityView>
//           </View>

//           {/* QUANTITY */}
//           <View style={styles.qtyContainer}>
//             {/* MINUS */}
//             <TouchableOpacity style={styles.qtyBtn} onPress={onDecrement}>
//               <AppText>-</AppText>
//             </TouchableOpacity>

//             {/* QTY */}
//             <AppText style={styles.qtyText}>{item?.quantity}</AppText>

//             {/* PLUS */}
//             <TouchableOpacity style={styles.qtyBtn} onPress={onIncrement}>
//               <AppText>+</AppText>
//             </TouchableOpacity>
//           </View>

//           {/* PRICE */}
//           <AppText style={styles.price}>₹ {item?.total_price}</AppText>
//         </View>
//       </View>
//     </View>
//   );
// });

// const Cart = () => {
//   const dispatch = useAppDispatch();

//   const { cartList } = useAppSelector(state => state.cart);

//   useEffect(() => {
//     dispatch(getCartList());
//   }, []);

//   const safeCartList = Array.isArray(cartList) ? cartList : [];

//   // TOTAL PRICE
//   const totalPrice = useMemo(() => {
//     return safeCartList.reduce(
//       (sum: number, item: any) => sum + Number(item?.total_price || 0),
//       0,
//     );
//   }, [safeCartList]);

//   const renderItem = useCallback(
//     ({ item }: any) => {
//       return (
//         <CartItem
//           item={item}
//           onIncrement={() => {
//             dispatch(
//               updateCartQuantity({
//                 cart_id: item?.cart_id,

//                 quantity: Number(item?.quantity) + 1,

//                 action: 'increment',
//               }),
//             );
//           }}
//           onDecrement={() => {
//             if (Number(item?.quantity) > 1) {
//               dispatch(
//                 updateCartQuantity({
//                   cart_id: item?.cart_id,

//                   quantity: Number(item?.quantity) - 1,

//                   action: 'decrement',
//                 }),
//               );
//             }
//           }}
//         />
//       );
//     },
//     [dispatch],
//   );

//   return (
//     <AppSafeAreaView style={commonStyles.mainContainer}>
//       {/* EMPTY CART */}
//       {safeCartList?.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <AppText>Cart is Empty</AppText>
//         </View>
//       ) : (
//         <>
//           {/* CART LIST */}
//           <FlatList
//             data={safeCartList}
//             renderItem={renderItem}
//             keyExtractor={(item: any, index: number) =>
//               item?.cart_id?.toString() || index.toString()
//             }
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingBottom: 120,
//             }}
//             removeClippedSubviews={false}
//           />

//           {/* BOTTOM BAR */}
//           <View style={styles.bottomBar}>
//             <View>
//               <AppText style={styles.totalText}>₹ {totalPrice}</AppText>

//               <AppText style={styles.subText}>TOTAL</AppText>
//             </View>

//             <TouchableOpacity style={styles.placeOrderBtn}>
//               <AppText type={FOURTEEN} color={WHITE} weight={MEDIUM}>
//                 BUY NOW
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </AppSafeAreaView>
//   );
// };

// export default Cart;





// for demo to client====>



import React, { useMemo } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { commonStyles } from '@theme/commonStyles';
import {
  AppText,
  FOURTEEN,
  SIXTEEN,
  EIGHTEEN,
  MEDIUM,
  SEMI_BOLD,
  WHITE,
} from '@components/AppText';

import Header from '@components/Header';
import TouchableOpacityView from '@components/TouchableOpacityView';

import {
  defaultBookletImage,
  deleteIcon,
} from '@helper/imagesAssets';

import styles from './styles';

import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '@actions/cart/cartSlice';

import NavigationService from '@navigations/NavigationService';

const Cart = () => {
  const { cartList } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return cartList.reduce(
      (sum, item) =>
        sum +
        Number(item?.price || 0) *
          Number(item?.quantity || 1),
      0,
    );
  }, [cartList]);

  const handleDelete = item => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(removeFromCart(item.id));
          },
        },
      ],
    );
  };

  const onCheckoutPress = () => {
    NavigationService.navigate('CHECKOUT_SCREEN');
  };

  const renderItem = ({ item }:any) => {
    return (
      <View style={styles.card}>
        <TouchableOpacityView
          style={styles.deleteBtn}
          onPress={() => handleDelete(item)}>
          <FastImage
            source={deleteIcon}
            style={styles.deleteIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacityView>

        <FastImage
          source={defaultBookletImage}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.infoContainer}>
          <AppText
            type={FOURTEEN}
            weight={SEMI_BOLD}
            numberOfLines={2}>
            {item?.name}
          </AppText>

          <AppText
            type={SIXTEEN}
            weight={SEMI_BOLD}
            style={styles.price}>
            ₹ {item?.price}
          </AppText>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() =>
                dispatch(decrementQuantity(item.id))
              }>
              <AppText weight={SEMI_BOLD}>-</AppText>
            </TouchableOpacity>

            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              style={styles.qtyText}>
              {item?.quantity || 1}
            </AppText>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() =>
                dispatch(incrementQuantity(item.id))
              }>
              <AppText weight={SEMI_BOLD}>+</AppText>
            </TouchableOpacity>
          </View>

          <AppText
            type={FOURTEEN}
            weight={SEMI_BOLD}
            style={{ marginTop: 8 }}>
            Total: ₹{' '}
            {Number(item?.price || 0) *
              Number(item?.quantity || 1)}
          </AppText>
        </View>
      </View>
    );
  };

  if (!cartList?.length) {
    return (
      <AppSafeAreaView style={commonStyles.mainContainer}>
        <Header/>

        <View style={styles.emptyContainer}>
          <AppText
            type={EIGHTEEN}
            weight={SEMI_BOLD}>
            Your Cart is Empty
          </AppText>

          <AppText style={styles.emptyText}>
            Add booklets to continue shopping
          </AppText>
        </View>
      </AppSafeAreaView>
    );
  }

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header />

      <View style={styles.headerRow}>
        <AppText
          type={SIXTEEN}
          weight={SEMI_BOLD}>
          {cartList.length} Items in Cart
        </AppText>
      </View>

      <FlatList
        data={cartList}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id?.toString() || index.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 140,
        }}
      />

      <View style={styles.bottomBar}>
        <View>
          <AppText style={styles.totalLabel}>
            Total Amount
          </AppText>

          <AppText
            type={EIGHTEEN}
            weight={SEMI_BOLD}>
            ₹ {totalPrice}
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={onCheckoutPress}>
          <AppText
            type={FOURTEEN}
            color={WHITE}
            weight={MEDIUM}>
            Proceed To Checkout
          </AppText>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
};

export default Cart;