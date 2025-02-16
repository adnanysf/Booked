import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Firsbookalt from "../../assets/firsbookalt.svg";
import LibraryModal from '../../components/LibraryModal';

export default function Friends() {
  const [friends, setFriends] = useState<{ name: string; username: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFriendLibrary, setSelectedFriendLibrary] = useState([]);
  const [selectFriend, setSelectFriend] = useState('');

  useEffect(() => {
    fetch("https://3c05c57d564d.ngrok.app/users", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFriends(data.filter((friend: { name: string; username: string }) => friend.name !== "Adnan"));
      })
      .catch((error) => {
        console.error('Error fetching friends:', error);
      });
  }, []);

  const getLibrary = (friend: { name: string; username: string }) => {
    fetch("https://3c05c57d564d.ngrok.app/userLibrary", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: friend.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedFriendLibrary(data.books);
        setSelectFriend(friend.name);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching library:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/images/Untitled (393 x 852 px) (3) 1.png')}
      />
      <View style={styles.bottomRectangle} />

      <View style={styles.scrollViewContent}>
        {friends.map((friend, index) => (
          <View key={index} style={styles.friendContainer}>
            <Text style={styles.friendText}>{friend.name}</Text>
            <TouchableOpacity onPress={() => getLibrary(friend)}><Firsbookalt /></TouchableOpacity>
          </View>
        ))}
      </View>

      <LibraryModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        books={selectedFriendLibrary}
        name={selectFriend}
      />
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
    marginTop: 400,
  },
  friendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  friendText: {
    fontSize: 18,
    color: '#333',
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 400,
    backgroundColor: '#a97257',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bookContainer: {
    width: '25%',
    aspectRatio: 1,
    padding: 5,
  },
  book: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderBook: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    width: '80%',
    height: '10%',
    backgroundColor: 'gray',
  },
});