import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import axios from 'axios'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import NewsList from '@/components/NewsList'
import DailyNews from "@/constants/DailyNews";



const searchScreen = () => {

    const {querry,category,country} = useLocalSearchParams()
      const navigation = useNavigation();

    const [breakingNews, setBreakingNews] = useState([]);
      const [loading, setLoading] = useState(true); // <- Loading state
    


    const getBreakingNews = async () => {
        try {
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5&country=${country}&category=${category}&q=${querry}`;
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

  return (
    <><Stack.Screen
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
    <View>
      
      <NewsList newsList={DailyNews} />
    </View>
    </>
  )
}

export default searchScreen