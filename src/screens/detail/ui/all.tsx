import React, { useMemo, useCallback, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import CommonCard from '@components/CommonCard';
import { colors } from '@theme/colors';
import { shareToAny } from '@utils/index';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { Loader } from '@components/Spinner';
import { AppText, WHITE } from '@components/AppText';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import {
  getBookletDetail,
  getComboBookletDetail,
} from '@actions/home/homeAction';
import { ms, s, vs } from 'react-native-size-matters/extend';
import ListEmptyComponent from '@components/ListEmptyComponent';
import CouponsShimerLoader from '@components/ShimerLoader/CouponsShimerLoader';
import VendorPhoneDialerModal from './vendorContactModal';

interface CardItem {
  id: string | number;
  // Add other properties as needed
}

const All: React.FC = ({ id, from, scrollY, handleViewPress }:any) => {
  const dispatch = useAppDispatch();
  const { bookletDetailAllDeals, isLoading } = useAppSelector(
    state => state?.home,
  );

  console.log(bookletDetailAllDeals,'bookletDetailAllDeals in all==>');
  

    const [couponDetail, setCouponDetail] = useState<any>();
    const [refreshing, setRefreshing] = useState(false);
    const viewDetailSheet = useRef<any>(null);
    const executiveSnapPoints = useMemo(() => ["50%", "80%"], []);
      const [isPhoneDialerModalVisible, setIsPhoneDialerModalVisible] = React.useState(false);
    const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const onViewPress = useCallback((item: CardItem) => {
    // setCouponDetail(item);
    // setTimeout(() => {
    //     // viewDetailSheet?.current?.open();
    //     viewDetailSheet?.current?.expand()
    // }, 200);
    handleViewPress(item);
  }, []);

  const handleShareOnPress = useCallback((item: CardItem) => {
    shareToAny('hello');
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    let data = {
      booklet_id: id,
      tabname: 'All Deals',
    };
    if (from == 'ComboBooklet') {
      dispatch(getComboBookletDetail(data)).finally(() => setRefreshing(false));
    } else {
      dispatch(getBookletDetail(data)).finally(() => setRefreshing(false));
    }
  }, [dispatch]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: CardItem }) => {
        console.log(item, 'card items');

        return (
          <CommonCard
            couponCount={item?.no_of_coupons}
            hideViewButton={true}
            data={item}
            heading={item?.heading}
            // description={item?.short_desc}
            htmlContent={item?.description}
            onViewPress={() => onViewPress(item)}
            btnStyle={styles.viewBtnStyle}
            status={item?.coupon_type_id == 1 ? 'Free' : ""}
            statusBg={item?.coupon_type_id == 1 && colors.buttonBg}
            statusTextColor={item?.coupon_type_id == 1 && WHITE}
            location={from == "ComboBooklet" ? item?.locations : null}
            // vendorName={item?.vendor?.name}
            // shortDesc={item?.vendor?.short_desc}
            completeShortDesc={item?.short_desc}
            onContactPress={() => {
              setSelectedVendor(item);
              setIsPhoneDialerModalVisible(true);
            }}
          />
        //   <View>
        //     <AppText>sghg</AppText>
        //   </View>
        );
      },
    [onViewPress]
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        // <Loader />
        <CouponsShimerLoader />
      ) : (
        <Animated.FlatList
          data={bookletDetailAllDeals?.coupons}
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
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        />
      )}
      {/* <ViewDetailsBottomSheet
                data={couponDetail}
                ref={viewDetailSheet}
            /> */}
      <VendorPhoneDialerModal
        visible={isPhoneDialerModalVisible}
        vendor={selectedVendor}
        onClose={() => setIsPhoneDialerModalVisible(false)}
      />
    </View>
  );
};

export default All;


const styles = StyleSheet.create({
  containerStyle: {
    gap: s(15),
    paddingBottom: vs(100),
    marginTop: vs(15),
  },
  viewBtnStyle: {
    borderWidth: 1,
    borderRadius: ms(100),
    borderColor: colors.placeholder2,
    backgroundColor: colors.white,
  },
});
