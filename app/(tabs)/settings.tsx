import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";

const Setting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { title: "About", onPress: () => {} },
    { title: "Send Feedback", onPress: () => {} },
    { title: "Privacy Policy", onPress: () => {} },
    { title: "Terms of Use", onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        headerShown: true
      }} />
      <View style={styles.card}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.row}
          >
            <Text style={styles.text}>{item.title}</Text>
            <AntDesign name="right" size={16} color="#bbb" />
          </TouchableOpacity>
        ))}

        <View style={styles.row}>
          <Text style={styles.text}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={(val) => setIsDarkMode(val)}
            thumbColor={isDarkMode ? "#fff" : "#000"} 
            trackColor={{ false: "#ccc", true: "#000" }}
          />
        </View>

        <TouchableOpacity style={styles.logoutRow}>
          <Text style={styles.logoutText}>Logout</Text>
          <AntDesign name="logout" size={18} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 16,
    color: "#222",
  },
  logoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
});
