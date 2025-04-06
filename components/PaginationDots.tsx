import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";

const PaginationDots = ({ items, pageIndex }: any) => {
  return (
    <View style={styles.container}>
      {items.map((_: any, index: any) => {
        return <Animated.View style={[styles.dot,{ backgroundColor: pageIndex === index ? "black": "gray"}]} key={index} />;
      })}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
  },
});
