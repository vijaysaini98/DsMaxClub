import { Keyboard, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppText, FOURTEEN, SEMI_BOLD, SIXTEEN, WHITE } from '@components/AppText';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { getVendorBookletCouponList } from '@actions/deals/dealAction';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import Input from '@components/Input';
import KeyBoardAware from '@components/KeyBoardAware';
import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters';
import DropdownComponent from '@components/DropDown';


const BarCodeBottomSheet = ({ bottomSheetRef, snapPoints, onSubmit, onDismiss }:any) => {
    const dispatch = useAppDispatch()
    const { vendorDealBookletList, vendorBookletCouponList, isLoading } = useAppSelector((state) => state?.deal)

    const [state, setState] = useState({
        couponCode: "",
        //         booklet_id: '',
        //         coupon_user_uuid: '',
        //         booklet_name: '',
        //         coupon_name: '',
        //         couponId:'',
        // user_booklet_couponid:''

    })

    const [isFocus, setIsFocus] = useState(false);
    const [isCouponFocus, setIsCouponFocus] = useState(false)
    const handleSubmit = () => {
        onSubmit(state);
    };

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
    const handleSelectBooklet = (item) => {
        setState({
            ...state,
            booklet_id: item?.uuid,
            booklet_name: item?.name
        });
        setIsFocus(false);
        dispatch(getVendorBookletCouponList({ booklet_id: item?.uuid }))
    }

    const handleSelectCoupon = (item) => {
        setState({
            ...state,
            couponId: item?.id,
            user_booklet_couponid: item?.uuid,
            coupon_user_uuid: item?.user_uuid,   // users_uuid
            coupon_name: item?.name, // coupon heading / fallback text
        });
        setIsCouponFocus(false);
    }


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1} // hidden by default
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            onDismiss={onDismiss}
            handleIndicatorStyle={bottomSheetStyles.handleIndicator}
            onChange={(index) => {
                if (index === -1) {
                    Keyboard.dismiss();
                    setState({
                        couponCode: ''
                    })
                }
            }}
keyboardBehavior="fillParent"
//   keyboardBlurBehavior="restore"
        >
            <BottomSheetView style={bottomSheetStyles.contentContainer}>

                {/* <Text style={bottomSheetStyles.label}>Name</Text> */}

                <KeyBoardAware contentContainerStyle={{ alignItems: 'center', gap: 10 }}>
                    <AppText type={SIXTEEN} weight={SEMI_BOLD} style={{ textAlign: "center" }}>{"BarCode Details"}</AppText>
                    {/* <Input
          label={"Customer Name"}
          required
          placeholder={"Customer Name"}
          value={state?.name}
         onChangeText={(text: string) => setState({ ...state, name: text })}
          keyboardType='email-address'
          inputContainerStyle={bottomSheetStyles.inputContainer}
        />
        <Input
        label={"Email"}
        required
          placeholder={"Email Name"}
          value={state?.email}
           onChangeText={(text: string) => setState({ ...state, email: text.trim() })}
          // leftIcon={userIcon}
          keyboardType='email-address'
          inputContainerStyle={bottomSheetStyles.inputContainer}
        />
        */}

                    {/* <DropdownComponent
                        title={"Booklet"}
                        required
                        xyz={state?.booklet_id}   // ✅ use id instead of name
                        isFocus={isFocus}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        placeholder={!isFocus ? "Select Booklet" : "..."}
                        onChange={(item) => handleSelectBooklet(item)}
                        data={vendorDealBookletList?.booklets}
                    />

                    <DropdownComponent
                        title="Coupon"
                        required
                        xyz={state?.couponId}
                        isFocus={isCouponFocus}
                        onFocus={() => setIsCouponFocus(true)}
                        onBlur={() => setIsCouponFocus(false)}
                        placeholder={!isCouponFocus ? "Select Coupon" : "..."}
                        onChange={handleSelectCoupon}
                        data={
                            vendorBookletCouponList?.length
                                ? vendorBookletCouponList.map(coupon => ({
                                    name: coupon?.heading ?? coupon?.generated_code ?? `Coupon #${coupon?.id}`,
                                    id: coupon?.users_uuid,
                                    ...coupon
                                }))
                                : [{ label: "No Coupon Available", value: "" }]
                        }
                    /> */}
                    {/* <Input
                        label='Coupon Code'
                        required
                        placeholder="Enter Coupon Code"
                        value={state?.couponCode}
                        onChangeText={(text: string) => setState({ ...state, couponCode: text.trim() })}
                        keyboardType='email-address'
                        inputContainerStyle={bottomSheetStyles.inputContainer}
                        inputStyle={{ fontSize: ms(14) }}

                    /> */}
                    <View style={{ width: '100%' }}>
  <AppText type={FOURTEEN} weight={SEMI_BOLD}>
    Coupon Code
  </AppText>

  <BottomSheetTextInput
    placeholder="Enter Coupon Code"
    value={state?.couponCode}
    onChangeText={(text) =>
      setState({ ...state, couponCode: text })
    }
    style={{
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: ms(12),
      height: vs(50),
      paddingHorizontal: ms(12),
      marginTop: vs(6),
      fontSize: ms(14),
      color: colors.black,
    }}
  />
</View>
                    <TouchableOpacityView
                        onPress={handleSubmit}
                        style={bottomSheetStyles.submitBtn}
                        loader={isLoading}
                    >
                        <AppText type={FOURTEEN} weight={SEMI_BOLD} color={WHITE}>
                            Submit
                        </AppText>
                    </TouchableOpacityView>
                </KeyBoardAware>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default BarCodeBottomSheet;

const bottomSheetStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    inputContainer: {
        borderRadius: ms(12), height: vs(50)
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
        marginTop: vs(10)
    },
    citySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: s(20),
        paddingVertical: vs(19),
        borderWidth: 1,
        borderRadius: ms(100),
        justifyContent: 'space-between',
        borderColor: colors.borderColor,
        width: '100%'
    },
    citySelectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: s(23),
    },
    cityIcon: {
        width: ms(20),
        height: ms(20),
        tintColor: colors.borderColor,
    },
    downArrowIcon: {
        width: s(10),
        height: vs(20),
    },
});