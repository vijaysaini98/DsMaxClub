
import React, { useEffect, useMemo, useCallback, memo, useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { commonStyles } from '@theme/commonStyles';
import {
  AppText,
  FOURTEEN,
  MEDIUM,
  WHITE,
} from '@components/AppText';

import styles from './styles';

import { IMGE_URL } from '@services/config';

import TouchableOpacityView from '@components/TouchableOpacityView';

import {
  deleteIcon,
  defaultBookletImage,
} from '@helper/imagesAssets';

import {
  deleteCartItem,
  getCartList,
  updateCartQuantity,
} from '@actions/cart/cartActions';

import Header from '@components/Header';
import NavigationService from '@navigations/NavigationService';

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

const CartItem = memo(
  ({
    item,
    onIncrement,
    onDecrement,
    onDelete,
  }: any) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.rowContainer}>
          <CartImage
            image={item?.image}
            style={styles.image}
          />

          <View style={styles.rightContainer}>
            <View style={styles.topRow}>
              <AppText
                style={styles.name}
                numberOfLines={2}>
                {item?.booklet_name}
              </AppText>

              <TouchableOpacityView
                style={styles.deleteContainer}
                onPress={onDelete}>
                <FastImage
                  source={deleteIcon}
                  style={styles.deleteIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacityView>
            </View>

            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={onDecrement}>
                <AppText>-</AppText>
              </TouchableOpacity>

              <AppText style={styles.qtyText}>
                {item?.quantity}
              </AppText>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={onIncrement}>
                <AppText>+</AppText>
              </TouchableOpacity>
            </View>

            <AppText style={styles.price}>
              ₹ {item?.total_price}
            </AppText>
          </View>
        </View>
      </View>
    );
  },
);

const Cart = () => {
  const dispatch = useAppDispatch();

  const { cartList } = useAppSelector(
    state => state.cart,
  );

  console.log('Cart List => ', cartList);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  const safeCartList = Array.isArray(cartList)
    ? cartList
    : [];

  const totalPrice = useMemo(() => {
    return safeCartList.reduce(
      (sum: number, item: any) =>
        sum + Number(item?.total_price || 0),
      0,
    );
  }, [safeCartList]);

  const onCheckoutPress = () => {
    NavigationService.navigate(
      'CHECKOUT_SCREEN',
    );
  };

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <CartItem
          item={item}
          onDelete={() => {
            console.log(
              'Delete Clicked =>',
              item?.cart_id,
            );

            dispatch(
              deleteCartItem(
                {
                  cart_id: item?.cart_id,
                },
                () => {
                  dispatch(getCartList());
                },
              ),
            );
          }}
          onIncrement={() => {
            dispatch(
              updateCartQuantity({
                cart_id: item?.cart_id,
                quantity:
                  Number(item?.quantity) + 1,
                action: 'increment',
              }),
            );
          }}
          onDecrement={() => {
            if (
              Number(item?.quantity) > 1
            ) {
              dispatch(
                updateCartQuantity({
                  cart_id: item?.cart_id,
                  quantity:
                    Number(item?.quantity) - 1,
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
    <AppSafeAreaView
      style={commonStyles.mainContainer}>
      <Header
        showGreeting={false}
        title="My Cart"
        showCitySelector={false}
      />

      {safeCartList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText>
            Cart is Empty
          </AppText>
        </View>
      ) : (
        <>
          <FlatList
            data={safeCartList}
            renderItem={renderItem}
            keyExtractor={item =>
              item?.cart_id?.toString()
            }
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 120,
            }}
          />

          <View style={styles.bottomBar}>
            <View>
              <AppText
                style={styles.totalText}>
                ₹ {totalPrice}
              </AppText>

              <AppText
                style={styles.subText}>
                TOTAL
              </AppText>
            </View>

            <TouchableOpacity
              style={styles.placeOrderBtn}
              onPress={onCheckoutPress}>
              <AppText
                type={FOURTEEN}
                color={WHITE}
                weight={MEDIUM}>
                CHECKOUT
              </AppText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </AppSafeAreaView>
  );
};

export default Cart;
