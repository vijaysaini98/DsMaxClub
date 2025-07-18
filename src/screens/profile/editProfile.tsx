import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { cameraIcon, downArrowIcon, emailIcon, locationIcon, userIcon } from '@helper/imagesAssets';
import ToolBar from '@components/ToolBar';
import TouchableOpacityView from '@components/TouchableOpacityView';
import KeyBoardAware from '@components/KeyBoardAware';
import Input from '@components/Input';
import CityDropDown, { CityOption } from '@components/cityDropDown';
import { AppText, BOLD, BUTTON_TEXT, EIGHTEEN, FOURTEEN, PLACEHOLDER, SIXTEEN, THIRTY, WHITE } from '@components/AppText';
import ImagePickersheet from '@components/ImagePickerSheet';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateUserProfile, updateUserProfileImage } from '@actions/auth/authAction';
import { commonStyles } from '@theme/commonStyles';
import { SpinnerSecond } from '@components/Spinner';
import { IMGE_URL } from '@services/config';

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
        cityId: "",
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

    const handleChangeProfileImage = () => {
         if (!imageUri?.uri) {
    console.warn('No image selected');
    return;
  }
        let formData = new FormData()
         formData.append("profile_image", imageUri);

        dispatch(updateUserProfileImage(formData, { userid: userData?.uuid }))
    }

    const handleSaveBtn = () => {
        // Save logic here
        let data = {
            name: state?.name,
            phone: state?.phone,
            city: state?.cityId,
        }
        dispatch(updateUserProfile(data, { userid: userData?.uuid }))
    };

    return (
        <AppSafeAreaView style={[commonStyles.mainContainer, styles.safeArea]}>
            <ToolBar isLeftIcon title="Edit Profile" />
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
                    <TouchableOpacityView
                        onPress={() => handleChangeProfileImage()}
                        style={styles.changeProfileBtn}>
                        <AppText color={BUTTON_TEXT}>Change Profile</AppText>
                    </TouchableOpacityView>
                </View>
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
                        leftIcon={emailIcon}
                        maxLength={10}
                        keyboardType="phone-pad"
                    />
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
                </View>
                <TouchableOpacityView
                    onPress={handleSaveBtn}
                    style={styles.saveBtn}
                    loader={isBtnLoading}
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
            />
        </AppSafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    safeArea: {
        paddingHorizontal: 16,
    },
    keyboardAware: {
        flex: 1,
    },
    profileImageSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: 12,
        backgroundColor: colors.white,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 154,
        height: 154,
        borderRadius: 100,
    },
    initialsCircle: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: -15,
        alignSelf: 'center',
        backgroundColor: "rgba(248, 249, 253, 1)",
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        width: 20,
        height: 20,
    },
    changeProfileBtn: {
        borderWidth: 1,
        borderColor: colors.buttonText,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 16,
    },
    inputSection: {
        gap: 30,
        marginTop: 40,
    },
    citySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 19,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'space-between',
        borderColor: colors.borderColor,
    },
    citySelectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 23,
    },
    cityIcon: {
        width: 20,
        height: 20,
        tintColor: colors.borderColor,
    },
    downArrowIcon: {
        width: 10,
        height: 20,
    },
    saveBtn: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 19,
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 48,
        marginTop: 40,
    },
});