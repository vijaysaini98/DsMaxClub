import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { colors } from "@theme/colors"; // your theme colors
import { ms, s, vs } from "react-native-size-matters/extend";
import TouchableOpacityView from "@components/TouchableOpacityView";
import { AppText, BOLD, EIGHTEEN, FOURTEEN } from "@components/AppText";
import { openPhoneDialer } from "@utils/index";

export default function PhoneDialerModal({ visible, onClose }: any) {
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
                    >Contact Number</AppText>
                    <TouchableOpacityView
                        onPress={() => openPhoneDialer("9785053501")}
                    >
                        <AppText
                            type={FOURTEEN}
                            style={styles.message}>
                            +91-9785053501
                        </AppText>
                    </TouchableOpacityView>
                    <TouchableOpacityView
                        onPress={() => openPhoneDialer("+91-9780973501")}
                    >
                        <AppText
                            type={FOURTEEN}
                            style={styles.message}>
                            +91-9780973501
                        </AppText>
                    </TouchableOpacityView>
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
        color: colors.black,
        marginBottom: vs(10),
    },
    message: {
        marginBottom: vs(20),
        lineHeight: vs(20),
    },
});
