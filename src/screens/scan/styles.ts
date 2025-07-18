import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { colors } from '@theme/colors';

const styles = StyleSheet.create({
     mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
      },
  loadingContainer: {
    // flex: 1,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    zIndex: 0,
  },
  scannerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default styles;
