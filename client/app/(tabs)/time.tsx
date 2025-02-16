import { View, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Time() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const fontSizeAnim = useRef(new Animated.Value(70)).current;
  const widthAnim = useRef(new Animated.Value(screenWidth * 0.9)).current;
  const heightAnim = useRef(new Animated.Value(500)).current;
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      // Animate the font size to increase
      Animated.timing(fontSizeAnim, {
        toValue: 100,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Animate the rectangle to expand
      Animated.timing(widthAnim, {
        toValue: screenWidth,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(heightAnim, {
        toValue: screenHeight,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      clearInterval(interval!);

      // Animate the font size back to its original size
      Animated.timing(fontSizeAnim, {
        toValue: 70,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Animate the rectangle back to its original size
      Animated.timing(widthAnim, {
        toValue: screenWidth * 0.9,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(heightAnim, {
        toValue: 500,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTotalTime(seconds);
  };

  const Rectangle = () => {
    return (
      <Animated.View style={[styles.rectangleLineargradient, { width: widthAnim, height: heightAnim }]}>
        <LinearGradient
          style={[StyleSheet.absoluteFill, { borderRadius: 50 }]}
          locations={[0, 0.97]}
          colors={['#e9b44c', '#c26f31']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Rectangle />
      <View style={styles.childCont}>
        <View style={{ alignItems: 'center' }}>
          <Animated.Text style={[styles.timerText, { fontSize: fontSizeAnim }]}>
            {seconds}s
          </Animated.Text>
          <TouchableWithoutFeedback onPress={toggle}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
            </View>
          </TouchableWithoutFeedback>
          {isActive && (
            <TouchableWithoutFeedback onPress={reset}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>End</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
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
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  childCont: {
    width: '100%',
    height: 700,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    marginBottom: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9b44c',
    borderRadius: 40,
    shadowColor: '#000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: 200,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    display: 'flex',
    fontSize: 20,
    color: 'white',
    width: 100,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});