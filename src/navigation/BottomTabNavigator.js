import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadPictureScreen from '../screens/UploadPictureScreen';
import PicturesScreen from '../screens/PicturesScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Pictures"
        >
            <Tab.Screen
                name="Upload"
                component={UploadPictureScreen}
                options={{
                    tabBarLabel: 'Upload',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cloud-upload" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pictures"
                component={PicturesScreen}
                options={{
                    tabBarLabel: 'Pictures',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="images" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
