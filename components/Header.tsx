import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import img from "./../assets/images/images.jpeg";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={img} style={styles.userImage} />
        <View >
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text>Almaash Alam</Text>
        </View>
      </View>
      <FontAwesome size={23} name="bell-o" color={"black"} solid={false}/>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 15
  },
  welcomeText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 15,
    fontSize: 12,
    paddingBottom: 2,
    color: 'gray'
  },
});
