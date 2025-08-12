import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@theme/colors"; // your theme colors
import { AppText, BOLD, EIGHTEEN, FOURTEEN, MEDIUM, SEMI_BOLD, WHITE } from "./AppText";
import TouchableOpacityView from "./TouchableOpacityView";

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
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 350,
        elevation: 5,
    },
    title: {
        color: colors.black,
        marginBottom: 10,
    },
    message: {
        marginBottom: 20,
        lineHeight: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: colors.borderColor,
    },
    cancelText: {
        color: colors.black,
        fontWeight: "600",
    },
    deleteButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: colors.buttonBg,
    },
    deleteText: {
        color: colors.white,
        fontWeight: "600",
    },
});
