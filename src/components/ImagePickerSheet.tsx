import React from 'react';
import { Image, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import { cameraIcon, galleryIcon } from '@helper/imagesAssets';
import TouchableOpacityView from './TouchableOpacityView';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppText, BUTTON_TEXT, SEMI_BOLD, SIXTEEN } from './AppText';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '@theme/colors';

interface ImagePickersheetProps {
    refRBSheet: React.RefObject<RBSheet>;
    setImageUri: (uri: string) => void;
}

const ImagePickersheet: React.FC<ImagePickersheetProps> = ({ refRBSheet, setImageUri }) => {
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const openCamera = async () => {
        const granted = await requestCameraPermission();
        if (!granted) return;

        launchCamera({ mediaType: 'photo' }, response => {
            if (response.assets?.[0]?.uri) {
                const _data = {
                    uri: response.assets?.[0]?.uri,
                    name: response.assets?.[0]?.fileName,
                    type: response.assets?.[0]?.type,
                };
                setImageUri(_data);
            }
            refRBSheet.current?.close();
        });

    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets?.[0]?.uri) {
                const _data = {
                    uri: response.assets?.[0]?.uri,
                    name: response.assets?.[0]?.fileName,
                    type: response.assets?.[0]?.type,
                };
                setImageUri(_data);
            }
            refRBSheet.current?.close();
        });

    };

    return (
        <RBSheet
            ref={refRBSheet}
            height={180}
            openDuration={250}
            customStyles={{
                container: styles.containerStyle,
            }}
        >
            <View style={styles.row}>
                <TouchableOpacityView style={styles.optionBtn} onPress={openCamera}>
                    <Image
                        source={cameraIcon}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <AppText type={SIXTEEN} weight={SEMI_BOLD} color={BUTTON_TEXT}>Camera</AppText>
                </TouchableOpacityView>
                <TouchableOpacityView style={styles.optionBtn} onPress={openGallery}>
                    <Image
                        source={galleryIcon}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                    <AppText type={SIXTEEN} weight={SEMI_BOLD} color={BUTTON_TEXT}>Gallery</AppText>
                </TouchableOpacityView>
            </View>
        </RBSheet>
    );
};

export default ImagePickersheet;

const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    optionBtn: {
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: colors.buttonBg,
        marginBottom: 6,
    },
});