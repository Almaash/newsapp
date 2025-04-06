import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import DailyNewsbyId from "@/constants/mewsById";

const MewsDetails = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const res = await axios.get(URL);

      if (res && res.data) {
        setNews(res.data.results);
      }
    } catch (error: any) {
      console.log("Error Message", error.message);
    } finally {
      setLoading(false); // <- Stop loading either way
    }
  };

  useEffect(() => {
    setLoading(false); // <- Stop loading either way
    // getNews()
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={22} />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>{DailyNewsbyId.results[0].title}</Text>
              <Text style={styles.meta}>
                {DailyNewsbyId.results[0].pubDate} ·{" "}
                {DailyNewsbyId.results[0].source_name}
              </Text>

              <Image
                source={{ uri: DailyNewsbyId.results[0].image_url }}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.content}>
                <Text style={styles.paragraph}>
                  Mushroom coffee has become a popular alternative to
                  traditional coffee, attracting those looking for a unique
                  flavor experience. By blending the rich taste of coffee with
                  the potential health benefits of medicinal mushrooms, it has
                  found a niche in the wellness community.
                </Text>
                <Text style={styles.paragraph}>
                  However, it's essential to consider both the benefits and
                  potential drawbacks before incorporating it regularly into
                  your diet. What is mushroom coffee? Mushroom coffee is a blend
                  that combines ground mushrooms with coffee beans, resulting in
                  a dark, smooth, and nutty beverage.
                </Text>
                <Text style={styles.paragraph}>
                  Instead of culinary varieties like shiitake and portobello,
                  this coffee typically incorporates medicinal mushroom
                  extracts. Commonly used medicinal mushrooms include Chaga,
                  Turkey tail, Lion's mane, Reishi, and Cordyceps, each
                  contributing unique health benefits to this popular wellness
                  drink.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default MewsDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    padding: 16,
    paddingBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  content: {
    padding: 16,
  },
  paragraph: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "justify",
  },
});
