import { Alert, Image, Keyboard, Linking, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import Header from '@components/Header';
import { AppText, FOURTEEN, MEDIUM, SEMI_BOLD, TWELVE, WHITE } from '@components/AppText';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import NavigationService from '@navigations/NavigationService';
import { REDEEM_SUCCESSFULL_SCREEN } from '@navigations/routes';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { commonStyles } from '@theme/commonStyles';
import { Loader } from '@components/Spinner';
import { enterBarCouponCode, scanCouponCode } from '@actions/deals/dealAction';
import Toast from 'react-native-simple-toast';
import BottomSheet from '@gorhom/bottom-sheet';
import BarCodeBottomSheet from './barCodeBottomSheet';
import { setVendorBookletCouponist } from '@actions/deals/dealSlice';
import { ms, s, vs } from 'react-native-size-matters/extend';
import { closeIcon, torchOfIcon, torchOnIcon } from '@helper/imagesAssets';
import { colors } from '@theme/colors';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const Scan = () => {
  const dispatch = useAppDispatch();

  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(false);
  const [cameraHasPermission, setCameraHasPermission] = useState(false);
  const [cameraIsLoading, setCameraIsLoading] = useState(false);
  const [torch, setTorch] = useState(false)
  let focus = useIsFocused();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["20%", "30%"], []);

  const device = useCameraDevice('back');
  const { requestPermission: requestCameraPermission } = useCameraPermission();

  // useEffect(()=>{
  //   handleCameraPermission()
  // },[])

  useEffect(() => {
    bottomSheetRef.current?.close();
    setEnableOnCodeScanned(false)
  }, [focus])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (!enableOnCodeScanned) return;
      const { value } = codes[0] || {};
      if (!value) return;

      try {
        setCameraIsLoading(true)
        const scanData = JSON.parse(value);
        console.log("scanData", scanData);

        const payload = {
          // user_booklet_couponid: scanData?.uuid,
          // user_id: scanData?.user_uuid,
          generated_code: scanData?.generated_code,
        };

        // dispatch(scanCouponCode(payload, handleSuccess, setCameraIsLoading(false)));
        dispatch(enterBarCouponCode(payload, handleSuccess,setCameraIsLoading(false)));
      } catch (err) {
        Toast.show('Invalid QR Code', Toast.LONG);
        setCameraIsLoading(false)
      }
      setEnableOnCodeScanned(false);
    },
  });

  const handleSuccess = () => {
    setCameraIsLoading(false)
    NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN);
  };

  const handleCameraPermission = async () => {
    setCameraIsLoading(true);
    const granted = await requestCameraPermission();
    setCameraIsLoading(false);

    if (granted) {
      setCameraHasPermission(true);
      setEnableOnCodeScanned(true)
    } else {
      Alert.alert('Permission Required', 'Camera permission is required to scan QR codes.', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const handleSubmit = (data: any) => {
    Keyboard?.dismiss()
    const payload = {
      generated_code: data?.couponCode,
    };
    dispatch(enterBarCouponCode(payload, handleBarCodeSucess));
  }

  const handleBarCodeSucess = () => {
    // dispatch(setVendorBookletCouponist([]))
    setTimeout(()=>{
      NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN);
    },200)

    bottomSheetRef.current?.close();
  }

  const CameraView = useMemo(() => {
    if (!device) return null;
    return (
      <View style={{ flex: 1, backgroundColor: colors.tabBg, width: '100%', justifyContent: 'center' }}>
        <TouchableOpacityView
          style={styles.closeBtn}
          onPress={() => setEnableOnCodeScanned(false)}
        >
          <Image
            source={closeIcon}
            style={styles.closeIcon}
            resizeMode='contain'
            tintColor={colors.white}
          />
        </TouchableOpacityView>
        <View style={styles.scannerWrapper}>
          <Camera
            codeScanner={codeScanner}
            style={styles.cameraView}
            device={device}
            isActive={enableOnCodeScanned}
            torch={torch ? 'on' : 'off'}  // ✅ will re-render when torch changes
            enableZoomGesture
          />
          <View style={styles.overlayCornerTL} />
          <View style={styles.overlayCornerTR} />
          <View style={styles.overlayCornerBL} />
          <View style={styles.overlayCornerBR} />
        </View>
      </View>
    );
  }, [device, codeScanner, torch, enableOnCodeScanned]);

  if (cameraIsLoading) return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <Header currentCity />
      <Loader />
    </AppSafeAreaView>
  );

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer]}>
      <Header currentCity />
      <View style={styles.containerStyle}>
        {!enableOnCodeScanned ? (
          <View style={styles.scanActionsRow}>
            <TouchableOpacityView
              onPress={() => handleCameraPermission()}
              style={styles.scanAgainBtn}
            >
              <AppText type={FOURTEEN} weight={SEMI_BOLD} style={styles.scanAgainText} color={WHITE}>
                Bar Code Scan
              </AppText>
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={() => {
                dispatch(setVendorBookletCouponist([]))
                bottomSheetRef.current?.expand()
              }}
              style={styles.scanAgainBtn}
            >
              <AppText type={FOURTEEN} weight={SEMI_BOLD} style={styles.scanAgainText} color={WHITE}>
                Enter Bar Code
              </AppText>
            </TouchableOpacityView>
          </View>
        ) :
          !cameraHasPermission ? (
            <View style={styles.noPermissionContainer}>
              <AppText type={FOURTEEN} weight={SEMI_BOLD} style={styles.permissionText}>
                Please grant camera permission to use the scanner.
              </AppText>
              <TouchableOpacityView
                style={styles.permissionBtn}
                onPress={handleCameraPermission}
              >
                <AppText type={TWELVE} weight={MEDIUM} color={WHITE} style={styles.permissionBtnText}>
                  Camera Permission
                </AppText>
              </TouchableOpacityView>
            </View>
          )
            : (<>
              {CameraView}
              <View style={styles.torchContainer}>
                <TouchableOpacityView
                  style={styles.torchBtn}
                  onPress={() => setTorch(!torch)}
                  activeOpacity={0.4}>
                  <Image
                    source={torch ? torchOnIcon : torchOfIcon}
                    style={styles.torchIcon}
                    resizeMode='contain'
                    tintColor={colors.white}
                  />
                </TouchableOpacityView>
              </View>
            </>
            )}
      </View>
      {/* BottomSheet */}
      <BarCodeBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        onSubmit={handleSubmit}
        onDismiss={() => {
          Keyboard?.dismiss();
          bottomSheetRef.current?.close();
        }}
      />
    </AppSafeAreaView>
  );
};

export default Scan;
