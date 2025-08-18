import { Alert, Linking, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import Header from '@components/Header';
import { AppText, FOURTEEN, MEDIUM, SEMI_BOLD, TWELVE, WHITE } from '@components/AppText';
import styles from './styles';
import { useAppDispatch } from '@redux/hooks';
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
import { scanCouponCode } from '@actions/deals/dealAction';
import Toast from 'react-native-simple-toast';

const Scan = () => {
  const dispatch = useAppDispatch();
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [cameraHasPermission, setCameraHasPermission] = useState(false);
  const [cameraIsLoading, setCameraIsLoading] = useState(false);

  const device = useCameraDevice('back');
  const { requestPermission: requestCameraPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (!enableOnCodeScanned) return;
      const { value } = codes[0] || {};
      if (!value) return;

      // Replace below with your own QR scan handling logic
      try {
        // cameraIsLoading
        setCameraIsLoading(true)
        const scanData = JSON.parse(value);
        const payload = {
          user_booklet_couponid: scanData?.coupons?.uuid,
          user_id: scanData?.coupons?.user_uuid,
          generated_code: scanData?.coupons?.generated_code,
        };
        console.log("payload", payload);
        
        dispatch(scanCouponCode(payload, handleSuccess,setCameraIsLoading(false)));
        // NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN);
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
    } else {
      Alert.alert('Permission Required', 'Camera permission is required to scan QR codes.', [
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  const CameraView = useMemo(() => {
    if (!device) return null;
    return (
      <View style={styles.scannerWrapper}>
        <Camera
          codeScanner={codeScanner}
          style={styles.cameraView}
          device={device}
          isActive={true}
        />
        <View style={styles.overlayCornerTL} />
        <View style={styles.overlayCornerTR} />
        <View style={styles.overlayCornerBL} />
        <View style={styles.overlayCornerBR} />
      </View>
    );
  }, [device, codeScanner]);

  if (cameraIsLoading) return(
   <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <Header currentCity />
  <Loader />
  </AppSafeAreaView>)
  ;

  return (
    <AppSafeAreaView style={[commonStyles.mainContainer, styles.mainContainer]}>
      <Header currentCity />
      <View style={styles.containerStyle}>
        {!cameraHasPermission ? (
          <View style={styles.noPermissionContainer}>
            <AppText type={FOURTEEN} weight={SEMI_BOLD} style={{ textAlign: 'center' }}>
              Please grant camera permission to use the scanner.
            </AppText>
            <TouchableOpacityView
              style={styles.permissionBtn}
              onPress={handleCameraPermission}
            >
              <AppText type={TWELVE} weight={MEDIUM} color={WHITE} style={{ textAlign: 'center' }}>
                Camera Permission
              </AppText>
            </TouchableOpacityView>
          </View>
        ) : !enableOnCodeScanned ? (
          <TouchableOpacityView
            onPress={() => setEnableOnCodeScanned(true)}
            style={styles.scanAgainBtn}
          >
            <AppText type={FOURTEEN} weight={SEMI_BOLD} style={styles.scanAgainText}>
              Scan Again
            </AppText>
          </TouchableOpacityView>
        ) : (
          CameraView
        )}
      </View>
    </AppSafeAreaView>
  );
};

export default Scan;
