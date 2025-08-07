import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '@theme/colors';
import Header from '@components/Header';
import Card from '@screens/home/ui/card';
import CommonCard from '@components/CommonCard';
import { cardDummyData } from '@helper/dumyData';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import ViewDetailsBottomSheet from './viewDetailsBottomSheet';
import ToolBar from '@components/ToolBar';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getDealCouponList } from '@actions/deals/dealAction';
import { Loader } from '@components/Spinner';
import { WHITE } from '@components/AppText';
import NavigationService from '@navigations/NavigationService';
import { s, vs } from 'react-native-size-matters/extend';

const VerndorCouponList = ({ route }) => {
    const { title, user_id } = route?.params ?? ""
    const dispatch = useAppDispatch()
    const { dealCouponList, isLoading } = useAppSelector((state) => state?.deal)

    const [refreshing, setRefreshing] = useState(false);
    const [viewData, setViewData] = useState({})
    const ViewDetailsSheet = useRef();
    
    const onViewPress = () => {
        ViewDetailsSheet.current.open();
    };

    // useEffect(()=>{
    // dispatch(getDealCouponList())
    // },[])

    useEffect(() => {
        dispatch(getDealCouponList({ user_id }))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getDealCouponList({ user_id })).finally(() => setRefreshing(false));
    }, [dispatch]);

    const handleViewOnPress = (data) => {
        setViewData(data)
        setTimeout(() => {
            ViewDetailsSheet.current.open();
        }, 200)
    }

    const renderItem = ({ item }) => {
        return (
            <CommonCard
                key={item.id}
                data={item}
                onViewPress={() => handleViewOnPress(item)}
                heading={item?.heading}
                htmlContent={item?.description}
                btnTextColor={WHITE}
                couponCount={item?.no_of_coupons}

            />
        );
    };
    return (
        <AppSafeAreaView style={commonStyles.mainContainer}>
            <ToolBar
                mainContainerStyle={styles.toolBarContainer}
                isLeftIcon 
                // title={title?.charAt(0)?.toUpperCase() + title?.slice(1).toLowerCase()} 
                title='Coupons'
                />
            {isLoading && !refreshing ? <Loader /> :

                <FlatList
                    data={dealCouponList}
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
                />}



            <ViewDetailsBottomSheet
                data={viewData}
                ref={ViewDetailsSheet} />
        </AppSafeAreaView>
    );
};

export default VerndorCouponList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: vs(40),
    },
    toolBarContainer: {
        marginHorizontal: s(16)
    },
    listContainerStyle: {
        paddingVertical: vs(20),
        gap: s(10)
    }
});
