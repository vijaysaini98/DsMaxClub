import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import CommonCard from '@components/CommonCard';
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet';
import RedeemSheet from './redeemSheet';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import ToolBar from '@components/ToolBar';
import { AppText, FOURTEEN, SEMI_BOLD, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { couponCodeGenrate, getCoupon } from '@actions/myCard/myCardAction';
import ListEmptyComponent from '@components/ListEmptyComponent';
import { s, vs } from 'react-native-size-matters/extend';
import { colors } from '@theme/colors';
import { Loader } from '@components/Spinner';
import QrCodeModal from './qrCodeModal';

const CouponList = ({ data, route }:any) => {
  const dispatch = useAppDispatch();
  const { coupon_id, title, user_booklet_id } = route?.params ?? '';
  const {
    couponList,
    //  isBtnLoading,
    isLoading,
    couponData,
  } = useAppSelector(state => state?.myCard);

  const viewDetailSheet = useRef();
  const redeemSheetRef = useRef();

  const [refreshing, setRefreshing] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCoupon({ coupon_id, user_booklet_id })).finally(() =>
      setRefreshing(false),
    );
  }, [dispatch, coupon_id, user_booklet_id]);

  const handleOnPress = item => {
    let data = {
      uuid: item?.uuid,
      coupon_uuid: item?.coupon_uuid,
      unique_entry: item?.unique_entry,
    };
    setSelectedId(item?.uuid);
    setIsBtnLoading(true);
    dispatch(couponCodeGenrate(data, handleSucess)).finally(() => {
      setIsBtnLoading(true);
      setSelectedId(null);
    });
  };

  const handleSucess = () => {
    setIsQrCodeVisible(true);
    dispatch(getCoupon({ coupon_id, user_booklet_id }));
  };

  const handleQrCloseModal = () => {
    setIsQrCodeVisible(false);
    dispatch(getCoupon({ coupon_id, user_booklet_id }));
  };

  const renderItem = useMemo(
    () =>
      ({ item, index }: { item: CardItem; index: number }) => {
        console.log(item?.coupon_type_id, 'item?.coupon_type_id');

        return (
          <CommonCard
            key={index}
            data={item}
            heading={item?.heading}
            description={item?.short_desc}
            btnTextColor={WHITE}
            buttonTitle={item?.used_status}
            onViewPress={() => handleOnPress(item)}
            viewBtnDisabled={item?.used_status == 'Used'}
            status={item?.coupon_type_id == 1 ? 'Free' : ''}
            statusBg={item?.coupon_type_id == 1 && colors.buttonBg}
            statusTextColor={item?.coupon_type_id == 1 && WHITE}
            viewBtnLoader={item?.uuid == selectedId && isBtnLoading}
            vendorName={item?.vendor_name}
            shortDesc={item?.short_description}
          />
          // <View>
          //     <AppText>hgsd</AppText>
          // </View>
        );
      },
    [],
  );
  return (
    <AppSafeAreaView
      style={[commonStyles.mainContainer, { paddingHorizontal: 16 }]}
    >
      <ToolBar
        textType={FOURTEEN}
        textWeight={SEMI_BOLD}
        isLeftIcon
        title={title}
      />
      {isLoading && !refreshing ? (
        <Loader />
      ) : (
        <FlatList
          data={couponList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.buttonBg]}
              tintColor={colors.buttonBg}
            />
          }
          ListEmptyComponent={() => (
            <ListEmptyComponent title={'No Coupons Available'} />
          )}
        />
      )}
      <ViewDetailsBottomSheet ref={viewDetailSheet} />
      <RedeemSheet ref={redeemSheetRef} />
      {isQrCodeVisible && (
        <QrCodeModal
          visible={isQrCodeVisible}
          onClose={() => handleQrCloseModal()}
          couponData={couponData}
          // onConfirm ={}
        />
      )}
    </AppSafeAreaView>
  );
};

export default CouponList;

const styles = StyleSheet.create({
  containerStyle: {
    gap: s(15),
    paddingBottom: vs(50),
    marginTop: vs(40),
  },
});
