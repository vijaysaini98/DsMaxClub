import React from "react";
import { Modal, View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { colors } from "@theme/colors";
import { ms, s, vs } from "react-native-size-matters/extend";
import TouchableOpacityView from "@components/TouchableOpacityView";
import { AppText, BOLD, FOURTEEN, SEMI_BOLD, SIXTEEN, TWENTY_FOUR } from "@components/AppText";
import { closeIcon, giftIcon } from "@helper/imagesAssets";
import QRCode from "react-native-qrcode-svg";

export default function QrCodeModal({ visible, onClose, couponData }: any) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        {/* Gift Icon */}
                        <Image
                            source={giftIcon}
                            style={styles.giftIcon}
                            resizeMode="contain"
                        />

                        <AppText type={TWENTY_FOUR} weight={BOLD} style={styles.successText}>
                            Code Generated Successfully!
                        </AppText>

                        <AppText type={FOURTEEN} color={colors.forth} style={styles.successText}>
                            Your voucher has been redeemed
                        </AppText>
                        <AppText type={SIXTEEN} color={colors.forth} weight={SEMI_BOLD} style={styles.subText}>
                            {`Coupon Code: ${couponData?.coupons?.generated_code}`}
                        </AppText>

                        {/* QR Code */}
                        <View style={styles.qrContainer}>
                            <QRCode
                                value={JSON.stringify(couponData?.coupons) || "N/A"}
                                size={s(200)}
                                color={colors.black}
                                backgroundColor={colors.white}
                            />
                            <View style={styles.overlayCornerTL} />
                            <View style={styles.overlayCornerTR} />
                            <View style={styles.overlayCornerBL} />
                            <View style={styles.overlayCornerBR} />
                        </View>


                        {/* Close Button */}
                        <TouchableOpacityView style={styles.closeButton} onPress={onClose}>

                            <Image
                                source={closeIcon}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacityView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    container: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: ms(16),
        paddingVertical: vs(50),
        paddingHorizontal: s(16),
        alignItems: "center",
    },
    giftIcon: {
        width: s(50),
        height: s(50),
        tintColor: colors.buttonBg,
    },
    successText: {
        textAlign: "center",
        marginVertical: vs(16),
    },
    subText: {
        textAlign: "center",
        marginTop: vs(8),
        marginBottom: vs(24),
    },
    qrContainer: {
        width: s(220),
        height: s(220),
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 2,
        borderColor: colors.black,
        borderRadius: ms(12),
        marginBottom: vs(20),
    },
    overlayCornerTL: {
        position: "absolute",
        top: -2,
        left: -2,
        width: s(20),
        height: vs(20),
        borderTopWidth: s(3),
        borderLeftWidth: s(3),
        borderColor: colors.black,
    },
    overlayCornerTR: {
        position: "absolute",
        top: -2,
        right: -2,
        width: s(20),
        height: vs(20),
        borderTopWidth: s(3),
        borderRightWidth: s(3),
        borderColor: colors.black,
    },
    overlayCornerBL: {
        position: "absolute",
        bottom: -2,
        left: -2,
        width: s(20),
        height: vs(20),
        borderBottomWidth: s(3),
        borderLeftWidth: s(3),
        borderColor: colors.black,
    },
    overlayCornerBR: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: s(20),
        height: vs(20),
        borderBottomWidth: s(3),
        borderRightWidth: s(3),
        borderColor: colors.black,
    },
    closeButton: {
        position: 'absolute',
        top: -5,
        right: 10,
        marginTop: vs(10),
        backgroundColor: colors.buttonBg,
        borderRadius: ms(20),
        paddingVertical: vs(10),
        paddingHorizontal: s(10),
    },
    closeIcon: {
        width: s(20),
        height: s(20), tintColor: colors.white
    }
});
