import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';

export default function Library() {
  const [shelf, setShelf] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shelf) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [shelf]);

  const shelfPopUp = () => {
    return (
      <View style={styles.shelfPopUp}>
        <Image
          style={{ zIndex: 101 }}
          source={require('../../assets/images/zoom shelf.png')}
        />
      </View>
    );
  };

  const BlurredBackground = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setShelf(false)}>
        <Animated.View style={[styles.blurredBackground, { opacity }]} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/images/Untitled (393 x 852 px) (1) 1.png')}
      />
      {shelf && <BlurredBackground />}
      <View style={styles.content}>
        {shelf && shelfPopUp()}
        <TouchableOpacity onPress={() => setShelf(!shelf)} style={styles.shelf}>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  blurredBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shelf: {
    width: "55%",
    height: "37%",
    // backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: "35%",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  shelfPopUp: {
    position: 'absolute',
    width: "90%",
    height: "50%",
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});