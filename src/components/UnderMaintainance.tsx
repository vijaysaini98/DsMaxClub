import { underMaintenance } from "@helper/imagesAssets";
import React from "react";
import { Modal, View, Image, StyleSheet } from "react-native";

const MaintenanceModal = ({ visible, imageUrl }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            imageUrl
              ? { uri: imageUrl }
              : underMaintenance
          }
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
};

export default MaintenanceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
  },
});
