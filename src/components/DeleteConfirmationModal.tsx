import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import TouchableOpacityView from '@components/TouchableOpacityView';
import { AppText, BOLD, SIXTEEN, WHITE } from '@components/AppText';
import { colors } from '@theme/colors';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;

  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AppText
            type={SIXTEEN}
            weight={BOLD}
            style={styles.title}
          >
            {title}
          </AppText>

          <AppText style={styles.message}>
            {message}
          </AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacityView
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}
            >
              <AppText weight={BOLD}>
                {cancelText}
              </AppText>
            </TouchableOpacityView>

            <TouchableOpacityView
              style={[styles.button, styles.confirmBtn]}
              onPress={onConfirm}
            >
              <AppText color={WHITE} weight={BOLD}>
                {confirmText}
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

  confirmBtn: {
    backgroundColor: colors.buttonBg,
    marginLeft: 8,
  },
});