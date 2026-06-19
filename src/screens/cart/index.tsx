import React, { useEffect, useMemo, useCallback, memo, useState } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { commonStyles } from '@theme/commonStyles';
import {
  AppText,
  BOLD,
  BUTTON_BG,
  ERROR_TEXT,
  FOURTEEN,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWELVE,
  TWENTY,
  WHITE,
} from '@components/AppText';

import styles from './styles';

import { IMGE_URL } from '@services/config';

import TouchableOpacityView from '@components/TouchableOpacityView';

import {
  deleteIcon,
  defaultBookletImage,
  checkIcon,
  unCheckIcon,
  EmptyCartImage,
} from '@helper/imagesAssets';
import * as routes from '@navigations/routes';

import {
  deleteCartItem,
  getCartList,
  initiatePayment,
  updateCartQuantity,
  getPaymentStatus,
} from '@actions/cart/cartActions';

import Input from '@components/Input';
import { ms, s } from 'react-native-size-matters';
import { colors } from '@theme/colors';
import ToolBar from '@components/ToolBar';
import PhonePePaymentSDK from 'react-native-phonepe-pg';

import DeleteConfirmationModal from '@components/DeleteConfirmationModal';
import DeviceInfo from 'react-native-device-info';
import NavigationService from '@navigations/NavigationService';
import MyCard from '@screens/myCard';
import Toast from "react-native-simple-toast";
import { SpinnerSecond } from '@components/Spinner';


const CartImage = memo(({ image, style }: any) => {
  const [failed, setFailed] = useState(false);

  const imageUrl = image ? `${IMGE_URL}${image}` : null;

  return (
    <Image
      source={!imageUrl || failed ? defaultBookletImage : { uri: imageUrl }}
      style={style}
      resizeMode="stretch"
      onError={() => setFailed(true)}
    />
  );
});

const CartItem = memo(
  ({ item, onIncrement, onDecrement, onDelete, isIncrementDisabled }: any) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.rowContainer}>
          <CartImage image={item?.image} style={styles.image} />

          <View style={styles.rightContainer}>
            <View style={styles.topRow}>
              <AppText style={styles.name} numberOfLines={2}>
                {item?.booklet_name}
              </AppText>

              <TouchableOpacityView
                style={styles.deleteContainer}
                onPress={onDelete}
              >
                <FastImage
                  source={deleteIcon}
                  style={styles.deleteIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacityView>
            </View>

            <View style={styles.bottomRow}>
              <AppText style={styles.price} type={FOURTEEN} weight={BOLD}>
                Rs. {item?.price}
              </AppText>

              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyBtn} onPress={onDecrement}>
                  <AppText type={TWENTY}>-</AppText>
                </TouchableOpacity>

                <View style={styles.qtyTextContainer}>
                  <AppText style={styles.qtyText} type={FOURTEEN}>
                    {item?.quantity}
                  </AppText>
                </View>

                <TouchableOpacity
                  style={[
                    styles.qtyBtn,
                    isIncrementDisabled && { opacity: 0.2 },
                  ]}
                  onPress={onIncrement}
                  disabled={isIncrementDisabled}
                >
                  <AppText type={TWENTY}>+</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  },
);


const Cart = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    bookletQty: '1',
    executiveCode: '',
  });
  const [acceptContent, setAcceptContent] = useState(false);
  const { cartList, isRefresh } = useAppSelector(state => state.cart);

  const [qtyLoading, setQtyLoading] = useState(false);

  const { userData } = useAppSelector(state => state?.auth);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState({
  visible: false,
  type: '', // success | failed
  message: '',
});
const [paymentLoading, setPaymentLoading] = useState(false);

const paymentApiCall = (merchantTransactionId: string) => {
  dispatch(
    getPaymentStatus(merchantTransactionId, (statusResponse: any) => {
      console.log('PAYMENT STATUS RESPONSE ===>', statusResponse);

      // Loader band karo jab response aa jaye
      setPaymentLoading(false);

      if (statusResponse?.status === 'success') {
        setPaymentStatusModal({
          visible: true,
          type: 'success',
          message: 'Payment completed successfully',
        });
      } else {
        setPaymentStatusModal({
          visible: true,
          type: 'failed',
          message: 'Something went wrong',
        });
      }
    }),
  );
};

