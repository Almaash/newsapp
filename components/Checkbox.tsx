import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Checkbox = ({ label, checked, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.container,
        checked && style.checkedContainer, // apply conditional styles
      ]}
    >
      <Text style={style.label}>{label}</Text>
      {checked && (
        <View style={style.iconWrapper}>
          <AntDesign name="checkcircle" size={14} color={"black"} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderRadius: 32,
    marginRight: 8,
    marginBottom: 8,
    // backgroundColor: "white", // default
  },
  checkedContainer: {
    borderColor: "black",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // light black/grayish background
  },
  label: {
    fontSize: 14,
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
