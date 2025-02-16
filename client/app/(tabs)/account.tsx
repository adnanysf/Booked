import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Account() {
  const handleSignOut = () => {
    // Handle sign-out logic here
    console.log('User signed out');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help and Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  option: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '80%',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  signOutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});