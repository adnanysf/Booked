import React from 'react';
import { View, Image, StyleSheet, Text, StatusBar } from 'react-native';

export default function Library() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/images/Untitled (393 x 852 px) (1) 1.png')}
      />
      <View style={styles.content}>
        <Text>Library Screen</Text>
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
  content: {
    borderColor: '1px solid red',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
