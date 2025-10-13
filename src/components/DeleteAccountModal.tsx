import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@theme/colors"; // your theme colors
import { AppText, BOLD, EIGHTEEN, FOURTEEN, MEDIUM, SEMI_BOLD, WHITE } from "./AppText";
import TouchableOpacityView from "./TouchableOpacityView";
import { ms, s, vs } from "react-native-size-matters/extend";

export default function DeleteAccountModal({ visible, onClose, onConfirm }: any) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableOpacityView
                onPress={onClose}
                style={styles.overlay}>
                <View style={styles.modalContent}>
                    {/* Title */}
                    <AppText
                        type={EIGHTEEN}
                        weight={BOLD}
                        style={styles.title}
                    >Delete Account</AppText>

                    {/* Message */}
                    <AppText
                        type={FOURTEEN}
                        style={styles.message}>
                        Are you sure you want to permanently delete your account?
                    </AppText>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacityView style={styles.cancelButton} onPress={onClose}>
                            <AppText weight={MEDIUM}>Cancel</AppText>
                        </TouchableOpacityView>

                        <TouchableOpacityView style={styles.deleteButton} onPress={onConfirm}>
                            <AppText weight={SEMI_BOLD} color={WHITE}>Delete</AppText>
                        </TouchableOpacityView>
                    </View>
                </View>
            </TouchableOpacityView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.modalbg,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: s(20),
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: ms(16),
        padding: s(20),
        width: "100%",
        maxWidth: s(350),
        elevation: 5,
    },
    title: {
        // color: colors.black,
        marginBottom: vs(10),
    },
    message: {
        marginBottom: vs(20),
        lineHeight: vs(20),
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: s(12),
    },
    cancelButton: {
        paddingVertical: vs(10),
        paddingHorizontal: s(18),
        borderRadius: ms(8),
        backgroundColor: colors.sixth,
    },
    deleteButton: {
        paddingVertical: vs(10),
        paddingHorizontal: s(18),
        borderRadius: ms(8),
        backgroundColor: colors.buttonBg,
    },
});
