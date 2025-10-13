import { Image, Keyboard, StyleSheet, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { commonStyles } from '@theme/commonStyles'
import { s, vs, ms } from 'react-native-size-matters/extend'
import ToolBar from '@components/ToolBar'
import { AppText, BOLD, ERROR_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, TWELVE, WHITE } from '@components/AppText'
import KeyBoardAware from '@components/KeyBoardAware'
import Input from '@components/Input'
import { emailIcon, hotelBookingIcon, phoneIcon, userIcon } from '@helper/imagesAssets'
import TouchableOpacityView from '@components/TouchableOpacityView'
import { colors } from '@theme/colors'
import DatePicker from 'react-native-date-picker'
import HotelBottomSheet from './hotelBottomSheet'
import BottomSheet from '@gorhom/bottom-sheet'
import { DateSelectButton } from './travelBooking'
import moment from 'moment'
import { createLeads } from '@actions/home/homeAction'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import Toast from "react-native-simple-toast";
import { emailRegex, phoneRegex } from '@utils/index'

const HotelBooking = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state?.home)
    const [pickerType, setPickerType] = useState<'checkIn' | 'checkOut' | null>(null)
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        city:'',
        checkInDate: new Date(),
        checkOutDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // +1 day
        noOfPersons: '',
        rooms: 1,
        adults: 1,
        childern: 0
    })

    const hotelBottomSheetRef = useRef<BottomSheet>(null);
    const hotelSnapPoints = useMemo(() => ['30%', '50%'], []);

    const disableSubmitBtn =
        !!state?.name &&
        !!state?.email &&
        !!state?.city &&
        !!state?.phone &&
        !!state?.rooms &&
        !!state?.adults

    const handleSubmit = () => {
        Keyboard.dismiss()
        if (emailRegex.test(state.email) === false) {
            Toast.show("Invalid Email", Toast.LONG);
        }
        else if (state.phone.length < 10) {
            Toast.show("Phone number must be at least 10 digits", Toast.LONG);
        }
        else if (phoneRegex.test(state.phone) == false) {
            Toast.show("Invalid Phone Number", Toast.LONG);
        } else {
            let data = {
                name: state?.name,
                email: state?.email,
                mobile: state?.phone,
                city:state?.city,
                start_date: moment(state?.checkInDate).format("YYYY-MM-DD"),
                end_date: moment(state?.checkOutDate).format("YYYY-MM-DD"),
                no_of_rooms: state?.rooms,
                adults: state?.adults,
                children: state?.childern,
                requested_type: "Hotel",
            }

            dispatch(createLeads(data, handleSucess))
        }

    }

    const handleSucess = () => {
        Keyboard.dismiss()
        setState({
            ...state,
            name: '',
            email: '',
            phone: '',
            checkInDate: new Date(),
            checkOutDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            adults: 1,
            childern: 0
        })
    }

    const handleDatePickerOnConfirm = (date: any) => {
        if (pickerType === 'checkOut') {
            if (moment(date).isSameOrBefore(moment(state.checkInDate), 'day')) {
                Toast.show('Invalid Date, Check-out date must be after check-in date.', Toast.LONG);
                return;
            }
            setState({ ...state, checkOutDate: date });
        } else {
            setState({ ...state, checkInDate: date });
            if (moment(state.checkOutDate).isSameOrBefore(moment(date), 'day')) {
                const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                setState((prev) => ({ ...prev, checkOutDate: nextDay }));
            }
        }
        setPickerType(null);
    }

    const formatDate = (date: Date) => date.toLocaleDateString('en-GB') // dd/mm/yyyy

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer]}>
            <ToolBar
                isLeftIcon
                title="Hotel Booking Details"
                textType={FOURTEEN}
                textWeight={SEMI_BOLD}
                mainContainerStyle={styles.toolBarContainerStyle}
            />
            <KeyBoardAware style={styles.keyBoardAware}>
                <View style={styles.formContainer}>
                    <Input
                        required
                        label={'Enter Name'}
                        placeholder="Full Name"
                        value={state.name}
                        onChangeText={(text) => setState({ ...state, name: text })}
                        leftIcon={userIcon}
                        inputContainerStyle={styles.inputContainer}
                    />
                    <Input
                        required
                        label={'Enter Email'}
                        placeholder="Email Address"
                        value={state.email}
                        onChangeText={(text) => setState({ ...state, email: text.trim() })}
                        leftIcon={emailIcon}
                        keyboardType="email-address"
                        inputContainerStyle={styles.inputContainer}
                    />
                    <Input
                        required
                        label={'Enter Phone Number'}
                        placeholder="Phone Number"
                        value={state.phone}
                        onChangeText={(text) => setState({ ...state, phone: text })}
                        leftIcon={phoneIcon}
                        maxLength={10}
                        keyboardType="number-pad"
                        inputContainerStyle={styles.inputContainer}
                    />
                    <Input
                        required
                        label={'Enter City'}
                        placeholder="Enter City"
                        value={state.city}
                        onChangeText={(text) => setState({ ...state, city: text })}
                        leftIcon={userIcon}
                        inputContainerStyle={styles.inputContainer}
                    />

                    <View style={styles.dateRow}>
                        <DateSelectButton
                            required
                            label={"Check In"}
                            leftIcon={hotelBookingIcon}
                            title={formatDate(state.checkInDate)}
                            handleOnPress={() => setPickerType('checkIn')}
                            containerStyle={styles.dateSelectContainer}
                        />
                        <DateSelectButton
                            required
                            label={"Check Out"}
                            leftIcon={hotelBookingIcon}
                            title={formatDate(state.checkOutDate)}
                            handleOnPress={() => setPickerType('checkOut')}
                            containerStyle={styles.dateSelectContainer}
                        />
                    </View>
                </View>
                <View style={{ gap: 5 }}>
                    <AppText type={FOURTEEN} weight={MEDIUM}>{"Select Rooms and Guest"}
                        <AppText type={TWELVE} color={ERROR_TEXT} weight={BOLD}> *</AppText>
                    </AppText>
                    <TouchableOpacityView
                        onPress={() => hotelBottomSheetRef?.current?.expand()}
                        style={styles.roomBtn}
                    >
                        <Image
                            source={userIcon}
                            style={styles.roomBtnIcon}
                            resizeMode='contain'
                        />
                        <AppText
                            type={FOURTEEN}
                            weight={MEDIUM}
                        >{`${state?.rooms} Rooms, ${state?.adults} Adults & ${state?.childern} Childern`}</AppText>
                    </TouchableOpacityView>
                </View>
                <DatePicker
                    modal
                    open={!!pickerType}
                    mode="date"
                    date={pickerType === 'checkOut' ? state.checkOutDate : state.checkInDate}
                    onConfirm={handleDatePickerOnConfirm}
                    onCancel={() => setPickerType(null)}
                    minimumDate={new Date()}
                />

            </KeyBoardAware>
            <View style={styles.submitContainer}>
                <TouchableOpacityView
                    onPress={handleSubmit}
                    loader={isLoading}
                    disabled={!disableSubmitBtn}
                    style={styles.submitBtn(!disableSubmitBtn)}
                >
                    <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>{"Submit"}</AppText>
                </TouchableOpacityView>
            </View>
            <HotelBottomSheet
                bottomSheetRef={hotelBottomSheetRef}
                rooms
                snapPoints={hotelSnapPoints}
                onClose={() => { hotelBottomSheetRef.current?.close() }}
                onDone={(data: any) => {
                    setState({ ...state, rooms: data?.rooms, adults: data?.adults, childern: data?.childern })
                }}
                onDismiss={() => { hotelBottomSheetRef.current?.close() }}
            />
        </AppSafeAreaView>
    )
}

