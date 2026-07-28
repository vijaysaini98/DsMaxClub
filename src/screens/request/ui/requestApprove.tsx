import { Image, Keyboard, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import ToolBar from '@components/ToolBar';
import { emailIcon, phoneIcon } from '@helper/imagesAssets';
import { commonStyles } from '@theme/commonStyles';
import { ms, s, vs } from 'react-native-size-matters/extend';
import {
    AppText,
    EIGHTEEN,
    FOURTEEN,
    MEDIUM,
    NORMAL,
    SEMI_BOLD,
    TWELVE,
    WHITE,
} from '@components/AppText';
import { colors } from '@theme/colors';
import TouchableOpacityView from '@components/TouchableOpacityView';
import RequestApproveBottomSheet from './RequestApproveBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { UserCardShimer } from '@components/ShimerLoader/UserShimerLoader';
import { executiveRequestStatusChange, getExecutiveRequestList, getExecutiveRequestUserDetails } from '@actions/executiveRequest.tsx/executiveRequestAction';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { IMGE_URL } from '@services/config';
import { setExecutiveRequestUserDetails } from '@actions/executiveRequest.tsx/executiveRequestSlice';

const RequestApprove = ({ route }) => {
    const { request_id, status, title, tabName } = route?.params || {};
    const dispatch = useAppDispatch();

    const executiveBottomSheetRef = useRef<BottomSheet>(null);
    const executiveSnapPoints = useMemo(() => ['50%', '70%'], []);

    const { isLoading, executiveRequestUserDetails } = useAppSelector(
        (state) => state?.executiveRequest
    );

    useEffect(() => {
         dispatch(setExecutiveRequestUserDetails({}));
        if (request_id) {
            dispatch(getExecutiveRequestUserDetails({ request_id }));
        }
    }, [dispatch, request_id]);

    const handleRequestSubmit = (data) => {
        let apiData = {
            request_id: request_id,
            tabstatus: data?.requestStatus,
            reason: data?.rejectReason,
            payment_details: data?.approveImage
        }

        dispatch(executiveRequestStatusChange(apiData, handleOnSucess))
    };

    const handleOnSucess = () => {
        executiveBottomSheetRef.current?.close();
        dispatch(getExecutiveRequestUserDetails({ request_id }, onSucess));
    }

    const onSucess = () => {
        executiveBottomSheetRef.current?.close();
        dispatch(getExecutiveRequestList({
            tabname: tabName
        }));
    }

    const renderUserCard = useCallback(() => {
        if (isLoading) {
            return <UserCardShimer cardContainerStyle={styles.shimerContainer} />;
        }

        if (!executiveRequestUserDetails) return null;

        const { name, unique_code, mobile, reason, email, requested_date, payment_image, tabstatus } =
            executiveRequestUserDetails;

        return (
            <View style={styles.userCardStyle}>
                {requested_date && (
                    <View style={styles.dateContainer}>
                        <AppText type={TWELVE} style={styles.requestDateText} numberOfLines={1}>
                            {requested_date
                                ? moment(requested_date, "DD MMMM YYYY, HH:mm").format("DD-MM-YYYY HH:mm")
                                : ""}
                        </AppText>
                    </View>
                )}
                <View style={styles.userCardHeader}>
                    <AppText
                        type={EIGHTEEN}
                        weight={MEDIUM}
                        style={styles.userNameText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {`${name ?? ''} (${unique_code ?? ''})`}
                    </AppText>
                </View>

                {mobile && (
                    <View style={styles.userCardRowContainer}>
                        <Image source={phoneIcon} style={styles.iconStyle} resizeMode="contain" />
                        <AppText type={FOURTEEN} weight={NORMAL}>
                            {mobile}
                        </AppText>
                    </View>
                )}

                {email && (
                    <View style={styles.userCardRowContainer}>
                        <Image source={emailIcon} style={styles.iconStyle} resizeMode="contain" />
                        <AppText type={FOURTEEN} weight={NORMAL}>
                            {email}
                        </AppText>
                    </View>
                )}
                {tabstatus === 'Approved' && payment_image && (
                    <>
                        <AppText type={TWELVE} weight={SEMI_BOLD}>{"Payment Details:-"}</AppText>
                        <View style={styles.approveImageBox}>
                            <FastImage
                                source={{ uri: IMGE_URL + payment_image }}
                                style={styles.approveImage}
                                resizeMode={FastImage?.resizeMode?.cover}
                            />
                        </View>
                    </>
                )}
                {tabstatus === 'Rejected' && reason && (
                    <>
                        <AppText type={TWELVE} weight={SEMI_BOLD}>{"Reject Reason:-"}</AppText>
                        <AppText type={FOURTEEN}>{reason}</AppText>
                    </>
                )}
            </View>
        );
    }, [isLoading, executiveRequestUserDetails]);

    return (
        <AppSafeAreaView style={commonStyles.mainContainer}>
            <ToolBar
                isLeftIcon
                title={title}
                textType={FOURTEEN}
                textWeight={SEMI_BOLD}
                mainContainerStyle={styles.toolBarContainer} />
            {renderUserCard()}
            {/* {executiveRequestUserDetails?.tabstatus === 'Pending' && (
                <View style={styles.bottomContainer}>
                    <View style={styles.requestBtnWrapper}>
                        <TouchableOpacityView
                            onPress={() => executiveBottomSheetRef.current?.expand()}
                            style={styles.requestBtn}
                        >
                            <AppText type={FOURTEEN} weight={SEMI_BOLD} color={WHITE}>
                                Request Approve
                            </AppText>
                        </TouchableOpacityView>
                    </View>
                </View>)} */}

            <RequestApproveBottomSheet
                bottomSheetRef={executiveBottomSheetRef}
                snapPoints={executiveSnapPoints}
                onSubmit={handleRequestSubmit}
                requestId={executiveRequestUserDetails?.myrequest_uuid}
                onDismiss={() => {
                    Keyboard.dismiss();
                    executiveBottomSheetRef.current?.close();
                }}

            />
        </AppSafeAreaView>
    );
};

export default RequestApprove;

const styles = StyleSheet.create({
    toolBarContainer: {
        marginHorizontal: s(16),
    },
    userCardStyle: {
        marginHorizontal: s(16),
        paddingVertical: s(16),
        paddingHorizontal: s(16),
        borderColor: colors.black,
        borderRadius: ms(10),
        gap: 9,
        borderWidth: 2,
        borderStyle: 'dotted',
        backgroundColor: colors.white,
        marginTop: vs(20),
    },
    userCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userNameText: {
        flex: 1,
        marginRight: 8,
    },
    requestDateText: {
        color: colors.buttonText,
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
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    requestBtnWrapper: {
        borderTopWidth: 0.5,
        borderColor: colors.borderColor,
        paddingTop: vs(10),
    },
    requestBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(15),
        alignItems: 'center',
        marginHorizontal: s(16),
        borderRadius: ms(12),
        marginBottom: vs(10),
    },
    approveImageBox: {
        height: s(110),
        width: s(110),
        borderRadius: ms(12),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderStyle: "dashed",
        marginBottom: vs(10),
        position: 'relative',
    },
    approveImage: {
        height: s(100),
        width: s(100),
        borderRadius: ms(12),
    },
    dateContainer: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    shimerContainer: {
        marginTop: vs(20)
    }
});
