import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import SliderItem from "@/components/SliderItem";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import PaginationDots from "./PaginationDots";

const { width } = Dimensions.get("screen");
const cardWidth = width * 0.8;
const cardSpacing = 10;
const MULTIPLIER = 10;

const BreakingNews = ({ newsList }: any) => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  const [paginationIndex, setPaginationIndex] = useState(0);
  const infiniteNews = Array(MULTIPLIER).fill(newsList).flat();
  const middleIndex = Math.floor(infiniteNews.length / 2);

  const [autoplayActive, setAutoplayActive] = useState(true);

  const itemWidth = cardWidth + cardSpacing;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / itemWidth);
    const totalItems = infiniteNews.length;

    if (currentIndex <= 2 || currentIndex >= totalItems - 2) {
      const newOffset = middleIndex * itemWidth;
      flatListRef.current?.scrollToOffset({
        offset: newOffset,
        animated: false,
      });
    }
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const index = viewableItems?.[0]?.index;
    if (index != null && newsList.length > 0) {
      setPaginationIndex(index % newsList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  // 🟠 Autoplay logic
  useEffect(() => {
    let currentIndex = middleIndex;

    if (autoplayActive) {
      autoplayInterval.current = setInterval(() => {
        currentIndex += 1;
        if (currentIndex >= infiniteNews.length - 2) {
          currentIndex = middleIndex;
        }

        flatListRef.current?.scrollToOffset({
          offset: currentIndex * itemWidth,
          animated: true,
        });
      }, 3000);
    }

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [autoplayActive]);

  // 🛑 Stop autoplay when user touches the carousel
  const handleUserInteraction = () => {
    if (autoplayActive) {
      setAutoplayActive(false);
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={flatListRef}
          data={infiniteNews}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem
              sliderItem={item}
              index={index}
              scrollX={scrollX}
              cardWidth={cardWidth}
              cardSpacing={cardSpacing}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + cardSpacing}
          decelerationRate="fast"
          snapToAlignment="start"
          contentContainerStyle={{
            paddingHorizontal: (width - cardWidth) / 2,
          }}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialScrollIndex={middleIndex}
          getItemLayout={(_, index) => ({
            length: cardWidth + cardSpacing,
            offset: (cardWidth + cardSpacing) * index,
            index,
          })}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollBeginDrag={handleUserInteraction}
          onTouchStart={handleUserInteraction}
        />
        <PaginationDots items={newsList} pageIndex={paginationIndex} />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
