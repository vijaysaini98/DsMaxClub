import React from "react";
import { FlatList, Image, Modal, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ms, s, vs } from "react-native-size-matters/extend";
import { AppText, FOURTEEN, WHITE } from "@components/AppText";
import TouchableOpacityView from "@components/TouchableOpacityView";
import { closeIcon } from "@helper/imagesAssets";
import { IMGE_URL } from "@services/config";
import { colors } from "@theme/colors";
import { height, width } from "@utils/index";
import { ImageViewModalProps } from "src/types/common";

const ImageViewModal: React.FC<ImageViewModalProps> = ({
  isModalVisible,
  setModalVisible,
  setActiveIndex,
  activeIndex,
  data,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={activeIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event?.nativeEvent?.contentOffset?.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <FastImage
              source={{ uri: IMGE_URL + item }}
              style={styles.imageStyle}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        />
        <TouchableOpacityView
          onPress={() => setModalVisible(false)}
          style={styles.closeBtnStyle}
        >
          <Image
            source={closeIcon}
            style={styles.closeIconStyle}
            tintColor={colors.white}
          />
        </TouchableOpacityView>
        <AppText color={WHITE} type={FOURTEEN} style={styles.indexTextStyle}>
          {`${activeIndex + 1} / ${data?.length}`}
        </AppText>
      </View>
    </Modal>
  );
};

export default ImageViewModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  imageStyle: {
    width: width,
    height: height,
  },
  closeBtnStyle: {
    position: 'absolute',
    top: vs(10),
    right: s(20),
    backgroundColor: colors.semiTransprent,
    padding: ms(10),
    borderRadius: ms(20),
    alignSelf: 'center'
  },
  closeIconStyle: {
    width: s(20),
    height: vs(20),
  },
  indexTextStyle: {
    position: 'absolute',
    top: vs(20),
    alignSelf: 'center'
  },
});