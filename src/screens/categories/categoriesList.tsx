import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import ToolBar from '@components/ToolBar'
import { restro2, searchIcon } from '@helper/imagesAssets'
import Input from '@components/Input'
import Card from '@screens/home/ui/card'
import { width } from '@utils/index'

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
    const { title } = route?.params ?? ""

    const [searchText, setSeachText] = useState("")

    const renderItem = ({ item, index }: any) => {

        return (
            <View style={styles.shadowContainer}>
                <Card item={item} index={index}
                    handleCardOnPress={() => { }}
                    imageStyle={styles.imageStyle}
                // cardContainerStyle={{backgroundCo}}
                />
            </View>
        )
    }

    return (
        <AppSafeAreaView style={styles.mainContainer}>
            <ToolBar isLeftIcon title={title} />
            <View style={styles.containerStyle}>
                <Input
                    leftIcon={searchIcon}
                    placeholder='Search...'
                    placeholderTextColor={colors.placeholder}
                    value={searchText}
                    onChangeText={(text) => setSeachText(text)}
                    inputContainerStyle={styles.searchContainer}
                />
                <FlatList
                    data={restaurantList}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainerStyle}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
        marginTop: 40
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