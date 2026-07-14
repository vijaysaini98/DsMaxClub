import { underMaintenance } from '@helper/imagesAssets';
import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';
import { colors } from '@theme/colors';

const MaintenanceModal = ({
  visible,
  imageUrl,
  title = 'Under Maintenance',
  message = '',
  showMessage = false,
  onClose,
}: any) => {
  console.log(imageUrl,'imageUrl==>');
  
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          {!showMessage && (
            <Image
              style={styles.image}
              // source={imageUrl ? { uri: imageUrl } : underMaintenance()}
              source={imageUrl ? { uri: imageUrl } : {uri:underMaintenance()}}
              resizeMode="contain"
            />
          )}

          {showMessage && (
            <>
              <AppText style={styles.title}>{title}</AppText>

              <AppText style={styles.message}>{message}</AppText>

              <TouchableOpacity style={styles.button} onPress={onClose}>
                <AppText style={styles.buttonText}>OK</AppText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MaintenanceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.buttonBg,
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

