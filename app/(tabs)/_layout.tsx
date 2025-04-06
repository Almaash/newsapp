import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router/tabs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "black",headerShown: false, }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }:any) => (
            <FontAwesome size={25} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }:any) => (
            <FontAwesome size={25} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }:any) => (
            <FontAwesome size={25} name="bookmark" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }:any) => (
            <FontAwesome size={25} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
