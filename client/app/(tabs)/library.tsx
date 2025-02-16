import React, { useState } from 'react';
import { View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

export default function Library() {
  const [shelf, setShelf] = useState(false);

  const shelfPopUp = () => {
    return (
      <View style={styles.shelfPopUp}>
        <Image
          style={{zIndex: 101}}
          source={require('../../assets/images/zoom shelf.png')}
        />
      </View>
    );
  };

  const BlurredBackground = () => {
    return (
      <View style={styles.blurredBackground}>
      </View>
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
    backgroundColor: 'rgba(255,255,255,0.5)',
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
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: "35%",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  shelfPopUp: {
    position: 'absolute',
    backgroundColor: 'red',
    width: "90%",
    height: "50%",
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});