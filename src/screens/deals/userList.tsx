import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SectionList, StyleSheet, View, Image, RefreshControl, FlatList } from 'react-native';
import { colors } from '@theme/colors';
import ToolBar from '@components/ToolBar';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getVendorUserList } from '@actions/deals/dealAction';
import { Loader } from '@components/Spinner';
import { AppText, EIGHTEEN, FOURTEEN, NORMAL, SEMI_BOLD, TWELVE, WHITE, MEDIUM, PLACEHOLDER } from '@components/AppText';
import { emailIcon, locationIcon, phoneIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { userListData } from '@helper/dumyData';
import ListEmptyComponent from '@components/ListEmptyComponent';
import moment from 'moment';
import NavigationService from '@navigations/NavigationService';
import { VENDOR_COUPON_LIST } from '@navigations/routes';

const UserList = ({ route }) => {
    const { title, booklet_id } = route?.params ?? {};
    const dispatch = useAppDispatch();
    const { vendorUserList, isLoading } = useAppSelector((state) => state?.deal);

    const [refreshing, setRefreshing] = useState(false);
    const [viewData, setViewData] = useState({});
    const viewDetailsSheet = useRef<any>(null);

    useEffect(() => {
        dispatch(getVendorUserList({ booklet_id }));
    }, [booklet_id, dispatch]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getVendorUserList({ booklet_id })).finally(() => setRefreshing(false));
    }, [dispatch, booklet_id]);

    const handleViewOnPress = useCallback((data) => {
        setViewData(data);
        setTimeout(() => {
            viewDetailsSheet.current?.open();
        }, 200);
    }, []);

    const transformedUserList = useMemo(
        () =>
            (userListData || []).map(section => ({
                title: section.date,
                data: section.users ?? [],
            })),
        [userListData]
    );

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <TouchableOpacityView style={styles.userCardStyle} onPress={() => NavigationService.navigate(VENDOR_COUPON_LIST, { title: item?.name, user_id: item?.useruuid })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <AppText type={EIGHTEEN} weight={MEDIUM}>{item?.username}</AppText>
                        <AppText type={TWELVE} style={{ color: colors.borderColor }}>
                            {
                                moment(item?.requestdate, "DD-MM-YYYY").format("D MMM YYYY")
                            }
                        </AppText>
                    </View>
                    {item?.usermobile && (<View style={styles.userCardRowContainer}>
                        <Image source={phoneIcon} style={styles.iconStyle} resizeMode='contain' />
                        <AppText type={FOURTEEN} weight={NORMAL}>{item?.usermobile}</AppText>
                    </View>)}
                    {item?.useremail && (<View style={styles.userCardRowContainer}>
                        <Image source={emailIcon} style={styles.iconStyle} resizeMode='contain' />
                        <AppText type={FOURTEEN} weight={NORMAL}>{item?.useremail}</AppText>
                    </View>)}
                </TouchableOpacityView>
            )
        },
        [handleViewOnPress]
    );

    return (
        <AppSafeAreaView style={commonStyles.mainContainer}>
            <ToolBar
                mainContainerStyle={styles.toolBarContainer}
                isLeftIcon
                title='User List'
            />
            {isLoading && !refreshing ? (
                <Loader />
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
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: vs(40),
    },
    toolBarContainer: {
        marginHorizontal: s(16),
    },
    listContainerStyle: {
        paddingVertical: vs(20),
        gap: s(10),
    },
    listTitleContainer: {
        backgroundColor: colors.buttonBg,
        paddingHorizontal: s(12),
        paddingVertical: vs(4),
        alignSelf: 'flex-start',
        borderRadius: ms(20),
        marginTop: vs(10),
        marginBottom: vs(5),
        marginLeft: s(16),
    },
    userCardStyle: {
        marginHorizontal: s(16),
        padding: s(16),
        // borderWidth: 1,
        borderColor: colors.second,
        borderRadius: ms(10),
        gap: 9,

        borderWidth: 3,
        borderStyle: "dotted"
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
});
