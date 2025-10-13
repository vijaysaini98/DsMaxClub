import { Image, Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { commonStyles } from '@theme/commonStyles';
import { s, vs, ms } from 'react-native-size-matters/extend';
import ToolBar from '@components/ToolBar';
import { AppText, BOLD, ERROR_TEXT, FOURTEEN, MEDIUM, SEMI_BOLD, SIXTEEN, TWELVE, WHITE } from '@components/AppText';
import KeyBoardAware from '@components/KeyBoardAware';
import Input from '@components/Input';
import { emailIcon, hotelBookingIcon, phoneIcon, userIcon } from '@helper/imagesAssets';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { colors } from '@theme/colors';
import DatePicker from 'react-native-date-picker';
import HotelBottomSheet from './hotelBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { createLeads } from '@actions/home/homeAction';
import moment from 'moment';
import { emailRegex, phoneRegex } from '@utils/index';
import Toast from "react-native-simple-toast";


type DateSelectButtonProps = {
    label: string;
    required?: boolean;
    title: string;
    leftIcon: any;
    handleOnPress: () => void;
    containerStyle?: ViewStyle;
};

export const DateSelectButton: React.FC<DateSelectButtonProps> = ({
    label,
    required,
    title,
    leftIcon,
    handleOnPress,
    containerStyle
}) => (
    <View style={[styles.dateSelectContainer, containerStyle]}>
        <AppText type={FOURTEEN} weight={MEDIUM}>
            {label}
            {required && (
                <AppText type={TWELVE} color={ERROR_TEXT} weight={BOLD}>
                    {' '}
                    *
                </AppText>
            )}
        </AppText>
        <TouchableOpacityView onPress={handleOnPress} style={styles.tabBtnContainer}>
            <View style={styles.tabBtnInnerContainer}>
                <Image
                    source={leftIcon}
                    style={styles.leftIconStyle}
                    tintColor={colors.borderColor}
                    resizeMode="contain"
                />
                <AppText type={SIXTEEN}>{title}</AppText>
            </View>
        </TouchableOpacityView>
    </View>
);

type StateType = {
    name: string;
    email: string;
    phone: string;
    from: string;
    destination: string;
    date: Date;
    adults: number;
    childern: number;
};

const TravelBooking: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state?.home)
    const [pickerType, setPickerType] = useState<'checkIn' | 'checkOut' | null>(null);
    const [state, setState] = useState<StateType>({
        name: '',
        email: '',
        phone: '',
        from: '',
        destination: '',
        date: new Date(),
        adults: 1,
        childern: 0,
    });

    const hotelBottomSheetRef = useRef<BottomSheet>(null);
    const hotelSnapPoints = useMemo(() => ['30%', '50%'], []);

    const formatDate = (date: Date) => date.toLocaleDateString('en-GB'); // dd/mm/yyyy

    const disableSubmitBtn =
        !!state?.name &&
        !!state?.email &&
        !!state?.phone &&
        !!state?.from &&
        !!state?.destination &&
        !!state?.adults

    const handleSubmit = () => {
        Keyboard.dismiss()
        if (emailRegex.test(state.email) === false) {
            Toast.show("Invalid Email", Toast.LONG);
        }
        else if (state.phone.length < 10) {
            Toast.show("Phone number must be at least 10 digits", Toast.LONG);
        }
        else if (phoneRegex.test(state.phone) === false) {
            Toast.show("Invalid Phone Number", Toast.LONG);
        }
        else {
            let data = {
                name: state?.name,
                email: state?.email,
                mobile: state?.phone,
                start_date: moment(state?.date).format("YYYY-MM-DD"),
                adults: state?.adults,
                children: state?.childern,
                requested_type: "Travels",
                from: state?.from,
                destination: state?.destination
            }
            dispatch(createLeads(data, handleSucess))
        }

    }

    const handleSucess = () => {
        setState({ ...state, name: '', email: '', phone: '', from: '', destination: '', date: new Date(), adults: 1, childern: 0 })
    }

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer]}>
            <ToolBar
                isLeftIcon
                title="Travel Booking Details"
                textType={FOURTEEN}
                textWeight={SEMI_BOLD}
                mainContainerStyle={styles.toolBarContainerStyle}
            />
            <KeyBoardAware contentContainerStyle={styles.keyBoardAware}>
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
                        label={'From'}
                        placeholder="From"
                        value={state.from}
                        onChangeText={(text) => setState({ ...state, from: text })}
                        keyboardType="default"
                        inputContainerStyle={styles.inputContainer}
                    />
                    <Input
                        required
                        label={'Destination'}
                        placeholder="Destination"
                        value={state.destination}
                        onChangeText={(text) => setState({ ...state, destination: text })}
                        keyboardType="default"
                        inputContainerStyle={styles.inputContainer}
                    />
                    <View style={styles.dateRow}>
                        <DateSelectButton
                            required
                            label={'Select Date'}
                            leftIcon={hotelBookingIcon}
                            title={formatDate(state.date)}
                            handleOnPress={() => setPickerType('checkIn')}
                        />
                    </View>
                </View>
                <View style={{ gap: 5 }}>
                    <AppText type={FOURTEEN} weight={MEDIUM}>
                        {'Select Rooms and Guest'}
                        <AppText type={TWELVE} color={ERROR_TEXT} weight={BOLD}>
                            {' '}
                            *
                        </AppText>
                    </AppText>
                    <TouchableOpacityView
                        onPress={() => hotelBottomSheetRef?.current?.expand()}
                        style={styles.roomBtn}
                    >
                        <Image source={userIcon} style={styles.roomBtnIcon} resizeMode="contain" />
                        <AppText type={FOURTEEN} weight={MEDIUM}>
                            {`${state?.adults} Adults & ${state?.childern} Childern`}
                        </AppText>
                    </TouchableOpacityView>
                </View>
                <DatePicker
                    modal
                    mode="date"
                    open={!!pickerType}
                    date={state.date}
                    minimumDate={new Date()}
                    onConfirm={(date) => {
                        setState({ ...state, date: date });
                        setPickerType(null);
                    }}
                    onCancel={() => setPickerType(null)}
                />
            </KeyBoardAware>
            <View style={styles.submitContainer}>
                <TouchableOpacityView
                    onPress={handleSubmit}
                    loader={isLoading}
                    disabled={!disableSubmitBtn}
                    style={styles.submitBtn(!disableSubmitBtn)}>
                    <AppText type={FOURTEEN} weight={MEDIUM} color={WHITE}>
                        {'Submit'}
                    </AppText>
                </TouchableOpacityView>
            </View>
            <HotelBottomSheet
                bottomSheetRef={hotelBottomSheetRef}
                snapPoints={hotelSnapPoints}
                onClose={() => {
                    hotelBottomSheetRef.current?.close();
                }}
                onDone={(data: any) => {
                    setState({ ...state, adults: data?.adults, childern: data?.childern });
                }}
                onDismiss={() => {
                    hotelBottomSheetRef.current?.close();
                }}
            />
        </AppSafeAreaView>
    );
};

export default TravelBooking;

const styles = StyleSheet.create({
    keyBoardAware: {
        marginTop: vs(20),
        paddingHorizontal: s(16),
        paddingBottom: vs(150),
    },
    toolBarContainerStyle: {
        marginLeft: s(16),
        paddingBottom: vs(10),
    },
    formContainer: {
        marginBottom: vs(20),
        gap: 20,
    },
    inputContainer: {
        height: vs(50),
        borderRadius: ms(12),
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabBtnContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        width: '100%',
        height: vs(50),
        borderRadius: ms(12),
        borderColor: colors.borderColor,
        paddingHorizontal: s(10),
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
    dateSelectContainer: {
        width: '100%',
        gap: 5
    }
});