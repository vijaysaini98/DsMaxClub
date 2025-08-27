import React, { useMemo, useCallback, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import CommonCard from '@components/CommonCard';
import { colors } from '@theme/colors';
import { shareToAny } from '@utils/index';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { Loader } from '@components/Spinner';
import { AppText, WHITE } from '@components/AppText';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import { getBookletDetail, getBookletList } from '@actions/home/homeAction';
import { ms, s, vs } from 'react-native-size-matters/extend';
import ListEmptyComponent from '@components/ListEmptyComponent';

interface CardItem {
    id: string | number;
    // Add other properties as needed
}

const All: React.FC = ({ id }) => {
    const dispatch = useAppDispatch();
    const { bookletDetailAllDeals, isLoading } = useAppSelector((state) => state?.home);

    const [couponDetail, setCouponDetail] = useState<any>();
    const [refreshing, setRefreshing] = useState(false);
    const viewDetailSheet = useRef<any>(null);

    const onViewPress = useCallback((item: CardItem) => {
        setCouponDetail(item);
        setTimeout(() => {
            viewDetailSheet?.current?.open();
        }, 200);
    }, []);

    const handleShareOnPress = useCallback((item: CardItem) => {
        shareToAny('hello');
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let data = {
            booklet_id: id,
            tabname: "All Deals"
        }
        dispatch(getBookletDetail(data)).finally(() => setRefreshing(false));
    }, [dispatch]);

    const renderItem = useMemo(
        () =>
            ({ item }: { item: CardItem }) => (
                <CommonCard
                    data={item}
                    heading={item?.heading}
                    description={item?.short_desc}
                    // rightIcon
                    onViewPress={() => onViewPress(item)}
                    // onRedeemPress={() => console.log('Redeem Pressed:', item.id)}
                    btnStyle={styles.viewBtnStyle}
                    // handleRightIcon={handleShareOnPress}
                    status={item?.coupon_type_id == 1 ? 'Free' : ""}
                    statusBg={item?.coupon_type_id == 1 && colors.lightGreen}
                    statusTextColor={item?.coupon_type_id == 1 && WHITE}
                />
            ),
        [onViewPress, handleShareOnPress]
    );

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <Loader />
            ) : (
                <FlatList
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
                        // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        //     <AppText>{"No Coupons Available"}</AppText>
                        // </View>
                        <ListEmptyComponent title={"No Coupons Available"}/>
                    )}
                />
            )}
            <ViewDetailsBottomSheet
                data={couponDetail}
                ref={viewDetailSheet}
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