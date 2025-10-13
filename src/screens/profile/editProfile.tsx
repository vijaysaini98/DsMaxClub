import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { cameraIcon, downArrowIcon, emailIcon, locationIcon, phoneIcon, userIcon } from '@helper/imagesAssets';
import ToolBar from '@components/ToolBar';
import TouchableOpacityView from '@components/TouchableOpacityView';
import KeyBoardAware from '@components/KeyBoardAware';
import Input from '@components/Input';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, FOURTEEN, PLACEHOLDER, SEMI_BOLD, SIXTEEN, THIRTY, WHITE } from '@components/AppText';
import ImagePickersheet from '@components/ImagePickerSheet';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateUserProfile, updateUserProfileImage } from '@actions/auth/authAction';
import { commonStyles } from '@theme/commonStyles';
import { SpinnerSecond } from '@components/Spinner';
import { IMGE_URL } from '@services/config';
import Toast from "react-native-simple-toast";
import CityDropDown, { CityOption } from '@components/cityDropDown';
import { ms, s, vs } from 'react-native-size-matters/extend';

interface ProfileState {
    name: string;
    email: string;
    phone: string;
    city: string;
    cityId: number | string
}

const EditProfile: React.FC = () => {
    const dispatch = useAppDispatch()

    const { userData, cityList, isLoading, isBtnLoading } = useAppSelector((state) => state.auth)

    const bottomSheetRef = useRef<any>(null);
    const imagePickerRef = useRef<any>(null)

    const [searchCityText, setSearchCityText] = useState<string>('');
    const [filteredLocations, setFilteredLocations] = useState<CityOption[]>(cityList);

    const [state, setState] = useState<ProfileState>({
        name: userData?.name,
        email: userData?.email,
        phone: userData?.mobile,
        city: userData?.city_name,
        cityId: userData?.city,
    });

    const [imageUri, setImageUri] = useState<string | ImageSourcePropType | null>(userData?.profile_image);

    const openBottomSheet = () => {
        setSearchCityText('');
        setFilteredLocations(cityList);
        bottomSheetRef.current?.open();
    };

    const handleSearch = (text: string) => {
        setSearchCityText(text);
        const filtered = cityList.filter((location) =>
            location?.name?.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredLocations(filtered);
    };

    const selectLocation = (location: CityOption) => {
        // setSelectedCity(location?.name);
        // setCityId(location?.id)
        setState({ ...state, city: location?.name, cityId: location?.id })
        bottomSheetRef.current?.close();
    };

    // const handleChangeProfileImage = (image) => {
    //     if (!image?.uri) {
    //         console.warn('No image selected');
    //         return;
    //     }
    //     let formData = new FormData()
    //     formData.append("profile_image", image);

    //     dispatch(updateUserProfileImage(formData, { userid: userData?.uuid }))
    // }

    const handleChangeProfileImage = (image) => {
        if (!image?.uri) {
            console.warn('No image selected');
            return;
        }

        let file = {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `profile_${Date.now()}.jpg`,
        };

        let formData = new FormData();
        formData.append("profile_image", file);
        dispatch(updateUserProfileImage(formData, { userid: userData?.uuid }));
    };

    const handleSaveBtn = () => {
        if (state?.cityId === userData?.city && state?.name === userData?.name && state?.phone === userData?.mobile) {
            Toast.show("There is no change", Toast.LONG);
        }
        else {
            //  // Save logic here
            let data = {
                name: state?.name,
                mobile: state?.phone,
                city: state?.cityId,
                current_city: userData?.current_city ? userData?.current_city : state?.cityId
            }
            dispatch(updateUserProfile(data, { userid: userData?.uuid }))
        }

    };

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, styles.safeArea]}>
            <ToolBar isLeftIcon title="My Profile" />
            {isLoading && <SpinnerSecond />}
            <KeyBoardAware style={styles.keyboardAware}>
                <View style={styles.profileImageSection}>
                    <View style={styles.profileImageWrapper}>
                        {imageUri ? (
                            <Image source={{
                                uri: imageUri?.uri
                                    ? imageUri.uri
                                    : IMGE_URL + imageUri,
                            }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.initialsCircle}>
                                <AppText type={THIRTY}>{state.name?.charAt(0)?.toUpperCase() || '?'}</AppText>
                            </View>
                        )}
                        <TouchableOpacityView style={styles.cameraBtn}
                            onPress={() => imagePickerRef.current?.open()}
                        >
                            <Image source={cameraIcon} style={styles.cameraIcon} resizeMode='contain' />
                        </TouchableOpacityView>
                    </View>
                   
                </View>
                {userData?.user_type == "1" && <AppText type={FOURTEEN} weight={SEMI_BOLD} style={{ textAlign: 'center' ,marginTop:vs(10)}}>{`RefralCode:- ${userData?.referal_code}`}</AppText>}
                <View style={styles.inputSection}>
                    <Input
                        placeholder="Full Name"
                        value={state.name}
                        onChangeText={(text: string) => setState({ ...state, name: text })}
                        leftIcon={userIcon}
                    />
                    <Input
                        placeholder="Email Address"
                        value={state.email}
                        onChangeText={(text: string) => setState({ ...state, email: text.trim() })}
                        leftIcon={emailIcon}
                        keyboardType="email-address"
                        editable={false}
                    />
                    <Input
                        placeholder="Phone Number"
                        value={state.phone}
                        onChangeText={(text: string) => setState({ ...state, phone: text })}
                        leftIcon={phoneIcon}
                        maxLength={10}
                        keyboardType="number-pad"
                    />

                    {userData?.user_type == "2" &&
                        <TouchableOpacityView
                            style={styles.citySelector}
                            onPress={openBottomSheet}
                        >
                            <View style={styles.citySelectorLeft}>
                                <Image source={locationIcon} style={styles.cityIcon} resizeMode='contain' />
                                <AppText type={state?.city ? SIXTEEN : FOURTEEN} color={PLACEHOLDER}>
                                    {state?.city || 'Select your City'}
                                </AppText>
                            </View>
                            <Image source={downArrowIcon} style={styles.downArrowIcon} resizeMode='contain' />
                        </TouchableOpacityView>
                    }
                </View>
                <TouchableOpacityView
                    onPress={handleSaveBtn}
                    style={styles.saveBtn}
                    loader={isBtnLoading}
                // disabled={disableSaveBtn}
                >
                    <AppText type={EIGHTEEN} color={WHITE} weight={BOLD}>SAVE</AppText>
                </TouchableOpacityView>
            </KeyBoardAware>

            <CityDropDown
                bottomSheetRef={bottomSheetRef}
                value={searchCityText}
                handleSearch={handleSearch}
                data={filteredLocations}
                handleSelectOption={selectLocation}
            />
            <ImagePickersheet
                refRBSheet={imagePickerRef}
                setImageUri={setImageUri}
                onSuccess={handleChangeProfileImage}
            />
        </AppSafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    safeArea: {
        paddingHorizontal: s(16),
    },
    keyboardAware: {
        flex: 1,
    },
    profileImageSection: {
        alignItems: 'center',
        marginTop: vs(40),
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: vs(12),
        backgroundColor: colors.white,
        borderRadius: ms(100),
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: ms(154),
        height: ms(154),
        borderRadius: ms(100),
    },
    initialsCircle: {
        width: ms(128),
        height: ms(128),
        borderRadius: ms(64),
        backgroundColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: vs(-15),
        alignSelf: 'center',
        backgroundColor: "rgba(248, 249, 253, 1)",
        borderRadius: ms(20),
        width: ms(40),
        height: ms(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        width: s(20),
        height: vs(20),
    },
    changeProfileBtn: {
        borderWidth: 1,
        borderColor: colors.buttonText,
        paddingHorizontal: s(15),
        paddingVertical: vs(8),
        borderRadius: ms(20),
        marginTop: vs(16),
    },
    inputSection: {
        gap: s(30),
        marginTop: vs(40),
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
    saveBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: vs(19),
        alignItems: 'center',
        borderRadius: ms(50),
        marginBottom: vs(48),
        marginTop: vs(40),
    },
});