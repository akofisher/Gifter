import React, { useState } from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import ImageViewing from 'react-native-image-viewing';
import { Colors } from '../../Constants/Colors';
import { SCREEN_WIDTH } from '../../Utils/window.util';

const CarouselImage = ({
  media,
  height = 300,
}: {
  media: string[];
  height?: number;
}) => {
  const scrollOffsetValue = useSharedValue<number>(0);
  const [active, setActive] = useState(0);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  const openViewer = () => setIsViewerVisible(true);
  const closeViewer = () => setIsViewerVisible(false);

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {media.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            active === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.carouselContainer, { height }]}>
      <Carousel
        loop={false}
        autoPlay={false}
        width={SCREEN_WIDTH}
        height={height}
        style={{ width: SCREEN_WIDTH }}
        data={media}
        scrollAnimationDuration={500}
        pagingEnabled={true}
        defaultScrollOffsetValue={scrollOffsetValue}
        onSnapToItem={index => setActive(index)}
        renderItem={({ item }) => (
          <Pressable onPress={openViewer}>
            <Image key={item} source={{ uri: item }} style={styles.image} />
          </Pressable>
        )}
      />

      {renderPagination()}

      <ImageViewing
        images={media.map(url => ({ uri: url }))}
        imageIndex={active}
        visible={isViewerVisible}
        onRequestClose={closeViewer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gray5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: Colors.mein,
  },
});

export default CarouselImage;
