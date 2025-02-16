import React from 'react';
import { View, Image, StyleSheet, Modal, TouchableOpacity, Text, StatusBar } from 'react-native';

const LibraryModal = ({ isVisible, onClose, books }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Image
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require('../assets/images/Untitled (393 x 852 px) (1) 1.png')}
        />
        {books.map((book, index) => (
          <View key={index} style={[styles.bookContainer, { top: book.top, left: book.left }]}>
            {book.image ? (
              <Image
                style={styles.book}
                source={{ uri: book.image }}
              />
            ) : (
              <View style={styles.placeholderBook}>
                <View style={styles.placeholderText} />
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  bookContainer: {
    position: 'absolute',
    width: '12%',
    height: '8%',
  },
  book: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderBook: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: 10,
    backgroundColor: '#a97257',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LibraryModal;