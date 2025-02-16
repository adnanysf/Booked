import { View, Text } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import books from '../assets/books/books.json'

export default function Books() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        setBooks(books)
    }, [])
  return (
    <View>
      <Text>Books</Text>
    </View>
  )
}