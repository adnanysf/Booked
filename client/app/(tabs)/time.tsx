import { View, Text, TouchableWithoutFeedback, Animated, Easing, Modal, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Time() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isNestedModalVisible, setIsNestedModalVisible] = useState(false);
  const [isPagesModalVisible, setIsPagesModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const fontSizeAnim = useRef(new Animated.Value(70)).current;
  const widthAnim = useRef(new Animated.Value(screenWidth * 0.9)).current;
  const heightAnim = useRef(new Animated.Value(500)).current;
  const [totalTime, setTotalTime] = useState(0);

  interface Book {
    title: string;
    image: string;
    top: number;
    left: number;
  }

  const [currBooks, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://3c05c57d564d.ngrok.app/userLibrary", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'adnanthereader',
      }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setBooks(data.books);
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      Animated.timing(fontSizeAnim, {
        toValue: 100,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

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

      Animated.timing(fontSizeAnim, {
        toValue: 70,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

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
    setIsActive(false);
    setIsFinished(true);
    setTotalTime(seconds);
    setSeconds(0);
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

  const handleBookSelection = (book: string) => {
    setSelectedBook(book);
    setIsNestedModalVisible(false);
    setIsPagesModalVisible(true);
  };

  const handlePageInput = () => {
    setIsPagesModalVisible(false);
    setIsFinished(false);
    // Handle the data submission or further processing here
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={isFinished}
        onRequestClose={() => {
          setIsFinished(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Woah you read for {totalTime} seconds!</Text>
          <TouchableWithoutFeedback onPress={() => setIsNestedModalVisible(true)}>
            <View style={styles.modalButtons}>
              <Text style={styles.modalbuttonText}>Add Info!</Text>
            </View>
          </TouchableWithoutFeedback>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isNestedModalVisible}
            onRequestClose={() => {
              setIsNestedModalVisible(false);
            }}
          >
            <View style={[styles.modalContainerTwo]}>
              <Text style={{color:"white", fontWeight:'bold', fontSize:30, marginTop:100}}>Select the book you read</Text>
              <FlatList style={{ width: '100%', marginTop: 100 }}
                data={currBooks}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <View style={{ padding: 5, alignSelf: 'center', 
                  marginTop: 10, borderRadius: 20, backgroundColor: "white"  }}>
                  <TouchableOpacity onPress={() => handleBookSelection(item.title)}>
                    <Text style={styles.bookItem}>{item.title}</Text>
                  </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isPagesModalVisible}
            onRequestClose={() => {
              setIsPagesModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: "#e9b44c" }}>
              <Text style={styles.modalText}>How many pages did you read?</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter number of pages"
                value={pagesRead}
                onChangeText={setPagesRead}
                keyboardType="numeric"
              />
              <TouchableWithoutFeedback onPress={handlePageInput}>
                <View style={styles.modalButtons}>
                  <Text style={styles.modalbuttonText}>Submit</Text>
                </View>
              </TouchableWithoutFeedback>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
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
  modalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9b44c',
  },
  modalContainerTwo: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9b44c',
    width: '100%',
    height: '100%',
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: 200,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbuttonText: {
    display: 'flex',
    fontSize: 20,
    color: "#000",
    width: 100,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    width: '80%',
    marginBottom: 20,
  },
  bookItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: 'bold',
  },
});