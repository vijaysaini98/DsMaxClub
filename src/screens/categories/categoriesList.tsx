import { FlatList, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import ToolBar from '@components/ToolBar'
import { defaultBookletImage, searchIcon } from '@helper/imagesAssets'
import Input from '@components/Input'
import Card from '@screens/home/ui/card'
import { getBookletList } from '@actions/home/homeAction'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SpinnerSecond } from '@components/Spinner'
import NavigationService from '@navigations/NavigationService'
import { COMBO_DETAILS_SCREEN, DETAILS_SCREEN } from '@navigations/routes'
import { ms, s, vs } from 'react-native-size-matters/extend'
import ListEmptyComponent from '@components/ListEmptyComponent'
import CategoriesListShimmerLoader from '@components/ShimerLoader/categoriesListShimerLoader'

const CategoriesList = ({ route }:any) => {
    const dispatch = useAppDispatch()
    const { title, id } = route?.params ?? ""
    const { bookletList, isLoading } = useAppSelector((state) => state.home)

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
                    cardContainerStyle={{ width: "100%" }}
                    isCompleteLocation={true}
                    handleCardOnPress={() => { }}
                    imageStyle={styles.imageStyle}
                    imageUrl={item?.booklet ? { uri: bookletList?.baseurl + item?.booklet } : defaultBookletImage}
                    name={item?.name}
                    price={item.price}
                    address={item?.location?.length > 0 ? item?.location[0]?.location : "---"}
                    handleCardOnPress={() => {
                        if (item?.booklet_type == 2) {
                            NavigationService.navigate(DETAILS_SCREEN, { data: item, from: "ComboBooklet" })
                        }
                        else {
                            NavigationService.navigate(DETAILS_SCREEN, { data: item, from: "Booklet" })
                        }
                    }}
                />
            </View>
        )
    }

    return (
        <AppSafeAreaView style={styles.mainContainer}>
            <ToolBar
                mainContainerStyle={{ marginHorizontal: 16 }}
                isLeftIcon title={title?.charAt(0)?.toUpperCase() + title?.slice(1).toLowerCase()} />
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
                    <View style={{ paddingHorizontal: s(16) }}>
                        <CategoriesListShimmerLoader />
                    </View>
                    :
                    <FlatList
                        data={bookletList?.booklets}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainerStyle}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <ListEmptyComponent title={"No Booklet Available"} />
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
        paddingTop: Platform.OS == 'ios' ? vs(40) : 0,

    },
    containerStyle: {
        marginTop: vs(20),
        marginHorizontal: s(16),
    },
    searchContainer: {
        marginBottom: vs(10)

    },
    listContainerStyle: {
        gap: ms(26),
        paddingBottom: vs(150),
        marginTop: vs(22),
        marginHorizontal: s(16),
    },
    shadowContainer: {
        borderRadius: ms(15),
        backgroundColor: colors.white,
        // iOS shadow
        shadowColor: colors.shadowColor,
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
})