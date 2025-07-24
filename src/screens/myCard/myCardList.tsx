import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { cardDummyData } from '@helper/dumyData'
import CommonCard from '@components/CommonCard'
import ViewDetailsBottomSheet from '@screens/home/ui/viewDetailsBottomSheet'
import RedeemSheet from './redeemSheet'

const MyCardList = ({ data }) => {

    const viewDetailSheet = useRef()
    const redeemSheetRef = useRef()

    const renderItem = useMemo(
        () =>
            ({ item }: { item: CardItem }) => (
                <CommonCard
                    key={item.id}
                    data={item}
                    status={"Active"}
                    showRedeemBtn
                    onViewPress={() => viewDetailSheet?.current?.open()}
                    onRedeemPress={() => redeemSheetRef?.current?.open()}
                    heading={item?.heading}
                    description={item?.description}
                //  price={}
                //  actualPrice
                />
            ),
        []
    );
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={cardDummyData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.containerStyle}
                showsVerticalScrollIndicator={false}
            />
            <ViewDetailsBottomSheet ref={viewDetailSheet} />
            <RedeemSheet ref={redeemSheetRef} />
        </View>
    )
}

export default MyCardList

const styles = StyleSheet.create({
    containerStyle: {
        gap: 15,
        paddingBottom: 50,
        marginTop: 15,
    },
})