import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import ToolBar from '@components/ToolBar'
import { restro2, searchIcon } from '@helper/imagesAssets'
import Input from '@components/Input'
import Card from '@screens/home/ui/card'
import { width } from '@utils/index'
import { getBookletList } from '@actions/home/homeAction'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SpinnerSecond } from '@components/Spinner'
import { AppText } from '@components/AppText'
import NavigationService from '@navigations/NavigationService'
import { DETAILS_SCREEN } from '@navigations/routes'

const restaurantList = [
    {
        id: 1,
        name: 'Laxmi Restaurant',
        location: 'Jaipur Rajasthan',
        price: 'Rs. 11,700',
        rating: '4.2',
        tag: 'Guest Favourite',
        reviews: '552 Ratings',
        image: restro2,
    },
    {
        id: 2,
        name: 'Laxmi Restaurant',
        location: 'Jaipur Rajasthan',
        price: 'Rs. 11,700',
        rating: '4.2',
        tag: 'Guest Favourite',
        reviews: '552 Ratings',
        image: restro2,
    },
    {
        id: 3,
        name: 'Laxmi Restaurant',
        location: 'Jaipur Rajasthan',
        price: 'Rs. 11,700',
        rating: '4.2',
        tag: 'Guest Favourite',
        reviews: '552 Ratings',
        image: restro2,
    },
    {
        id: 4,
        name: 'Laxmi Restaurant',
        location: 'Jaipur Rajasthan',
        price: 'Rs. 11,700',
        rating: '4.2',
        tag: 'Guest Favourite',
        reviews: '552 Ratings',
        image: restro2,
    },
];

const CategoriesList = ({ route }) => {
    const dispatch = useAppDispatch()
    const { title, id } = route?.params ?? ""
    const { bookletList, isLoading } = useAppSelector((state) => state.home)
    console.log(route?.params, "route?.params ");
    console.log("bookletList", bookletList);

    useEffect(() => {
        dispatch(getBookletList({ id }))
    }, [id, dispatch])


    const debounceRef = useRef<NodeJS.Timeout | null>(null)

    const [searchText, setSeachText] = useState("")

    const onChangeHandler = (value: string) => {
        setSeachText(value)
        clearTimeout(debounceRef.current);
        if (value) {
            debounceRef.current = setTimeout(() => {
                dispatch(getBookletList({ id, search: value }))
            }, 500);
        } else {
            dispatch(getBookletList({ id }))
        }
    };

    const renderItem = ({ item, index }: any) => {

        return (
            <View style={styles.shadowContainer}>
                <Card item={item} index={index}
                    handleCardOnPress={() => { }}
                    imageStyle={styles.imageStyle}
                    imageUrl={bookletList?.baseurl + item?.booklet}
                    name={item?.name}
                    price={item.price}
                    address={item?.city_name ? item?.city_name : "---"}
                    handleCardOnPress={() => {
                        NavigationService.navigate(DETAILS_SCREEN, { data: item })
                    }}
                />
            </View>
        )
    }

    return (
        <AppSafeAreaView style={styles.mainContainer}>
            <ToolBar isLeftIcon title={title?.charAt(0)?.toUpperCase() + title?.slice(1).toLowerCase()} />
            <View style={styles.containerStyle}>
                <Input
                    leftIcon={searchIcon}
                    placeholder='Search...'
                    placeholderTextColor={colors.placeholder}
                    value={searchText}
                    // onChangeText={(text) => setSeachText(text)}
                    onChangeText={(text) => onChangeHandler(text)}
                    inputContainerStyle={styles.searchContainer}
                />
            </View>
            {
                isLoading ?
                    <SpinnerSecond /> :
                    <FlatList
                        data={bookletList?.booklets}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                                <AppText>{"No Booklet Availble"}</AppText>
                            </View>
                        )}
                    />
            }


        </AppSafeAreaView>
    )
}

export default CategoriesList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    containerStyle: {
        marginTop: 20
    },
    searchContainer: {
        marginBottom: 10
    },
    listContainerStyle: {
        gap: 26,
        paddingBottom: 150,
        marginTop: 22
    },
    shadowContainer: {
        borderRadius: 15,
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
})