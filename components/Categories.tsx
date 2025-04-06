import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import newsCategoryList from "@/constants/Categories";
  
  const Categories = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  
    const handleCategoryPress = (id: number) => {
      setSelectedCategoryId(id);
    };
  
    return (
      <View>
        <Text style={styles.title}>Trending Right Now</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemWrapper}
        >
          {newsCategoryList.map((data,index) => {
            const isSelected = data.id === selectedCategoryId;
            return (
              <TouchableOpacity
                key={data.id}
                style={[
                  styles.item,
                  isSelected && styles.itemSelected,
                ]}
                onPress={() => {
                    handleCategoryPress(data.id)
                    setSelectedCategory(data.slug)
                }}
              >
                <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                  {data.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  
  export default Categories;
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: "black",
      marginBottom: 10,
      marginLeft: 20,
    },
    itemWrapper: {
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
    },
    item: {
      borderWidth: 1,
      borderColor: "gray",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
    },
    itemSelected: {
      backgroundColor: "black",
      borderColor: "black",
    },
    itemText: {
      fontSize: 14,
      letterSpacing: 0.5,
      color: "black",
    },
    itemTextSelected: {
      color: "white",
      fontWeight: "600",
    },
  });
  