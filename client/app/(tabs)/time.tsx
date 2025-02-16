import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Time() {
  const Rectangle = () => {
    return (
      <LinearGradient
        style={styles.rectangleLineargradient}
        locations={[0, 0.97]}
        colors={['#e9b44c', '#c26f31']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Rectangle>
        
      </Rectangle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  rectangleLineargradient: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: 700,
    backgroundColor: 'transparent',
  },
});