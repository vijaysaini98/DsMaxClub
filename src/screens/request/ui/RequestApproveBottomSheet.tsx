import { Image, ImageSourcePropType, Keyboard, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AppText, BUTTON_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWELVE, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import TouchableOpacityView from '@components/TouchableOpacityView';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import RadioButton from '@components/RadioButton';
import ImagePickersheet from '@components/ImagePickerSheet';
import FastImage from 'react-native-fast-image';
import { closeIcon, galleryIcon } from '@helper/imagesAssets';
import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters';
import Input from '@components/Input';
import Toast from "react-native-simple-toast";
import { executivePaymentImageUpload } from '@actions/executiveRequest.tsx/executiveRequestAction';
import { IMGE_URL } from '@services/config';
import { Loader } from '@components/Spinner';

const options = [
    { id: 1, title: "Approve", value: 2 },
    { id: 2, title: "Reject", value: 3 }
];

type StateProps = {
    requestStatus: string | number;
    approveImage: string;
    rejectReason: string;
    approveImageformData: FormData | null;
    btnDisabled?:boolean | undefined
};

const RequestApproveBottomSheet = ({ bottomSheetRef, snapPoints, onSubmit, onDismiss,btnDisabled,requestId }) => {
    const dispatch = useAppDispatch();
    const { isBtnLoading ,isLoading,isImageLoading } = useAppSelector((state) => state?.executiveRequest);
    
    const imagePickerRef = useRef<any>(null);
    const [state, setState] = useState<StateProps>({
        requestStatus: '',
        approveImage: '',
        rejectReason: '',
        approveImageformData: null
    });

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        [],
    );

    const onRequestTypeButton = (value: string) => {
        if (value === "Approve") {
            imagePickerRef.current?.open();
        }
        setState({ ...state, requestStatus: value });
    };


    const handleSubmit = () => {
        if (state?.requestStatus === 3 && !state?.rejectReason.trim()) {
            Toast.show("Please enter the reject reason", Toast.LONG);
            return;
        }
        if (state?.requestStatus === 2 && !state?.approveImage) {
            Toast.show("Please upload payment image or screenshot", Toast.LONG);
            return;
        }
        if (!state?.requestStatus) {
            Toast.show("Please select Approve or Reject", Toast.LONG);
            return;
        }

        onSubmit(state);
    };

    const handleImageSuccess = (image: any) => {
        if (!image?.uri) {
            console.warn('No image selected');
            return;
        }
        let file = {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `dsMaxClubPayment_${Date.now()}.jpg`,
        };
        // setImageUri(image?.uri);

        let formData = new FormData();
        formData.append("payment_details", file);
         formData.append("myrequest_uuid", requestId);
         dispatch(executivePaymentImageUpload(formData,onImageUploadSuccess))
    };


    const onImageUploadSuccess = (data)=>{
        setState({ ...state, approveImage:data });
        imagePickerRef.current?.close();
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            onDismiss={onDismiss}
            onChange={(index) => {
                if (index === -1) {
                    Keyboard.dismiss();
                    setState({ ...state, requestStatus: '' ,rejectReason:'',approveImage:'',approveImageformData:null});
                }
            }}
            handleIndicatorStyle={bottomSheetStyles.handleIndicator}
        >
            <BottomSheetView style={bottomSheetStyles.contentContainer}>
                <AppText type={SIXTEEN} weight={SEMI_BOLD} style={bottomSheetStyles.titleText}>
                    Request
                </AppText>
                <View style={bottomSheetStyles.optionsRow}>
                    {options.map((e) => (
                        <View key={e.id} style={bottomSheetStyles.appointmentBox}>
                            <TouchableOpacityView
                                onPress={() => onRequestTypeButton(e?.value)}
                                style={bottomSheetStyles.appointmentContainer}
                            >
                                <RadioButton
                                    value={state?.requestStatus === e?.value}
                                    onPress={() => onRequestTypeButton(e?.value)}
                                    message={e?.title}
                                />
                            </TouchableOpacityView>
                        </View>
                    ))}
                </View>
                {state?.requestStatus == 2 && (
                    <View style={bottomSheetStyles.imageUploadBox}>
                        {state?.approveImage && (
                            <TouchableOpacityView
                                onPress={() => setState({ ...state, approveImage: "", approveImageformData: null })}
                                style={bottomSheetStyles.closeIconBtn}
                            >
                                <Image
                                    source={closeIcon}
                                    style={bottomSheetStyles.closeIcon}
                                    resizeMode={"contain"}
                                    tintColor={colors.white}
                                />
                            </TouchableOpacityView>
                        )}
                        {state?.approveImage ? (
                            <FastImage
                                source={{ uri: IMGE_URL + state?.approveImage }}
                                style={bottomSheetStyles.uploadedImage}
                                resizeMode={FastImage?.resizeMode?.cover}
                            />
                        ) : (
                             isImageLoading ? <Loader/> :
                                
                                <TouchableOpacityView
                                style={bottomSheetStyles.uploadBtn}
                                onPress={() => imagePickerRef.current?.open()}
                            >
                                <Image
                                    source={galleryIcon}
                                    style={bottomSheetStyles.galleryIcon}
                                    tintColor={colors.buttonBg}
                                />
                                <AppText
                                    type={TWELVE}
                                    weight={MEDIUM}
                                    color={BUTTON_TEXT}
                                >{"Upload Image"}</AppText>
                            </TouchableOpacityView>
                        )}
                    </View>
                )}
                {state?.requestStatus == 3 && (
                    <Input
                        label='Reject Reason'
                        required
                        placeholder="Enter Reject Reason"
                        value={state?.rejectReason}
                        onChangeText={(text: string) => setState({ ...state, rejectReason: text })}
                        keyboardType='default'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        inputStyle={bottomSheetStyles.inputText}
                    />
                )}
                <TouchableOpacityView
                    onPress={handleSubmit}
                    style={bottomSheetStyles.submitBtn}
                    loader={isLoading}
                    disabled={btnDisabled || isLoading}
                >
                    <AppText type={FOURTEEN} weight={SEMI_BOLD} color={WHITE}>
                        Submit
                    </AppText>
                </TouchableOpacityView>
            </BottomSheetView>
            <ImagePickersheet
                refRBSheet={imagePickerRef}
                onSuccess={handleImageSuccess}
            />
        </BottomSheet>
    );
};

