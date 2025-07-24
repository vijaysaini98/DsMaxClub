import React, { useMemo, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { cardDummyData } from '@helper/dumyData';
import CommonCard from '@components/CommonCard';
import { colors } from '@theme/colors';
import { shareToAny } from '@utils/index';
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet';
import { useAppSelector } from '@redux/hooks';
import { Loader } from '@components/Spinner';
import { AppText } from '@components/AppText';

interface CardItem {
    id: string | number;
    // Add other properties as needed
}

const All: React.FC = () => {
    const { bookletDetailAllDeals, isLoading } = useAppSelector((state) => state?.home)

    const [couponDetail, setCouponDetail] = useState();
    const viewDetailSheet = useRef<null>(null)

    const onViewPress = useCallback((item) => {
        setCouponDetail(item)
        setTimeout(() => {
            viewDetailSheet?.current?.open()
        }, 200)
    }, []);
    const handleShareOnPress = useCallback((item: any) => {
        shareToAny('hello');
    }, []);

    const renderItem = useMemo(
        () =>
            ({ item }: { item: CardItem }) => (
                <CommonCard
                    data={item}
                    heading={item?.heading}
                    description={item?.short_desc}
                    rightIcon
                    onViewPress={() => onViewPress(itemm)}
                    onRedeemPress={() => console.log('Redeem Pressed:', item.id)}
                    btnStyle={styles.viewBtnStyle}
                    handleRightIcon={handleShareOnPress}
                />
            ),
        [onViewPress, handleShareOnPress]
    );

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? (
                <Loader />
            ) :
                (
                    <FlatList
                        data={bookletDetailAllDeals?.coupons}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.containerStyle}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <View style={{
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <AppText>{"No Coupons Available"}</AppText>
                            </View>
                        )}
                    />
                )
            }
            <ViewDetailsBottomSheet
                data={couponDetail}
                ref={viewDetailSheet} />
        </View>
    );
};

export default All;

const styles = StyleSheet.create({
    containerStyle: {
        gap: 15,
        paddingBottom: 50,
        marginTop: 15,
    },
    viewBtnStyle: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.placeholder2,
        backgroundColor: colors.white,
    },
});