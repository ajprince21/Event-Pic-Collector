import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slice/AuthSlice';
import { removeData } from '../utils/AsyncStorage';

const ProfileScreen = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await removeData()
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>ID: {userData.id}</Text>
      <Text style={styles.text}>Name: {userData.name}</Text>
      <Text style={styles.text}>Email: {userData.email}</Text>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'tomato',
  },
});

export default ProfileScreen;