const initPhonePeSDK = async (paymentResponse: any) => {
  const { redirect_url, merchant_transaction_id } = paymentResponse;

  const urlParams = new URL(redirect_url);
  const token = urlParams.searchParams.get('token');

  const tokenPayload = JSON.parse(atob(token!.split('.')[1]));
  const orderId = tokenPayload.merchantOrderId;
  const merchantId = tokenPayload.merchantId;

  const flowId = merchant_transaction_id.replace(/[^a-zA-Z0-9]/g, '');

  try {
    const result = await PhonePePaymentSDK.init(
      'SANDBOX',
      merchantId,
      flowId,
      true,
    );

    console.log('SDK INIT ===>', result);

    const request = JSON.stringify({
      orderId,
      merchantId,
      token,
      paymentMode: {
        type: 'PAY_PAGE',
      },
    });

    await PhonePePaymentSDK.startTransaction(request, null);

    // Payment status check start
    setPaymentLoading(true);

    paymentApiCall(merchant_transaction_id);
  } catch (error) {
    console.log('ERROR ===>', error);

    
    setPaymentLoading(true);

    paymentApiCall(merchant_transaction_id);
  }
};

  const onCheckoutPress = async () => {
   
    const deviceInfo = {
      unique_id: await DeviceInfo.getUniqueId(),
      brand: DeviceInfo.getBrand(),
      model: DeviceInfo.getModel(),
      system_name: DeviceInfo.getSystemName(),
      system_version: DeviceInfo.getSystemVersion(),
      app_version: DeviceInfo.getVersion(),
    };

    const data = {
      gateway: 'phonepe',
      phone: userData?.mobile,
      executive_code: state?.executiveCode || '',
      device_info: JSON.stringify(deviceInfo),
    };
    console.log('PAYMENT DATA ===>', JSON.stringify(data, null, 2));

    dispatch(
      initiatePayment(data, (response: any) => {
        initPhonePeSDK(response);
      }),
    );
  };
  useEffect(() => {
    dispatch(getCartList());
  }, []);
  const safeCartList = cartList?.items || [];

  const onRefresh = useCallback(() => {
    dispatch(getCartList());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <CartItem
          item={item}
          onDelete={() => {
            setSelectedCartId(item?.cart_id);
            setDeleteModalVisible(true);
          }}
          isIncrementDisabled={
            Number(item?.quantity) >= Number(cartList?.max_quantity || 5)
          }
          onIncrement={() => {
            setQtyLoading(true);

            dispatch(
              updateCartQuantity(
                {
                  cart_id: item?.cart_id,
                  quantity: Number(item?.quantity) + 1,
                  action: 'increment',
                },
                () => {
                  setQtyLoading(false);
                },
              ),
            );
          }}
          onDecrement={() => {
            if (Number(item?.quantity) > 1) {
              setQtyLoading(true);

              dispatch(
                updateCartQuantity(
                  {
                    cart_id: item?.cart_id,
                    quantity: Number(item?.quantity) - 1,
                    action: 'decrement',
                  },
                  () => {
                    setQtyLoading(false);
                  },
                ),
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ToolBar
          isLeftIcon
          title="My Cart"
          mainContainerStyle={{ marginHorizontal: 16, paddingVertical: 20 }}
        />

        {safeCartList?.length === 0 ? (
          <View style={styles.emptyContainer}>
            {/* <AppText>Cart is Empty</AppText> */}
            <Image source={EmptyCartImage} style={{width:'100%',height:'100%'}}/>
          </View>
        ) : (
          <>
            <FlatList
              data={safeCartList}
              renderItem={renderItem}
              keyExtractor={item => item?.cart_id?.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 320,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefresh}
                  onRefresh={onRefresh}
                  colors={[colors.buttonBg]}
                  tintColor={colors.buttonBg}
                />
              }
            />

            <View style={styles.summaryContainer}>
              <Input
                placeholder="Enter Executive Code (Optional)"
                value={state?.executiveCode}
                onChangeText={(text: string) =>
                  setState({
                    ...state,
                    executiveCode: text.trim(),
                  })
                }
                inputContainerStyle={{
                  borderRadius: 10,
                }}
                inputStyle={{
                  fontSize: ms(12),
                }}
              />

              <View style={styles.acceptTermsConditionContainer}>
                <TouchableOpacityView
                  onPress={() => setAcceptContent(!acceptContent)}
                  style={styles.acceptTermsConditionBtn}
                >
                  {acceptContent ? (
                    <Image
                      source={checkIcon}
                      style={{ height: s(24), width: s(24) }}
                      resizeMode="contain"
                      tintColor={colors.buttonBg}
                    />
                  ) : (
                    <Image
                      source={unCheckIcon}
                      style={{ height: s(20), width: s(20) }}
                      resizeMode="contain"
                      tintColor={colors.buttonBg}
                    />
                  )}

                  <AppText
                    type={FOURTEEN}
                    weight={SEMI_BOLD}
                    style={{ marginLeft: 10 }}
                  >
                    Accept Terms & Conditions
                    <AppText
                      type={TWELVE}
                      color={ERROR_TEXT}
                      weight={SEMI_BOLD}
                    >
                      *
                    </AppText>
                  </AppText>
                </TouchableOpacityView>
              </View>

              <View style={styles.summaryRow}>
                <AppText type={FOURTEEN}>Subtotal :</AppText>
                <AppText type={FOURTEEN} weight={SEMI_BOLD}>
                  Rs. {cartList?.subtotal}
                </AppText>
              </View>

              <View style={styles.summaryRow}>
                <AppText type={FOURTEEN}>Total Qty :</AppText>
                <AppText type={FOURTEEN} weight={SEMI_BOLD}>
                  {cartList?.total_qty}
                </AppText>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <AppText type={SIXTEEN} weight={BOLD} color={BUTTON_BG}>
                  Grand Total :
                </AppText>

                <AppText type={SIXTEEN} weight={BOLD} color={BUTTON_BG}>
                  Rs. {cartList?.total}
                </AppText>
              </View>
            </View>
          </>
        )}
      </KeyboardAvoidingView>

      {safeCartList?.length > 0 && (
        
        <TouchableOpacity
  style={styles.checkoutBtnFull}
  onPress={() => {
    if (!acceptContent) {
      Toast.show('Please accept Terms & Conditions');
      return;
    }

    setPaymentModalVisible(true);
  }}
>
  <AppText color={WHITE} weight={BOLD} type={SIXTEEN}>
    PAY NOW
  </AppText>
</TouchableOpacity>
      )}
  <DeleteConfirmationModal
  visible={deleteModalVisible}
  title="Delete Item"
  message="Are you sure you want to delete this item from cart?"
  confirmText="Delete"
  cancelText="Cancel"
  onCancel={() => {
    setDeleteModalVisible(false);
    setSelectedCartId(null);
  }}
  onConfirm={() => {
    setQtyLoading(true);

    dispatch(
      deleteCartItem(
        {
          cart_id: selectedCartId,
        },
        () => {
          setQtyLoading(false);
        },
      ),
    );

    setDeleteModalVisible(false);
    setSelectedCartId(null);
  }}
/>
      {(qtyLoading || paymentLoading) && <SpinnerSecond />}
      <DeleteConfirmationModal
  visible={paymentModalVisible}
  title="Confirm Payment"
  message="Are you sure you want to proceed with payment?"
  confirmText="Proceed"
  cancelText="Cancel"
  onCancel={() => setPaymentModalVisible(false)}
  onConfirm={() => {
    setPaymentModalVisible(false);
    onCheckoutPress();
  }}
/>
<Modal
  visible={paymentStatusModal.visible}
  transparent
  animationType="fade"
>
  <View style={styles.modalOverlay}>
    <View style={styles.paymentModal}>
      
      <AppText
        type={TWENTY}
        weight={BOLD}
        style={{ marginBottom: 15 }}
      >
        {paymentStatusModal.type === 'success'
          ? '✅ Payment Successful'
          : '❌ Payment Failed'}
      </AppText>

      <AppText
        type={FOURTEEN}
        style={{
          textAlign: 'center',
          marginBottom: 25,
        }}
      >
        {paymentStatusModal.message}
      </AppText>

      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => {
          setPaymentStatusModal({
            visible: false,
            type: '',
            message: '',
          });

          if (paymentStatusModal.type === 'success') {
            dispatch(getCartList());

           NavigationService.navigate(routes.MY_CARD_SCREEN);
          }
        }}
      >
        <AppText color={WHITE} weight={BOLD}>
          OK
        </AppText>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
    </AppSafeAreaView>
  );
};

export default Cart;
