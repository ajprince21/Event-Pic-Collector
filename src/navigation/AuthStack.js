import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/AuthScreen/RegistrationScreen';
import LoginScreen from '../screens/AuthScreen/LoginScreen';



const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{ title: 'Registration', headerShown:false }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