export default HotelBooking

const styles = StyleSheet.create({
    keyBoardAware: {
        marginTop: vs(20),
        paddingHorizontal: s(16),
    },
    toolBarContainerStyle: {
        marginLeft: s(16),
        paddingBottom: vs(10)
    },
    formContainer: {
        marginBottom: vs(20),
        gap: 20,
    },
    inputContainer: {
        height: 50,
        borderRadius: ms(12),
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateSelectContainer: {
        width: '45%',
        gap: 5
    },
    tabBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        width: '100%',
        height: vs(50),
        borderRadius: ms(12),
        borderColor: colors.borderColor,
    },
    tabBtnInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: s(8),
    },
    leftIconStyle: {
        width: s(24),
        height: s(24),
        marginRight: s(8),
    },
    roomBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: s(10),
        height: vs(50),
        borderRadius: ms(12),
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginBottom: vs(20),
    },
    roomBtnIcon: {
        height: vs(25),
        width: s(25),
        marginRight: s(8),
    },
    submitContainer: {
        paddingTop: vs(10),
        borderTopWidth: 1,
        borderColor: colors.borderColor,
        paddingHorizontal: s(16),
    },
    submitBtn: (isDisable: boolean) => ({
        height: vs(50),
        backgroundColor: isDisable ? colors.disabledBtn : colors.buttonBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ms(12),
    }),
})