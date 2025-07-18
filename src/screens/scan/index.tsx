import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppSafeAreaView } from '@components/AppSafeAreaView'
import { colors } from '@theme/colors'
import Header from '@components/Header'
import { AppText } from '@components/AppText'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const Scan = () => {
    const dispatch = useAppDispatch();


  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [cameraHasPermission, setCameraHasPermission] = useState(false);
  const [setIsCameraActive] = useState(false);

  const device = useCameraDevice('back');
  const {requestPermission: requestCameraPermission} = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: [
      'ean-13',
      'code-128',
      'code-39',
      'upc-a',
      'upc-e',
      'ean-8',
      'qr',
    ],

    onCodeScanned: codes => {
      if (enableOnCodeScanned) {
        const {value, type} = codes[0] || {};
        // console.log('Scanned Code:', value, 'Type:', type);


        setEnableOnCodeScanned(false);
        setTimeout(() => setEnableOnCodeScanned(true), 3000);
      }
    },
  });

  useEffect(() => {
    handleCameraPermission();
  }, []);

  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (granted) {
      setCameraHasPermission(true);
      setIsCameraActive(true);
    } else {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to use the scanner. Please grant permission in your device settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
          {text: 'Cancel', style: 'cancel'},
        ],
      );
    }
  };
  return (
     <View style={styles.mainContainer}>
    
       <Header userName="Anil Kumawat" />

      <View style={styles.scannerContainer}>
        {cameraHasPermission && device ? (
          <View style={{flex: 1, marginTop: 10}}>
            <Camera
              codeScanner={codeScanner}
              style={styles.loadingContainer}
              device={device}
              isActive={true}
              onTouchEnd={() => setEnableOnCodeScanned(true)}
            />
          </View>
        ) : (
          <View style={styles.noPermissionContainer}>
            <AppText>
              Please grant camera permission to use the scanner.
            </AppText>
          </View>
        )}
      </View>
    </View>
  )
}

export default Scan
