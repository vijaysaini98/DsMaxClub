import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { AppText, FOURTEEN, MEDIUM, WHITE } from '@components/AppText'
import { MY_CARD_COUPON_LIST_SCREEN, REQUEST_COUPON_LIST_SCREEN } from '@navigations/routes'
import { Loader, SpinnerSecond } from '@components/Spinner'
import { ms, s, vs } from 'react-native-size-matters/extend'
import { colors } from '@theme/colors'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import Card from '@screens/home/ui/card'
import NavigationService from '@navigations/NavigationService'
import ListEmptyComponent from '@components/ListEmptyComponent'
import { defaultBookletImage } from '@helper/imagesAssets'
import { getMyCardBookletList } from '@actions/myCard/myCardAction'
import Toast from 'react-native-simple-toast';
import { setMyCardCouponList } from '@actions/myCard/myCardSlice'
import FastImage from 'react-native-fast-image'
import TouchableOpacityView from '@components/TouchableOpacityView'

const MyCardList = ({ data, value }) => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state.myCard)

    const [refreshing, setRefreshing] = useState(false)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getMyCardBookletList(value)).finally(() => setRefreshing(false));
    }, [dispatch, value]);

    const renderItem = ({ item, index }: any) => {

        return (
            <View style={[styles.shadowContainer, { overflow: 'hidden', backgroundColor: colors.tabBg }]}>
                <Card item={item} index={index}
                    cardContainerStyle={{ width: "100%" }}
                    imageStyle={styles.imageStyle}
                    imageUrl={item?.booklet ? { uri: item?.baseurl + item?.booklet } : defaultBookletImage}
                    name={`${item?.client_name} (${item?.booklet_uniquecode})`}
                    price={item.price}
                    address={item?.client_address ? item?.client_address : "---"}
                    handleCardOnPress={() => {
                        if (item?.tab_status === 'expired') {
                            Toast.show("Booklet has been Expired", Toast.LONG);
                        }
                        else {
                            NavigationService.navigate(MY_CARD_COUPON_LIST_SCREEN,
                                {
                                    title: item?.client_name,
                                    // booklet_id: item?.uuid, 
                                    user_booklet_uuid: item?.user_booklet_uuid,
                                    tab_status: item?.tab_status,
                                    booklet_uniquecode: item?.booklet_uniquecode
                                })
                        }
                    }}
                    status={item?.tab_status}
                />
                {/* <View style={styles.statusContainer}>
                    <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>{"Pending"}</AppText>
                </View> */}

            </View>

            //                <View
            //   style={[
            //     styles.shadowContainer,
            //     {
            //       overflow: "hidden",
            //       backgroundColor: colors.tabBg,
            //       borderRadius: 12,
            //     },
            //   ]}
            // >
            //   <TouchableOpacityView 
            //   onPress={() => {
            //                         if (item?.tab_status === 'expired') {
            //                             Toast.show("Booklet has been Expired", Toast.LONG);
            //                         }
            //                         else {
            //                             NavigationService.navigate(MY_CARD_COUPON_LIST_SCREEN,
            //                                 {
            //                                     title: item?.client_name,
            //                                     // booklet_id: item?.uuid, 
            //                                     user_booklet_uuid: item?.user_booklet_uuid,
            //                                     tab_status: item?.tab_status,
            //                                     booklet_uniquecode:item?.booklet_uniquecode
            //                                 })
            //                         }
            //                     }}
            //   style={{ flexDirection: "row", alignItems: "flex-start" }}>
            //     {/* Left Image */}
            //     <FastImage
            //       source={
            //         item?.booklet
            //           ? { uri: item?.baseurl + item?.booklet }
            //           : defaultBookletImage
            //       }
            //       style={{
            //         width: s(90),
            //         height: "100%",
            //         borderTopLeftRadius: 12,
            //         borderBottomLeftRadius: 12,
            //       }}
            //       resizeMode="cover"
            //     />

            //     {/* Right Content */}
            //     <View style={{ flex: 1, padding: s(10),gap:5 }}>
            //       {/* Title */}
            //      <AppText
            //   type={FOURTEEN}
            //   weight={MEDIUM}
            //   numberOfLines={2}          // allows max 2 lines
            //   ellipsizeMode="tail"       // trims with "..." if longer
            //   style={{
            //     marginBottom: 4,
            //     flexShrink: 1,           // prevent overflow
            //     flexWrap: "wrap",        // wrap to next line if needed
            //     // maxWidth: "100%",        // stay inside parent
            //   }}
            // >
            //   {item?.client_name ?? "Unknown Name"}
            // </AppText>


            //       {/* Details */}
            //       <AppText>{`Code No: ${item?.booklet_uniquecode}`}</AppText>
            //       <AppText numberOfLines={2} ellipsizeMode="tail">
            //         {`Address: ${item?.client_address || "---"}`}
            //       </AppText>
            //       <AppText>{`Price: ₹${item?.price}`}</AppText>
            //     </View>
            //   </TouchableOpacityView>
            // </View>



        )
    }

    return (
        <View style={styles.mainContainer}>
            {
                (isLoading && !refreshing) ?
                    <Loader /> :
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (<ListEmptyComponent title={"No Card Available"} />)}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.buttonBg]}
                                tintColor={colors.buttonBg}
                            />
                        }

                    />
            }
        </View>
    )
}

export default MyCardList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    containerStyle: {
        gap: 15,
        paddingBottom: 50,
        marginTop: 15,
    },
    rejectText: {
        textAlign: 'center',
        marginTop: 10
    },

    listContainerStyle: {
        gap: ms(26),
        // gap:s(10),
        paddingBottom: vs(150),
        marginTop: vs(22),
        marginHorizontal: 16,
    },
    shadowContainer: {
        borderRadius: ms(15),
        backgroundColor: colors.white,
        // iOS shadow
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        // Android shadow
        elevation: 2,
        // marginBottom: 15,
    },
    imageStyle: {
        width: "100%",
        borderTopLeftRadius: ms(10),
        borderTopRightRadius: ms(10)
    },
    statusContainer: {
        position: 'absolute',
        top: 10, right: 10,
        alignItems: 'center',
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(10),
        paddingHorizontal: s(16),
        borderRadius: ms(12)
    }
})