export default RequestApproveBottomSheet;

const bottomSheetStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: s(20),
        gap: s(10),
    },
    titleText: {
        textAlign: "center",
        marginBottom: vs(10),
    },
    handleIndicator: {
        backgroundColor: colors.buttonBg,
    },
    submitBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(15),
        width: "100%",
        alignItems: 'center',
        borderRadius: ms(12),
        marginTop: vs(10),
    },
    appointmentBox: {
        width: "48%",
    },
    appointmentContainer: {
        borderWidth: 0.5,
        padding: ms(20),
        borderRadius: ms(8),
        marginVertical: vs(10),
        flexDirection: "row",
        height: vs(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: vs(10),
    },
    imageUploadBox: {
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
    closeIconBtn: {
        position: 'absolute',
        zIndex: 999,
        height: s(20),
        width: s(20),
        backgroundColor: colors.buttonBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ms(10),
        right: 0,
        top: -5,
    },
    closeIcon: {
        height: s(10),
        width: s(10),
    },
    uploadedImage: {
        height: s(100),
        width: s(100),
        borderRadius: ms(12),
    },
    uploadBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    galleryIcon: {
        width: s(20),
        height: s(20),
        marginBottom: 4,
    },
    inputContainer: {
        borderRadius: ms(12),
        height: vs(50),
    },
    inputText: {
        fontSize: ms(14),
    },
});