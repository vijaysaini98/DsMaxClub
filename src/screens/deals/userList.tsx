import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import { colors } from '@theme/colors';
import ToolBar from '@components/ToolBar';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getVendorUserList } from '@actions/deals/dealAction';
import { AppText, EIGHTEEN, FOURTEEN, NORMAL, TWELVE, MEDIUM } from '@components/AppText';
import { emailIcon, phoneIcon, searchIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import { ms, s, vs } from 'react-native-size-matters/extend';
import ListEmptyComponent from '@components/ListEmptyComponent';
import moment from 'moment';
import NavigationService from '@navigations/NavigationService';
import { VENDOR_COUPON_LIST } from '@navigations/routes';
import Input from '@components/Input';
import UserListShimmer from '@components/ShimerLoader/UserShimerLoader';

const UserList = ({ route }) => {
    const { title, booklet_id } = route?.params ?? {};
    const dispatch = useAppDispatch();
    const { vendorUserList, isLoading } = useAppSelector((state) => state?.deal);

    const [refreshing, setRefreshing] = useState(false);
    const [viewData, setViewData] = useState({});
    const [searchText, setSearchText] = useState("");
    const viewDetailsSheet = useRef<any>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null)


    useEffect(() => {
        dispatch(getVendorUserList({ booklet_id }));
    }, [booklet_id, dispatch]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getVendorUserList({ booklet_id })).finally(() => setRefreshing(false));
    }, [dispatch, booklet_id]);

    const onChangeHandler = (value: string) => {
        setSearchText(value)
        clearTimeout(debounceRef.current);
        if (value) {
            debounceRef.current = setTimeout(() => {
                dispatch(getVendorUserList({ booklet_id, search: value }))
            }, 500);
        } else {
            dispatch(getVendorUserList({ booklet_id }))
        }
    };

    const handleUserCardClick = useCallback((item) => {
        NavigationService.navigate(VENDOR_COUPON_LIST,
            {
                title: item?.username ? item?.username : item?.usermobile,
                unique_code: item?.unique_code,
                user_id: item?.useruuid,
                booklet_id: item?.booklet_uuid,
                user_booklet_uuid: item?.uuid
            }
        );
    }, []);

    const renderItem = useCallback(
        ({ item }) => {

            return (
                <TouchableOpacityView style={styles.userCardStyle} onPress={() => handleUserCardClick(item)}>
                    <View style={styles.userCardHeader}>
                        <AppText
                            type={EIGHTEEN}
                            weight={MEDIUM}
                            style={styles.userNameText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {`${item?.username ? item?.username : item?.usermobile} (${item?.unique_code})`}
                        </AppText>
                        <AppText
                            type={TWELVE}
                            style={styles.requestDateText}
                            numberOfLines={1}
                        >
                            {item?.requestdate
                                ? moment(item?.requestdate, "YYYY-MM-DD hh:mm").format("D MMM YYYY hh:mm")
                                : ""}
                        </AppText>
                    </View>
                    {item?.usermobile && (
                        <View style={styles.userCardRowContainer}>
                            <Image source={phoneIcon} style={styles.iconStyle} resizeMode='contain' />
                            <AppText type={FOURTEEN} weight={NORMAL}>{item?.usermobile}</AppText>
                        </View>
                    )}
                    {item?.useremail && (
                        <View style={styles.userCardRowContainer}>
                            <Image source={emailIcon} style={styles.iconStyle} resizeMode='contain' />
                            <AppText type={FOURTEEN} weight={NORMAL}>{item?.useremail}</AppText>
                        </View>
                    )}
                </TouchableOpacityView>
            )
        },
        [handleUserCardClick]
    );

    return (
        <AppSafeAreaView style={commonStyles.mainContainer}>
            <ToolBar
                mainContainerStyle={styles.toolBarContainer}
                isLeftIcon
                title='User'
            />
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
            {isLoading && !refreshing ? (
                // <Loader />
                <UserListShimmer/>
            ) : (
                <FlatList
                    data={vendorUserList}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.buttonBg]}
                            tintColor={colors.buttonBg}
                        />
                    }
                    contentContainerStyle={styles.listContainerStyle}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <ListEmptyComponent title={"No User"} />}
                />
            )}
            <ViewDetailsBottomSheet
                data={viewData}
                ref={viewDetailsSheet}
            />
        </AppSafeAreaView>
    );
};

export default UserList;

const styles = StyleSheet.create({
    toolBarContainer: {
        marginHorizontal: s(16),
    },
    listContainerStyle: {
        paddingVertical: vs(20),
        gap: s(10),
    },
    userCardStyle: {
        marginHorizontal: s(16),
        paddingVertical: s(16),
        paddingLeft: s(16),
        paddingRight: s(5),
        borderColor: colors.second,
        borderRadius: ms(10),
        gap: 9,
        overflow: 'hidden',
        borderWidth: 3,
        borderStyle: "dotted",
        backgroundColor: colors.white,
    },
    userCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        width: '100%',
    },
    userNameText: {
        flex: 1,
        marginRight: 8,
        flexShrink: 1,
    },
    requestDateText: {
        color: colors.borderColor,
        flexShrink: 0,
    },
    userCardRowContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    iconStyle: {
        height: vs(15),
        width: s(15),
    },
    containerStyle: {
        marginTop: vs(10),
        marginHorizontal: s(16),
    },
    searchContainer: {
        marginBottom: vs(10)

    },
});