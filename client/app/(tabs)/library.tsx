import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
// import books from '../../assets/books/books.json';

export default function Library() {
  interface Book {
    title: string;
    image: string;
    top: number; 
    left: number;
  }

  const [currBooks, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch ("https://3c05c57d564d.ngrok.app/userLibrary",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'adnanthereader',
      }),
    }
    ).then((response) => {
      return response.json();
    }).then((data) => {
      setBooks(data.books);
    })
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background Image */}
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/images/Untitled (393 x 852 px) (1) 1.png')}
      />
      
      {/* Render Books */}
      {currBooks.map((book, index) => (
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
  bookContainer: {
    position: 'absolute',
    width: '12%',
    height: '8%',
  },
  book: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // borderRadius: 5,
  },
  placeholderBook: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    // borderRadius: 5,
  },
});
