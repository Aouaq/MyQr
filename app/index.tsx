import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Qrgenerator from "./screens/Qrgenerator";
import Scanner from "./screens/Scanner";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "QrGenerator" ? "qrcode" : "scan1";
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20, // Keeps some space from the bottom
          marginStart: 20, // Adds horizontal padding
          marginEnd:20,
          width: "auto", // Adjusts width to be smaller than full screen
          height:70,
          borderRadius: 30,
          overflow: "hidden",
          elevation: 5, // Adds shadow for Android
          paddingVertical:10, // Extra padding inside the tab bar
          backgroundColor:"#212121",
          borderWidth:0,
          borderTopWidth:0,
        },tabBarItemStyle:{
          flex:1,
          marginVertical:10
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={0} style={StyleSheet.absoluteFill} />
        ),tabBarActiveTintColor:"#e2ff8a",tabBarInactiveTintColor:"#ffffff"
      })}
    >
      <Tab.Screen name="QrGenerator" component={Qrgenerator} />
      <Tab.Screen name="Scanner" component={Scanner} />
    </Tab.Navigator>
  );
}