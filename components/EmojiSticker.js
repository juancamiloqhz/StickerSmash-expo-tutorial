import { Image, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function EmojiSticker({ stickerSource, imageSize }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaledImage = useSharedValue(imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaledImage.value !== imageSize * 2) {
        scaledImage.value = scaledImage.value * 2;
      }
    });

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaledImage.value),
      height: withSpring(scaledImage.value),
    };
  });
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            style={[imageStyle, { width: imageSize, height: imageSize }]}
            resizeMode="contain"
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
