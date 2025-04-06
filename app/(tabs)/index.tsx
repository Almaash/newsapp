import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import DailyNews from "@/constants/DailyNews";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true); // <- Loading state

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`;
      const res = await axios.get(URL);

      if (res && res.data) {
        setBreakingNews(res.data.results);
      }
    } catch (error: any) {
      console.log("Error Message", error.message);
    } finally {
      setLoading(false); // <- Stop loading either way
    }
  };

  useEffect(() => {
    // getBreakingNews();
    setLoading(false); // <- Stop loading either way
  }, []);

  return (
    <ScrollView style={[style.container, { paddingTop: safeTop }]}>
      <StatusBar style="dark" />
      <Header />
      <SearchBar value={search} onChangeText={setSearch} />
      {loading ? (
        <View style={style.loaderWrapper}>
          <ActivityIndicator size="large" color="#f83e3e" />
          <Text style={style.loadingText}>Loading breaking news...</Text>
        </View>
      ) : (
        <BreakingNews newsList={DailyNews} />
      )}
      <Categories />
      <NewsList newsList={DailyNews} />
    </ScrollView>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
});
