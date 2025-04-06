import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const NewsList = ({ newsList }: any) => {
  return (
    <View style={styles.container}>
      {newsList.map((item: any, index: number) => (
        <Link href={`/news/${item.article_id}`} key={index} asChild>
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text style={styles.tag}>
                {item.category?.[0]?.toUpperCase() || "NEWS"}
              </Text>
              <Text style={styles.headline} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.footer}>
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.source}>{item.source_name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  tag: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 14,
    fontWeight: "700",
    color: "#212529",
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 8,
    backgroundColor: "#e0e0e0",
  },
  source: {
    fontSize: 13,
    color: "#495057",
    fontWeight: "500",
  },
});
