import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/slice/AuthSlice';
import { getUserDataFromAsyncStorage } from '../utils/AsyncStorage';
import BottomTab from './BottomTabNavigator';
import AuthStack from './AuthStack';
import { ActivityIndicator, View } from 'react-native';



const AppNavigator = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapApp();
  }, []);

  const bootstrapApp = async () => {
    try {
      const storedUserData = await getUserDataFromAsyncStorage();
      dispatch(setUserData(storedUserData));

    } catch (error) {
      console.error('Error bootstrapping app:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userData ? (
        <BottomTab />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
