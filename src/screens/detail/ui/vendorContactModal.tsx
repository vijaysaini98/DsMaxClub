import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { colors } from "@theme/colors"; // your theme colors
import { ms, s, vs } from "react-native-size-matters/extend";
import TouchableOpacityView from "@components/TouchableOpacityView";
import { AppText, BOLD, EIGHTEEN, FOURTEEN } from "@components/AppText";
import { openPhoneDialer } from "@utils/index";


export default function VendorPhoneDialerModal({ visible, onClose, vendor }: any) {
    const phoneNumber = vendor?.vendor?.short_desc;
    // const phoneNumber = vendor?.vendor?.mobile;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableOpacityView onPress={onClose} style={styles.overlay}>
                <View style={styles.modalContent}>
                    
                    <AppText type={EIGHTEEN} weight={BOLD} style={styles.title}>
                        Contact Number
                    </AppText>

                    <TouchableOpacityView
                        onPress={() => phoneNumber && openPhoneDialer(phoneNumber)}
                    >
                        <AppText type={FOURTEEN} style={styles.message}>
                            {phoneNumber || "No Number Available"}
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
