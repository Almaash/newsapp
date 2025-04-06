import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Link } from "expo-router";

const { width } = Dimensions.get("screen");

type SliderItemProps = {
  sliderItem: {
    article_id: string;
    image_url: string;
    source_icon: string;
    title: string;
  };
  index: number;
  scrollX: SharedValue<number>;
  cardWidth: number;
  cardSpacing: number;
};

const SliderItem = ({
  sliderItem,
  index,
  scrollX,
  cardWidth,
  cardSpacing,
}: SliderItemProps) => {
  const inputRange = [
    (cardWidth + cardSpacing) * (index - 20),
    (cardWidth + cardSpacing) * index,
    (cardWidth + cardSpacing) * (index + 20),
  ];

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            inputRange,
            [-cardWidth * 0.1, 1, cardWidth * 0.1],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.15, 1, 0.15],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Link href={`/news/${sliderItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.itemWrapper,
            { width: cardWidth, marginHorizontal: cardSpacing / 2 },
            rnStyle,
          ]}
        >
          <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.lineargradientBg}
          />
          <View style={styles.textWrapper}>
            <View style={styles.headerWrapper}>
              <Image
                source={{ uri: sliderItem.source_icon }}
                style={styles.iconImage}
              />
              <Text style={styles.source}>New Straits Times</Text>
            </View>
            <Text style={styles.title}>{sliderItem.title}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: width - 60,
    height: "100%",
    borderRadius: 20,
  },
  lineargradientBg: {
    position: "absolute",
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  textWrapper: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  source: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
