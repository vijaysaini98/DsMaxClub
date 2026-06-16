import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Header from '@components/Header';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

import {
  AppText,
  FOURTEEN,
  SIXTEEN,
  EIGHTEEN,
  MEDIUM,
  SEMI_BOLD,
  WHITE,
} from '@components/AppText';

import { defaultBookletImage } from '@helper/imagesAssets';
import styles from './styles';
import { commonStyles } from '@theme/commonStyles';
import { initiatePayment } from '@actions/cart/cartActions';

const Checkout = () => {
  const { cartList } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
  

  const [selectedPayment, setSelectedPayment] =
    useState('phonepe');

  const totalItems = useMemo(() => {
    return cartList.reduce(
      (sum, item) => sum + Number(item?.quantity || 1),
      0,
    );
  }, [cartList]);

  const totalPrice = useMemo(() => {
    return cartList.reduce(
      (sum, item) =>
        sum +
        Number(item?.price || 0) *
          Number(item?.quantity || 1),
      0,
    );
  }, [cartList]);
const renderItem = ({ item }:any) => {
  
  const quantity = item?.quantity || 1;
  const price = Number(item?.price || 0);
  const total = price * quantity;

  return (
    <View style={styles.checkoutCard}>
      <FastImage
        source={defaultBookletImage}
        style={styles.checkoutImage}
      />

      <View style={styles.checkoutContent}>
        <AppText
          type={FOURTEEN}
          weight={SEMI_BOLD}
          numberOfLines={2}>
          {item?.booklet_name}
        </AppText>

        {/* <View style={styles.typeBadge}>
          <AppText style={styles.typeBadgeText}>
            Digital Booklet
          </AppText>
        </View> */}

        <View style={styles.priceRow}>
          <AppText style={styles.qtyText}>
            Qty: {quantity}
          </AppText>

          <AppText style={styles.unitPrice}>
            ₹{price} each
          </AppText>
        </View>

        <View style={styles.totalRow}>
          <AppText style={styles.totalLabel}>
            Item Total
          </AppText>

          <AppText
            type={SIXTEEN}
            weight={SEMI_BOLD}>
            ₹ {total}
          </AppText>
        </View>
      </View>
    </View>
  );
};
const onPayNow = () => {

  const data = {
    amount: totalPrice,
  };


  dispatch(
    initiatePayment(data),
  );

  Alert.alert('Clicked');
};

  return (
    <AppSafeAreaView style={commonStyles.mainContainer}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}>
        
        {/* Order Summary */}
        <View style={styles.section}>
          <AppText
            type={SIXTEEN}
            weight={SEMI_BOLD}>
            Order Summary ({totalItems} Items)
          </AppText>

          <FlatList
            data={cartList}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item?.id?.toString() ||
              index.toString()
            }
            scrollEnabled={false}
          />
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <AppText
            type={SIXTEEN}
            weight={SEMI_BOLD}>
            Price Details
          </AppText>

          <View style={styles.priceRow}>
            <AppText>Subtotal</AppText>
            <AppText>₹ {totalPrice}</AppText>
          </View>

          <View style={styles.priceRow}>
            <AppText>Discount</AppText>
            <AppText>₹ 0</AppText>
          </View>

          <View style={styles.priceRow}>
            <AppText>Taxes</AppText>
            <AppText>₹ 0</AppText>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <AppText weight={SEMI_BOLD} type={SIXTEEN}>
              Total Amount
            </AppText>

            <AppText weight={SEMI_BOLD} type={SIXTEEN}>
              ₹ {totalPrice}
            </AppText>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <AppText
            type={SIXTEEN}
            weight={SEMI_BOLD}>
            Payment Method
          </AppText>

          {[
            {
              id: 'phonepe',
              title: 'PhonePe',
            },
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.paymentItem}
              onPress={() =>
                setSelectedPayment(item.id)
              }>
              <View
                style={[
                  styles.radioOuter,
                  selectedPayment === item.id &&
                    styles.radioOuterActive,
                ]}>
                {selectedPayment === item.id && (
                  <View
                    style={styles.radioInner}
                  />
                )}
              </View>

              <AppText
                style={{
                  marginLeft: 12,
                }}
                weight={MEDIUM}
                type={FOURTEEN}>
                {item.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <AppText style={styles.payLabel}>
            Total Payable
          </AppText>

          <AppText
            type={EIGHTEEN}
            weight={SEMI_BOLD}>
            ₹ {totalPrice}
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={onPayNow}>
          <AppText
            color={WHITE}
            weight={MEDIUM}>
            Pay Now
          </AppText>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
};

export default Checkout;