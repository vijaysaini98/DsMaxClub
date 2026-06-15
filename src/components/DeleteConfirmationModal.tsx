import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { AppText, BOLD, SIXTEEN, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AppText type={SIXTEEN} weight={BOLD} style={styles.title}>
            Delete Item
          </AppText>

          <AppText style={styles.message}>
            Are you sure you want to delete this item from cart?
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacityView
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}>
              <AppText weight={BOLD}>Cancel</AppText>
            </TouchableOpacityView>

            <TouchableOpacityView
              style={[styles.button, styles.deleteBtn]}
              onPress={onConfirm}>
              <AppText color={WHITE} weight={BOLD}>
                Delete
              </AppText>
            </TouchableOpacityView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelBtn: {
   backgroundColor: colors.sixth,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: colors.buttonBg,
    marginLeft: 8,
  },
});