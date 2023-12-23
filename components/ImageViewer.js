import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImageSrc, selectedImage }) {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : placeholderImageSrc}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
