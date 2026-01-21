import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { ms, s, vs } from 'react-native-size-matters/extend';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: s(16),
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraParent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerWrapper: {
    flex: 1,
    width: '100%',
    aspectRatio: 1, // or 3/4 for a rectangle
    maxWidth: s(300),
    maxHeight: vs(300),
    borderRadius: 12,
    // overflow: 'hidden',
    backgroundColor: colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cameraView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  cameraContainer: { 
    flex: 1, 
    backgroundColor: colors.tabBg, 
    width: '100%', 
    justifyContent: 'center' 
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBtn: {
    backgroundColor: colors.buttonBg,
    borderRadius: ms(6),
    paddingVertical: vs(10),
    paddingHorizontal: s(10),
    marginTop: vs(5),
  },
  overlayCornerTL: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: s(20),
    height: vs(20),
    borderTopWidth: s(3),
    borderLeftWidth: s(3),
    borderColor: colors.black,
    zIndex: 1111,
  },
  overlayCornerTR: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: s(20),
    height: vs(20),
    borderTopWidth: s(3),
    borderRightWidth: s(3),
    borderColor: colors.black,
  },
  overlayCornerBL: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: s(20),
    height: vs(20),
    borderBottomWidth: s(3),
    borderLeftWidth: s(3),
    borderColor: colors.black,
  },
  overlayCornerBR: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: s(20),
    height: vs(20),
    borderBottomWidth: s(3),
    borderRightWidth: s(3),
    borderColor: colors.black,
  },

  scanActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: vs(10),
  },
  scanAgainBtn: {
    backgroundColor: colors.buttonBg,
    paddingVertical: vs(12),
    paddingHorizontal: s(24),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainText: {
    textAlign: 'center',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: vs(10),
  },
  permissionBtnText: {
    textAlign: 'center',
  },
  torchContainer: {
    position: 'absolute',
    bottom: vs(30),
  },
  torchBtn: {
    backgroundColor: colors.buttonBg,
    padding: 10,
    borderRadius: ms(30),
  },
  torchIcon: {
    width: s(30),
    height: vs(30),
  },
  closeBtn: {
    position: 'absolute',
    right: s(10),
    top: vs(50),
    backgroundColor: colors.buttonBg,
    padding: ms(10),
    borderRadius: ms(20),
  },
  closeIcon: {
    width: s(15),
    height: s(15),
  },
});
export default styles;
