import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Friends() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/images/Untitled (393 x 852 px) (3) 1.png')}
      />
      <View style={styles.bottomRectangle} />

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
  bottomRectangle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 400,
    backgroundColor: '#a97257',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});