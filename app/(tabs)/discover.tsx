import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import newsCategoryList from "@/constants/Categories";
import Checkbox from "@/components/Checkbox";
import CountryList from "@/constants/CountryList";
import { Link } from "expo-router";

const Discover = () => {
  const { top: safeTop } = useSafeAreaInsets();

  const [categories, setCategories] = useState(newsCategoryList);
  const [countryList, setCountryList] = useState(CountryList);

  const [searchQuerry, setSearchQuerry] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  const toggleCategory = (id: string, slug: any) => {
    setCategories((prev) =>
      prev.map((cat: any) =>
        cat.id === id ? { ...cat, selected: !cat.selected } : cat
      )
    );
    setCategory(
      (prev) =>
        prev.includes(slug)
          ? prev.filter((item) => item !== slug) // remove if already selected
          : [...prev, slug] // add if not selected
    );
  };

  const toggleCountry = (code: string) => {
    setCountryList((prev) =>
      prev.map((c: any) =>
        c.code === code ? { ...c, selected: !c.selected } : c
      )
    );
    setCountry((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code]
    );
  };


  return (
    <View style={[style.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar onChangeText={setSearchQuerry} />
      <Text style={style.title}>Categories</Text>
      <View style={style.listContainer}>
        {categories.map((data: any) => (
          <Checkbox
            key={data.id}
            label={data.title}
            checked={data.selected}
            onPress={() => {
              toggleCategory(data.id, data.slug);
              // setCategory(data.slug);
            }}
          />
        ))}
      </View>
      <Text style={style.title}>Country</Text>
      <View style={style.listContainer}>
        {countryList.map((data: any, index: any) => (
          <Checkbox
            key={data.code}
            label={data.name}
            checked={data.selected}
            onPress={() => {
              toggleCountry(data.code);
              // setCountry(data.code);
            }} // ✅ use code to toggle
          />
        ))}
      </View>
      <Link href={{
        pathname:`/news/searchScreen`,
        params: {querry: searchQuerry,category,country}
      }} asChild>
        <TouchableOpacity style={style.searchBtn}>
          <Text style={style.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Discover;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
    marginLeft: 20,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  searchBtn: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  searchBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
