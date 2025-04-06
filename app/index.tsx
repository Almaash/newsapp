import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import img from "./../assets/images/getting-started.jpg";

// TypeScript version of the component
const Index: React.FC = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={img as ImageSourcePropType}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <Animated.Text
          style={styles.text}
          entering={FadeInDown.delay(300).duration(500)}
        >
          Stay Updated!
        </Animated.Text>
        <Animated.Text
          style={styles.text2}
          entering={FadeInDown.delay(400).duration(500)}
        >
          Get breaking news and personalized updates directly to your feed
        </Animated.Text>
        <Animated.View
          style={styles.buttonWrapper}
          entering={FadeInDown.delay(1000).duration(500)}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)" as any)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default Index;

// Styles (unchanged)
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "400",
  },
  text2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  buttonWrapper: {
    width: "90%",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
});
