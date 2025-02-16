import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Home() {
  const [progress, setProgress] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [bookTitle, setBookTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 34) {
          return prev + 2; 
        } else {
          clearInterval(interval);
          setLoading(false);
          return prev;
        }
      });
    }, 100); 

    setTimeout(() => {
      setBookTitle('The Lightning Thief');
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle the submission of the new book title
    console.log('New Book Title:', newBookTitle);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{color:"#9B4615", fontSize:75, fontWeight:600}}>Booked</Text>
      <View style={{ alignItems: 'center', width: '90%', height: '50%', backgroundColor: '#9B4615', borderRadius: 20, padding: 20 }}>
      <Text style={styles.header}>Reading Progress</Text>
      <AnimatedCircularProgress
        size={200} 
        width={15}
        fill={progress} 
        tintColor="#F4A261" 
        backgroundColor="#EDEDED" 
        rotation={0} 
        lineCap="round"
      >
        {() => (
          <Text style={styles.progressText}>
            {loading ? `${progress}%` : '34%'}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.bookText}>
        {loading ? 'Loading...' : `34% finished with ${bookTitle}`}
      </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Add a book</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Book</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter book title"
              value={newBookTitle}
              onChangeText={setNewBookTitle}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4A261',
  },
  bookText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F4A261',
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F4A261',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});