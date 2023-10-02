import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../../api/api';
import { isEmailValid } from '../../utils/isEmailValid';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  const handleRegistration = async () => {
    // Reset previous error messages
    setErrorMessages({
      nameError: '',
      emailError: '',
      passwordError: '',
    });

    // Perform validation
    let isValid = true;

    if (!userData.name) {
      isValid = false;
      setErrorMessages((prevState) => ({
        ...prevState,
        nameError: 'Name is required',
      }));
    }

    if (!isEmailValid(userData.email)) {
      isValid = false;
      setErrorMessages((prevState) => ({
        ...prevState,
        emailError: 'Invalid email format',
      }));
    }

    if (!userData.password) {
      isValid = false;
      setErrorMessages((prevState) => ({
        ...prevState,
        passwordError: 'Password is required',
      }));
    }

    if (!isValid) {
      return; 
    }

    try {
      const response = await registerUser(userData);
      if (response.status == 200) {
        Alert.alert('Success', 'Account created. Now you can login', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else if (response.status == 400) {
        // Handle error with specific error message
        const errorMessage = response.errors.email || response.message;
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registration</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
        placeholderTextColor='grey'
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />
      {errorMessages.nameError && (
        <Text style={styles.errorText}>{errorMessages.nameError}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholderTextColor='grey'
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        keyboardType="email-address"
      />
      {errorMessages.emailError && (
        <Text style={styles.errorText}>{errorMessages.emailError}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholderTextColor='grey'
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        secureTextEntry
      />
      {errorMessages.passwordError && (
        <Text style={styles.errorText}>{errorMessages.passwordError}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text onPress={()=> navigation.goBack()} style={{padding:15, color:'grey'}}>Already have Account ? Login </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'grey'

  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color:'grey'
  },
  button: {
    backgroundColor: 'tomato', 
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationScreen;
