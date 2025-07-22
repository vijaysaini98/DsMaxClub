import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { colors } from '@theme/colors';

const styles = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  scannerWrapper: {
    alignSelf: 'center',
    width: 300,
    height: 300,

    // borderColor: colors.black,
    // borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:20
  },
  cameraView: {
    width: '100%',
    height: '100%',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayCornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'black',
  },
  overlayCornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'black',
  },
  overlayCornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'black',
  },
  overlayCornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'black',
  },
  
});

export default styles;
